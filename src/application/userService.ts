import { IUserRepository } from "../interfaces/interfaceRepository";
import { IUserService } from "../interfaces/interfaceService";
import { IUser } from "../interfaces/userinterface";

export class UserService implements IUserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async signUp(userData: IUser['userData']): Promise<boolean> {
    try {
      console.log(this.userRepository)

      return await this.userRepository.save(userData);
    } catch (error) {
      console.log('ERRO PARA CARALHO 3')

      throw new Error("Erro ao salvar no banco de dados");
    }
  }

  async searchUser(userData: IUser['userData']): Promise<any> {
    try {

      return await this.userRepository.get(userData)
    } catch (error) {
      throw new Error("Erro ao salvar no banco de dados");
    }
  }

  async updateUser(userData: IUser['userData'], param: any) {
    try {

      return await this.userRepository.update(userData, param)
    } catch (error) {
      throw new Error("Erro ao salvar no banco de dados");
    }
  }
}