import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCaDFRQO0gOMOD1PiiNUHHmK8_qXQegb7w',
  authDomain: 'gitpodmy.firebaseapp.com',
  projectId: 'gitpodmy',
  storageBucket: 'gitpodmy.appspot.com',
  messagingSenderId: '190660969997',
  appId: '1:190660969997:web:3040172a1df9b4994cf744',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

/*-------process LogIn------*/
document.querySelector('.modal-login__form').addEventListener('submit', logInUser);

function logInUser(event) {
  event.preventDefault();
  const email = event.target.querySelector('#email').value;
  const password = event.target.querySelector('#password').value;
  authWithEmailAndPassword(email, password);
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

/*-------process SigUp------*/

document.querySelector('.modal-signup__form').addEventListener('submit', registrationNewUser);

function registrationNewUser(event) {
  event.preventDefault();
  const email = event.target.querySelector('#email').value;
  const password = event.target.querySelector('#password').value;
  RegistrationWithEmailAndPassword(email, password);
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

/*------------write to DB Firefase-----------*/
/*
const test = {
  nameFilm: 'Hello',
  rating: '7',
  cost: '0',
};


document.querySelector('.hero__button').addEventListener('click', writeDataToDb);

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
