### Set up working environment

#### 1. Start Mongodb Container

```bash
# Option 1: set up with no credential
docker run --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=secret -d mongodb/mongodb-community-server:latest
# Option 2: set up with initdb credential
docker run --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=secret -d mongodb/mongodb-community-server:latest

# Connect to mongodb
mongosh mongodb://localhost:27017

# show all databases
show dbs

# switch to a database (or create it if it doesn't exist)
use <database_name>

# show current database
db

# show all collections in the current database
show collections

# find all documents in a collection
db.<collection>.find()
```

#### 2. Start Postgres Database Container

```bash
docker volume create inviteazy-pgdata

docker run -d \
  --name postgres001 \
  -e POSTGRES_USER=<username> \
  -e POSTGRES_PASSWORD=<password> \
  -e POSTGRES_DB=<database-name> \
  -p 5433:5432 \
  -v inviteazy-pgdata:/var/lib/postgresql/data \
  postgres:latest

# Access psql inside container
docker exec -it postgres001 psql -U postgres

# Connect to database
\c mydb

# Create users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid() ,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

# Show the table structures
\d users

# Insert a test record
INSERT INTO users (name, email, role, password)
VALUES ('John Doe', 'john@example.com', 'user', 'hashed_password');

# View the data
SELECT * FROM users;
```





#### 3. Start Redis Container for Server Cache

```bash
docker run -d --name redis-server -p 6379:6379 -v redis-data:/data redis:latest
```

#### 4. Create `.env`

```bash
JWT_SECRET=<very-secret-key>
NODE_ENV=development
REDIS_URL=redis://localhost:6379
```

#### 5. Install project dependencies & run

```bash
npm install

npm run dev
```

#### 6. Start MariaDB Database Container

docker run -d \
  --name mariadb-container \
  -e MARIADB_ROOT_PASSWORD=my-secret-pw \
  -e MARIADB_DATABASE=mydb \
  -e MARIADB_USER=myuser \
  -e MARIADB_PASSWORD=mypassword \
  -p 3306:3306 \
  mariadb:latest

# Access mariadb inside container
```bash
  docker exec -it mariadb-container mariadb -u root -p
```