import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="text-center">
      <h2>Oops! 404</h2>
      <p>There is no page with this address ☹️</p>
      <Link to="" onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faLeftLong} />
        Go Back
      </Link>
    </div>
  );
}