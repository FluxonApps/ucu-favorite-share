import logo from '../assets/BEHONEST02.png'; // Adjust the path as necessary
import './Header.css';

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Logo" className="logo" />
      <button id="myButton" href="http://localhost:5174/profile" className='button'>
        profile
      </button>
      {/* <img src={profileIcon} alt="Profile" className="profile-icon" /> */}
    </header>
  );
}

export default Header;
