import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Alien from "./Alien";

const Aliens = () => {
  const [aliens, setAliens] = useState();

  useEffect(() => {
    const fetchAliens = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/aliens/list`);
        // console.log(res.data);

        setAliens(res.data.aliens);
      } catch (error) {
        toast.error(error.response.data);
        console.log(error.response.data);
      }
    };

    fetchAliens();
  }, []);
  return (
    <div className="text-2xl flex gap-3">
      {aliens &&
        aliens.map((alien, index) => {
          return (
            <>
              <div className="mt-5" key={alien.id}>
                <Alien key={alien._id} alien={alien} />
              </div>
            </>
          );
        })}
    </div>
  );
};

export default Aliens;
