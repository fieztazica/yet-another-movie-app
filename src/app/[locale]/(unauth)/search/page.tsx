import { Annoyed } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

import filmsApi from '@/libs/Films'

import SearchInputForm from './form'
import Paginate from './paginate'
import { cn } from '@/utils'

type Props = {
    searchParams: { [key: string]: string | string[] | undefined }
    params: { locale: string }
}

async function search(keyword: string, page: number) {
    try {
        if (!keyword) {
            return {
                items: [],
                message: 'What are you looking for?',
                status: 'error',
                paginate: {
                    current_page: 0,
                    total_page: 0,
                    total_items: 0,
                    items_per_page: 0,
                },
            } as FilmsResponse
        }
        return await filmsApi.search(keyword, page)
    } catch (error) {
        return {
            items: [],
            message: 'Something went wrong',
            status: 'error',
            paginate: {
                current_page: 0,
                total_page: 0,
                total_items: 0,
                items_per_page: 0,
            },
        } as FilmsResponse
    }
}

export async function generateMetadata({
    searchParams,
    params,
}: Props): Promise<Metadata> {
    const keyword = [searchParams.keyword].flat().shift()
    const page = [searchParams.page].flat().shift() || '1'
    const t = await getTranslations({
        locale: params.locale,
        namespace: 'Search',
    })

    if (!keyword) {
        return {
            title: t('meta.title_default'),
            description: t('meta.description_default'),
        }
    }

    const films = await search(keyword || '', Number(page))

    return {
        title:
            films?.items?.length > 0
                ? t('meta.title_found', {
                      amount: films?.items?.length,
                  })
                : t('no_results'),
        description:
            films?.items?.length > 0
                ? t('meta.description_found', {
                      amount: films?.items?.length,
                      keyword,
                  })
                : t('meta.description_not_found', {
                      keyword,
                  }),
    }
}

async function SearchPage({ searchParams, params }: Props) {
    const keyword = [searchParams.keyword].flat().shift()
    const page = [searchParams.page].flat().shift() || '1'
    const t = await getTranslations({
        locale: params.locale,
        namespace: 'Search',
    })

    const films = await search(keyword || '', Number(page))

    return (
        <>
            <div className="sticky top-0 z-40 p-4">
                <SearchInputForm />
            </div>
            {films?.status === 'error' && (
                <p className="px-4 font-semibold">{films?.message}</p>
            )}
            {films?.items?.length === 0 && (
                <p className="flex items-center px-4 font-semibold">
                    <Annoyed className="mr-2 size-4" />
                    {t('no_results')}
                </p>
            )}
            {films?.items?.map((item, i) => (
                <div
                    key={item.slug}
                    className={cn(
                        'group transition-all hover:bg-muted',
                        i % 2 === 0 && 'bg-muted/50'
                    )}
                >
                    <Link href={`/watch/${item.slug}`}>
                        <div className="flex w-full text-sm md:text-base">
                            <img
                                src={item.thumb_url}
                                alt={item.name}
                                className="max-h-32 md:max-h-full max-w-32 brightness-90 group-hover:brightness-100 group-hover:drop-shadow"
                            />
                            <div className="ml-2 flex-1 font-medium">
                                <div className="text-lg md:text-xl font-semibold md:font-bold">
                                    {item.name} ({item.original_name})
                                </div>
                                <div>
                                    {[
                                        item.quality,
                                        item.language,
                                        item.time,
                                    ].join(' • ')}
                                </div>
                                <div>
                                    {[
                                        item.current_episode,
                                        item.total_episodes,
                                    ].join(' • ')}
                                </div>
                                <div>{item.casts}</div>
                                <div>{item.director}</div>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
            {films?.paginate && (
                <div className="px-4 pt-4">
                    <Paginate paginate={films.paginate} />
                </div>
            )}
        </>
    )
}

export default SearchPage
