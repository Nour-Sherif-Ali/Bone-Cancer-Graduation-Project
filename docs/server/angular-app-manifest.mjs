
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/bone-Cancer-Graduation-web-app1/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/bone-Cancer-Graduation-web-app1/login",
    "route": "/bone-Cancer-Graduation-web-app1"
  },
  {
    "renderMode": 2,
    "route": "/bone-Cancer-Graduation-web-app1/home"
  },
  {
    "renderMode": 2,
    "route": "/bone-Cancer-Graduation-web-app1/news"
  },
  {
    "renderMode": 2,
    "route": "/bone-Cancer-Graduation-web-app1/about"
  },
  {
    "renderMode": 2,
    "route": "/bone-Cancer-Graduation-web-app1/diagnosis"
  },
  {
    "renderMode": 2,
    "route": "/bone-Cancer-Graduation-web-app1/diagnosisResult"
  },
  {
    "renderMode": 2,
    "route": "/bone-Cancer-Graduation-web-app1/treatment"
  },
  {
    "renderMode": 2,
    "route": "/bone-Cancer-Graduation-web-app1/profile"
  },
  {
    "renderMode": 2,
    "route": "/bone-Cancer-Graduation-web-app1/login"
  },
  {
    "renderMode": 2,
    "route": "/bone-Cancer-Graduation-web-app1/register"
  },
  {
    "renderMode": 2,
    "route": "/bone-Cancer-Graduation-web-app1/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 3441, hash: '3cec4de8a0840c6b5c786ca3bdc4f7407fe5082751c65eea55f05c7fc23e3247', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1125, hash: '3f2ebccd6ca17d9d1ed126705c32e6ebbcda35bb8f34388d1d077a4d19b1f3a0', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'news/index.html': {size: 16812, hash: 'c6f0bdf33d6ac304b1659693bf4dc2c13a0ae7c508473d9a3d6839817bb4e3db', text: () => import('./assets-chunks/news_index_html.mjs').then(m => m.default)},
    'home/index.html': {size: 23360, hash: '8bce7b1ae81f3136cee7938965bb14514893c491171b366534041998cdbf7668', text: () => import('./assets-chunks/home_index_html.mjs').then(m => m.default)},
    'treatment/index.html': {size: 13055, hash: '02e93dd22132ba39db1b7ab80df2a9a270c9ac2b97ebfd9b91561bdd5a4b3707', text: () => import('./assets-chunks/treatment_index_html.mjs').then(m => m.default)},
    'diagnosisResult/index.html': {size: 12058, hash: '26c732c1d079975a339fc1172772b98868f2e50e95b57b3e7873816c724ba6e4', text: () => import('./assets-chunks/diagnosisResult_index_html.mjs').then(m => m.default)},
    'diagnosis/index.html': {size: 16476, hash: 'babc91cfa87ef028f41d93eb80c429b5dc783a50b9c25da2523009105766c98c', text: () => import('./assets-chunks/diagnosis_index_html.mjs').then(m => m.default)},
    'about/index.html': {size: 24629, hash: '65237374e6577b28f3ace0c6e40b15365d3e5fc578dd1487d2f21251be6d8216', text: () => import('./assets-chunks/about_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 21586, hash: '54ebca0cabdc783c8cf7e4c2b4626983a3038cd88d94b5e5b92480b571b975ca', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'profile/index.html': {size: 20339, hash: 'e2c439f88a3077d50f344ca869b4ae4c2efe4a721d8d419148ad11e41e49f372', text: () => import('./assets-chunks/profile_index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 19603, hash: 'cee5c71b8b2b78f9afc6a43d1a33fb4e00722e1e103583a8903aa07b98d020c3', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'styles-IGTGZHKM.css': {size: 139465, hash: 'zrSA06Sc5fE', text: () => import('./assets-chunks/styles-IGTGZHKM_css.mjs').then(m => m.default)}
  },
};
