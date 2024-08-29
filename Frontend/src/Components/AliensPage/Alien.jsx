import axios from "axios";
import React from "react";
import toast from "react-hot-toast";

const Alien = ({ alien }) => {
  const handleclick = async () => {
    try {
      const tokenAdmin =
        localStorage.getItem("token_admin") ||
        document.cookie.includes("token_admin");

      const tokenUser =
        localStorage.getItem("token_user") ||
        document.cookie.includes("token_user");

      if (!tokenAdmin && !tokenUser) {
        return toast.error("Please Login First");
      }

      const present = tokenAdmin ? "admin" : "user";
      console.log(alien._id);

      const res = await axios.post(
        `http://localhost:8000/${present}/like`,
        { id: alien._id },
        {
          withCredentials: true,
        }
      );

      console.log(res.data);
      toast.success(res.data.message);
    } catch (error) {
      console.log(error.response.data);
      toast.error(error.response.data);
    }
  };

  
  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-xl">
        <figure>
          <img src={alien.img} alt="Shoes" className="h-44 w-36" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            <span className="text-accent">Name : </span>
            {alien.name}
          </h2>
          <p className="text-xs">
            <span className="text-accent">Species : </span>
            {alien.species}
          </p>
          <p className="text-xs">
            <span className="text-accent">Description : </span>
            {alien.Description}
          </p>
          <p className="text-xs">
            <span className="text-accent">Powers : </span>
            {alien.powers}
          </p>
          <p className="text-xs">
            <span className="text-accent">First Appearance : </span>
            {alien.firstApp}
          </p>
          {alien.likes && alien.likes.includes(alien._id) ? (
            <button className="btn btn-primary">Liked</button>
          ) : (
            <button className="btn btn-primary" onClick={handleclick}>
              Like
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Alien;
