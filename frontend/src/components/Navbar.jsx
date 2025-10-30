import React from 'react'
import logo from "../../src/images/logo.png"
import { Link } from 'react-router'

function Navbar() {

  let links = [
    {
      name: "Home",
      path: "/"
    },
    {
      name: "Categories",
      path: "/categories"
    },
    {
      name: "Food",
      path: "/food"
    },
    {
      name: "About",
      path: "/about"
    }
  ]

  return (
    <div className='navbar flex flex-row justify-between items-center mx-auto main-page' >
      <div className="logo flex flex-row items-center gap-2">
        <img src={logo} className='w-[50px] aspect-square' alt="" />
        <div className='t-1 t-red text-2xl'>Fit Dish</div>
      </div>
      <div className='links flex gap-5'>
        {
          links.map(
            (item, index) => {
              return (
                <Link key={index+"Link"} to={item.path} className='t-1 t-gray text-2xl'>
                  {item.name}
                </Link>
              )
            }
          )
        }
      </div>
      <div className='sign-up'>
        <Link to="/signup" className='t-gray t-1 px-4 py-2 rounded-full text-2xl bg-white'>
          Sign Up
        </Link>
      </div>
    </div>
  )
}

export default Navbar