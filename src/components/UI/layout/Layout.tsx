import type { FC } from 'react';

import { NavLink, Outlet } from 'react-router-dom';

const Layout: FC = () => {
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
      <main className="wrapper grow column">
        <hr />
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
