import React, { useEffect, useState } from "react";
import "./users.scss";
import useDebounce from "../../hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { GET } from "../../services/api";
import ContentHeader from "../ContentHeader/contentHeader";

const Users = () => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const searchParam = useDebounce(search, 800);
  const users = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  // const users = useAppSelector((state) => state.user.userList);

  useEffect(() => {
    console.log(search);
    console.log(date);
    dispatch(GET("userList", "/api/data")());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParam, date, dispatch]);

  return (
    <div className="users-page">
      <ContentHeader setDate={setDate} setSearch={setSearch} />

      <div className="users-list">
        <table>
          <thead>
            <tr>
              <th>Sl. No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Date of Birth</th>
              <th>Project</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item) => (
              <tr key={item}>
                <td>1</td>
                <td>Albyn Babu</td>
                <td>albynbabu97@gmail.com</td>
                <td>+91 9947869202</td>
                <td>16.05.1997</td>
                <td>Bozzuto</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
