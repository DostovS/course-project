import { useState, useEffect } from "react";
import BaseCard from "../UI/BaseCard/BaseCard";
import axios from "../../plugins/axios";

export default function User(props) {
  const [user, setUser] = useState({});

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

  //   console.log(user);

  return (
      <BaseCard>
        <table>
          <tbody>
            <tr>
              <td>Name: </td>
              <td>{user.name}</td>
            </tr>
            <tr>
              <td>Lastname: </td>
              <td>{user.lastName}</td>
            </tr>
            <tr>
              <td>Username: </td>
              <td>{user.username}</td>
            </tr>
            <tr>
              <td>Email: </td>
              <td>{user.email}</td>
            </tr>
            <tr>
              <td>User Status: </td>
              <td>
                {user.role}
              </td>
            </tr>
          </tbody>
        </table>
      </BaseCard>
  );
}