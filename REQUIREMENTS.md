# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
- Show (args: product id)
- Create (args: Product)[token required]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)


| HTTP methods/Verbs | Endpoint | Token? | body | Description
| ------ | ------ | ------ | ------ | ----- |
| GET | /api/products | no | - | returns list of  all products.
| GET  | /api/products/:id | no | - | return a products by id
| DELETE | /api/products/:id | no | - | deletes a product by id and returns the product.
| POST  | /api/products/| no |   {  "name": "string","price": number} | creates a new products and return the product
| PUT  | /api/products/| no | {"id":"string","name": "string","price": number} | updates a product and returns that product

#### Users
- Index [token required]
- Show (args: id)[token required]
- Create (args: User)[token required]


| HTTP methods/Verbs | Endpoint | Token? | body | Description
| ------ | ------ | ------ | ------ | ----- |
| GET | /api/users | yes | - | returns list of  all users.
| GET  | /api/users/:id | yes | - | return a user by id
| DELETE | /api/users/:id | yes | - | deletes a user by id and returns the user.
| POST  | /api/users/| no | { "first_name": "string", "last_name": "string", "email":"string","password":"string"} | creates a new user and returns the user
| POST  | /api/users/authenticate | no |{"email":"string","password":"string"} | authenicate user and returns a user with token
| PUT  | /api/users/| yes | { "id":"string",first_name": "string", "last_name": "string", "email":"string","password":"string"} | updates a user and returns that user

#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

| HTTP methods/Verbs | Endpoint | Token? | body | Description
| ------ | ------ | ------ | ------ | ----- |
| GET | /api/orders | yes | - | returns list of  all orderss.
| GET  | /api/orders/:order_id/get-products-order | yes | - | return list of products in order id.
| POST  | /api/orders/| yes |{ "status": "active or complete", "user_id":"string"}| creates a new order and return the order
| PUT  | /api/orders/update-status-complete| yes |-| updates order status to complete and returns that order
| GET  | /api/orders/:user_id/get-active-orders |yes | - | return list of active orders for user id
| GET  | /api/orders/:user_id/get-complete-orders |yes | - | return list of complete orders for user id
| POST | /api/orders/:product_id/:order_id/add-product-to-order |yes | - | adds a product id to order id 

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)



#### Database Schema
##### Users
```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE  users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);
```
##### Orders
```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TYPE order_status AS ENUM ('active', 'complete');
CREATE TABLE orders (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    status order_status NOT NULL DEFAULT 'active',
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);
```
##### Products

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE products(
id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
name VARCHAR(255) UNIQUE NOT NULL,
price float NOT NULL
);


```
##### Orders_Products    
```sql
CREATE TABLE orders_products (
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE ON UPDATE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE,
    quantity INTEGER NOT NULL,
    PRIMARY KEY (order_id, product_id)
);
```
