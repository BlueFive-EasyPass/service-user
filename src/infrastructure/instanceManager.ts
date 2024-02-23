import { InstanceDB } from "./conectionInstance";
import { UserRepository } from "../adapters/userRepository";
import { UserController } from "../adapters/usercontroller";
import { UserService } from "../application/userService";
import { User } from "../domain/user";
import { IUser } from "../interfaces/userInterface";
import { UserModelDB } from "./modeldb";
import { IModelDB } from "../interfaces/interfaceModel";
import { IUserService } from "../interfaces/interfaceService";
import { IUserRepository } from "../interfaces/interfaceRepository";
import { IMidUser } from "../interfaces/interfaceMidUser";
import { MidUser } from "../application/miduser";
import { AWSS3Config } from "./AWSManager";
import { IS3Config } from "../interfaces/interfaceAWS";
import { IController } from "../interfaces/interfaceController";

export class InstanceManager {
  private formData: IUser['userData'];
  private imagem: IUser['imagem'];
  private s3Config: IS3Config;
  private userRepository: IUserRepository;
  private userService: IUserService;
  private user: any;
  private controller: UserController;
  private modelDB: IModelDB;
  private mid: IMidUser;

  constructor(formData: any, image: any) {
    this.formData = formData;
    this.imagem = image;
    this.s3Config = new AWSS3Config(); 
    this.modelDB = new UserModelDB(new InstanceDB().createConnection());
    this.userRepository = new UserRepository(this.modelDB, this.s3Config);
    this.userService = new UserService(this.userRepository);
    this.user = new User(this.formData, this.userService, this.imagem);
    this.mid = new MidUser(this.formData);
    this.controller = new UserController(this.user, this.mid);
  }

  getController(): IController {
    return this.controller;
  }

}
