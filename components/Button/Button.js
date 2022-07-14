import { ButtonBase } from '@mui/material'
export default function Button ({
  children,
  bgColor = '#FFFFFF',
  hoverBgColor,
  style = {},
  onClick = () => console.log('Clicked ' + children)
}) {
  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        padding: '10px 15px',
        paddingTop: '12px',
        margin: '0 10px',
        fontFamily: '"Overpass", sans-serif',
        fontSize: '1.7rem',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: bgColor,
        '&:hover': {
          backgroundColor: hoverBgColor
        },
        ...style
      }}
    >
      {children}
    </ButtonBase>
  )
}