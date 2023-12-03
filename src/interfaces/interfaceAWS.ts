import { IUser } from "./userInterface"

export interface IAWSConfig {
    getS3Instance(): any
    sendParams(image: IUser['imagem']): any
    getParams(image: IUser['imagem']): any
}
