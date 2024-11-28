import React, { useState } from "react";

interface CreateUserFormProps {
  handleCreateUser: (email: string, password: string) => void;
}

const CreateUserForm: React.FC<CreateUserFormProps> = ({
  handleCreateUser,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="mt-4">
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border px-2 py-1"
      />
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border px-2 py-1 mt-2"
      />
      <button
        onClick={() => handleCreateUser(email, password)}
        className="bg-blue-500 text-white px-4 py-2 ml-2 mt-2"
      >
        Create User
      </button>
    </div>
  );
};

export default CreateUserForm;
