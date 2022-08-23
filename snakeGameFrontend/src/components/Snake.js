import React, { Component } from 'react'



export default class Snake extends Component {
  
  render() {
    return (
      <div>


          

        {this.props.snakepos.map((dot,i)=>{
          // return (<li>{dot[0]} {dot[1]} {i}</li>)

          return (
            <div className="snake-dot" key = {i} style={{top:`${dot[1]}%`,left:`${dot[0]}%`,backgroundColor:`${this.props.headcolor}`}}></div>
          )
        })}

      </div>
    )
  }
}

/*
<div className="snake-dot" style={{top:0,left:0}}></div>
<div className="snake-dot" style={{top:0,left:'2%'}}></div>
<div className="snake-dot" style={{top:0,left:'4%'}}></div>

*/
