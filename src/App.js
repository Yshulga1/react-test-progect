import React, { Component } from "react";
import "./App.css";
import Person from "./Person/Person";

class App extends Component {
  state = {
    persons: [
      { id: "22", name: "Max", age: "28" },
      { id: "55", name: "Tony", age: "23" },
      { id: "52", name: "Neil", age: "21" }
    ],
    otherState: "other value",
    showPersons: false
  };
  // switchNameHander = newName => {
  //   //  console.log("clicked");
  //   // DONT DO THIS !!! this.state.persons[0].name = "gbb"
  //   this.setState({
  //     persons: [
  //       { name: newName, age: "2" },
  //       { name: "Tony", age: "43" },
  //       { name: "Neil", age: "56" }
  //     ]
  //   });
  // };
  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });
    const person = {
      ...this.state.persons[personIndex]
    };
    //const person = Object.assign({}, this.state.persons[personIndex])
    //older version
    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;
    //DO NOT mutate the state!!!!!
    this.setState({
      persons: persons
    });
  };
  deletePersonHandler = personIndex => {
    // const persons = this.state.persons.slice();
    //the same better es6 version
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  };

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  };
  render() {
    const style = {
      backgroundColour: "white",
      font: "inherit",
      border: " 1px solid blue",
      padding: "8px",
      cursor: "pointer"
    };
    let persons = null;
    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return (
              <Person
                click={() => this.deletePersonHandler(index)}
                name={person.name}
                age={person.age}
                key={person.id}
                changed={event => this.nameChangedHandler(event, person.id)}
              />
            );
          })}
        </div>
      );
      style.backgroundColour = "red";
    }
    // let classes = ["red", "bold"].join(" "); join 2 classes
    let classes = [];
    if (this.state.persons <= 2) {
      classes.push("red"); //classes = [ "red"]
    }
    if (this.state.persons.length <= 1) {
      classes.push("bold"); //classes = [ "red", "bold"]
    }

    return (
      <div className="App">
        <h1> Hi I am react App</h1>
        <p className={classes.join(" ")}>This is working </p>
        {/* //could be used but not really efficient */}
        <button style={style} onClick={this.togglePersonsHandler}>
          Switch
        </button>
        {/* ///you can't do if statements here if() {
        
        } */}

        {persons}
      </div>
    );
  }
}

export default App;
