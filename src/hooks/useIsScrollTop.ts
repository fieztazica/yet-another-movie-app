import { useEffect, useState } from 'react'

export function useIsScrollTop() {
    const [isTop, setIsTop] = useState(true)
    useEffect(() => {
        function onScroll() {
            setIsTop(window.scrollY <= 0)
        }
        window.addEventListener('scroll', onScroll)

        return () => {
            window.removeEventListener('scroll', onScroll)
        }
    }, [])

    return isTop
}
