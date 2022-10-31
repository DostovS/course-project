import React, {useRef} from 'react'
import { Link } from 'react-router-dom'
import axios from "../../plugins/axios";
import { useTranslation } from 'react-i18next';
import BaseCard from '../../components/UI/BaseCard/BaseCard';
let userExists = false;

export default function SignUp() {
  const {t} = useTranslation();
  const inputUsername = useRef();
  const inputPassword = useRef();
  const inputName = useRef();
  const inputLastName = useRef();
  const inputEmail = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    const enteredEmail = inputEmail.current.value.toLowerCase();
    const enteredUsername = inputUsername.current.value.toLowerCase();
    const enteredPassword = inputPassword.current.value;
    const enteredName = inputName.current.value;
    const enteredLastName = inputLastName.current.value;

    if (enteredUsername.trim().length === 0) {
      alert(t("shortemail"));
      return false;
    }
    if (enteredPassword.trim().length === 0 || enteredPassword.length < 4) {
      alert(t("shortpass"));
      return false;
    }
    console.log(enteredUsername, enteredPassword, enteredName, enteredLastName);

    // check if user exists
    const res = await axios.get("users");
    const candidate = res.data.find(
      (name) => name.username === enteredUsername
    );
    if (candidate) {
      userExists = true;
      alert(t("oldaccount"));
      window.location.href("/login");
    }
    const userData = {
      username: enteredUsername,
      name: enteredName,
      lastName: enteredLastName,
      password: enteredPassword,
      email: enteredEmail,
    };

    try {
      await axios.post("user/registration", userData);
      alert(t("created"));
      const loginData = {
        email: enteredEmail,
        password: enteredPassword,
      };
      const loginRes = await axios.post("user/login", loginData);
      localStorage.setItem("token", loginRes.data.token);
      localStorage.setItem("currentUser", JSON.stringify(loginRes.data.user));
      window.location.href = "/";
    } catch (err) {
      console.log(err);
      alert(t("notcreated"));
      return false;
    }
  }

  return (
        <BaseCard>
          <form onSubmit={handleSubmit}>
            <h2>{t("signup")}</h2>
            <p>
              {t("have-account")} {" "}
              <Link to='/login'>
                {t("log-in")}
              </Link>
            </p>
            <div className="formItem">
              <label htmlFor="name">
                {t("name")}
              </label>
              <input
                type="test"
                className="form-control input"
                placeholder={t("your-name")}
                ref={inputName}
                required
              />
            </div>
            <div className="formItem">
              <label htmlFor="lastName">
                {t("lastname")}
              </label>
              <input
                type="test"
                className="form-control input"
                placeholder={t("your-email")}
                ref={inputLastName}
                required
              />
            </div>
            <div className="formItem">
              <label htmlFor="username">
                {t("username")}
              </label>
              <input
                type="text"
                className="form-control input"
                placeholder="@username"
                ref={inputUsername}
                required
              />
            </div>
            <div className="formItem">
              <label htmlFor="email">
                {t("email")}
              </label>
              <input
                type="email"
                className="form-control input"
                placeholder={t("your-email")}
                ref={inputEmail}
                required
              />
            </div>
            <div className="formItem">
              <label htmlFor="password">
                {t("password")}
              </label>
              <input
                className="form-control input"
                type="password"
                placeholder={t("your-password")}
                ref={inputPassword}
                required
              />
            </div>
            <div>
              <button className="btn btn-success">
                {t("signup-submit")}
              </button>
            </div>
          </form>
          {userExists ? (
            <div>
              <p>{t("signup-redirect")}</p>
            </div>
          ) : null}
        </BaseCard>
  )
}
