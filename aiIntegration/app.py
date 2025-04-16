from flask import Flask, request
from werkzeug.utils import secure_filename
from flask_cors import CORS
import os
from PIL import Image
import torch
import torch.nn as nn
import torch.nn.functional as F
from torchvision import transforms

# موديل PyTorch
class BoneCancerCNN(nn.Module):
    def __init__(self):
        super(BoneCancerCNN, self).__init__()
        self.conv1 = nn.Conv2d(3, 32, kernel_size=3)
        self.pool = nn.MaxPool2d(2, 2)
        self.conv2 = nn.Conv2d(32, 64, kernel_size=3)
        self.conv3 = nn.Conv2d(64, 128, kernel_size=3)
        self.dropout = nn.Dropout(0.5)
        self.flattened_size = self._get_flattened_size()
        self.fc1 = nn.Linear(self.flattened_size, 128)
        self.fc2 = nn.Linear(128, 1)

    def _get_flattened_size(self):
        x = torch.zeros(1, 3, 224, 224)
        x = self.pool(F.relu(self.conv1(x)))
        x = self.pool(F.relu(self.conv2(x)))
        x = self.pool(F.relu(self.conv3(x)))
        return x.view(1, -1).size(1)

    def forward(self, x):
        x = self.pool(F.relu(self.conv1(x)))
        x = self.pool(F.relu(self.conv2(x)))
        x = self.pool(F.relu(self.conv3(x)))
        x = torch.flatten(x, 1)
        x = F.relu(self.fc1(x))
        x = self.dropout(x)
        x = torch.sigmoid(self.fc2(x))
        return x

# Flask App Setup
app = Flask(__name__)
CORS(app)  # علشان Angular يعرف يتواصل مع Flask

# تحميل الموديل المدرب (لو عندك أوزان محفوظة)
MODEL_PATH = './bone_cancer_cnn_model_architecture.json'
model = BoneCancerCNN()
model.load_state_dict(torch.load(MODEL_PATH, map_location=torch.device('cpu')))
model.eval()

# Preprocessing
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406],  # mean
                         [0.229, 0.224, 0.225])  # std
])

# دالة التنبؤ
def model_predict(img_path, model):
    img = Image.open(img_path).convert('RGB')
    img = transform(img).unsqueeze(0)  # batch size 1
    with torch.no_grad():
        output = model(img)
        pred = torch.round(output)  # 0 or 1
        return int(pred.item())

@app.route('/', methods=['GET'])
def index():
    return "Bone Cancer Diagnosis API is Running!"

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return {'error': 'No file provided'}, 400

    f = request.files['file']
    basepath = os.path.dirname(__file__)
    upload_folder = os.path.join(basepath, 'uploads')
    os.makedirs(upload_folder, exist_ok=True)

    file_path = os.path.join(upload_folder, secure_filename(f.filename))
    f.save(file_path)

    prediction = model_predict(file_path, model)
    result = 'Benign' if prediction == 0 else 'Malignant'
    os.remove(file_path)
    # حذف الصورة بعد المعالجة

    return {'result': result}

if __name__ == '__main__':
    app.run(debug=True)
