import { Antenna, Flame, House, Projector, Tv } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { unstable_setRequestLocale } from 'next-intl/server'

import LocaleSwitcher from '@/components/LocaleSwitcher'
import Logo from '@/components/Logo'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import { Button } from '@/components/ui/button'
import { BaseTemplate } from '@/templates/BaseTemplate'

export default function Layout(props: {
    children: React.ReactNode
    params: { locale: string }
}) {
    unstable_setRequestLocale(props.params.locale)
    const t = useTranslations('RootLayout')

    return (
        <BaseTemplate
            leftNav={
                <li className="text-center">
                    <Link href="/" className="border-none">
                        <Logo />
                    </Link>
                </li>
            }
            rightNav={
                <>
                    <li>
                        <ThemeSwitcher />
                    </li>
                    <li>
                        <LocaleSwitcher />
                    </li>
                </>
            }
            sideBar={
                <>
                    <li>
                        <Button
                            asChild
                            variant="secondary"
                            className="w-full justify-start"
                        >
                            <Link href="/" className="border-none">
                                <House className="mr-2 size-4" />
                                {t('home_link')}
                            </Link>
                        </Button>
                    </li>
                    <li>
                        <Button
                            asChild
                            variant="secondary"
                            className="w-full justify-start"
                        >
                            <Link href="/" className="border-none">
                                <Flame className="mr-2 size-4" />
                                {t('now_showing')}
                            </Link>
                        </Button>
                    </li>
                    <li>
                        <Button
                            asChild
                            variant="secondary"
                            className="w-full justify-start"
                        >
                            <Link href="/" className="border-none">
                                <Antenna className="mr-2 size-4" />
                                {t('tv_shows')}
                            </Link>
                        </Button>
                    </li>
                    <li>
                        <Button
                            asChild
                            variant="secondary"
                            className="w-full justify-start"
                        >
                            <Link href="/" className="border-none">
                                <Projector className="mr-2 size-4" />
                                {t('movies')}
                            </Link>
                        </Button>
                    </li>
                    <li>
                        <Button
                            asChild
                            variant="secondary"
                            className="w-full justify-start"
                        >
                            <Link href="/" className="border-none">
                                <Tv className="mr-2 size-4" />
                                {t('tv_series')}
                            </Link>
                        </Button>
                    </li>
                </>
            }
        >
            <div className="py-5 text-xl [&_p]:my-6">{props.children}</div>
        </BaseTemplate>
    )
}
