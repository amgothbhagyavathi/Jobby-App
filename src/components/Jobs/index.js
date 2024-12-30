import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BiLinkExternal} from 'react-icons/bi'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SimilarJobs from '../SimilarJobs'

const apiStatusConstants = {
  initial: 'INITIAL',
  progress: 'PROGESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobsData: [],
    similarJobsData: [],
  }

  componentDidMount() {
    this.getJobData()
  }

  getJobData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({apiStatus: apiStatusConstants.progress})

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const option = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(url, option)

    if (response.ok === true) {
      const data = await response.json()
      const updatedData = [data.job_details].map(each => ({
        companyLogoUrl: each.company_logo_url,
        companyWebsiteUrl: each.company_website_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        lifeAtCompany: {
          description: each.life_at_company.description,
          imageUrl: each.life_at_company.image_url,
        },
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,

        skills: each.skills.map(eachSkill => ({
          imageUrl: eachSkill.image_url,
          name: eachSkill.name,
        })),
        title: each.title,
      }))

      const updatedSimilarData = data.similar_jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        jobsData: updatedData,
        similarJobsData: updatedSimilarData,
      })
    } else {
      this.setstate({apiStatus: apiStatusConstants.failure})
    }
  }

  successView = () => {
    const {jobsData, similarJobsData} = this.state
    if (jobsData.length >= 1) {
      const {
        companyLogoUrl,
        companyWebsiteUrl,
        employmentType,
        jobDescription,
        lifeAtCompany,
        location,
        packagePerAnnum,
        rating,
        skills,
        title,
      } = jobsData[0]
      return (
        <>
          <div>
            <div>
              <img src={companyLogoUrl} alt="job details company logo" />
              <div>
                <h1>{title}</h1>
                <div>
                  <AiFillStar />
                  <p>{rating}</p>
                </div>
              </div>
            </div>
            <div>
              <MdLocationOn />
              <p>{location}</p>
            </div>
            <div>
              <p>{employmentType}</p>
            </div>
            <div>
              <p>{packagePerAnnum}</p>
            </div>
            <hr />
            <h1>Description</h1>
            <a href={companyWebsiteUrl}>
              Visit <BiLinkExternal />
            </a>
            <p>{jobDescription}</p>
            <h1>Skills</h1>
            <ul>
              {skills.map(each => (
                <li key={each.name}>
                  <img src={each.imageUrl} alt={each.name} />
                  <p>{each.name} </p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1>Life at Company</h1>
            <p>{lifeAtCompany.description}</p>
          </div>
          <img src={lifeAtCompany.imageUrl} alt="Life at company" />
          <h1>Similar Jobs</h1>
          <ul>
            {similarJobsData.map(each => (
              <SimilarJobs
                key={each.id}
                similarDetails={each}
                employmentType={employmentType}
              />
            ))}
          </ul>
        </>
      )
    }
    return null
  }

  retryAgain = () => {
    this.getJobData()
  }

  failureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="heading">Oops! Something Went Wrong</h1>
      <p>we cannot seem to find the page you are looking for</p>
      <button type="button" className="button" onClick={this.retryAgain}>
        retry
      </button>
    </div>
  )

  progressView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfile = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.successView()
      case apiStatusConstants.failure:
        return this.failureView()
      case apiStatusConstants.progress:
        return this.progressView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div>{this.renderProfile()}</div>
      </>
    )
  }
}
export default Jobs
