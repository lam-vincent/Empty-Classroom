CREATE TABLE Users(
    id_user INT,
    User_Name VARCHAR(50),
    User_Password TEXT,
    User_Class VARCHAR(50),
    User_Picture TEXT,
    User_Description TEXT,
    User_Promo INT,
    PRIMARY KEY(id_user)
);

-- @block
CREATE TABLE RoomCategory(
    id_categoryid INT,
    RoomCategory_name VARCHAR(50),
    PRIMARY KEY(id_categoryid)
);

-- @block
CREATE TABLE RoomStates(
    id_stateid INT,
    RoomState_name VARCHAR(50),
    PRIMARY KEY(id_stateid)
);

-- @block
CREATE TABLE GroupStates(
    id_groupstateid INT,
    GroupState_Name VARCHAR(50),
    PRIMARY KEY(id_groupstateid)
);

-- @block
CREATE TABLE Rooms (
    id_room INT,
    Room_Name INT,
    Room_Building VARCHAR(50),
    Room_Campus VARCHAR(50),
    Room_Location VARCHAR(50),
    id_categoryid INT NOT NULL,
    id_stateid INT NOT NULL,
    is_reserved BOOLEAN DEFAULT FALSE,
    event_time TIMESTAMP,
    PRIMARY KEY(id_room),
    FOREIGN KEY(id_categoryid) REFERENCES RoomCategory(id_categoryid),
    FOREIGN KEY(id_stateid) REFERENCES RoomStates(id_stateid)
);

-- @block
CREATE TABLE `Groups` (
    id_group INT,
    Group_Creation DATE,
    Group_Password TEXT,
    Group_Name VARCHAR(50),
    Group_Size INT,
    id_groupstateid INT NOT NULL,
    PRIMARY KEY(id_group),
    FOREIGN KEY(id_groupstateid) REFERENCES GroupStates(id_groupstateid)
);

-- @block
CREATE TABLE Reserve(
    id_room INT,
    id_user INT,
    PRIMARY KEY(id_room, id_user),
    FOREIGN KEY(id_room) REFERENCES Rooms(id_room),
    FOREIGN KEY(id_user) REFERENCES Users(id_user)
);

-- @block
CREATE TABLE Belong(
    id_user INT,
    id_group INT,
    PRIMARY KEY(id_user, id_group),
    FOREIGN KEY(id_user) REFERENCES Users(id_user),
    FOREIGN KEY(id_group) REFERENCES `Groups`(id_group)
);

-- @block
CREATE TABLE Preferences (
    id_user INT,
    id_room INT,
    PRIMARY KEY(id_user, id_room),
    FOREIGN KEY(id_user) REFERENCES Users(id_user),
    FOREIGN KEY(id_room) REFERENCES Rooms(id_room)
);