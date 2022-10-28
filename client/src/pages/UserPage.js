import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import axios from "../plugins/axios";
import User from "../components/user/User";
import Collection from "../components/Collection/Collection";
import Loader from "../components/UI/Loader";

export default function UserPage() {
  const [collections, setCollections] = useState([]);
  const [user, setUser] = useState({});
  let refreshRate = 0;
  const navigate = useNavigate();
  let { username } = useParams();

  setInterval(function () {
    refreshRate++;
  }, 5000);

  useEffect(() => {
    async function getUser() {
      const res = await axios.get(`user/?username=${username}`);
      console.log(res.data);
      setUser(res.data[0]);
    }
    async function fetchCollections() {
      const res = await axios.get(`collection/?username=${username}`);
      const tempArr = [];
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].username === username) {
          tempArr.unshift(res.data[i]);
        } else {
          continue;
        }
      }
      setCollections(tempArr);
    }
    getUser();
    fetchCollections();
    // eslint-disable-next-line
  }, [refreshRate]);

  return (
    <>
      <div>
        <Link to="" className="link-back" onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faLeftLong} /> Go Back
        </Link>
        <h2 className="page-title">User Profile</h2>
        <User user={user} />
      </div>
      <h2 className="page-title">Collections</h2>
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