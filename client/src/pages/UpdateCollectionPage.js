import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "../plugins/axios";
import BaseCard from "../components/UI/BaseCard/BaseCard";
import Loader from "../components/UI/Loader";

export default function UpdateCollectionPage() {
  const navigate = useNavigate();
  let { collectionID, username } = useParams();
  const [dataUploading, setDataUploading] = useState(false);

  //Inputs
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const getCollections = async () => {
      const res = await axios.get(`collection/${collectionID}`);
      setTitle(res.data.title);
      setDescription(res.data.description);
    };
    getCollections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setDataUploading(true);
    await axios.put(`update/collection/${collectionID}`, {
      title: title,
      description: description,
    });
    navigate(`/user/${username}/${collectionID}`);
  };

  return (
    <>
      <Link to="" className="link-back" onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faLeftLong} /> Go Back
      </Link>
      {dataUploading ? (
        <Loader />
      ) : (
        <BaseCard>
          <form>
            <h2>
              Update Collection for{" "}
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
                value={title}
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
                value={description}
                required
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
            <br />
            <button
              className="btn btn-primary btn-submit"
              onClick={handleUpdate}
            >
              Update
            </button>
          </form>
        </BaseCard>
      )}
    </>
  );
}