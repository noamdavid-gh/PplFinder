import { useState, useEffect } from "react";
import axios from "axios";

export const usePeopleFetch = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchUsers() {
    setIsLoading(true);
    const response = await axios.get(`https://randomuser.me/api/?results=25&page=1`);
    setIsLoading(false);
    const newList = users.concat(response.data.results);
    setUsers(newList);
    localStorage.setItem("users", JSON.stringify(newList));
  }

  return { users, setUsers, isLoading, fetchUsers };
};
