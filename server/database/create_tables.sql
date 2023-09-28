CREATE TABLE Users (
    id_user INT AUTO_INCREMENT,
    User_Name VARCHAR(50) UNIQUE,
    User_Password TEXT NOT NULL,
    User_Class VARCHAR(50) NOT NULL,
    User_Picture TEXT,
    User_Description TEXT,
    User_Promo INT NOT NULL,
    PRIMARY KEY (id_user)
);


CREATE TABLE RoomCategories (
    id_category INT AUTO_INCREMENT,
    Category_Name VARCHAR(50) NOT NULL,
    PRIMARY KEY (id_category)
);


CREATE TABLE `Groups` (
    id_group INT AUTO_INCREMENT,
    Group_Creation DATE NOT NULL,
    Group_Password TEXT NOT NULL,
    Group_Name VARCHAR(50) NOT NULL,
    Group_Size INT NOT NULL,
    Group_State VARCHAR(50) NOT NULL, 
    PRIMARY KEY (id_group)
);

CREATE TABLE Rooms (
    id_room INT AUTO_INCREMENT,
    Room_Name INT NOT NULL UNIQUE,
    Room_Building VARCHAR(50) NOT NULL,
    Room_Campus VARCHAR(50) NOT NULL,
    Room_Location VARCHAR(50) NOT NULL,
    id_category INT NOT NULL,
    is_reserved BOOLEAN DEFAULT FALSE,
    event_time TIMESTAMP,
    Room_State VARCHAR(50) NOT NULL,, 
    PRIMARY KEY (id_room)
);


CREATE TABLE Reserve (
    id_room INT,
    id_user INT,
    PRIMARY KEY (id_room, id_user),
    FOREIGN KEY (id_room) REFERENCES Rooms (id_room),
    FOREIGN KEY (id_user) REFERENCES Users (id_user)
);


CREATE TABLE Belong (
    id_user INT,
    id_group INT,
    PRIMARY KEY (id_user, id_group),
    FOREIGN KEY (id_user) REFERENCES Users (id_user),
    FOREIGN KEY (id_group) REFERENCES Groups (id_group)
);


CREATE TABLE Preferences (
    id_user INT,
    id_room INT,
    PRIMARY KEY (id_user, id_room),
    FOREIGN KEY (id_user) REFERENCES Users (id_user),
    FOREIGN KEY (id_room) REFERENCES Rooms (id_room)
);

CREATE TABLE Devices (
    id_device INT AUTO_INCREMENT,
    Device_Name VARCHAR(50) UNIQUE,
    Device_Type VARCHAR(50) NOT NULL,
    Device_Location VARCHAR(50) NOT NULL,
    Device_Description TEXT,
    Device_Status VARCHAR(20) NOT NULL,
    Room_Id INT, 
    PRIMARY KEY (id_device),
    FOREIGN KEY (Room_Id) REFERENCES Rooms (id_room)
);
