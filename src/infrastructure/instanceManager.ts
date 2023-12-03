import { InstanceDB } from "./conectionInstance";
import { UserRepository } from "../adapters/userRepository";
import { UserController } from "../adapters/usercontroller";
import { UserService } from "../application/userService";
import { User } from "../domain/user";
import { IUser } from "../interfaces/userInterface";
import { UserModelDB } from "./modelDB";
import { IModelDB } from "../interfaces/interfaceModel";
import { IUserService } from "../interfaces/interfaceService";
import { IUserRepository } from "../interfaces/interfaceRepository";
import { IInstanceDB } from "../interfaces/databaseInterface";
import { IMidUser } from "../interfaces/interfaceMidUser";
import { MidUser } from "../application/midUser";
import { IAWSConfig } from "../interfaces/interfaceAWS";
import { AWSS3Config } from "./AWSManager";

export class InstanceManager {
  private formData: IUser['userData'];
  private databaseConnection: IInstanceDB;
  private userRepository: IUserRepository;
  private userService: IUserService;
  private user: any;
  private controller: UserController;
  private modelDB: IModelDB
  private mid: IMidUser;
  private imagem: IUser['imagem'];
  private AWS: IAWSConfig

  constructor(formData: any, image: any) {
    this.formData = formData;
    this.imagem = image;
    this.AWS = new AWSS3Config()
    this.databaseConnection = new InstanceDB();
    this.modelDB = new UserModelDB(this.databaseConnection.createConnection())
    this.userRepository = new UserRepository(this.modelDB, this.AWS);
    this.userService = new UserService(this.userRepository);
    this.user = new User(this.formData, this.userService, this.imagem);
    this.mid = new MidUser(this.formData)
    this.controller = new UserController(this.user, this.mid);
  }

  getController(): UserController {
    
    return this.controller
  }
}
