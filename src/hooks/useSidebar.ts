import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { useRef } from 'react'
import { useOnClickOutside } from 'usehooks-ts'

import { useIsDesktop } from '@/hooks/useIsDesktop'

const openSidebarAtom = atomWithStorage('openSidebar', true)

export function useSidebar() {
    const ref = useRef(null)
    const isDesktop = useIsDesktop()
    const [openSidebar, setOpenSidebar] = useAtom(openSidebarAtom)

    const toggleOpenSidebar = () =>
        setOpenSidebar((currentState) => !currentState)

    const handleClickOutside = () => {
        if (openSidebar && !isDesktop) setOpenSidebar(false)
    }

    useOnClickOutside(ref, handleClickOutside)

    return {
        openSidebar,
        setOpenSidebar,
        toggleOpenSidebar,
        isDesktop,
        ref,
        handleClickOutside,
    }
}
