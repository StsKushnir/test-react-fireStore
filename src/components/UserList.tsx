/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

interface UserListProps {
  users: any[];
  currentUser: any;
  handleDeleteUser: (userId: string) => void;
}

const UserList: React.FC<UserListProps> = ({
  users,
  currentUser,
  handleDeleteUser,
}) => (
  <ul className="list-disc w-[50vh]">
    {users.map((user) => (
      <li key={user.id} className="list-none flex flex-row justify-between ">
        <div className="flex flex-row justify-between w-[300px]">
          <p>{user.email}</p>
          <p>{user.role}</p>
        </div>
        {user.role === "viewer" && currentUser?.role === "admin" && (
          <button
            onClick={() => handleDeleteUser(user.id)}
            className="ml-4 bg-red-500 text-white px-2 py-1"
          >
            Delete
          </button>
        )}
      </li>
    ))}
  </ul>
);

export default UserList;
