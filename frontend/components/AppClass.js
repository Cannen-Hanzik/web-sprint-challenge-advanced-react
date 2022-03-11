import React from 'react'
import axios from 'axios'

const intState = {
  count: 0,
  vert: 2,
  hoz: 2,
  moveError: '',
  email: '',
}

const URL = 'http://localhost:9000/api/result';

export default class AppClass extends React.Component {
  state = intState;
  vertController = (key, value) => {
    key === 'up' && value > 1 ?  
    this.setState({
      ...this.state,
      vert: value - 1,
      count: this.state.count + 1,
      moveError: '',
    }) 
      : key === 'up' && value === 1 ? 
      this.setState({
      ...this.state,
      moveError: "You can't go up",
    })
    : key === 'down' && value < 3 ?
      this.setState({
        ...this.state,
        vert: value + 1,
        count: this.state.count + 1,
        moveError: '',
      })
      : this.setState({
        ...this.state,
        moveError: "You can't go down",
      })
  }
  hozController = (key, value) => {
    key === 'left' && value > 1 ?
    this.setState({
      ...this.state,
      hoz: value - 1,
      count: this.state.count + 1,
      moveError: '',
    }) 
      : key === 'left' && value === 1 ?
      this.setState({
        ...this.state,
        moveError: "You can't go left",
      })
      : key === 'right' && value < 3 ?
      this.setState({
        ...this.state,
        hoz: value + 1,
        count: this.state.count + 1,
        moveError: '',
      })
        : this.setState({
          ...this.state,
          moveError: "You can't go right",
        })
  }

  resetter = () => {
    this.setState({
      ...this.state,
      moveError: '',
      email: '',
      hoz: 2,
      vert: 2,
      count: 0,
    })
  }
  onChange = (evt) => {
    this.setState({email: evt.target.value})
  }

  post = evt => {
    evt.preventDefault();
    const newSub = {
      x: this.state.hoz,
      y: this.state.vert,
      steps: this.state.count,
      email: this.state.email,
    }
    axios.post(URL, newSub)
      .then(res=> {
        this.setState({moveError: res.data.message})
      })
      .catch(err => 
        this.setState({moveError: err.response.data.message}))
    this.setState({
      ...this.state,
      email: '',
    })
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({this.state.hoz}, {this.state.vert})</h3>
          <h3 id="steps">You moved {this.state.count} {this.state.count === 1 ? 'time' : 'times'}</h3>
        </div>
        <div id="grid">
          <div className={this.state.hoz === 1 && this.state.vert === 1 ? 'square active': 'square'}>
            { this.state.hoz === 1 & this.state.vert === 1 ? 'B': '' }
          </div>          
          <div className={this.state.hoz === 2 && this.state.vert === 1 ? 'square active': 'square'}>
            { this.state.hoz === 2 & this.state.vert === 1 ? 'B': '' }
          </div>          
          <div className={this.state.hoz === 3 && this.state.vert === 1 ? 'square active': 'square'}>
            { this.state.hoz === 3 & this.state.vert === 1 ? 'B': '' }
          </div>          
          <div className={this.state.hoz === 1 && this.state.vert === 2 ? 'square active': 'square'}>
            { this.state.hoz === 1 & this.state.vert === 2 ? 'B': '' }
          </div>          
          <div className={this.state.hoz === 2 && this.state.vert === 2 ? 'square active': 'square'}>
            { this.state.hoz === 2 & this.state.vert === 2 ? 'B': '' }
          </div>          
          <div className={this.state.hoz === 3 && this.state.vert === 2 ? 'square active': 'square'}>
            { this.state.hoz === 3 & this.state.vert === 2 ? 'B': '' }
          </div>          
          <div className={this.state.hoz === 1 && this.state.vert === 3 ? 'square active': 'square'}>
            { this.state.hoz === 1 & this.state.vert === 3 ? 'B': '' }
          </div>          
          <div className={this.state.hoz === 2 && this.state.vert === 3 ? 'square active': 'square'}>
            { this.state.hoz === 2 & this.state.vert === 3 ? 'B': '' }
          </div>          
          <div className={this.state.hoz === 3 && this.state.vert === 3 ? 'square active': 'square'}>
            { this.state.hoz === 3 & this.state.vert === 3 ? 'B': '' }
          </div>          
        </div>
        <div className="info">
          <h3 id="message">{this.state.moveError}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={() => this.hozController('left', this.state.hoz)}>LEFT</button>
          <button id="up" onClick={() => this.vertController('up', this.state.vert)}>UP</button>
          <button id="right" onClick={() => this.hozController('right', this.state.hoz)}>RIGHT</button>
          <button id="down" onClick={() => this.vertController('down', this.state.vert)}>DOWN</button>
          <button id="reset" onClick={() => this.resetter()}>reset</button>
        </div>
        <form>
          <input 
          id="email" 
          type="email" 
          placeholder="type email"
          onChange={this.onChange}
          value={this.state.email}
          ></input>
          <input id="submit" onClick={this.post} type="submit"></input>
        </form>
      </div>
    )
  }
}
