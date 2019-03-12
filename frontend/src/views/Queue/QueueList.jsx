import React, { Component } from 'react'
import api from 'services/api'
import socket from 'socket.io-client'

export default class Queue extends Component {
  state = {
    vm: [],
    queue: []
  }

  async componentDidMount() {
    this.subscribeToEvents()
    const vms = await api.get('/vm').catch(response => {
      console.warn(response)
    })

    const queues = await api.get('/queue').catch(response => {
      console.warn(response)
    })
    this.setState({ vm: vms.data.docs, queue: queues.data.docs })
  }

  async handleQueueLeave() {
    await api.post('/queue/leave').catch(response => {
      console.warn(response)
    })
  }

  async handleQueueJoin() {
    await api.post('/queue/join').catch(response => {
      console.warn(response)
    })
  }

  subscribeToEvents = () => {
    const io = socket('http://localhost:3000')

    io.on('vm leave', data => {
      const vm = this.state.vm.map(item =>
        item._id === data._id ? data : item
      )
      this.setState({ vm })
    })

    io.on('vm join', data => {
      console.log('data do vm join', data)
      console.log('state', this.state.vm)

      const vm = this.state.vm.map(item =>
        item._id === data._id ? data : item
      )
      this.setState({ vm })
    })

    io.on('queue leave', data => {
      const queue = this.state.queue.filter(item => {
        return item._id !== data._id
      })
      this.setState({ queue })
    })

    io.on('queue join', data => {
      this.setState({ queue: [...this.state.queue, data] })
    })
  }

  handleInputChange = e => {
    this.setState({ newTweet: e.target.value })
  }

  handleNewTweet = async e => {
    if (e.keyCode !== 13) return

    const content = this.state.newTweet
    const author = localStorage.getItem('@GoTwitter:username')

    await api.post('tweets', { content, author })
    this.setState({ newTweet: '' })
  }

  async handleVmJoin(vm) {
    await api.post(`/vm/join/${vm._id}`).catch(response => {
      console.warn(response)
    })
  }

  render() {
    return (
      <div className="content">
        <strong>Maquinas Virtuais</strong>
        <div className="vm">
          {this.state.vm.map((vm, i) => (
            <div
              key={i}
              className={vm.available ? '' : 'ocupado'}
              onClick={() => this.handleVmJoin(vm)}
            >
              <img src="vm.png" alt="imagem vm" />
              <strong>{vm.name}</strong>
              <span className="ip">{vm.ip}</span>
            </div>
          ))}
        </div>

        <strong>Fila de espera</strong>
        <button onClick={this.handleQueueJoin}>Entrar na fila</button>
        <button onClick={this.handleQueueLeave}>Sair da fila</button>

        <ul className="providers">
          {this.state.queue.map((queue, i) => (
            <li className="provider" key={i}>
              <div>
                <img
                  src={`http://localhost:3000/files/${queue.user.avatar}`}
                  alt="Avatar"
                />
                <strong>
                  {queue.user.name}
                  <br />
                  {queue.createdAt}
                </strong>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
