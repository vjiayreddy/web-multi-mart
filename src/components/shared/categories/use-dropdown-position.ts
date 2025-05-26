import { RefObject } from 'react'

export const useDropdownPosition = (ref: RefObject<HTMLDivElement | null>) => {
  const getDropDownPosition = () => {
    if (!ref.current) {
      return {
        top: 0,
        left: 0,
      }
    }
    const rect = ref.current.getBoundingClientRect()
    const dropDownWidth = 240

    // Calculate Initial Position
    let left = rect.left + window.scrollX
    const top = rect.bottom + window.scrollY
    if (left + dropDownWidth > window.innerWidth) {
      // Alin to right edge of button instead
      left = rect.right + window.scrollX - dropDownWidth
      // If still off-screen , align to the right edge of viewport with some padding
      if (left < 0) {
        left = window.innerWidth - dropDownWidth - 16
      }
    }
    if (left < 0) {
      left = 16
    }
    return {
      top,
      left,
    }
  }

  return {
    getDropDownPosition,
  }
}
