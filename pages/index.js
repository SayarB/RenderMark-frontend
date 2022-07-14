import { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import styles from "../styles/Home.module.css";
import browserImage from "../assets/browser.svg";
import mobileImage from "../assets/mobile.svg";
import Image from "next/image";
import Button from "../components/Button/Button";
import { ButtonBase } from "@mui/material";
export default function HomePage() {
  const [user, setUser] = useState(false);
  if (user) {
    return (
      <div>
        <Navbar />
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <div className={styles.browser_image}>
          <Image
            alt="Browser Window"
            src={browserImage}
            layout="fixed"
            width={700}
            height={600}
          />
        </div>
        <div className={styles.mobile_image}>
          <Image
            alt="Browser Window"
            src={mobileImage}
            layout="fixed"
            width={300}
            height={600}
          />
        </div>
      </div>
      <div className={styles.navbar}>
        <div className={styles.logo_image}>
          <Image alt="Logo" src="/logo.svg" width={200} height={80} />
        </div>
        <div className={styles.buttons}>
          <Button bgColor="#8972E0" hoverBgColor="#9980E9">
            Login
          </Button>
          <Button bgColor="#E4B7D5" hoverBgColor={"#EEC5E1"}>
            Sign Up
          </Button>
        </div>
      </div>
      <div className={styles.content}>
        <h1>&quot;Good Design is Good Business&quot;</h1>
        <p>-- Thomas Watson Jr., businessman, second president of IBM</p>
        <Button
          style={{
            background: `linear-gradient(
                120.89deg,
                rgba(124, 100, 231, 0.658) 5.96%,
                rgba(230, 30, 230, 0.575) 68.72%
            )`,
            boxShadow: `0px 1px 4px rgba(11, 55, 0, 0.27),
            inset 0px 4px 5px rgba(255, 255, 255, 0.16)`,
            backdropFilter: `blur(15px)`,
            borderRadius: "10px",
            border: "none",
            fontSize: "2rem",
            padding: "10px 15px",
            color: "white",
            cursor: "pointer",
          }}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}
