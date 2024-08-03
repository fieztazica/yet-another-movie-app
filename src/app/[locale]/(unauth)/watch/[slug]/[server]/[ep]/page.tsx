import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import React from 'react'

import { convertToSlug } from '@/utils/Helpers'

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

    const serverEpisode = film?.episodes?.find(
        (episode) => convertToSlug(episode.server_name) === params.server
    )

    if (!serverEpisode) {
        return notFound()
    }

    const item = serverEpisode.items.find((i) => i.slug === params.ep)

    if (!item) {
        return notFound()
    }

    return (
        <>
            <div className="px-4 py-2 font-bold">
                {t('watching')} {film?.name} ({film?.original_name})
            </div>
            <div className="w-full">
                <Player item={item} />
            </div>
            <div className="mb-2 mt-4 px-4">
                {t('wont_load.head')}
                <a
                    className="underline hover:text-primary"
                    href={film?.episodes?.[0]?.items?.[0]?.embed}
                    target="_blank"
                >
                    {t('wont_load.link')}
                </a>
                {t('wont_load.tail')}
            </div>
        </>
    )
}

export default WatchEpisodePage
