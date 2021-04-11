import React, { Component } from 'react'
import axios from 'axios'

export default class CreateUser extends Component {

    state = {
        username: ''
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault()
        const { username } = this.state
        const user = { username }
        console.log(user)

        axios.post('http://localhost:5000/users/add', user)
        .then(res=> console.log(res.data))

        this.setState({
            username: ''
        })
    }

    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-8'>
                        <div>
                            <h3>Create New User</h3>
                            <form onSubmit={(e)=>this.onSubmit(e)}>
                                <div className="form-group">
                                    <label>Username: </label>
                                    <input type="text" name='username'
                                        required
                                        className="form-control"
                                        value={this.state.username}
                                        onChange={(e)=>this.onChange(e)}
                                    />
                                </div>
                                <div className="form-group">
                                    <input type="submit" value="Create User" className="btn btn-primary" />
                                </div>
                            </form>
                        </div>

                    </div>
                </div>

            </div>
        )
    }
}
