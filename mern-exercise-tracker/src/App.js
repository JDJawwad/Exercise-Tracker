import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./Components/Navbar";
import ExercisesList from "./Components/ExercisesList";
import EditExercise from "./Components/EditExercise";
import CreateExercise from "./Components/CreateExercise";
import CreateUser from "./Components/CreateUser";


function App() {
  return (
      <Router>
        <Navbar/>
        <br></br>
        <Route path = '/' exact component = {ExercisesList} ></Route>
        <Route path = '/update/:id' exact component = {EditExercise} ></Route>
        <Route path = '/create' exact component = {CreateExercise} ></Route>
        <Route path = '/user' exact component = {CreateUser} ></Route>
      </Router>
  );
}

export default App;
