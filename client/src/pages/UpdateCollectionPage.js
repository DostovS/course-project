import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "../plugins/axios";
import Loader from "../components/UI/Loader";
import BaseCard from "../components/UI/BaseCard/BaseCard";

export default function UpdateCollectionPage() {
  const { t } = useTranslation();
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
        <FontAwesomeIcon icon={faLeftLong} /> {t("goback")}
      </Link>
      {dataUploading ? (
        <Loader />
      ) : (
        <BaseCard>
          <form>
            <h2>
              {t("update-col-for")}{" "}
              <Link to={`/user/${username}`}>@{username}</Link>
            </h2>
            <div className="form-item">
              <br />
              <label className="form-label" htmlFor="title">
                {t("update-col-title")}:
              </label>
              <input
                className="form-control input"
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
                {t("update-col-description")}:
              </label>
              <input
                className="form-control input"
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
              {t("update-col-update")}
            </button>
          </form>
        </BaseCard>
      )}
    </>
  );
}