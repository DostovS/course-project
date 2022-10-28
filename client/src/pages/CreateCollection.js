import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import BaseCard from "../components/UI/BaseCard/BaseCard";

export default function CreateCollection() {
  const navigate = useNavigate();
  let { username } = useParams();
  return (
    <div className="container">
      <Link to="" className="link-back" onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faLeftLong} /> Go Back
      </Link>
      <BaseCard>
        <form>
          <h2>
            Create Collection for <Link to={`/user/${username}`}>@{username}</Link>
          </h2>
          <div className="form-item">
            <br />
            <label className="form-label" htmlFor="title">
              Title:
            </label>
            <input className="form-control" type="text" required />
          </div>
          <div className="form-item">
            <br />
            <label className="form-label" htmlFor="description">
              Description:
            </label>
            <input className="form-control" type="text" required />
          </div>
        </form>
      </BaseCard>
    </div>
  );
}