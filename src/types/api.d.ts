type Paginate = {
    current_page: number
    total_page: number
    total_items: number
    items_per_page: number
}

type Cat = {
    name: string
    title: string
    slug: string
}

type StatusResponse = {
    status: 'success' | 'error'
    message?: string
}

type PaginateResponse<T = unknown> = StatusResponse & {
    paginate: Paginate
    items: T[]
}

type FilmsResponse = PaginateResponse<Movie> & {
    cat?: Cat
}

type FilmResponse = StatusResponse & {
    movie: Movie
}
