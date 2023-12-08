import { IUser } from "./userInterface"

export interface IS3Config {
    getS3Instance(): any
    sendParams(image: IUser['imagem']): any
    getParams(image: IUser['imagem']): any
}

  