import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const GetUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8000/admin/getallUser", {
          withCredentials: true,
        });

        setUsers(res.data.users);
      } catch (error) {
        console.log(error.response.data);
        toast.error(error.response.data);
      }
    };
    fetchUsers();
  }, []);

  const handleBan = async (id) => {
    try {
      console.log(id);

      const res = await axios.put(
        `http://localhost:8000/admin/banUser/${id}`,
        { id },
        {
          withCredentials: true,
        }
      );

      console.log(res.data);
      toast.success(res.data);
    } catch (error) {
      console.log(error.response.data);
      toast.error(error.response.data);
    }
  };

  return (
    <div>
      {users &&
        users.map((user) => {
          return (
            <div key={user._id}>
              <h1 className="text-3xl">{"Username : " + user.username}</h1>
              <h1 className="text-3xl">{"Email : " + user.email}</h1>
              <button
                onClick={() => handleBan(user._id)}
                className="btn btn-accent"
              >
                {" "}
                Ban
              </button>
            </div>
          );
        })}
    </div>
  );
};

export default GetUsers;
