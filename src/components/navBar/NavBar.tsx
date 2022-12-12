import styles from './NavBar.module.scss'

const NavBar = () => {
  return <nav className={styles.nav_bar}>
    <div className={styles.icon}>Y</div>
    <div className={styles.title}>Hacker News</div>
    <div className={styles.nav_menu}>
      <ul>
        <li>new</li>
        <li>past</li>
        <li>comments</li>
        <li>ask</li>
        <li>show</li>
        <li>jobs</li>
        <li>submit</li>
      </ul>
      <p>login</p>
    </div>
  </nav>
};

export default NavBar;
