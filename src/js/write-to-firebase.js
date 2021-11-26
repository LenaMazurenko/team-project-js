import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

import { User } from './user-class';
import { modalForm } from './open-modal-login';

const firebaseConfig = {
  apiKey: 'AIzaSyCaDFRQO0gOMOD1PiiNUHHmK8_qXQegb7w',
  authDomain: 'gitpodmy.firebaseapp.com',
  projectId: 'gitpodmy',
  storageBucket: 'gitpodmy.appspot.com',
  messagingSenderId: '190660969997',
  appId: '1:190660969997:web:3040172a1df9b4994cf744',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

modalForm.formLogin.addEventListener('submit', logInUserHandler);
modalForm.formSignup.addEventListener('submit', registrationNewUserHandler);

function logInUserHandler(event) {
  event.preventDefault();
  //isLoginFormActive = true;
  //if (user.isLogin) {
  //  renderMessage(`<p class='error'>You are LogIn! Please LogOut and try again.</p>`);
  //  return;
  //}
  const email = event.target.querySelector('#email').value;
  const password = event.target.querySelector('#password').value;

  signInWithEmailAndPassword(auth, email, password).then(isIdToken);
}

/////////////////////////IN///////////////////////////////////
signInWithEmailAndPassword(auth, email, password)
  .then(userCredential => {
    // Signed in
    const user = userCredential.user;
    // ...
  })
  .catch(error => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  });

//////////////////////////////NEW////////////////////////////////
createUserWithEmailAndPassword(auth, email, password)
  .then(userCredential => {
    // Signed in
    const user = userCredential.user;
    // ...
  })
  .catch(error => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

//////////////////////////////CHECK ACTIVE///////////////////////////////
onAuthStateChanged(auth, user => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    console.log(uid);
    // ...
  } else {
    // User is signed out
    // ...
  }
});
