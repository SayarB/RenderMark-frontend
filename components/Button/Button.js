import { ButtonBase, useMediaQuery } from '@mui/material'
export default function Button ({
  children,
  bgColor = '#FFFFFF',
  hoverBgColor,
  style = {},
  onClick = () => console.log('Clicked ' + children)
}) {
  const isMobile = useMediaQuery('(max-width:756px)')

  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        padding: isMobile ? '8px 10px' : '10px 15px',
        paddingTop: '10px',
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
