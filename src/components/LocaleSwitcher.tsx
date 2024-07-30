'use client'

import { useLocale } from 'next-intl'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { usePathname, useRouter } from '@/libs/i18nNavigation'
import { AppConfig } from '@/utils/AppConfig'

export default function LocaleSwitcher() {
    const router = useRouter()
    const pathname = usePathname()
    const locale = useLocale()

    const handleChange = (value: string) => {
        router.push(pathname, { locale: value })
        router.refresh()
    }

    return (
        <Select onValueChange={handleChange}>
            <SelectTrigger>
                <SelectValue placeholder={locale.toUpperCase()} />
            </SelectTrigger>
            <SelectContent>
                {AppConfig.locales.map((elt) => (
                    <SelectItem
                        key={elt}
                        value={elt}
                        className="rounded text-xl"
                    >
                        {elt.toUpperCase()}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
