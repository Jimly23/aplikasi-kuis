import React from "react";
import { Link, useNavigate } from "react-router";
import Cookies from 'js-cookie'

const Navbar = () => {
  const navigate = useNavigate();
  const token = Cookies.get('authToken');

  const logout = () => {
    Cookies.remove('authToken');
    navigate('/login');
  }
  return (
    <div className="fixed left-0 right-0 top-0 bg-violet-60 z-10 px-8 border-b">
      <div className="max-w-[1300px] px-8 mx-auto flex justify-between items-center py-4">
        <div className="logo text-3xl font-bold relative">
          <span className="text-violet-600">KuisKu</span>
        </div>
        <div className="">
          {token !== undefined ?
              <button onClick={logout} className='px-4 py-1 border rounded bg-red-500 text-white text-sm font-medium'>Logout</button>
            : 
            <Link to={"/login"}>
              <button className='px-4 py-1 border rounded bg-violet-600 text-white text-sm font-medium'>Login</button>
            </Link>
          }
        </div>
      </div>
    </div>
  );
};

export default Navbar;
