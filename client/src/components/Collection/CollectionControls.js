import Dropdown from "react-bootstrap/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import axios from '../../plugins/axios';

export default function CollectionControls(props) {
  const { t } = useTranslation();

  async function deleteCollection() {
    let confirmDelete = window.confirm(
      `Delete collection "${props.collection.title}"?`
    );
    if (confirmDelete) {
      axios.delete(`delete/collection/${props.collection._id}`);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
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
          href={`/collection/create-item/${props.collection.username}/${props.collection._id}`}
        >
          {t("add-to-collection")}
        </Dropdown.Item>
        <Dropdown.Item
          href={`/collection/${props.collection.username}/${props.collection._id}/update`}
        >
          {t("edit-collection")}
        </Dropdown.Item>
        <Dropdown.Item className="delete-control" onClick={deleteCollection}>
          {t("delete-collection")}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}