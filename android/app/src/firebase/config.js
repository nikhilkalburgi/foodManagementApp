import {firebase} from '@react-native-firebase/app';

const firebaseConfig = {
  apiKey: '',
  databaseURL: 'https://foodManagementApp.firebaseio.com',
  projectId: 'foodmanagementapp-fma',
  storageBucket: 'foodmanagementapp-fma.appspot.com',
  appId: '1:597925002392:android:be5ad7210be8ce9a70a4ed',
};

const config = {
    name: 'foodManagementApp',
  };
  

if (!firebase.apps.length) {
     firebase.initializeApp(firebaseConfig,config);
}

export { firebase };