import React, { Component } from 'react'
import './Snakeplay.css'
import Snake from './Snake';
import Food from './Food';
import axios from 'axios';



/*

for x axis left and 0
for y axis top and 1
right handed coordinate system y 
coordinate will be in opposite direction
w.r.t left handed system

direction 0 = up (x,y) = (x,y-1)
direction 1 = down (x,y) = (x,y+1)
direction 2 = right (x,y) = (x+1,y)
direction 3 = left (x,y) = (x-1,y)
*/
const stepsize = 2;
const getrandomcoordinates = () =>{
  let mn = 1;
  let mx = 100-stepsize;
  let x = Math.floor((Math.random()*(mx-mn+1)+mn)/2)*2;
  let y = Math.floor((Math.random()*(mx-mn+1)+mn)/2)*2;
  return [x,y];
}

let initialstate = {
  food:getrandomcoordinates(),
  snakehead:[[stepsize,0]],
  snakebody:[[0,0]],
  speed:200,
  direction:2,
  score:0,
  ispaused:false,
  maxscoreuser:"",
  maxscore:0,
}


const prevmessage = <div>
  <h1>Your previous score was</h1>
</div>

export default class Snakeplay extends Component {

    constructor(props){
        super(props);
        this.state = initialstate;
    }

    updatesnakehead=(cstate)=>{
      if(this.state.direction == 0){
        this.setState({
          snakehead: [[cstate[0][0],((cstate[0][1]-stepsize)%100+100)%100]]
        });
      }
      else if(this.state.direction == 1){
        //console.log("idhar");
        this.setState({
          snakehead: [[cstate[0][0],((cstate[0][1]+stepsize)%100+100)%100]]
        });
      }
      else if(this.state.direction == 2){
        this.setState({
          snakehead: [[((cstate[0][0]+stepsize)%100+100)%100,cstate[0][1]]]
        });
      }
      else if(this.state.direction == 3){
        this.setState({
          snakehead: [[((cstate[0][0]-stepsize)%100+100)%100,cstate[0][1]]]
        });
      }
    }

    checkfood=()=>{
      //console.log(this.state.snakehead[0],this.state.food);
      if((this.state.snakehead[0][0] == this.state.food[0]) &&(this.state.snakehead[0][1] == this.state.food[1])){
        this.setState({
          score: this.state.score+1
        })
        return true;
      }
      return false;
    }

    updatefood=(iseating)=>{
      this.setState({
        food:iseating?getrandomcoordinates():this.state.food
      })
    }

    updatesnakebody=(iseating)=>{
      //is iseating then increase the length
      //else same length  
      let newbody = this.state.snakehead;
      newbody = newbody.concat(this.state.snakebody);
      //console.log(newbody);
      if(iseating){
        this.setState({
          snakebody:newbody
        })
      }
      else{
      newbody.pop();
        this.setState({
          snakebody:newbody
        })
      }
    }

    checkkey = (e) => {
      e = e || window.event;
      if (e.keyCode == '38') {
        // up arrow
        if(this.state.direction != 1){
          this.setState({direction:0});
        }
      }
      else if (e.keyCode == '40') {
        // down arrow
        if(this.state.direction != 0){
          this.setState({direction:1});
        }
      }
      else if (e.keyCode == '37') {
        // left arrow
        if(this.state.direction != 2){
          this.setState({direction:3});
        }
      }
      else if (e.keyCode == '39') {
        // right arrow
        if(this.state.direction != 3){
          this.setState({direction:2});
        }
      }
    }

    getmaxscore = () => {
      axios.post('http://127.0.0.1:5000/api/score/mxscore',{
        'token':localStorage.getItem('token'),
      }
      // ,
      // {
      //   withCredentials:true,//uncomment for storing in cookies
      // }
      ).then((response) => {

        this.setState({
          maxscoreuser: response.data.username,
          maxscore: response.data.maxscore,
        });

      }).catch((error) => {
        this.props.makelogout(error);
      });
    }

    sendmaxscore = (score) => {
      axios.post('http://127.0.0.1:5000/api/setscore/ss',{
        'token':localStorage.getItem('token'),
        'score':score,
      }).then((response) => {

        this.setState({
          maxscoreuser: response.data.username,
          maxscore: response.data.maxscore,
        });

      }).catch((error) => {
        this.props.makelogout(error);
      });
    }



    ongameover=()=>{
      alert("game over");
      this.sendmaxscore(this.state.score);
      while(this.state.snakebody.length!=1){
        this.state.snakebody.pop();
      }
      this.setState(initialstate);
      //send your maxscore

      this.getmaxscore();
    }

    checkover=()=>{
      let val = false;
      for(let i = 0;i<this.state.snakebody.length;i++){
        if((this.state.snakebody[i][0] == this.state.snakehead[0][0]) && (this.state.snakebody[i][1] == this.state.snakehead[0][1])){
          val = true;
        }
      }
      if(val){
        //console.log("bam mil gya");
        this.ongameover();
        //this.componentWillUnmount();
        //console.log(this.state);
        
      }
    }

    runsnake=()=>{
      this.checkover();

      let iseating = this.checkfood();
      this.updatesnakebody(iseating);
      this.updatesnakehead(this.state.snakehead);
      this.updatefood(iseating);
    }


    componentDidMount(){
      this.timerID = setInterval(() => {
        if(!this.state.ispaused){
          this.runsnake();
        }
        else{

        }
      }, this.state.speed);
      document.onkeydown = this.checkkey;

    }

    componentWillUnmount(){
      clearInterval(this.timerID);
      this.getmaxscore();
    }

    onbuttonclick = () => {
      //console.log(this.state.snakebody);
      if(this.state.ispaused){
        this.setState({
          ispaused:false
        });
      }
      else{
        this.setState({
          ispaused:true
        });
      }
    }


    

    
    
  render() {

    
    return (
      <div>


        <div>
          <h1>user with max score {this.state.maxscoreuser}</h1>
          <h1>max score {this.state.maxscore}</h1>
          <h1>your current score {this.state.score}</h1>
          <div className="game-area">
              <Snake snakepos={this.state.snakehead} headcolor={"blue"}></Snake>
              <Snake snakepos={this.state.snakebody} headcolor={"black"}></Snake>
              <Food posfood={this.state.food}></Food>
          </div>
        </div>
        <button type="button" className="btn btn-success" onClick={this.onbuttonclick}>{this.state.ispaused?"Start":"Pause"}</button>
        <button type="button" className="btn btn-danger" onClick={this.props.makelogout}>logout</button>


      </div>
    )
  }
}
