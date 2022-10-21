import React, { useRef } from 'react';
import BaseCard from '../../components/UI/BaseCard/BaseCard';
import { Link } from 'react-router-dom';
import axios from '../../plugins/axios';
export default function LoginPage() {
  const inputEmail = useRef();
  const inputPassword = useRef();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = inputEmail.current.value.toLowerCase();
    const enteredPassword = inputPassword.current.value;
    if (email.trim().length === 0) {
      alert("email noto'gri");
      return false;
    }
    if (enteredPassword.trim().length === 0 || enteredPassword.length < 4) {
      alert('Parol qisqa');
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
    <section className="form">
          <BaseCard>
          <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <p>
              Don't have an account? {" "} 
              <Link to="/signup">Sign up</Link>
            </p>
            <div className="mb-3">
            <label htmlFor="email" className="label">
              Email
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
              <label htmlFor="password">Your password</label>
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
                onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </form>
        </BaseCard>
    </section>
    
  )
}
