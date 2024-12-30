import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    errorOccurred: false,
  }

  onChangeUserName = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChanePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onSuccessData = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 1})
    const {history} = this.props
    history.replace('/')
  }

  onFailure = err => {
    this.setState({errorMsg: err, errorOccurred: true})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccessData(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, errorMsg, errorOccurred} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <>
        <div className="login-container">
          <form onSubmit={this.onSubmitForm}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="website-logo"
            />
            <div className="username-container">
              <label htmlFor="username">USERNAME</label>
              <br />
              <input
                id="username"
                className="input"
                type="text"
                placeholder="username"
                value={username}
                onChange={this.onChangeUserName}
              />
            </div>
            <div className="password-container">
              <label htmlFor="password">PASSWORD</label>
              <br />
              <input
                id="password"
                className="input"
                type="password"
                placeholder="password"
                value={password}
                onChange={this.onChanePassword}
              />
            </div>
            <button type="submit" className="button">
              Login
            </button>
            {errorOccurred && <p>*{errorMsg}</p>}
          </form>
        </div>
      </>
    )
  }
}

export default Login
