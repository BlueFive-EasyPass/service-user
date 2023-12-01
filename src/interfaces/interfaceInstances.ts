import { IDatabaseConnection } from "./databaseinterface";
import { IUserRepository } from "./interfaceRepository";
import { IUserService } from "./interfaceService";

export interface IInstances {
    createInstances(): {
      databaseConnection: IDatabaseConnection;
      userRepository: IUserRepository;
      userService: IUserService;
    };
  }