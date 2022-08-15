import Link from 'next/link'
import React from 'react'

function Footer ({ color }) {
  return (
    <div className='footer'>
      <p style={{ color }}>
        Made with ❤ by <Link href='https://dscvit.com'>GDSC VIT</Link>
      </p>
    </div>
  )
}

export default Footer
