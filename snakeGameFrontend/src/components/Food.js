import React, { Component } from 'react'

export default class Food extends Component {
  render() {

    return (
      <div>
        <div className='snake-food' style={{left:`${this.props.posfood[0]}%`,top:`${this.props.posfood[1]}%`}}></div>
      </div>
    )
  }
}
