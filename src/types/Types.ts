export interface ISneakerSize {
    id: number
    euSize: number
    usSize: number
    cmSize: number
}

export interface ISneaker {
    id: number
    name: string
    weight: number
    brand: string
    cloth: string
    sneakerSize: ISneakerSize
    zipType: string
    releaseDate: string
    price: number
}
