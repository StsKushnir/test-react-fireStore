/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { fetchUsers } from "../services/userService";

const useFetchUsers = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const usersList = await fetchUsers();
      setUsers(usersList);
      setLoading(false);
    };
    fetchData();
  }, []);

  return { users, setUsers, loading };
};

export default useFetchUsers;
