import React, { Component } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditExercise extends Component {

    state = {
        username: '',
        description: '',
        duration: 0,
        date: new Date(),
        users: []
    }

    componentDidMount() {
       
        axios.get(`http://localhost:5000/exercises/${this.props.match.params.id}`,{
        })
        .then(response=>{
            this.setState({
                username: response.data.username,
                description: response.data.description,
                duration: response.data.duration,
                date: new Date(response.data.date)
            })
        })
        .catch((err)=>console.log(err))

        axios.get('http://localhost:5000/users/')
        .then(response =>{
            if(response.data.length > 0){
                this.setState({
                    users: response.data.map(user=>user.username),
                    //username: response.data[0].username
                })
            }
        })
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    dataPiker=(date)=>{
    console.log(date)
        this.setState({
            date:date
        })
     }
    onSubmit(e) {
        e.preventDefault()
        const { username, description, duration, date } = this.state;
        const exercise = { username, description, duration, date }
        
        console.log(exercise)

        // axios.post('http://localhost:5000/exercises/add', exercise)
        // .then(res=>console.log(res.data))
        
        axios.put(`http://localhost:5000/exercises/update/${this.props.match.params.id}`,exercise)
        .then(()=>{
             this.props.history.push('/')
        })
    }


    render() {
        const { username, description, duration, date, users } = this.state
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-8'>
                        <h3>Edit Exercise Log</h3>
                        <form onSubmit={(e) => this.onSubmit(e)}>
                            <div className="form-group">
                                <label>Username: </label>
                                <select ref="userInput"
                                    required
                                    name='username'
                                    className="form-control"
                                    value={username}
                                    onChange={(e) => this.onChange(e)}>
                                    {
                                        users.map((user) => {
                                            return <option 
                                                key={user}
                                                value={user}>{user}
                                            </option>;
                                        })
                                    }
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Description: </label>
                                <input type="text" name='description'
                                    required
                                    className="form-control"
                                    value={description}
                                    onChange={(e) => this.onChange(e)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Duration (in minutes): </label>
                                <input
                                    type="num" name='duration'
                                    className="form-control"
                                    value={duration}
                                    onChange={(e) => this.onChange(e)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Date: </label>
                                <div>
                                    <DatePicker
                                        selected={date}
                                        onChange={this.dataPiker}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <input type="submit" value="Edit Exercise Log"  className="btn btn-primary" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}