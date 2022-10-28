import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import BaseCard from "../components/UI/BaseCard/BaseCard";
import { useState } from "react";
import axios from "../plugins/axios";
import Loader from "../components/UI/Loader";
export default function CreateCollection() {
  const navigate = useNavigate();
  let { username } = useParams();
  const [dataUploading, setDataUploading] = useState(false);

  //Inputs
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDataUploading(true);
    await axios.post(`collection/create`, {
      username: username,
      title: title,
      description: description,
    });
    navigate(`/user/${username}`);
  };

  return (
    <div className="container">
      <Link to="" className="link-back" onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faLeftLong} /> Go Back
      </Link>
{dataUploading ? (
        <Loader />
      ) : (
        <BaseCard>
          <form>
            <h2>
              Create Collection for{" "}
              <Link to={`/user/${username}`}>@{username}</Link>
            </h2>
            <div className="form-item">
              <br />
              <label className="form-label" htmlFor="title">
                Title:
              </label>
              <input
                className="form-control"
                type="text"
                required
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div className="form-item">
              <br />
              <label className="form-label" htmlFor="description">
                Description:
              </label>
              <input
                className="form-control"
                type="text"
                required
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
            <br />
            <button className="btn btn-primary btn-submit" onClick={handleSubmit}>
              Create
            </button>
          </form>
        </BaseCard>
      )}
    </div>
  );
}