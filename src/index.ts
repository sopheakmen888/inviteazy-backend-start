import express, { Request, Response } from "express";
import userRoutes from "./routes/userRoutes";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { UserService } from "./services/userService";
import { UserController } from "./controllers/userController";
import { AuthController } from "./controllers/authController";
import authRoutes from "./routes/authRoutes";
import { connectPostgresDb } from "./config/postgresdb/db";
import { PostgresUserRepository } from "./repositories/postgres/userRepository";
import { loggingMiddleware } from "./middlewares/loggingMiddleware";
import { connectMongoDB } from "./config/mongodb/db";
import { MongoUserRepository } from "./repositories/mongodb/userRepository";
import { connectMysqlDb } from "./config/mysqldb/db";
import guestRoutes from './routes/guestRoutes';dotenv.config();

const app = express();
const port = 3001;

// Switch connection to database
// connectMongoDB();
// connectMySQL();

const pgPool = connectPostgresDb();
// const mysqlPool = connectMysqlDb();
// Repositories
// const userRepository = new MongoUserRepository();
const userRepository = new PostgresUserRepository(pgPool);
// const userRepository = new PostgresUserRepository(mysqlPool);

// Services
const userService = new UserService(userRepository);

// Controllers
const userController = new UserController(userService);
const authController = new AuthController(userService);

// Middlewares
app.use(express.json());
app.use(loggingMiddleware);

// Routes
app.use("/api/users", userRoutes(userController));
app.use("/api/auth", authRoutes(authController));
app.use('/api/v1', guestRoutes);
// Handle Errors
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});