CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TYPE order_status AS ENUM ('active', 'complete');
CREATE TABLE orders (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    status order_status NOT NULL DEFAULT 'active',
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);