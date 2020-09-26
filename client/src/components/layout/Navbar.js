import React from 'react';
import {Link} from 'react-router-dom';
const Navbar = () => {
    return (
      <nav className='navbar bg-dark'>
          <h1>
              <Link to='/'>
                  <i className='fas fa-code' > Navbar</i>
              </Link>
          </h1>
          <ul>
              <li>
                  <Link to='/'>Developers</Link>
              </li>
              <li>
                  <Link to='/signup'>Sign up</Link>
              </li>
              <li>
                  <Link to='/login'>Login</Link>
              </li>
          </ul>
      </nav>
    );
};

export default Navbar;