import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase";
import "firebase/firestore";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";

// Reducers
// @todo

const firebaseConfig = {
  apiKey: "AIzaSyACWfbjl9Q459zoZHmha_EsTqSob17BcE8",
  authDomain: "clientpanel-c91d0.firebaseapp.com",
  databaseURL: "https://clientpanel-c91d0.firebaseio.com",
  projectId: "clientpanel-c91d0",
  storageBucket: "clientpanel-c91d0.appspot.com",
  messagingSenderId: "951055344871",
  appId: "1:951055344871:web:5250816f86686bc4"
};

// React Redux Firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true
};

// Init firebase instance
firebase.initializeApp(firebaseConfig);
// Init firebase
// const firestore = firebase.firestore();

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase)(createStore)
);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer // <- needed if using firestore
});

// Create intitial State
const initialState = {};

// Create Store

const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
