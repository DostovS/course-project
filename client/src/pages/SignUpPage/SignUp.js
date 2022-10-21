import React, {useRef} from 'react'
import { Link } from 'react-router-dom'
import BaseCard from '../../components/UI/BaseCard/BaseCard';
import axios from "../../plugins/axios";
let userExists = false;
export default function SignUp() {
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
      alert("Email");
      return false;
    }
    if (enteredPassword.trim().length === 0 || enteredPassword.length < 4) {
      alert("Password");
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
      alert("Oldin bo'gan");
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
      alert("sign up created");
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
      alert("signup-failed");
      return false;
    }
  }
  return (
    <section className='form'>
      <div className="container">
        <BaseCard>
          <form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <p>
              Already have an account? {" "}
              <Link to='/login'>Login</Link>
            </p>
            <div className="formItem">
              <label htmlFor="name">Name</label>
              <input
                type="test"
                className="form-control input"
                placeholder="Your name"
                ref={inputName}
                required
              />
            </div>
            <div className="formItem">
              <label htmlFor="lastName">Lastname</label>
              <input
                type="test"
                className="form-control input"
                placeholder="Your lastname"
                ref={inputLastName}
                required
              />
            </div>
            <div className="formItem">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control input"
                placeholder="@username"
                ref={inputUsername}
                required
              />
            </div>
            <div className="formItem">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control input"
                ref={inputEmail}
                required
              />
            </div>
            <div className="formItem">
              <label htmlFor="password">Password</label>
              <input
                className="form-control input"
                type="password"
                placeholder="password123"
                ref={inputPassword}
                required
              />
            </div>
            <div>
              <button className="btn btn-success">Submit</button>
            </div>
          </form>
          {userExists ? (
            <div>
            <p>signup-redirect</p>
            </div>
          ) : null}
        </BaseCard>
      </div>
    </section>
  )
}
