import React from 'react'
import Image from 'next/image'

const Header = () => {
  return (
    <Image
      src="/hanging-baby.png"
      alt="Header picture"
      layout="responsive"
      width={300}
      height={5}
    />
  )
}

export default Header