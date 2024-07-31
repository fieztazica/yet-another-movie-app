'use server'

import filmsApi from '@/libs/Films'

export async function makeSearch(keyword: string) {
    try {
        const films = await filmsApi.search(encodeURIComponent(keyword))
        if (!films?.items) {
            return []
        }
        return films.items
    } catch (error) {
        return []
    }
}
