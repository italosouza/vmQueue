import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Login from 'pages/Login/Login'
// import Timeline from 'pages/TimeTimeline'
import Queue from 'pages/Queue/Queue'
import Register from 'pages/Register/Register'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/new" component={Register} />
          <Route path="/queue" component={Queue} />

          {/* <Route path="/timeline" component={Timeline} /> */}
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
