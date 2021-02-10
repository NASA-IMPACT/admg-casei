import { useState, useEffect } from "react"
import debounce from "lodash.debounce"

/**
 * A custom hook the calculate the width and height of a reference element.
 * @param {element} containerRef - the reference element, for example created with useRef()
 * @return {object} An object containing width and height properties, for example `{ width: 800, height: 600 }`.
 */
export const useContainerDimensions = containerRef => {
  const getDimensions = () => ({
    width: containerRef.current.offsetWidth,
    height: containerRef.current.offsetHeight,
  })

  const [dimensions, setDimensions] = useState({ width: null, height: null })

  useEffect(() => {
    const handleResize = () => {
      setDimensions(getDimensions())
    }

    if (containerRef.current) {
      setDimensions(getDimensions())
    }

    const debouncedResize = debounce(handleResize, 250)

    window.addEventListener("resize", debouncedResize)

    return () => {
      window.removeEventListener("resize", debouncedResize)
    }
  }, [containerRef])

  return dimensions
}
