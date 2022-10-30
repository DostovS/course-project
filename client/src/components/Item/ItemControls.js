import Dropdown from "react-bootstrap/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import axios from "../../plugins/axios";

export default function ItemControls(props) {
  async function deleteItem() {
    let confirmDelete = window.confirm(
      'Delete item "' + props.item.title + '"?'
    );
    if (confirmDelete) {
      console.log(props.item);
      axios.delete(`item/delete/${props.item._id}`);
      window.location.reload();
    } else {
      return false;
    }
  }
  console.log(props.item);

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
        <Dropdown.Item href={`/item/edit/${props.item._id}`}>
            Edit
          </Dropdown.Item>
          <Dropdown.Item onClick={deleteItem}>Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}