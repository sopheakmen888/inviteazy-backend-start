import { Pool, QueryResult } from "pg";
import bcrypt from "bcrypt";
import { IUser, IUserRepository } from "../../interfaces/userInterface";
import { queryWithLogging } from "./utils";

export class PostgresUserRepository implements IUserRepository {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async findAll(): Promise<IUser[]> {
    const { rows } = await queryWithLogging(
      this.pool,
      "SELECT id, name, email,role FROM users"
    );
    return rows;
  }

  async findById(id: string): Promise<IUser | null> {
    const { rows } = await queryWithLogging(
      this.pool,
      "SELECT id, name, email, role FROM users WHERE id = $1",
      [id]
    );
    return rows[0] || null;
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const { rows } = await queryWithLogging(
      this.pool,
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    return rows[0] || null;
  }

  async create(user: Omit<IUser, "id">): Promise<IUser> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const { rows } = await queryWithLogging(
      this.pool,
      "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role",
      [user.name, user.email, hashedPassword, user.role]
    );
    return rows[0];
  }
}
