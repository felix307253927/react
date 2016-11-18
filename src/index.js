import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import TodoModel from './js/todoModel';
import './css/index.css';


ReactDOM.render(
  <App model={new TodoModel('react-todo')}/>,
  document.getElementById('root'),
  () => {
    console.log(React.version)
  }
);
