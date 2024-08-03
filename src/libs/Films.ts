import { Env } from './Env'

class FilmsApi {
    plural = 'films'

    singular = 'film'

    private apiUrl: URL

    constructor() {
        this.apiUrl = new URL(Env.API_URL)
    }

    async fetcher<T = FilmsResponse>(
        path: string,
        plural: boolean = true,
        init?: RequestInit
    ) {
        const url = new URL(
            `api/${plural ? this.plural : this.singular}/${path}`,
            this.apiUrl
        )
        const response = await fetch(url, init)
        const data = (await response.json()) as T
        if ((data as StatusResponse).status === 'error') {
            throw new Error((data as StatusResponse).message)
        }
        return data
    }

    getLatestFilms(page: number = 1) {
        return this.fetcher(`phim-moi-cap-nhat?page=${page}`)
    }

    getFilmsByCategory(category: string, page: number = 1) {
        return this.fetcher(`danh-sach/${category}?page=${page}`)
    }

    getFilmsByGenre(type: string, page: number = 1) {
        return this.fetcher(`the-loai/${type}?page=${page}`)
    }

    getFilmsByNation(nation: string, page: number = 1) {
        return this.fetcher(`quoc-gia/${nation}?page=${page}`)
    }

    getFilmsByReleaseYear(year: string, page: number = 1) {
        return this.fetcher(`nam-phat-hanh/${year}?page=${page}`)
    }

    getFilmBySlug(slug: string) {
        return this.fetcher<FilmResponse>(slug, false)
    }

    search(keyword: string, page: number = 1) {
        return this.fetcher(`search?keyword=${keyword}&page=${page}`)
    }
}

const filmsApi = new FilmsApi()
export default filmsApi
