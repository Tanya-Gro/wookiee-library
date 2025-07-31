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
      <hr />
      <main className="wrapper grow column">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
