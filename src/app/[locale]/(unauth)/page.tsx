import Link from 'next/link'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'

import ThumbCard from '@/components/ThumbCard'
import filmsApi from '@/libs/Films'

export async function generateMetadata(props: { params: { locale: string } }) {
    const t = await getTranslations({
        locale: props.params.locale,
        namespace: 'Index',
    })

    return {
        title: t('meta_title'),
        description: t('meta_description'),
    }
}

export default async function Index(props: { params: { locale: string } }) {
    unstable_setRequestLocale(props.params.locale)

    const latestFilms = await filmsApi.getLatestFilms()
    const movies = await filmsApi.getFilmsByCategory('phim-le')
    const tvSeries = await filmsApi.getFilmsByCategory('phim-bo')

    return (
        <>
            <h3>Latest Films</h3>
            <div className="flex flex-wrap">
                {latestFilms.items.map((film) => (
                    <Link
                        key={film.slug}
                        href={`/watch/${film.slug}`}
                        className="w-1/6"
                    >
                        <ThumbCard movie={film} />
                    </Link>
                ))}
            </div>
            <h3>Movies</h3>
            <div className="flex flex-wrap">
                {movies.items.map((film) => (
                    <Link
                        key={film.slug}
                        href={`/watch/${film.slug}`}
                        className="sm:1/4 w-1/2 md:w-1/6 2xl:w-[12.5%]"
                    >
                        <ThumbCard movie={film} />
                    </Link>
                ))}
            </div>
            <h3>TV Series</h3>
            <div className="flex flex-wrap">
                {tvSeries.items.map((film) => (
                    <Link
                        key={film.slug}
                        href={`/watch/${film.slug}`}
                        className="w-1/6"
                    >
                        <ThumbCard movie={film} />
                    </Link>
                ))}
            </div>
        </>
    )
}
