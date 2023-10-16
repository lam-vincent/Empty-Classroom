-- @block
CREATE TABLE Users (
    id_user INT AUTO_INCREMENT,
    User_Name VARCHAR(50) UNIQUE,
    User_Password TEXT NOT NULL,
    User_Class VARCHAR(50) NOT NULL,
    User_Picture TEXT,
    User_Description TEXT,
    User_Promo INT NOT NULL,
    User_Role VARCHAR(50) NOT NULL,
    PRIMARY KEY (id_user)
);

-- @block
CREATE TABLE `Groups` (
    id_group INT AUTO_INCREMENT,
    Group_Creation DATE NOT NULL,
    Group_Password TEXT NOT NULL,
    Group_Name VARCHAR(50) NOT NULL,
    Group_Size INT NOT NULL,
    Group_State VARCHAR(50) NOT NULL, 
    PRIMARY KEY (id_group)
);

-- @block
CREATE TABLE Rooms (
    id_room INT AUTO_INCREMENT,
    Room_Name INT NOT NULL,
    Room_Building VARCHAR(50) NOT NULL,
    Room_Campus VARCHAR(50) NOT NULL,
    Room_Location VARCHAR(50) NOT NULL,
    Room_State VARCHAR(50) NOT NULL,
    Room_Category VARCHAR(50) NOT NULL,
    Is_Reserved BOOLEAN DEFAULT FALSE,
    Event_Time TIMESTAMP,
    PRIMARY KEY (id_room)
);


-- @block
CREATE TABLE Equipments (
    id_equipment INT AUTO_INCREMENT,
    Equipment_Name VARCHAR(50) UNIQUE,
    Equipment_Type VARCHAR(50) NOT NULL,
    Equipment_Location VARCHAR(50) NOT NULL,
    Equipment_Description TEXT,
    Equipment_Status VARCHAR(20) NOT NULL,
    PRIMARY KEY (id_equipment)
);

-- @block
CREATE TABLE Reserve (
    id_room INT,
    id_user INT,
    PRIMARY KEY (id_room, id_user),
    FOREIGN KEY (id_room) REFERENCES Rooms (id_room),
    FOREIGN KEY (id_user) REFERENCES Users (id_user)
);

-- @block
CREATE TABLE Belong (
    id_user INT,
    id_group INT,
    PRIMARY KEY (id_user, id_group),
    FOREIGN KEY (id_user) REFERENCES Users (id_user),
    FOREIGN KEY (id_group) REFERENCES `Groups` (id_group)
);

-- @block
CREATE TABLE Prefer (
    id_user INT,
    id_room INT,
    PRIMARY KEY (id_user, id_room),
    FOREIGN KEY (id_user) REFERENCES Users (id_user),
    FOREIGN KEY (id_room) REFERENCES Rooms (id_room)
);

-- @block
CREATE TABLE Is_Equiped (
    id_room INT,
    id_equipment INT,
    PRIMARY KEY (id_room, id_equipment),
    FOREIGN KEY (id_room) REFERENCES Rooms (id_room),
    FOREIGN KEY (id_equipment) REFERENCES Equipments (id_equipment)
);