import React from "react";
import { Link } from "react-router-dom";
const UserItem = ({ user: { avatar_url, login, html_url } }) => {
  return (
    <div className="card text-center">
      <img
        className="round-img "
        src={avatar_url}
        alt="avatar image"
        style={{ width: "60px" }}
      />
      <h3>{login}</h3>
      <div>
        <Link to={`/user/${login}`} className="btn btn-dark btn-sm my-1">
          More
        </Link>
      </div>
    </div>
  );
};

export default UserItem;
