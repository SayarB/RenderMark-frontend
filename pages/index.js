import { useCallback, useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import styles from '../styles/Home.module.css'
import browserImage from '../assets/browser.svg'
import mobileImage from '../assets/mobile.svg'
import Image from 'next/image'
import Button from '../components/Button/Button'
import { useRouter } from 'next/router'

export default function HomePage () {
  const [user, setUser] = useState(false)
  const router = useRouter()
  const changeUser = useCallback(() => {
    setUser(!user)
  }, [user])

  if (user) {
    return (
      <div>
        <Navbar setUser={changeUser} selected='home' />
      </div>
    )
  }
  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <div className={styles['browser-image']}>
          <Image
            alt='Browser Window'
            src={browserImage}
            layout='fixed'
            width={700}
            height={600}
          />
        </div>
        <div className={styles['mobile-image']}>
          <Image
            alt='Browser Window'
            src={mobileImage}
            layout='fixed'
            width={300}
            height={600}
          />
        </div>
      </div>
      <div className={styles.navbar}>
        <div className={styles['logo-image']}>
          <Image alt='Logo' src='/logo.svg' width={200} height={80} />
        </div>
        <div className={styles.buttons}>
          <Button
            onClick={() => setUser(true)}
            bgColor='#8972E0'
            hoverBgColor='#9980E9'
          >
            Login
          </Button>
          <Button bgColor='#E4B7D5' hoverBgColor='#EEC5E1'>
            Sign Up
          </Button>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles['content-text']}>
          <h1>&quot;GOOD DESIGN IS GOOD BUSINESS&quot;</h1>
          <p>-- THOMAS WATSON JR., BUSINESSMAN, SECOND PRESIDENT OF IBM</p>
        </div>
        <Button
          onClick={() => {
            router.push('/template/1/edit')
          }}
          style={{
            background: `linear-gradient(
                120.89deg,
                rgba(200, 100, 251, 1) 5.96%,
                rgba(230, 30, 230, 1) 50.72%
            )`,
            boxShadow: `0px 1px 4px rgba(11, 55, 0, 0.27),
            inset 0px 4px 5px rgba(255, 255, 255, 0.16)`,

            borderRadius: '5px',
            border: 'none',
            fontSize: '2rem',
            padding: '10px 15px',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          Get Started
        </Button>
      </div>
    </div>
  )
}
