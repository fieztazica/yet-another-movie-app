import type { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import React from 'react'

import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { convertToSlug } from '@/utils/Helpers'

import { getFilm } from '../actions'

type Props = {
    params: { slug: string; locale: string }
}

export async function generateMetadata(props: Props): Promise<Metadata> {
    const film = await getFilm(props.params.slug)
    const keywords: string[] = [
        film.casts,
        film.director,
        film.original_name,
        film.language,
    ].filter((v) => typeof v === 'string')

    if (film.category) {
        for (const category of Object.values(film.category)) {
            if (category.list) {
                for (const item of category.list) {
                    if (item.name) {
                        keywords.push(item.name)
                    }
                }
            }
        }
    }

    return {
        title: `${film.name} (${film.original_name})`,
        description: film.description,
        keywords,
        openGraph: {
            images: [film.poster_url, film.thumb_url],
        },
        twitter: {
            images: [film.poster_url, film.thumb_url],
        },
    }
}

async function WatchLayout({
    children,
    params,
}: React.PropsWithChildren<Props>) {
    const film = await getFilm(params.slug)
    const t = await getTranslations({
        locale: params.locale,
        namespace: 'Watch',
    })

    return (
        <div>
            {children}
            <div className="px-4 py-2">
                <div className="rounded bg-primary-foreground px-4 py-1">
                    <h5 className="text-xl font-semibold">
                        {t('description_title')}
                    </h5>
                    <p className="text-xs md:text-sm">{film.description}</p>
                </div>
            </div>
            <div className="px-4 py-2">
                <div className="mb-2 text-xl font-bold">
                    {t('server_selection')}
                </div>
                <Tabs className="w-full">
                    <TabsList>
                        {film.episodes?.map((episode) => (
                            <TabsTrigger
                                value={convertToSlug(episode.server_name)}
                                key={`${convertToSlug(episode.server_name)}_trigger`}
                            >
                                {episode.server_name}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {film.episodes?.map((episode) => (
                        <TabsContent
                            value={convertToSlug(episode.server_name)}
                            key={`${convertToSlug(episode.server_name)}_content`}
                        >
                            <div className="mb-2 text-xl font-bold">
                                {t('episode_selection')}
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {episode.items.map((item) => (
                                    <Button key={item.slug} asChild>
                                        <Link
                                            href={`/watch/${film.slug}/${convertToSlug(episode.server_name)}/${item.slug}`}
                                        >
                                            {item.name.toLowerCase() === 'full'
                                                ? ''
                                                : `${t('episode')} `}
                                            {item.name}
                                        </Link>
                                    </Button>
                                ))}
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </div>
    )
}

export default WatchLayout
