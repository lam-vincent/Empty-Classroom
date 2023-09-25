CREATE TABLE Users(
    Id_user INT,
    User_Name VARCHAR(50),
    User_Password VARCHAR(50),
    User_Class VARCHAR(50),
    User_Picture VARCHAR(50),
    User_Description TEXT,
    User_Promo INT,
    PRIMARY KEY(Id_user)
);

CREATE TABLE RoomCategory(
    id_categoryid INT,
    RoomCategory_name VARCHAR(50),
    PRIMARY KEY(id_categoryid)
);

CREATE TABLE RoomStates(
    id_stateid VARCHAR(50),
    RoomState_name VARCHAR(50),
    PRIMARY KEY(id_stateid)
);

CREATE TABLE GroupStates(
    id_groupstateid INT,
    GroupState_Name VARCHAR(50),
    PRIMARY KEY(id_groupstateid)
);

CREATE TABLE Rooms (
    Id_room VARCHAR(50),
    Room_Name INT,
    Room_Building VARCHAR(50),
    Room_Campus VARCHAR(50),
    Room_Location VARCHAR(50),
    id_categoryid INT NOT NULL,
    id_stateid VARCHAR(50) NOT NULL,
    is_reserved BOOLEAN DEFAULT FALSE,
    event_time TIMESTAMP,
    PRIMARY KEY(Id_room),
    FOREIGN KEY(id_categoryid) REFERENCES RoomCategory(id_categoryid),
    FOREIGN KEY(id_stateid) REFERENCES RoomStates(id_stateid)
);

CREATE TABLE Groups(
    Id_group VARCHAR(50),
    Group_Creation DATE,
    Group_Password VARCHAR(50),
    Group_Name VARCHAR(50),
    Group_Size INT,
    id_groupstateid INT NOT NULL,
    PRIMARY KEY(Id_group),
    FOREIGN KEY(id_groupstateid) REFERENCES GroupStates(id_groupstateid)
);

CREATE TABLE Reserve(
    Id_room INT,
    Id_user INT,
    PRIMARY KEY(Id_room, Id_user),
    FOREIGN KEY(Id_room) REFERENCES Rooms(Id_room),
    FOREIGN KEY(Id_user) REFERENCES Users(Id_user)
);

CREATE TABLE Belong(
    Id_user INT,
    Id_group VARCHAR(50),
    PRIMARY KEY(Id_user, Id_group),
    FOREIGN KEY(Id_user) REFERENCES Users(Id_user),
    FOREIGN KEY(Id_group) REFERENCES Groups(Id_group)
);

CREATE TABLE Preferences (
    Id_user INT,
    Id_room INT,
    PRIMARY KEY(Id_user, Id_room),
    FOREIGN KEY(Id_user) REFERENCES Users(Id_user),
    FOREIGN KEY(Id_room) REFERENCES Rooms(Id_room)
);