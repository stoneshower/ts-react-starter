import React from 'react';
import ReactDOM from 'react-dom';
import App from './js/app';

const sayGreeting = () => {
  const obj1 = { a: 'Hello', b: 'World' };
  const obj2 = Object.assign({}, obj1);

  return `${obj2.a} ${obj2.b}`;
};

const showMessage = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve(sayGreeting());
  }, 2000);
});

// showMessage().then((message) => {
//   document.body.innerHTML = message;
// });

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);



