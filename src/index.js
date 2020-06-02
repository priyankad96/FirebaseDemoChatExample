import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore, applyMiddleware, compose } from 'redux';
import * as serviceWorker from './serviceWorker';
import rootReducer from "./components/store/reducer/rootReducer";
import { Provider, useSelector} from 'react-redux';
import thunk from "redux-thunk";
import { reduxFirestore} from "redux-firestore";
import { getFirebase, ReactReduxFirebaseProvider, isLoaded} from "react-redux-firebase";
import { createFirestoreInstance, getFirestore  } from 'redux-firestore';
import fbConfig from "./config/fbConfig";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

const store=createStore(rootReducer,
    compose(
    applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
    reduxFirestore(fbConfig),
    )
);

const rrfConfig= {
    useFirestoreForProfile: true,
    userProfile: 'users'
};

const rrfProps= {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance,
};

function AuthIsLoaded({children}){
    const auth= useSelector(state=> state.firebase.auth);
    if(!isLoaded(auth)){
        return <div>Loading screen....</div>
    }
    return children;
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <AuthIsLoaded>
                <App />
            </AuthIsLoaded>
        </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
