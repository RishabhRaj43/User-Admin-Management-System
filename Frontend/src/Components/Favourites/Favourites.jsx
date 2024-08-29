import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Alien from "../AliensPage/Alien";

const Favourites = () => {

  const [aliens, setAliens] = useState();

  useEffect(() => {
    const handleClick = async () => {
      try {
        const res = await axios.get("http://localhost:8000/admin/likealiens", {
          withCredentials: true,
        });
        setAliens(res.data.likesArr);
      } catch (error) {
        console.log(error.response.data);
        toast.error(error.response.data);
      }
    };
    handleClick();
  }, []);

  return (
    <div className="text-2xl flex gap-3" >
      {
        aliens && aliens.map((alien) => {
          return <Alien key={alien._id} alien={alien} />
        })
      }
    </div>
  );
};

export default Favourites;
