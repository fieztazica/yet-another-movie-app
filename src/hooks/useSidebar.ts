import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

import { useIsDesktop } from '@/hooks/useIsDesktop'

const openSidebarAtom = atomWithStorage('openSidebar', true)

export function useSidebar() {
    const isDesktop = useIsDesktop()
    const [openSidebar, setOpenSidebar] = useAtom(openSidebarAtom)

    const toggleOpenSidebar = () =>
        setOpenSidebar((currentState) => !currentState)

    return {
        openSidebar,
        setOpenSidebar,
        toggleOpenSidebar,
        isDesktop,
    }
}
