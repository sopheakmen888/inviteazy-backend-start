import { NextFunction, Request, Response } from "express";
import { IUser, IUserService } from "../interfaces/userInterface";

export class AuthController {
  private userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password }: Omit<IUser, "id" | "role" | "name"> = req.body;
      const result = await this.userService.login(email, password);
      res.status(200).json({ message: "Login successfully.", data: result });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password, role = "user" }: Omit<IUser, "id"> = req.body;
      const newUser = await this.userService.createUser({
        name,
        email,
        password,
        role,
      });
      res
        .status(201)
        .json({ message: "A new user was created.", data: newUser });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}
