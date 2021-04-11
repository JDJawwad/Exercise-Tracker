import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

export default class ExercisesList extends Component {

    state = {
        exercises: [],
        search: ""
    }

    componentDidMount(){
        axios.get('http://localhost:5000/exercises')
        .then(response=>{
            this.setState({
                exercises: response.data
            })
        })
        .catch(err=> console.log(err))
       
    }

    deleteExercise(id){
        axios.delete(`http://localhost:5000/exercises/${id}`)
        .then(res=> console.log(res.data))
        this.setState({
            exercises: this.state.exercises.filter(value=> value._id !== id)
        })
    }

    exerciseList(){
        return this.state.exercises.map((currentExercises)=>{
            return(
                <tr className='text-capitalize bg-dark text-white'>
                <td>{currentExercises.username}</td>
                <td>{currentExercises.description}</td>
                <td>{currentExercises.duration}</td>
                <td>{currentExercises.date.substring(0,10)}</td>
                <td>
                  <Link to={`/update/${currentExercises._id}`}>Edit</Link> | <a href="#" onClick={() =>  this.deleteExercise(currentExercises._id) }>Delete</a>
                </td>
              </tr>
            )
        })
    }
    search(e){
      this.setState({
        [e.target.name]: e.target.value
      },()=>{
        axios.get(`http://localhost:5000/exercises/search/${this.state.search}`)
        .then(res=>this.setState({
          exercises:res.data
        }))
        if(this.state.search.length === 0){
          axios.get('http://localhost:5000/exercises')
        .then(response=>{
            this.setState({
                exercises: response.data
            })
        })
        .catch(err=> console.log(err))
        }
      })
      
    }

    render() {
        return (
            <div>
              <h3>Search By Username  :  <input type='text'  name='search' onChange={(e)=>this.search(e)}></input></h3>
                 <div>
                   <br></br>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.exerciseList() }
          </tbody>
        </table>
      </div>
            </div>
        )
    }
}
