import { useContext } from 'react';
import { ThemeContext } from '../theme/ThemeProvider';
import styles from './Header.module.css'; 

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className={`${styles.headerContainer} ${theme === 'dark' ? styles.dark : ''}`}>
      <div className={styles.logo}>Task Manager</div>
      <nav className={styles.nav}>
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
      <button className={styles.themeToggle} onClick={toggleTheme}>
        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
      </button>
    </header>
  );
}

export default Header;
