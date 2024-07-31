'use client'

import { Search } from 'lucide-react'
import Link from 'next/link'
import * as React from 'react'
import { useDebounceCallback } from 'usehooks-ts'

import { makeSearch } from '@/app/[locale]/(unauth)/actions'
import { Button } from '@/components/ui/button'
import {
    CommandDialog,
    CommandEmpty,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import { useIsDesktop } from '@/hooks/useIsDesktop'
import { cn } from '@/utils'

export function SearchDialog() {
    const isDesktop = useIsDesktop()
    const [open, setOpen] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [keyword, setKeyword] = React.useState('')
    const debouncedSetKeyword = useDebounceCallback(setKeyword, 500)
    const [results, setResults] = React.useState<Movie[]>([])

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'j' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((state) => !state)
            }
        }

        document.addEventListener('keydown', down)
        return () => document.removeEventListener('keydown', down)
    }, [])

    React.useEffect(() => {
        if (!keyword) {
            return setResults([])
        }

        ;(async () => {
            try {
                setLoading(true)
                const res = await makeSearch(keyword)
                setResults(res)
            } catch (error) {
                console.error(error)
                setResults([])
            } finally {
                setLoading(false)
            }
        })()

        return () => {
            setResults([])
        }
    }, [keyword])

    const toggleOpen = () => setOpen((state) => !state)

    return (
        <>
            <Button
                variant="outline"
                className={cn(isDesktop && 'w-full justify-start')}
                size={isDesktop ? 'default' : 'icon'}
                onClick={toggleOpen}
            >
                <Search className={cn('size-4', isDesktop && 'mr-2')} />
                <span className={cn(isDesktop ? 'not-sr-only' : 'sr-only')}>
                    Search
                </span>
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput
                    placeholder="Type something to search..."
                    defaultValue={keyword}
                    onValueChange={(search) => debouncedSetKeyword(search)}
                />
                <CommandList className="max-h-96">
                    <CommandEmpty>
                        {loading ? 'Loading...' : 'No results found.'}
                    </CommandEmpty>
                    {results.map((result) => (
                        <CommandItem
                            key={result.id}
                            value={result.name}
                            onSelect={toggleOpen}
                        >
                            <Link href={`/watch/${result.slug}`}>
                                <div className="flex w-full">
                                    <img
                                        src={result.thumb_url}
                                        alt={result.name}
                                        className="max-w-32"
                                    />
                                    <div className="ml-2 flex-1 font-medium">
                                        <div className="text-xl font-bold">
                                            {result.name} (
                                            {result.original_name})
                                        </div>
                                        <div>
                                            {[
                                                result.quality,
                                                result.language,
                                                result.time,
                                            ].join(' • ')}
                                        </div>
                                        <div>
                                            {[
                                                result.current_episode,
                                                result.total_episodes,
                                            ].join(' • ')}
                                        </div>
                                        <div>{result.casts}</div>
                                        <div>{result.director}</div>
                                    </div>
                                </div>
                            </Link>
                        </CommandItem>
                    ))}
                </CommandList>
            </CommandDialog>
        </>
    )
}
