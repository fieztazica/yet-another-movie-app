'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

import Pagination from '@/components/Pagination'

type Props = {
    paginate: Paginate
}

function Paginate({ paginate }: Props) {
    const searchParams = useSearchParams()
    const router = useRouter()
    const keyword = searchParams.get('keyword') || ''

    return (
        <Pagination
            currentPage={paginate.current_page}
            totalPages={paginate.total_page}
            onPageChange={(page) => {
                router.push(`/search?keyword=${keyword}&page=${page}`)
            }}
        />
    )
}

export default Paginate
