import React, { Component } from 'react'
import api from 'services/api'
import socket from 'socket.io-client'

import Tweet from 'components/Tweet'

import twitterLogo from 'twitter.svg'
import './Timeline.css'

export default class Timeline extends Component {
  state = {
    tweets: [],
    newTweet: ''
  }

  async componentDidMount() {
    this.subscribeToEvents()
    const response = await api.get('tweets')
    this.setState({ tweets: response.data })
  }

  subscribeToEvents = () => {
    const io = socket('https://jl32rkz8xy.sse.codesandbox.io')

    io.on('new message', data => {
      const tweet = { author: data.username, content: data.message }
      this.setState({ tweets: [tweet, ...this.state.tweets] })
    })

    io.on('tweet', data => {
      this.setState({ tweets: [data, ...this.state.tweets] })
    })

    io.on('like', data => {
      const tweets = this.state.tweets.map(item =>
        item._id === data._id ? data : item
      )

      this.setState({ tweets: tweets })
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

  render() {
    return (
      <div className="timeline-wrapper">
        <img height={24} src={twitterLogo} alt="GoTwitter" />
        <form>
          <textarea
            value={this.state.newTweet}
            onChange={this.handleInputChange}
            onKeyDown={this.handleNewTweet}
            placeholder="O que está acontecendo"
          />
        </form>

        <ul className="tweet-list">
          {this.state.tweets.map((tweet, i) => (
            <Tweet key={i} tweet={tweet} />
          ))}
        </ul>
      </div>
    )
  }
}
