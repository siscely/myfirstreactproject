import React from 'react';
import classes from './Cockpit.css';
import Auxi from '../../hoc/Auxi';

const cockpit = (props) => {
  const assignedClasses = [];
    let btnClass = classes.Button;

    if(props.showPerson)
     {
        btnClass = [classes.Button, classes.Red].join('');
    }

    if(props.persons.length <=2) {
      assignedClasses.push(classes.red);
    }
    if(props.persons.length <=1) {
      assignedClasses.push(classes.bold);
    }
  return (
    <Auxi>
    <h1>{props.appTitle}</h1>
    <p className={assignedClasses.join(' ')} >I am really working</p>
    <button
    className = {btnClass}
    onClick={props.clicked}>Toggle</button>
    <button onClick={props.login}>Log in</button>
    </Auxi>

  );
};

export default cockpit;
