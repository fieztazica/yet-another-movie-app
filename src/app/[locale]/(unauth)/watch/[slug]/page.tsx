import { notFound } from 'next/navigation'
import React from 'react'

import { Button } from '@/components/ui/button'
import filmsApi from '@/libs/Films'

type Props = {
    params: { slug: string }
}

async function getFilm(slug: string) {
    try {
        const res = await filmsApi.getFilmBySlug(slug)
        return res.movie
    } catch (error) {
        return notFound()
    }
}

async function Watch({ params }: Props) {
    const film = await getFilm(params.slug)
    return (
        <div>
            <div>
                <img src={film.poster_url} alt={film.original_name} />
            </div>
            <h1 className="text-2xl font-black">
                {film.name} ({film.original_name})
            </h1>
            <div>{film.description}</div>
            <div>Current: {film.current_episode}</div>
            <div>
                {film.episodes?.map((episode) => (
                    <div key={episode.server_name}>
                        <div>Server: {episode.server_name}</div>
                        <div className="flex flex-wrap gap-2">
                            {episode.items.map((item) => (
                                <div
                                    key={item.slug}
                                    className="w-auto rounded bg-primary p-2"
                                >
                                    <div className="text-primary-foreground">
                                        {item.name}
                                    </div>
                                    <div className="gap-2 space-x-2">
                                        <Button asChild variant="outline">
                                            <a
                                                target="_blank"
                                                href={item.embed}
                                            >
                                                Embed
                                            </a>
                                        </Button>
                                        <Button asChild variant="outline">
                                            <a target="_blank" href={item.m3u8}>
                                                M3U8
                                            </a>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Watch
