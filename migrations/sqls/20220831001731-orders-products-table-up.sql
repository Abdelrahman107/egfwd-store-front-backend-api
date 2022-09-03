CREATE TABLE orders_products (
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE ON UPDATE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE,
    quantity INTEGER NOT NULL,
    PRIMARY KEY (order_id, product_id)
);