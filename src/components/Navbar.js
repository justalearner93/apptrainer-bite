import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
        <ul className='nav-links'>
            <Link to ="/customer">
                <li>Customer list</li>
            </Link>
            <Link to ="/training">
                <li>Training list</li>
            </Link>
            <Link to ="/calendar">
                <li>Training calendar</li>
            </Link>
        </ul>

    </nav>
  )
}

export default Navbar;