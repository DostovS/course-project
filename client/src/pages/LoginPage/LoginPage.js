import React from 'react';
import BaseCard from '../../components/UI/BaseCard/BaseCard';
import { Link } from 'react-router-dom';
export default function LoginPage() {
  return (
    <section className="form">
          <BaseCard>
          <form>
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
            />
            </div>
            <div className="mb-3">
              <label htmlFor="password">Your password</label>
              <input
                className="form-control input"
                placeholder="password123"
                type="password"
              />
            </div>
            <div>
              <button
                className="btn btn-success"
                type="submit"
                to="/">
                Submit
              </button>
            </div>
          </form>
        </BaseCard>
    </section>
    
  )
}
