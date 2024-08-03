'use server'

import filmsApi from '@/libs/Films'

export async function makeSearch(keyword: string, page?: number) {
    try {
        const films = await filmsApi.search(encodeURIComponent(keyword), page)
        if (!films?.items) {
            return []
        }
        return films.items
    } catch (error) {
        return []
    }
}
