import React, { Component } from 'react'
import api from 'services/api'

import 'styles/main.css'

export default class Login extends Component {
  state = {
    dados: {}
  }

  handleInputChange = event => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    const dados = { ...this.state.dados, [name]: value }
    this.setState({ dados: dados })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { dados } = this.state

    api.post('/login', dados).then(user => {
      console.log(dados)
      if (!user.name) return
      localStorage.setItem('@GoTwitter:username', user.name)
      this.props.history.push('/queue')
    })
  }

  render() {
    return (
      <div className="login-wrapper">
        <form onSubmit={this.handleSubmit}>
          <input
            value={this.state.dados.email}
            onChange={this.handleInputChange}
            name="email"
            placeholder="Email"
            required
            // type="email"
          />
          <input
            value={this.state.dados.pasword}
            onChange={this.handleInputChange}
            name="password"
            placeholder="Senha"
            required
            type="password"
          />
          <button type="submit">Entrar</button>
        </form>
      </div>
    )
  }
}
