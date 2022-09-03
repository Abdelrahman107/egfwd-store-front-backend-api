CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE  users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);