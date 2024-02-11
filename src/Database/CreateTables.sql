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

CREATE TABLE users (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    is_admin INTEGER NOT NULL DEFAULT 0 CHECK (is_admin IN (0,1)),
    f_name VARCHAR(50),
    l_name VARCHAR(50),
    phone_number VARCHAR(20),
    email VARCHAR(100)
);

CREATE TABLE reports (
    Report_Id INTEGER AUTO_INCREMENT PRIMARY KEY,
    Report_Reason INTEGER NOT NULL CHECK (Report_Reason IN (0,1,2,3,4,5,6,7,8,9)), 
    Subject_Id_User INTEGER NULL FOREIGN KEY REFERENCES users(User_id),
    Subject_Id_Post INTEGER NULL FOREIGN KEY REFERENCES products(Product_id),
    Subject_Type INTEGER NOT NULL DEFAULT 0 CHECK (Subject_Type IN (0,1)),    
);
