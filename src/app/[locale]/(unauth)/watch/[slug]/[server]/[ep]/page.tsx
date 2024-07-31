import { getTranslations } from 'next-intl/server'
import React from 'react'

import { getFilm } from '../../../actions'
import Player from './player'

type Props = {
    params: { slug: string; locale: string; server: string; ep: string }
}

async function WatchEpisodePage({ params }: Props) {
    const film = await getFilm(params.slug)
    const t = await getTranslations({
        locale: params.locale,
        namespace: 'Watch',
    })

    // const serverEpisode = film?.episodes?.find(
    //     (episode) => convertToSlug(episode.server_name) === params.server
    // )

    // if (!serverEpisode) {
    //     return notFound()
    // }

    // const item = serverEpisode.items.find(
    //     (i) => convertToSlug(i.name) === params.ep
    // )

    // if (!item) {
    //     return notFound()
    // }

    return (
        <>
            <div className="px-4 py-2 font-bold">
                {t('watching')} {film?.name} ({film?.original_name})
            </div>
            <div className="w-full">
                <Player film={film} />
            </div>
            <div className="mb-2 mt-4 px-4">
                If the player wont load, use this{' '}
                <a
                    className="underline hover:text-muted"
                    href={film?.episodes?.[0]?.items?.[0]?.embed}
                    target="_blank"
                >
                    link
                </a>{' '}
                instead.
            </div>
        </>
    )
}

export default WatchEpisodePage
