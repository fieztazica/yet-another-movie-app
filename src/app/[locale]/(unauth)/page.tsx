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

    const baseLinkClassName = 'xl:w-1/8 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6'

    return (
        <>
            <h3>Latest Films</h3>
            <div className="flex flex-wrap">
                {latestFilms.items.map((film) => (
                    <Link
                        key={film.slug}
                        href={`/watch/${film.slug}`}
                        className={baseLinkClassName}
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
                        className={baseLinkClassName}
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
                        className={baseLinkClassName}
                    >
                        <ThumbCard movie={film} />
                    </Link>
                ))}
            </div>
        </>
    )
}
