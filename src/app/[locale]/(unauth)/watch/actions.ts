import filmsApi from '@/libs/Films'
import { notFound } from 'next/navigation'

export async function getFilm(slug: string) {
    try {
        const res = await filmsApi.getFilmBySlug(slug)
        return res.movie
    } catch (error) {
        return notFound()
    }
}
