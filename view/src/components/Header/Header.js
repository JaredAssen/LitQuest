import Navbar from '../Navbar/Navbar';
import SearchForm from '../SearchForm/SearchForm';
import './Header.css';

const Header = () => {
  return (
    <div className = 'holder'>
      <header className = 'header'>
        <Navbar />
        <div className = 'header-content flex flex-c text-white'>
          <SearchForm />
        </div>
      </header>
    </div>
  )
}

export default Header

