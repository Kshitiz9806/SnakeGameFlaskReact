import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Loginscreen from './components/Loginscreen';
import axios from 'axios';



import React, { Component } from 'react'
import Snakeplay from './components/Snakeplay';

const url = 'http://127.0.0.1:5000';
export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {date:new Date(),isloggedin:false,token:""};
  }

  checklogin=()=>{
    axios.post('http://127.0.0.1:5000/api/score/mxscore',{
        'token':localStorage.getItem('token'),
      }
      // ,
      // {
      //   withCredentials:true,//uncomment for storing in cookies
      // }
      ).then((response) => {

        this.setState({
          isloggedin: true,
        });

      }).catch((error) => {
        console.log(error);
      });
  }

  setToken = (response) => {
    localStorage.setItem('token',response.data.token);
  }

  removeToken = () => {
    localStorage.removeItem('token');
    console.log('hataya');
  }

  makeloggedin = (response) => {
    this.setToken(response);
    this.setState({
      isloggedin: true,
      token: response.data.token,
    });
  }

  makelogout = () => {
    try{
      this.removeToken();
    }
    catch{
      console.log('no token present');
    }
    axios.post('http://127.0.0.1:5000/api/deauth',
    null
    // ,{
    //   withCredentials:true,  //for sending cookies
    // }
    ).then((response) => {
      console.log("response me aaya");
      console.log(response);
    }).catch((error) => {
      console.log("error me aaya");
      console.log(error)
    });

    this.setState({
      isloggedin: false,
      token: ''
    });
  }

  componentDidMount(){
    this.checklogin();
  }

  render() {

    let screenToDisplay;

    if(!this.state.isloggedin){
      screenToDisplay = <Loginscreen makeloggedin = {this.makeloggedin}/>;
    }
    else{
      screenToDisplay = <Snakeplay makelogout = {this.makelogout}/>;
    }

    return (
      <div className="App">
        {screenToDisplay}
      </div>
    )
  }
}

/*


  constructor(props){
    super(props);
    this.state = {date:new Date()};
  }

  componentDidMount(){
    this.timerID = setInterval(() => {
      this.setState({date:new Date()});
    }, 1000);
  }
  componentWillUnmount(){
    clearInterval(this.timerID);
  }


  <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

*/