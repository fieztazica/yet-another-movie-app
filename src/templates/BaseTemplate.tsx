import { AppConfig } from '@/utils/AppConfig'

const BaseTemplate = (props: {
    leftNav: React.ReactNode
    rightNav?: React.ReactNode
    children: React.ReactNode
}) => {
    return (
        <div className="w-full px-1 text-gray-700 antialiased">
            <div className="mx-auto min-h-dvh px-2">
                <header className="fixed inset-x-0 top-0 border-b border-gray-300 text-center">
                    <div className="flex justify-between">
                        <nav>
                            <ul className="flex flex-wrap gap-x-5 text-xl">
                                {props.leftNav}
                            </ul>
                        </nav>

                        <nav>
                            <ul className="flex flex-wrap gap-x-5 text-xl">
                                {props.rightNav}
                            </ul>
                        </nav>
                    </div>
                </header>

                <main>{props.children}</main>

                <footer className="border-t border-gray-300 py-8 text-center text-sm">
                    © Copyright {new Date().getFullYear()} {AppConfig.name}.
                </footer>
            </div>
        </div>
    )
}

export { BaseTemplate }
