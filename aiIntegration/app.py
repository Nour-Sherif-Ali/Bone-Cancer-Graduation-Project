from flask import Flask , redirect, url_for, request, render_template
from werkzeug.utils import secure_filename
from __future__ import division, print_function
import os
import numpy as np 
from keras.applications.imagenet_utils import preprocess_input, decode_predictions
from tensorflow.keras.models import load_model
from keras.preprocessing import image

app = Flask(__name__)
MODEL_PATH = 'model.h5'
model = load_model(MODEL_PATH)

def model_predict(img_path, model): 
    img = image.load_img(img_path, target_size=(224, 224))
    x = image.img_to_array(img)
    x = np.expand_dims(x, axis=0)
    x = preprocess_input(x)
    y = model.predict(x)
    return np.argmax(y)


@app.route('/', methods=['GET'])
def index():
    return "API Running"
    # return render_template('./../../Bone-Cancer-Graduation-Project/src/app/start-diagnosis/start-diagnosis.component.html')


# @app.route('/predict', methods=['GET','POST'])
# def predict():
#     if request.method == 'POST':
#         #get the file from the post request
#         f = request.files['file']
#         #save the file to ./uploads
#         basepath = os.path.dirname(__file__)
#         file_path = os.path.join(basepath, 'uploads', secure_filename(f.filename))
#         f.save(file_path)

#         #make prediction
#         preds = model_predict(file_path, model)
#         #process your result for human readability
#         dic = {0: 'Benign', 1: 'Malignant'}
#         # pred_class pred.argmax(axis=-1)
#         perd_class = dic[preds] #imageNet Decode 

@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        f = request.files['file']
        basepath = os.path.dirname(__file__)
        file_path = os.path.join(basepath, 'uploads', secure_filename(f.filename))
        f.save(file_path)

        # Prediction
        preds = model_predict(file_path, model)
        dic = {0: 'Benign', 1: 'Malignant'}
        pred_class = dic[preds]

        return {'result': pred_class}



app = Flask(__name__)