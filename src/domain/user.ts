import { IUser } from "../interfaces/userinterface";
import { IUserService } from "../interfaces/interfaceService";

export class User implements IUser {
    userData: IUser['userData'];
    private userService: IUserService;

    constructor(userData: any, userService: IUserService) {
        this.userData = userData;
        this.userService = userService;
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
            console.log(this.userData)
            console.log(this.userService)
            const returnUpdate = await this.userService.updateUser(this.userData, param)

            console.log('RESULTADO', returnUpdate)
            console.log('RESULTADO', returnUpdate.length)

            if (returnUpdate) {
                return true
            } else {
                return false
            }

        } catch (error) {
            console.log('ERRO PARA CARALHO')

            throw new Error("Erro ao salvar no banco de dados");
        }
    }


    LoginSystem() {

    }



}
