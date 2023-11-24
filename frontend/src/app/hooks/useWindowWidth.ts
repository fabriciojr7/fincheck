import { useEffect, useState } from "react";

export function useWindowWidth(){
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    function handleReize(){
      setWidth(window.innerWidth)
    }

    window.addEventListener('resize',handleReize)

    return () => {
      window.removeEventListener('resize', handleReize)
    }
  })

  return width
}
