type Movie = {
    id?: string
    name: string
    slug: string
    original_name: string
    thumb_url: string
    poster_url: string
    created: Date
    modified: Date
    description: string
    total_episodes: number
    current_episode: string
    time?: string | null
    quality: string
    language: string
    director?: string | null
    casts?: string | null
    category?: { [key: string]: Category }
    episodes?: Episode[]
}

type Category = {
    group: Group
    list: Group[]
}

type Group = {
    id: string
    name: string
}

type Episode = {
    server_name: string
    items: Item[]
}

type Item = {
    name: string
    slug: string
    embed: string
    m3u8: string
}
