import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import axios from "../plugins/axios";
import User from "../components/user/User";
import Collection from "../components/Collection/Collection";
import Loader from "../components/UI/Loader";
import { useTranslation } from "react-i18next";

export default function UserPage() {
  const { t } = useTranslation();
  const [collections, setCollections] = useState([]);
  const [user, setUser] = useState({});

  let { username } = useParams();
  const navigate = useNavigate();

  async function getUser() {
    const res = await axios.get(`users`);
    const user = res.data.find((user) => {
      return user.username === username;
    });
    setUser(user);
  }

  useEffect(() => {
    async function fetchCollections() {
      const res = await axios.get(`collection/user/${user._id}`);
      setCollections(res.data);
    }
    getUser();
    fetchCollections();

    // eslint-disable-next-line
  }, [user]);

  return (
    <>
      <div>
        <Link to="" className="link-back" onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faLeftLong} /> {t("goback")}{" "}
        </Link>
        <h2 className="page-title">{t("userpage-title")}</h2>
        <User username={username} />
      </div>
      <h2 className="page-title">{t("collections")}</h2>
      {collections.length === 0 ? <Loader /> : null}
      {collections.map((col) => (
        <Collection
          collection={col}
          key={col._id}
          numOfItems={collections.length - 1}
        />
      ))}
    </>
  );
}