import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Login from 'pages/Login'
import Timeline from 'pages/Timeline'
import Queue from 'pages/Queue'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/queue" component={Queue} />
          <Route path="/timeline" component={Timeline} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
