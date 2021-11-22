import { initializeApp } from 'firebase/app';

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
//
//=====================class User===============================
class User {
  isLoginFormActive = true;

  constructor(name, email, idT) {
    (this.name = name), (this.email = email), (this.idToken = idT);
  }
  //getter and setter for Add-que, Add-to-list
}
//const user = {};
//=====================================================================
//
//
//=======================process LogIn=============================================
document.querySelector('.modal-login__form').addEventListener('submit', logInUser);

function logInUser(event) {
  event.preventDefault();
  const email = event.target.querySelector('#email').value;
  const password = event.target.querySelector('#password').value;
  authWithEmailAndPassword(email, password).then(isIdToken);
}

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
//
//==========================process SigUp===============================================
document.querySelector('.modal-signup__form').addEventListener('submit', registrationNewUser);

function registrationNewUser(event) {
  event.preventDefault();
  const email = event.target.querySelector('#email').value;
  const passwordOne = event.target.querySelector('.password-one').value;
  const passwordTwo = event.target.querySelector('.password-two').value;

  if (passwordOne !== passwordTwo) {
    renderMessage(`<p class='error'>Invalid repeat password. Try again!</p>`);
    return;
  }
  RegistrationWithEmailAndPassword(email, passwordOne).then(isIdToken);
}

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
    renderMessage(`<p class='error'>Invalid email or password, try again</p>`);
    return;
  }
  //user.idToken = token;
  renderMessage(`<p class='success'>You are successfuly logged in!</p>`);
}

function renderMessage(message) {
  return (document.querySelector('.form__element.message').innerHTML = message);
}
//
//
//===========Process write to Firebase====================================================
/*
const test = {
  nameFilm: 'Hello',
  rating: '7',
  cost: '0',
};

document.querySelector('.add-to-list').addEventListener('click', writeDataToDb);

function writeDataToDb() {
  return fetch(`https://gitpodmy-default-rtdb.europe-west1.firebasedatabase.app/collection.json`, {
    method: 'POST',
    body: JSON.stringify(test),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(response => console.log(response));
}
*/
