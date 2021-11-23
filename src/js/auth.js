import { initializeApp } from 'firebase/app';
import { modalForm } from './open-modal-login';

// =================Initialize Firebase=========================
const firebaseConfig = {
  apiKey: 'AIzaSyCaDFRQO0gOMOD1PiiNUHHmK8_qXQegb7w',
  authDomain: 'gitpodmy.firebaseapp.com',
  projectId: 'gitpodmy',
  storageBucket: 'gitpodmy.appspot.com',
  messagingSenderId: '190660969997',
  appId: '1:190660969997:web:3040172a1df9b4994cf744',
};
const app = initializeApp(firebaseConfig);
//===============================================================
let isLoginFormActive = true;
//let successfulLogin = false;
let userEmail;

modalForm.initForm(); //reset form elements
//=====================================================================

document.querySelector('.modal-login__form').addEventListener('submit', logInUserHandler);
document
  .querySelector('.modal-signup__form')
  .addEventListener('submit', registrationNewUserHandler);

/*--------- event submit 'logIn-form ----------*/
function logInUserHandler(event) {
  event.preventDefault();
  isLoginFormActive = true;
  const email = event.target.querySelector('#email').value;
  const password = event.target.querySelector('#password').value;
  userEmail = email;
  authWithEmailAndPassword(email, password).then(isIdToken);
}

/*--------- fetch-login to Firebase ------------*/
function authWithEmailAndPassword(email, password) {
  const apiKey = firebaseConfig.apiKey;

  return fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
    {
      method: 'POST',
      body: JSON.stringify({ email, password, returnSecureToken: true }),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
    .then(response => response.json())
    .then(data => data.idToken);
}
//=====================================================================================

/*--------- event submit 'SignUp-form ----------*/
function registrationNewUserHandler(event) {
  event.preventDefault();
  isLoginFormActive = false;
  const email = event.target.querySelector('#email').value;
  const passwordOne = event.target.querySelector('.password-one').value;
  const passwordTwo = event.target.querySelector('.password-two').value;
  console.log(passwordTwo.length);

  if (passwordTwo.length < 6) {
    renderMessage(`<p class='error'>Password too short. Try again!</p>`);
    return;
  }
  if (passwordOne !== passwordTwo) {
    renderMessage(`<p class='error'>Invalid repeat password. Try again!</p>`);
    return;
  }
  userEmail = email;
  RegistrationWithEmailAndPassword(email, passwordOne).then(isIdToken);
}

/*-------- fetch-signup to Firebase ------------*/
function RegistrationWithEmailAndPassword(email, password) {
  const apiKey = firebaseConfig.apiKey;
  return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
    method: 'POST',
    body: JSON.stringify({ email, password, returnSecureToken: true }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(data => data.idToken);
}
//=======================================================================================
//
//==========other Functions=============================================================
function isIdToken(token) {
  if (!token) {
    //successfulLogin = false;
    renderMessage(`<p class='error'>Invalid email or password, try again</p>`);
    return;
  }
  //user.idToken = token;
  //successfulLogin = true;
  modalForm.initForm();
  renderMessage(`<p class='success'>You are successfuly logged in!</p>`);
  successfulLogin();
}

/*--------- render Info-message about results to form ----------------*/
function renderMessage(message) {
  if (isLoginFormActive) {
    return (document.querySelector('.modal-login__form .form__element.message').innerHTML =
      message);
  } else {
    return (document.querySelector('.modal-signup__form .form__element.message').innerHTML =
      message);
  }
}

/* update new markup in header when User successfully Login*/
function successfulLogin() {
  if (successfulLogin) {
    modalForm.openModalBtn.classList.add('is-none');
    modalForm.userEmail.textContent = `${userEmail}`;
  }
}
