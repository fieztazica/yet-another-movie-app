import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { unstable_setRequestLocale } from 'next-intl/server'

import LocaleSwitcher from '@/components/LocaleSwitcher'
import Logo from '@/components/Logo'
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
                <li>
                    <Link
                        href="/"
                        className="border-none text-gray-700 hover:text-gray-900"
                    >
                        <Logo />
                    </Link>
                </li>
            }
            rightNav={
                <>
                    <li>
                        <Link
                            href="/"
                            className="border-none text-gray-700 hover:text-gray-900"
                        >
                            {t('tv_shows')}
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/"
                            className="border-none text-gray-700 hover:text-gray-900"
                        >
                            {t('movies')}
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/"
                            className="border-none text-gray-700 hover:text-gray-900"
                        >
                            {t('tv_series')}
                        </Link>
                    </li>
                    <li>
                        <LocaleSwitcher />
                    </li>
                </>
            }
        >
            <div className="py-5 text-xl [&_p]:my-6">{props.children}</div>
        </BaseTemplate>
    )
}
