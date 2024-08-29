import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import {
  faHeart,
  faUser,
  faUserAstronaut,
  faUserSecret,
} from "@fortawesome/free-solid-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse";

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-[15%] shadow-lg z-50 flex flex-col items-center justify-between">
      <div className="mt-9">
        <ul className="flex flex-col items-center text-xl space-y-4">
          <li>
            <Link to="/" className="hover:text-red-600">
              <FontAwesomeIcon icon={faHouse} className="mr-2" />
              Home
            </Link>
          </li>
          <li>
            <Link to="/aliens " className="hover:text-red-600">
              <FontAwesomeIcon icon={faUserAstronaut} className="mr-2" />
              Aliens
            </Link>
          </li>
          <li>
            <Link to="/favourites" className="hover:text-red-600">
              <FontAwesomeIcon icon={faHeart} className="mr-2" />
              Favourites
            </Link>
          </li>
          <li>
            <Link to="/putaliens" className="hover:text-red-600">
              <FontAwesomeIcon icon={faHeart} className="mr-2" />
              Put Aliens
            </Link>
          </li>
          <li>
            <Link to="/getallusers" className="hover:text-red-600">
              <FontAwesomeIcon icon={faHeart} className="mr-2" />
              Get All Users
            </Link>
          </li>

        </ul>
      </div>

      <div className="mb-4">
        <ul className="flex flex-col items-center text-xl space-y-4">
          <li>
            <Link to={"/usersignup"} className="hover:text-red-600 ">
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              User
            </Link>
          </li>
          <li>
            <Link to="/adminsignup" className="hover:text-red-600">
              <FontAwesomeIcon icon={faUserSecret} className="mr-2" />
              Admin
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
