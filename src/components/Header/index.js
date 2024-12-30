import {withRouter, Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="nav-container">
      <ul>
        <li>
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
              alt="website logo"
              className="website-logo"
            />
          </Link>
        </li>
        <li>
          <Link to="/">
            <h1 className="home">Home</h1>
            <AiFillHome />
          </Link>
          <Link to="/jobs">
            <h1 className="jobs">Jobs</h1>
            <BsBriefcaseFill />
          </Link>
        </li>
        <li>
          <FiLogOut />
          <button type="button" onClick={onClickLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}
export default withRouter(Header)
