'use client'

import { Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import React from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

function Form() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const t = useTranslations('Search')

    const keyword = searchParams.get('keyword') || ''
    const page = searchParams.get('page') || '1'
    function action(formData: FormData) {
        const formKeyword = formData.get('keyword')
        router.push(`/search?keyword=${formKeyword?.toString()}&page=${page}`)
    }

    return (
        <form action={action} className="relative">
            <Input
                id="keyword"
                name="keyword"
                defaultValue={keyword}
                placeholder={t('input_placeholder')}
            />
            <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-4 py-2"
                disabled
            >
                <Search className="size-4" aria-hidden="true" />
            </Button>
        </form>
    )
}

export default Form
