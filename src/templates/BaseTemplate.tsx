'use client'

import { Transition, TransitionChild } from '@headlessui/react'
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'

import { SearchDialog } from '@/components/SearchDialog'
import { Button } from '@/components/ui/button'
import { useSidebar } from '@/hooks/useSidebar'
import { cn } from '@/utils'
import { AppConfig } from '@/utils/AppConfig'

const BaseTemplate = (props: {
    leftNav: React.ReactNode
    rightNav?: React.ReactNode
    sideBar?: React.ReactNode
    children: React.ReactNode
}) => {
    const { openSidebar, toggleOpenSidebar, isDesktop } = useSidebar()

    const OpenSideBarIcon = openSidebar ? PanelLeftClose : PanelLeftOpen

    return (
        <div className="w-full">
            <div className="mx-auto flex min-h-screen flex-col">
                <header className="border-b p-2 text-center">
                    <div className="flex justify-between">
                        <nav>
                            <ul className="flex flex-wrap gap-x-2 text-xl">
                                <li>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={toggleOpenSidebar}
                                    >
                                        <OpenSideBarIcon />
                                    </Button>
                                </li>
                                {props.leftNav}
                            </ul>
                        </nav>

                        <nav>
                            <ul className="flex flex-wrap gap-x-2 text-xl">
                                <div className={cn(isDesktop && 'min-w-64')}>
                                    <SearchDialog />
                                </div>
                                {props.rightNav}
                            </ul>
                        </nav>
                    </div>
                </header>
                <div className="flex flex-1">
                    <Transition show={openSidebar}>
                        <TransitionChild
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full opacity-0"
                            enterTo="translate-x-0 opacity-95"
                            leave="transition ease-in duration-200 transform"
                            leaveFrom="translate-x-0 opacity-95"
                            leaveTo="-translate-x-full opacity-0"
                        >
                            <aside
                                className={cn(
                                    'bg-primary-foreground text-primary p-2 border-r min-w-64 min-h-full'
                                )}
                            >
                                <ul
                                    className={cn(
                                        'gap-2 space-y-2 sticky top-2'
                                    )}
                                >
                                    {props.sideBar}
                                </ul>
                            </aside>
                        </TransitionChild>
                    </Transition>
                    <div className="flex-1">
                        <main>{props.children}</main>
                        <footer className="border-t border-gray-300 py-8 text-center text-sm">
                            © Copyright {new Date().getFullYear()}{' '}
                            {AppConfig.name}.{' '}
                            <a
                                className="border-none"
                                href="https://github.com/fieztazica/yet-another-movie-app"
                            >
                                Site source.
                            </a>
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { BaseTemplate }
