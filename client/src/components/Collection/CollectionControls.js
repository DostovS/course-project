import Dropdown from "react-bootstrap/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import axios from '../../plugins/axios';
export default function CollectionControls(props) {
  async function deleteCollection() {
    let confirmDelete = window.confirm(`Delete collection "${props.collection.title}"?`);
    if (confirmDelete) {
        axios.delete(`delete/collection/${props.collection._id}`);
        window.location.reload();
    }else{
        return false;
    }
  }
  return (
    <Dropdown>
      <Dropdown.Toggle
        variant="success"
        id="dropdown-basic"
        className="dropdown__toggle"
      >
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item
          href={`/user/${props.collection.username}/${props.collection._id}/create`}
        >
          Add Item
        </Dropdown.Item>
        <Dropdown.Item
          href={`/collection/${props.collection.username}/${props.collection._id}/update`}
        >
          Edit Item
        </Dropdown.Item>
        <Dropdown.Item
          className="delete-control"
          onClick={deleteCollection}
        >
          Delete Item
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}