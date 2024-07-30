import React from 'react'

type Props = {
    movie: Movie
}

function ThumbCard({ movie }: Props) {
    return (
        <div className="group relative size-full min-h-64 overflow-hidden">
            <b className="absolute left-2 top-0 z-10 font-bold italic drop-shadow-lg">
                {movie.quality}
            </b>
            <div
                className="absolute inset-0 -z-10 size-full bg-cover object-cover transition-transform duration-300 group-hover:scale-105"
                style={{
                    backgroundImage: `url(${movie.thumb_url})`,
                }}
            />
            <div className="absolute bottom-0 w-full bg-black/30 p-2 text-center backdrop-blur-sm">
                <h5 className="mb-2 truncate text-xs font-bold">
                    {movie.original_name}
                </h5>
                <div className="truncate text-xs font-medium">
                    {movie.language}
                    {' • '}
                    {movie.time}
                </div>
            </div>
        </div>
    )
}

export default ThumbCard
