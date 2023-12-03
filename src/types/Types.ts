export interface IManufacturer {
    id: number
    name: string
}

export interface IBrand {
    id: number
    name: string
}

export interface IZipType {
    id: number
    name: string
}

export interface ICloth {
    id: number
    name: string
}

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
