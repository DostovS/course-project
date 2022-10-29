import Dropdown from "react-bootstrap/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

export default function CollectionControls(props) {
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
        <Dropdown.Item href="#/action-2">Edit Item</Dropdown.Item>
        <Dropdown.Item href="#/action-3" className="delete-control">Delete Item</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}