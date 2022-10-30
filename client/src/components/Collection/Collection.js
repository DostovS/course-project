import { useState } from "react";
import { Link } from "react-router-dom";
import BaseCard from "../UI/BaseCard/BaseCard";
import axios from "../../plugins/axios";
import CollectionControls from "./CollectionControls";
export default function Collection(props) {
  const [length, setLength] = useState(0);
  const getCollectionsLength = async () => {
    const res = await axios.get(`collection/length/${props.collection._id}`);
    setLength(res.data);
  };
  getCollectionsLength();


  return (
    <>
      <BaseCard>
        <div className="d-flex justify-content-between">
          <h3>{props.collection.title}</h3>
          <CollectionControls collection={props.collection} />
        </div>
        <Link to="/">@{props.collection.username}</Link>
        <br />
        <p>
          Description:{" "}
          {props.collection.description.trim === ""
            ? props.collection.description
            : "No description."}
        </p>
        <p>Number of Items: {length} items</p>
        <Link
          to={`/collection/${props.collection._id}`}
          className="btn btn-secondary mt-3"
        >
          Items List
        </Link>
      </BaseCard>
    </>
  );
}