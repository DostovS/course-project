import React from 'react'
import { Link } from 'react-router-dom'
import BaseCard from '../../components/UI/BaseCard/BaseCard'

export default function SignUp() {
  return (
    <section className='form'>
      <div className="container">
        <BaseCard>
          <form>
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
              />
            </div>
            <div className="formItem">
              <label htmlFor="lastName">Lastname</label>
              <input
                type="test"
                className="form-control input"
                placeholder="Your lastname"
              />
            </div>
            <div className="formItem">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control input"
                placeholder="@username"
              />
            </div>
            <div className="formItem">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control input"
              />
            </div>
            <div className="formItem">
              <label htmlFor="password">Password</label>
              <input
                className="form-control input"
                type="password"
                placeholder="password123"
              />
            </div>
            <div>
              <button className="btn btn-success">Submit</button>
            </div>
          </form>
        </BaseCard>
      </div>
    </section>
  )
}
