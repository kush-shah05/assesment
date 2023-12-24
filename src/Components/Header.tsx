// Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {

  return (
    <div className="header">
      {/* ... (other header content) */}
      <div className="logo-container">
       <Link to={"/"}><img className="logo" src={"https://assets-global.website-files.com/60a807564289c14d374c12f3/60a807564289c18b354c136c_full-logoAsset%2018.svg"} alt="app-logo" /></Link> 
      </div>
      <div className="nav-items">
        <ul>
          <li>
            <Link to="/houses" style={{ textDecoration: 'none', color: 'inherit' }}>
              🏠 Houses
            </Link>
          </li>
          <li>
            <Link to="/aboutus" style={{ textDecoration: 'none', color: 'inherit' }}>
            ℹ️ About Us
            </Link>
          </li> 
          
        </ul>
      </div>
    </div>
  );
};

export default Header;
