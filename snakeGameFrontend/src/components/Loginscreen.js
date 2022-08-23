import React, { Component } from 'react'
import axios from 'axios';




export default class Loginscreen extends Component {

  //const {label = "Count"} = this.props;

  constructor(props){
    super(props);
    this.state={
      username:'',
      password:'',
      em:'',
      issignin:true,
    }
  }

  handleLogin = (response) =>{
    this.props.makeloggedin(response);
  }

  handleErrorMessage = (error) => {
    this.setState({
      em:error,
    });
  }

  handleSubmit = () => {
    axios.post('http://127.0.0.1:5000/api/login/auth',
    {
      username:this.state.username,
      password:this.state.password
    }//,
    // {
    //   withCredentials:true,//for storing and sending cookies
    // }
    ).then((response) => {
      this.handleLogin(response);
      console.log(response);
      //console.log("response me aaya");
    }).catch((error) => {
      this.handleErrorMessage(error.response.data.message);
      //console.log("error me aaya");
    });
  }

  handleSignup = () => {
    axios.post('http://127.0.0.1:5000/api/signup/sup',
    {
      username:this.state.username,
      password:this.state.password
    }//,
    // {
    //   withCredentials:true,//for storing and sending cookies
    // }
    ).then((response) => {
      this.handleLogin(response);
      console.log(response);
      this.props.makeloggedin(response);
      //console.log("response me aaya");
    }).catch((error) => {
      this.handleErrorMessage(error.response.data.message);
      //console.log("error me aaya");
    });
  }

  handleUsername = (evt) => {
    //console.log(evt.target.value);
    this.setState({
      username : evt.target.value,
    });
  };

  handlePassword = (evt) => {
    //console.log(evt.target.value);
    this.setState({
      password : evt.target.value,
    });
  };


  render() {
    return (
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: "20%" }}>
            <div className="card" style={{ width: '50%' }}>

              <div className='card-body'>
                <form>
                  <div className="form-outline mb-4">
                    <input type="username" id="form2Example1" className="form-control" onChange={this.handleUsername} />
                    <label className="form-label" htmlFor="form2Example1">Username</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="password" id="form2Example2" className="form-control" onChange={this.handlePassword}/>
                    <label className="form-label" htmlFor="form2Example2">Password</label>
                  </div>


                  <button type="button" className="btn btn-primary btn-block mb-4" onClick={this.handleSubmit}>Sign in</button>

                  <div className="text-center">
                    <p>{this.state.em}</p>
                  </div>
                  <button type="button" className="btn btn-primary btn-block mb-4" onClick={this.handleSignup}>Sign up</button>
                </form>
              </div>
            </div>
          </div>
    )
  }
}
