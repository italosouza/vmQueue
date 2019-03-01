import React, { Component } from 'react'

import './Login.css'

export default class Login extends Component {
  state = {
    username: ''
  }

  handleInputChange = e => {
    this.setState({ username: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { username } = this.state

    if (!username) return
    localStorage.setItem('@GoTwitter:username', username)
    this.props.history.push('/queue')
  }

  render() {
    return (
      <div className="login-wrapper">
        <form onSubmit={this.handleSubmit}>
          <input
            value={this.state.username}
            onChange={this.handleInputChange}
            placeholder="Seu nome é?"
          />
          <button type="submit">Entrar</button>
        </form>
      </div>
    )
  }
}
