import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import Memes from '../Memes/Memes'
import Meme from '../Meme/Meme'
import MemeEdit from '../MemeEdit/MemeEdit'
import MemeCreate from '../MemeCreate/MemeCreate'
import Nav from '../shared/Nav'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  msgAlert = ({ heading, message, variant }) => {
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route exact path='/' render={() => (
            <Nav msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/memes' render={({ match }) => (
            <Memes match={match} user={user} msgAlert={this.msgAlert} />
          )} />
          <AuthenticatedRoute user={user} exact path='/memes/:id' render={({ match }) => (
            <Meme match={match} user={user} msgAlert={this.msgAlert} />
          )} />
          <AuthenticatedRoute user={user} exact path='/memes/:id/edit' render={({ match }) => (
            <MemeEdit match={match} user={user} msgAlert={this.msgAlert} />
          )} />
          <AuthenticatedRoute user={user} exact path='/meme-create' render={() => (
            <MemeCreate msgAlert={this.msgAlert} user={user} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
