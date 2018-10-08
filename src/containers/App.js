import React, { PureComponent } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import Auxi from '../hoc/Auxi';
import withClass from '../hoc/withClass';

export const AuthContext = React.createContext(false);

class App extends PureComponent {
  constructor(props){
    super(props);
    console.log('[App.js] Inside constructor', props);
    this.state = {
      persons: [
        {id: 'adfds1', name:'jolie', age: 23},
        {id: 'added2', name:'ram', age: 12},
        {id: 'erewfdsa3', name:'ryan', age:30}
      ],
      showPerson: false,
      toggleClicked: 0,
      authenticated: false
    }
  }

  componentWillMount() {
    console.log('[App.js] Inside componentWillMount');
  }

  componentDidMount() {
    console.log('[App.js] inside componentDidMount');
  }

//  shouldComponentUpdate (nextProps, nextState) {
  //  console.log('[UPDATE App.js] inside shouldComponentUpdate', nextProps, nextState);
  //  return nextState.persons !== this.state.persons || nextState.showPersons !== this.state.showPersons;
//  }

  componentWillUpdate (nextProps, nextState) {
    console.log ('[UPDATE App.js] inside componentWillUpdate', nextProps, nextState);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(
      "[UPDATE App.js] Inside getDerivedStateFromProps",
      nextProps,
      prevState
    );
    return prevState;
  }

  getSnapshotBeforeUpdate() {
    console.log(
      "[UPDATE App.js] Inside getSnapshotBeforeUpdate"
      );
  }
  componentDidUpdate ()  {
    console.log ('[UPDATE App.js] inside componentDidUpdate');
  }

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons:persons})
  }

    nameChangedHandler =(event, id) => {
      const personIndex = this.state.persons.findIndex(p => {
        return p.id === id;
      });

      const person = {
        ...this.state.persons[personIndex]
      };

      person.name = event.target.value;

      const persons =[...this.state.persons];
        persons[personIndex] = person;

        this.setState({ persons: persons });
    }

    togglePersonHandler = () => {
      const doesShow =  this.state.showPerson;
        this.setState((prevState, props) => {
          return {
            showPerson:!doesShow,
            toggleClicked: prevState.toggleClicked + 1
          }
      });
    }

    loginHandler = () => {
      this.setState({authenticated:true});
    }


  render() {
    console.log('[App.js] inside render');

    let persons = null;


    if (this.state.showPerson) {
      persons =  <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler}
          />;
      }


    return (
<Auxi>
      <div className={classes.App}>
        <Cockpit
        appTitle={this.props.title}
        login={this.loginHandler}
        showPerson={this.state.showPerson}
        persons={this.state.persons}
        clicked={this.togglePersonHandler}/>
      <AuthContext.Provider value={this.state.authenticated}>
        {persons}
      </AuthContext.Provider>
      </div>
</Auxi>

    );
  }
}

export default withClass(App, classes.App);
