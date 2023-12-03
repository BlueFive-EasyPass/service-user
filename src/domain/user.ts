import { IUser } from "../interfaces/userInterface";
import { IUserService } from "../interfaces/interfaceService";

export class User implements IUser {
    userData: IUser['userData'];
    private userService: IUserService;
    imagem?: IUser['imagem'];

    constructor(userData: any, userService: IUserService, imagem: any) {
        this.userData = userData;
        this.userService = userService;
        this.imagem = imagem
    }

    async sendImage() {
        try {
            const resultSend = await this.userService.sendImage(this.imagem)
            
            return resultSend
        } catch (error) {
            throw new Error("Erro ao salvar no banco de dados");
        }
    }

    async getImage() {
        try {
            const resultSend: Buffer = await this.userService.getImage(this.imagem)
            
            return resultSend
        } catch (error) {
            throw new Error("Erro ao salvar no banco de dados");
        }
    }


    async saveToDatabase(): Promise<boolean> {
        try {
            console.log(this.userData)
            console.log(this.userService)
            const returnSignUp = await this.userService.signUp(this.userData)
            console.log(returnSignUp)

            if (returnSignUp) {
                return true
            } else {
                return false
            }
        } catch (error) {
            throw new Error("Erro ao salvar no banco de dados");
        }
    }

    async searchUser() {
        try {
            const returnSearch: Array<any> = await this.userService.searchUser(this.userData)
            return returnSearch
        } catch (error) {
            throw new Error("Erro ao salvar no banco de dados");
        }
    }

    async updateUser(param: any) {
        try {
            const returnUpdate = await this.userService.updateUser(this.userData, param)
            console.log('RESULTADO', returnUpdate)
            console.log('RESULTADO', returnUpdate.length)
            if (returnUpdate) {
                return returnUpdate
            } else {
                return false
            }
        } catch (error) {
            throw new Error("Erro ao salvar no banco de dados");
        }
    }

    async loginSystem() {
        try {
            console.log(this.userData)
            console.log(this.userService)
            const returnLogin = await this.userService.loginSystem(this.userData)
            console.log('RESULT JSON: ', returnLogin)
            return returnLogin
        } catch (error) {
            console.log('ERRO PARA CARALHO')
            throw new Error("Erro ao salvar no banco de dados");
        }
    }

    async cancelUser() {
        try {
            console.log(this.userData)
            console.log(this.userService)
            const returnCancel = await this.userService.cancelUser(this.userData)
            return returnCancel
        } catch (error) {
            console.log('ERRO PARA CARALHO')
            throw new Error("Erro ao salvar no banco de dados");
        }
    }

    async activateUser() {
        try {
            console.log(this.userData)
            console.log(this.userService)
            const returnCancel = await this.userService.activateUser(this.userData)
            return returnCancel
        } catch (error) {
            console.log('ERRO PARA CARALHO')
            throw new Error("Erro ao salvar no banco de dados");
        }
    }
}
