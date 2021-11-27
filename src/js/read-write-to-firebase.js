import { user } from './auth';

export function readFromFBHundler() {
  if (!user.isLogin) {
    alert('You are not Login');
    return;
  }
  return fetch(
    `https://gitpodmy-default-rtdb.europe-west1.firebasedatabase.app/collection/${user.idLocal}/${nameCollection}.json?auth=${user.id}`,
  )
    .then(response => response.json())
    .then(response => {
      if (response && response.error) {
        console.log('ошибка чтения из FB');
        //`<p class="error">${response.error}</p>`;
      }
      console.log(response);
    });
}

///////////////////////////////////////////////////////////////////////////////

export function writeToFBHundler(nameCollection, object) {
  if (!user.isLogin) {
    alert('You are not Login');
    return;
  }
  return fetch(
    `https://gitpodmy-default-rtdb.europe-west1.firebasedatabase.app/collection/${user.idLocal}/${nameCollection}.json`,
    {
      method: 'POST',
      body: JSON.stringify(object),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
    .then(response => response.json())
    .then(data => console.log(data));
}
