import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BaseCard from '../../components/UI/BaseCard/BaseCard';
import axios from '../../plugins/axios';

export default function LoginPage() {
  const { t } = useTranslation();
  const inputEmail = useRef();
  const inputPassword = useRef();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = inputEmail.current.value.toLowerCase();
    const enteredPassword = inputPassword.current.value;
    if (email.trim().length === 0) {
      alert(t("login-username-validation"));
      return false;
    }
    if (enteredPassword.trim().length === 0 || enteredPassword.length < 4) {
      alert(t("login-password-length"));
      return false;
    }
    const loginData = {
      email: email,
      password: enteredPassword,
    };
    try {
      const res = await axios.post("user/login", loginData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("currentUser", JSON.stringify(res.data.user));
      window.location.href = "/";
    } catch (err) {
      console.log(err);
      alert("Please check your username and password");
      return false;
    }
  };

  return (
    <BaseCard>
      <form onSubmit={handleSubmit}>
        <h2>{t("login-title")}</h2>
        <p>
          {t("login-dont-have-account")}{" "}
          <Link to="/signup">{t("login-signup")}</Link>
        </p>
        <div className="mb-3">
          <label htmlFor="email" className="label">
            {t("login-email")}
          </label>
          <input
            className="form-control input"
            type="text"
            placeholder="your-email@gmail.com"
            ref={inputEmail}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password">{t("login-password")}</label>
          <input
            className="form-control input"
            placeholder="password123"
            type="password"
            required
            ref={inputPassword}
          />
        </div>
        <div>
          <button
            className="btn btn-success"
            type="submit"
            to="/"
            onClick={handleSubmit}
          >
            {t("login-submit")}
          </button>
        </div>
      </form>
    </BaseCard>
  );
}