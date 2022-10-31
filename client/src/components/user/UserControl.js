import Dropdown from "react-bootstrap/Dropdown";
import axios from "../../plugins/axios";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faStar } 
  from "@fortawesome/free-solid-svg-icons";
  import { useNavigate } from "react-router-dom";


export default function UserControls(props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  function refresh() {
    props.onReload();
  }
  async function toggleStatus(status) {
    props.onStatusLoaderOn();
    await axios
      .put(`user/${props.user._id}/change-status`, { role: status })
      .then(() => { 
        refresh();
        props.onStatusLoaderOff();
        window.location.reload();
      });
    const user = await axios.get(
      `user/${localStorage.getItem("currentUser").username}`
    );
    localStorage.setItem("user", JSON.stringify(user.data));

  }
  async function deleteUser() {
    let confirmDelete = window.confirm(
      'Delete user "' + props.user.name + '"?'
    );
    if (confirmDelete) {
      axios.delete(`/user/${props.user._id}/delete`);
      setTimeout(() => {
        navigate('/signup')
      }, 1000)
    } else {
      return false;
    }
  }
  return (
    <Dropdown>
      <Dropdown.Toggle
        variant="success"
        id="dropdown-basic"
        className="dropdown__toggle mb-3 flex-end"
      >
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {currentUser.role === "admin" && props.user.role === "user" && (
          <Dropdown.Item
            onClick={() => {
              toggleStatus("admin");
            }}
          >
            {t("make-admin")} <FontAwesomeIcon icon={faStar} />
          </Dropdown.Item>
        )}
        {currentUser.role === "admin" && props.user.role === "admin" && (
          <Dropdown.Item
            onClick={() => {
              toggleStatus("user");
            }}
          >
            {t("remove-admin")}
            <FontAwesomeIcon icon={faStar} />
          </Dropdown.Item>
        )}

        <Dropdown.Item className="delete-control"
          onClick={deleteUser}>
          {t("delete-user")}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}