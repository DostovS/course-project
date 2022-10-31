import { useState, useEffect } from "react";
import BaseCard from "../UI/BaseCard/BaseCard";
import axios from "../../plugins/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faUser } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import UserControls from "./UserControl";
import {Link} from 'react-router-dom';

export default function User(props) {
  const { t } = useTranslation();
  const [user, setUser] = useState({});
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [statusLoading, setStatusLoading] = useState(false);

  async function getUser() {
    const res = await axios.get(`users`);
    const user = res.data.find((user) => {
      return user.username === props.username;
    });

    setUser(user);
  }

  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);

  function refreshUser() {
    getUser();
  }
  function statusLoaderTrue() {
    setStatusLoading(true);
  }
  function statusLoaderFalse() {
    setStatusLoading(false);
  }

  return (
      <BaseCard>
        <div className="user-controls">
          <h2 className="page-title">{t("user-profile")}</h2>
          {user.username === currentUser.username ||
            currentUser.role === "admin" ? (
            <UserControls
              user={user}
              onReload={refreshUser}
              onStatusLoaderOn={statusLoaderTrue}
              onStatusLoaderOff={statusLoaderFalse}
            />
          ) : null}
        </div>
        <hr />
        <table>
          <tbody>
            <tr>
              <td>{t("user-name")}: </td>
              <td>{user.name}</td>
            </tr>
            <tr>
              <td>{t("user-lastname")}: </td>
              <td>{user.lastName}</td>
            </tr>
            <tr>
              <td>{t("user-username")}: </td>
              <td>{user.username}</td>
            </tr>
            <tr>
              <td>{t("user-email")}: </td>
              <td>{user.email}</td>
            </tr>
            <tr>
              <td>{t("user-status")}: </td>
              <td>
                {statusLoading && (
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">{t("user-loading")}</span>
                  </div>
                )}
                {!statusLoading && user.role === "admin" && (
                  <span>
                    {user.role}
                    <FontAwesomeIcon
                      icon={faStar}
                      color="#0000ff"
                      className="span-margin"
                    />
                  </span>
                )}
                {!statusLoading && user.role === "user" && (
                  <span>
                    {user.role}
                    <FontAwesomeIcon icon={faUser} className="span-margin" />
                  </span> 
                )}
              </td>
            </tr>
          </tbody>
        </table>
        {user.username === currentUser.username ||
            currentUser.role === "admin" ? (
              <Link
                to={`/collection/create/${user.username}`}
                className="btn btn-success"
                style={{width: '100%'}}
              >
                {t("user-newcol")}
              </Link>
          ) : null}
      </BaseCard>
  );
}