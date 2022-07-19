import MenuIcon from '@mui/icons-material/Menu'
import styles from '../../styles/Navbar.module.css'
export default function Navbar () {
  return (
    <div className={styles.navbar}>
      <button>
        <MenuIcon />
      </button>
    </div>
  )
}
