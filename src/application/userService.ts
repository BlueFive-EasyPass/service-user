import { IUserRepository } from "../interfaces/interfaceRepository";
import { IUserService } from "../interfaces/interfaceService";
import { IUser } from "../interfaces/userInterface";

export class UserService implements IUserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async sendImage(image: IUser['imagem']): Promise<boolean> {
    try {
      const resultSend = await this.userRepository.image(image)

      return resultSend
    } catch (error) {
      throw new Error("Erro ao salvar no banco de dados");
    }
  }

  async getImage(image: IUser['imagem']): Promise<any> {
    try {
      const resultSend: Buffer = await this.userRepository.getimage(image)

      return resultSend
    } catch (error) {
      throw new Error("Erro ao salvar no banco de dados");
    }
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

  async loginSystem(userData: IUser['userData']) {
    try {

      return await this.userRepository.login(userData)
    } catch (error) {
      throw new Error("Erro ao salvar no banco de dados");
    }
  }

  async cancelUser(userData: IUser['userData']) {
    try {

      return await this.userRepository.cancel(userData)
    } catch (error) {
      throw new Error("Erro ao salvar no banco de dados");
    }
  }

  async activateUser(userData: IUser['userData']) {
    try {

      return await this.userRepository.activate(userData)
    } catch (error) {
      throw new Error("Erro ao salvar no banco de dados");
    }
  }

  async updateCustomer(data: any) {
    try {
      return await this.userRepository.updateCustomer(data)
    } catch (error) {
      throw new Error("Erro ao salvar no banco de dados");
    }
  }


}