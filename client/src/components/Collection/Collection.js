import { Link } from "react-router-dom";
import BaseCard from "./UI/BaseCard";

export default function Collection(props) {
  return (
    <>
      <BaseCard>
        <h3>props.title</h3>
        <Link to="/">props.username</Link>
        <p>Description: props.description</p>
        <p>Number of Items: 12 items</p>
        <div className="action">
          <Link to="/" className="btn btn-primary">
            Open Items List
          </Link>
          <button className="btn btn-danger">Delete Collection</button>
        </div>
      </BaseCard>
    </>
  );
}