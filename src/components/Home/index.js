import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const Home = props => {
  console.log(props)
  const onClickFindJobs = () => {
    const {history} = props
    history.push('/jobs')
  }
  return (
    <>
      <Header />
      <div className="home-conatiner-image">
        <h1 className="heading">Find The Job That Fits Your Life</h1>
        <p className="para">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs">
          <button type="button" className="button" onClick={onClickFindJobs}>
            Find Jobs
          </button>
        </Link>
      </div>
    </>
  )
}

export default Home
