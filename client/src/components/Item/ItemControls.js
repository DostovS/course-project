import React from 'react'
import axios from "../../plugins/axios";
import Dropdown from "react-bootstrap/Dropdown";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

export default function ItemControls(props) {
  const { t } = useTranslation();
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
          {t("edit-item")}
        </Dropdown.Item>
        <Dropdown.Item onClick={deleteItem} className="delete-control">
          {t("delete-item")}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}