import type { FC } from 'react';

import { NavLink } from 'react-router-dom';

const Header: FC = () => {
  return (
    <>
      <header className="wrapper center header">
        <nav>
          <NavLink to="/home" className="link">
            Home
          </NavLink>
          <NavLink to="/about" className="link">
            About
          </NavLink>
        </nav>
      </header>
      <hr />
    </>
  );
};

export default Header;
