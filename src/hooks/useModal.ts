import { useCallback, useState } from 'react'

export const useModal = ({ isVisibleByDefault = false } = {}) => {
  const [isVisible, setIsVisible] = useState(isVisibleByDefault)

  const show = useCallback<() => void>(() => {
    setIsVisible(true)
  }, [])

  const dismiss = useCallback(() => {
    setIsVisible(false)
  }, [])

  const toggle = useCallback(() => {
    setIsVisible(prev => !prev)
  }, [])

  return {
    isVisible,
    show,
    dismiss,
    toggle,
  }
}