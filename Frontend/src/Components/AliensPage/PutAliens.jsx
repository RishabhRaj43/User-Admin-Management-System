import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

const PutAliens = () => {
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    img: "",
    planet: "",
    powers: "",
    Description: "",
    firstApp: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/aliens/add",
        formData,
        {
          withCredentials: true,
        }
      );
      toast.success(res.data);

      setFormData({
        name: "",
        species: "",
        img: "",
        planet: "",
        powers: "",
        Description: "",
        firstApp: "",
      });
    } catch (error) {
      console.log(error.response.data);
      toast.error(error.response.data);
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <h1 className="w-full text-3xl text-center mb-4">Admin Signup</h1>

      <form
        action=""
        className="w-full flex flex-col items-center justify-center gap-4"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-2 gap-4">
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              name="name"
              className="grow"
              value={formData.name}
              placeholder="Name"
              onChange={handleChange}
            />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              name="species"
              className="grow"
              value={formData.species}
              placeholder="Species"
              onChange={handleChange}
            />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              value={formData.img}
              className="grow"
              placeholder="Image URL"
              onChange={handleChange}
              name="img"
            />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              value={formData.planet}
              name="planet"
              className="grow"
              placeholder="Planet"
              onChange={handleChange}
            />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              value={formData.powers}
              name="powers"
              className="grow"
              placeholder="Powers"
              onChange={handleChange}
            />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              value={formData.Description}
              name="Description"
              className="grow"
              placeholder="Description"
              onChange={handleChange}
            />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              value={formData.firstApp}
              name="firstApp"
              className="grow"
              placeholder="First Apperance"
              onChange={handleChange}
            />
          </label>
        </div>
        <button className="btn btn-primary">Add Alien</button>
      </form>
    </div>
  );
};

export default PutAliens;
