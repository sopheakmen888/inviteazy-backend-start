import bcrypt from "bcrypt";
import logger from "./utils";
import { UserModel } from "../../models/userModel";
import {
  IUser,
  IUserRepository,
  IUserWithoutPassword,
} from "../../interfaces/userInterface";

export class MongoUserRepository implements IUserRepository {


  async findAll(): Promise<IUserWithoutPassword[]> {
    logger.info("[MongoDB] Retrieving all users...");
    const result = await UserModel.find();
    logger.info(`[MongoDB] Found ${result.length} users`);
    return result.map(({ id, name, email, role }) => ({
      id,
      name,
      email,
      role,
    }));
  }

  async findById(userId: string): Promise<IUserWithoutPassword | null> {
    logger.info(`[MongoDB] Finding user by ID: ${userId}`);
    const result = await UserModel.findById(userId);
    if (!result) {
      logger.info("[MongoDB] User not found");
      return null

    };

    const { id, name, email, role }: IUserWithoutPassword = result;
    logger.info(`[MongoDB] User found: ${email}`);
    return { id, name, email, role };
  }

  async findByEmail(email: string): Promise<IUser | null> {
    logger.info(`[MongoDB] Finding user by email: ${email}`);
    return await UserModel.findOne({ email });
  }

  async create(user: Omit<IUser, "id">): Promise<IUserWithoutPassword> {
    logger.info(`[MongoDB] Finding user by email: ${user.email}`);
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = new UserModel({
      name: user.name,
      email: user.email,
      password: hashedPassword,
      role: user.role,
    });
    await newUser.save();
    const { id, name, email, role }: IUserWithoutPassword = newUser;
    logger.info(`[MongoDB] User created with ID: ${id}`);
    return { id, name, email, role };
  }
}
