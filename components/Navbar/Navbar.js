import MenuIcon from '@mui/icons-material/Menu'
import styles from '../../styles/Navbar.module.css'
import Button from '../Button/Button'
import Link from 'next/link'
import Image from 'next/image'
import avatar from '../../assets/avatar.svg'
import useMediaQuery from '@mui/material/useMediaQuery'

export default function Navbar ({ selected, setUser }) {
  const isMobile = useMediaQuery('(max-width:756px)')
  return (
    <div className={styles.navbar}>
      <div className={styles['nav-left']}>
        {isMobile && (
          <Button
            style={{
              borderRadius: '50%',
              padding: '10px',
              margin: '0 20px 0 0',
              '& .MuiSvgIcon-root': {
                fontSize: '3rem'
              }
            }}
          >
            <MenuIcon />
          </Button>
        )}
        <Link href='/upload'>
          <div className={styles['logo-image']} style={{ cursor: 'pointer' }}>
            <Image
              layout='fixed'
              alt='Logo'
              src='/logo_black.svg'
              width={200}
              height={80}
            />
          </div>
        </Link>
      </div>
      <div className={styles.navlist}>
        {!isMobile && (
          <>
            <Link href='/'>
              <p
                className={
                  styles.navlink +
                  (selected === 'home' ? ' ' + styles.selected : '')
                }
              >
                Home
              </p>
            </Link>
            <Link href='/templates'>
              <p
                className={
                  styles.navlink +
                  (selected === 'templates' ? ' ' + styles.selected : '')
                }
              >
                Templates
              </p>
            </Link>
            <Link href='/features'>
              <p
                className={
                  styles.navlink +
                  (selected === 'features' ? ' ' + styles.selected : '')
                }
              >
                Features
              </p>
            </Link>
          </>
        )}
      </div>
      <div className={styles['nav-right']}>
        {!isMobile && (
          <Button
            style={{
              background: 'linear-gradient(90deg, #12C2E9 0%, #C471ED 150%)',
              color: 'white'
            }}
          >
            Create A Template
          </Button>
        )}
        <Button onClick={() => setUser()}>
          <Image layout='fixed' src={avatar} width={40} height={40} />
        </Button>
      </div>
    </div>
  )
}
