import { InstanceDB } from "../adapters/conectioninstance";
import { UserRepository } from "../adapters/userRepository";
import { UserController } from "../adapters/usercontroller";
import { UserService } from "../application/userService";
import { User } from "../domain/user";
import { IUser } from "../interfaces/userinterface";

export class InstanceManager {
    private formData: IUser;
    private databaseConnection: InstanceDB;
    private userRepository: UserRepository;
    private userService: UserService;
    private user: User;
    private controller: UserController;
  
    constructor(formData: IUser) {
      this.formData = formData;
      this.databaseConnection = new InstanceDB();
      this.userRepository = new UserRepository(this.databaseConnection.createConnection());
      this.userService = new UserService(this.userRepository);
      this.user = new User(this.formData, this.userService);
      this.controller = new UserController(this.user);
    }
  
    getController(): UserController {
      return this.controller;
    }
  }
  