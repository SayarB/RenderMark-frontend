import { ButtonBase } from "@mui/material";
export default function Button({
  children,
  bgColor = "#FFFFFF",
  hoverBgColor,
  style = {},
  onClick = () => console.log("Clicked " + children),
}) {
  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        padding: "10px 15px",
        margin: "0 10px",
        fontFamily: '"Overpass", sans-serif',
        fontSize: "2rem",
        border: "none",
        borderRadius: "5px",
        backgroundColor: bgColor,
        "&:hover": {
          backgroundColor: hoverBgColor,
        },
        ...style,
      }}
    >
      {children}
    </ButtonBase>
  );
}
