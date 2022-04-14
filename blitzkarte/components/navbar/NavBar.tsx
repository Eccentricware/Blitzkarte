import { FC } from 'react';

interface NavBarProps {

}

const NavBar: FC<NavBarProps> = () => {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">Blitzkarte</div>
    </nav>
  )
}

export default NavBar;