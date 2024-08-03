import React from 'react'

import { getFilm } from '../actions'

type Props = {
    params: { slug: string; locale: string }
}

async function Watch({ params }: Props) {
    const film = await getFilm(params.slug)

    return (
        <div className="relative max-h-96 min-h-24 w-full text-white md:max-h-[512px] md:min-h-96">
            <img
                src={film.poster_url}
                alt={film.name}
                className="size-full max-h-[512px] object-cover object-center"
            />
            <div className="absolute inset-0 size-full" />
            <div className="absolute inset-x-0 bottom-0 flex min-h-16 flex-col justify-end bg-gradient-to-b from-transparent to-black/80 px-4 py-2 md:min-h-48">
                <h1 className="mb-4 truncate text-2xl font-bold drop-shadow md:text-4xl">
                    {film.name} ({film.original_name})
                </h1>
                <div className="text-sm font-medium">
                    <div className="truncate">
                        {[
                            film.language,
                            film.time,
                            film.director,
                            film.casts,
                        ].join(' • ')}
                    </div>
                    <div className="truncate">
                        {[
                            film.category?.[4]?.list
                                .map((v) => v.name)
                                .join(', '),
                            film.category?.[3]?.list
                                .map((v) => v.name)
                                .join(', '),
                            film.category?.[2]?.list
                                .map((v) => v.name)
                                .join(', '),
                            film.category?.[1]?.list
                                .map((v) => v.name)
                                .join(', '),
                        ].join(' • ')}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Watch
