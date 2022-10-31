import { useState } from "react";
import { 
  Link, 
  useParams, 
  useNavigate 
} from "react-router-dom";
import axios from "../plugins/axios";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import BaseCard from "../components/UI/BaseCard/BaseCard";
import Loader from "../components/UI/Loader";

export default function CreateCollection() {
  const { t } = useTranslation();
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
              {t("create-col-for")}{" "}
              <Link to={`/user/${username}`}>@{username}</Link>
            </h2>
            <div className="form-item">
              <br />
              <label className="form-label" htmlFor="title">
                {t("col-title")}:
              </label>
              <input
                className="form-control input"
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
                {t("col-description")}:
              </label>
              <input
                className="form-control input"
                type="text"
                required
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
            <br />
            <button
              className="btn btn-primary btn-submit"
              onClick={handleSubmit}
            >
              {t("col-create")}
            </button>
          </form>
        </BaseCard>
      )}
    </>
  );
}