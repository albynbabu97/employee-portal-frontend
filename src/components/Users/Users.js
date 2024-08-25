import React, { useEffect, useState } from "react";
import "./users.scss";
import useDebounce from "../../hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { GET, POST } from "../../services/api";
import ContentHeader from "../ContentHeader/contentHeader";
import NoResults from "../NoResults/NoResults";

const Users = () => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const searchParam = useDebounce(search, 800);
  const users = useAppSelector((state) => state.user.userList);

  useEffect(() => {
    dispatch(GET("userList", "/users")());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      POST("userListSearch", "/users/search", {
        name: search,
        date: date,
      })()
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParam, date, dispatch]);

  return (
    <div className="users-page">
      <ContentHeader
        setDate={setDate}
        setSearch={setSearch}
        heading="Users"
        tagline="Here is the users list"
      />

      <div className="users-list">
        {users.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Sl. No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Date of Birth</th>
                {/* <th>Project</th> */}
              </tr>
            </thead>
            <tbody>
              {users.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.first_name + " " + item.last_name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone_number}</td>
                  <td>
                    {new Date(item.dob).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                    })}
                  </td>
                  {/* <td>{item.dob}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <NoResults content="No Users found!" />
        )}
      </div>
    </div>
  );
};

export default Users;
