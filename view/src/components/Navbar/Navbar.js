import {useState} from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css';
import logo from '../../images/logo.jpg';
import {HiOutlineMenuAlt3} from 'react-icons/hi';
import Login from '../Login/Login';

const Navbar = () => {
  const [toggleMenu,setToggleMenu] = useState(false);
  const handleNavBar = () => setToggleMenu(!toggleMenu);

  const logout = () => {
    console.log("logout");
    window.loggedin = false;
    window.location.reload();
  }

  const checkLogin = () => {
    if(!window.loggedin){
      return <Link to = 'login' className='nav-link text-uppercase text-white fs-22 fw-6 ls-1'>Login</Link> 
    }
    else{
      return <Link to = '/' className='nav-link text-uppercase text-white fs-22 fw-6 ls-1' onClick={logout}>Logout</Link>
    }
  }

  return (
    <nav className = 'navbar' id = 'navbar'>
      <div className = 'container navbar-content flex'>
        <div className = 'brand-and-toggler flex flex-sb'>
          <Link to = '/' className = 'navbar-brand flex'>
            <img src ={logo} alt='site logo'/>
            <span className = 'text-uppercase fw-7 fs-24 ls-1'>
              LitQuest
            </span>
          </Link>
          <button type = 'button' className='navbar-toggler-btn' 
          onClick={handleNavBar}>
            <HiOutlineMenuAlt3 size={35} style={{
              color: `${toggleMenu ? '#fff' : '#010101'}`
            }} />
          </button>
        </div>

        <div className={toggleMenu ? 'navbar-collapse show-navbar-collapse':
        'navbar-collapse'}>
          <ul className = 'navbar-nav'>
            <li className = 'nav-item'>
              { checkLogin()
              
              /* <Link to = 'login' className='nav-link text-uppercase text-white fs-22 fw-6 ls-1'>
                Login
              </Link> */}
            </li>
            <li className = 'nav-item'>
              <Link to = 'register' className='nav-link text-uppercase text-white fs-22 fw-6 ls-1'>
                Register
              </Link>
            </li>
            <li className = 'nav-item'>
              <Link to = 'profile' className='nav-link text-uppercase text-white fs-22 fw-6 ls-1'>
                Profile
              </Link>
            </li>
          </ul>
          
        </div> 
      </div>

    </nav>
  )
}

export default Navbar
