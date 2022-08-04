import styles from "../../styles/ImagePreview.module.css";
import LinkIcon from "@mui/icons-material/Link";
import { ButtonBase } from "@mui/material";

function ImagePreview({ key, src, onClick }) {
  return (
    <div key={key} className={styles["image-preview"]}>
      <img src={src} />
      <div className={styles.overlay}>
        <ButtonBase onClick={onClick} sx={{ borderRadius: "50%" }}>
          <LinkIcon
            sx={{
              fontSize: "4rem",
              color: "white",
              "&:hover": {
                fontSize: "4.3rem",
              },
            }}
          />
        </ButtonBase>
      </div>
    </div>
  );
}

export default ImagePreview;
