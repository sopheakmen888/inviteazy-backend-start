import bcrypt from "bcrypt";

import { UserModel } from "./models/userModel";
import {
  IUser,
  IUserRepository,
  IUserWithoutPassword,
} from "../../interfaces/userInterface";

export class MongoUserRepository implements IUserRepository {
  async findAll(): Promise<IUserWithoutPassword[]> {
    const result = await UserModel.find();
    return result.map(({ id, name, email, role }) => ({
      id,
      name,
      email,
      role,
    }));
  }

  async findById(userId: string): Promise<IUserWithoutPassword | null> {
    const result = await UserModel.findById(userId);
    if (!result) return null;

    const { id, name, email, role }: IUserWithoutPassword = result;
    return { id, name, email, role };
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await UserModel.findOne({ email });
  }

  async create(user: Omit<IUser, "id">): Promise<IUserWithoutPassword> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = new UserModel({
      name: user.name,
      email: user.email,
      password: hashedPassword,
      role: user.role,
    });
    await newUser.save();
    const { id, name, email, role }: IUserWithoutPassword = newUser;
    return { id, name, email, role };
  }
}
