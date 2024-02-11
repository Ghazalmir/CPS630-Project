/* products table */
CREATE TABLE products (
    Product_id INTEGER PRIMARY KEY,
    User_id INTEGER, 
    Location_id INTEGER NOT NULL, 
    Title VARCHAR2(200) NOT NULL,
    Description VARCHAR2(1000),
	  Price NUMBER NOT NULL, 
    Is_available INTEGER CHECK (Is_available IN (0,1)),
    Date_posted DATE NOT NULL,
    FOREIGN KEY (User_id) REFERENCES Users(User_id)
);

/* messages table */
CREATE TABLE messages (
    Message_id INTEGER PRIMARY KEY ,
    Sender_id INTEGER, 
    Receiver_id INTEGER, 
    Message VARCHAR2(200),
    Time_stamp TIMESTAMP NOT NULL,
    FOREIGN KEY (Message_id) REFERENCES Users(User_id),
    FOREIGN KEY (Sender_id) REFERENCES Users(User_id)
);

/* image table */
CREATE TABLE images (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Product_id INTEGER NOT NULL,
    Image_link VARCHAR2(255) NOT NULL,
    Image_title VARCHAR(100),
    FOREIGN KEY (Product_id) REFERENCES Product(Product_id)
);
