import {Link} from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'

const JobCardItem = props => {
  const {jobCardDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobCardDetails
  return (
    <>
      <Link to={`/jobs/${id}`}>
        <li>
          <div>
            <img src={companyLogoUrl} alt="company logo" />
            <div>
              <h1>{title}</h1>
              <div>
                <AiFillStar />
                <p>{rating}</p>
              </div>
            </div>
            <div>
              <div>
                <MdLocationOn />
                <p>{location}</p>
              </div>
              <div>
                <p>{employmentType}</p>
              </div>
            </div>
            <div>
              <h1>{packagePerAnnum}</h1>
            </div>
            <hr />
            <h1>Description</h1>
            <p>{jobDescription}</p>
          </div>
        </li>
      </Link>
    </>
  )
}
export default JobCardItem
