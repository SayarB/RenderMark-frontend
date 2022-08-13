import styles from "../../styles/Navbar.module.css";
import Button from "../Button/Button";
import Link from "next/link";
import Image from "next/image";
// import useMediaQuery from "@mui/material/useMediaQuery";
import { useRouter } from "next/router";

export default function Navbar({ selected }) {
  const router = useRouter();
  // const isMobile = useMediaQuery("(max-width:756px)");
  return (
    <div
      className={styles.navbar}
      style={{
        backgroundColor: selected === "/templates" ? "white" : "transparent",
      }}
    >
      <div className={styles["nav-left"]}>
        <Link href="/">
          <div className={styles["logo-image"]} style={{ cursor: "pointer" }}>
            <Image
              layout="fixed"
              alt="Logo"
              src={
                selected !== "/templates" && selected !== "/template/[id]/edit"
                  ? "/logo.svg"
                  : "/logo_black.svg"
              }
              width={200}
              height={80}
            />
          </div>
        </Link>
      </div>

      <div className={styles["nav-right"]}>
        {selected !== "/templates" && (
          <Button
            onClick={() => router.push("/templates")}
            style={{
              background: "linear-gradient(90deg, #12C2E9 0%, #C471ED 150%)",
              color: "white",
            }}
          >
            Choose A Template
          </Button>
        )}
      </div>
    </div>
  );
}
