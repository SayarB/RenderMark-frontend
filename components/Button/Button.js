import useMediaQuery from "../../hooks/useMediaQuery";
export default function Button({
  children,
  bgColor = "#FFFFFF",
  style = {},
  onClick,
}) {
  const isMobile = useMediaQuery("(max-width:756px)");

  return (
    <button
      onClick={onClick}
      style={{
        padding: isMobile ? "8px 10px" : "10px 15px",
        paddingTop: "10px",
        margin: "0 10px",
        fontFamily: '"Overpass", sans-serif',
        fontSize: "1.7rem",
        border: "none",
        borderRadius: "5px",
        backgroundColor: bgColor,
        cursor: "pointer",

        ...style,
      }}
    >
      {children}
    </button>
  );
}
