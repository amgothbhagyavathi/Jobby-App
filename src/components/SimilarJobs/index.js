import {MdLocationOn} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'

const SimilarJobs = props => {
  const {similarDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarDetails
  console.log(similarDetails)

  return (
    <li>
      <img src={companyLogoUrl} alt="similar job company logo" />
      <div>
        <h1>{title}</h1>
      </div>
      <div>
        <AiFillStar />
        <p>{rating}</p>
      </div>
      <div>
        <h1>Description</h1>
        <p>{jobDescription}</p>
      </div>
      <div>
        <MdLocationOn />
        <p>{location}</p>
      </div>
      <div>
        <p>{employmentType}</p>
      </div>
    </li>
  )
}
export default SimilarJobs
