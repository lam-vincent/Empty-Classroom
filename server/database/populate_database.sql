-- @block
INSERT INTO Users (id_user, User_Name, User_Password, User_Class, User_Picture, User_Description, User_Promo)
VALUES
    (1, 'Vincent', '$2b$10$nCuxogKInMDRJnOkv9N8X.W6xHBXH/.e4X/WVNpqgTxHplHXYc3IC', 'INT4', 'https://rubberduckvba.files.wordpress.com/2018/10/ducky-color.png', 'positive guy !', 2026),
    (2, 'Alexandre', '$2b$10$nCuxogKInMDRJnOkv9N8X.W6xHBXH/.e4X/WVNpqgTxHplHXYc3IC', 'A', 'https://rubberduckvba.files.wordpress.com/2018/10/ducky-color.png', 'nicest guy !', 2026),
    (3, 'Romain', '$2b$10$nCuxogKInMDRJnOkv9N8X.W6xHBXH/.e4X/WVNpqgTxHplHXYc3IC', 'B', 'https://rubberduckvba.files.wordpress.com/2018/10/ducky-color.png', 'funniest guy !', 2026);

-- @block
INSERT INTO RoomCategories (id_category, Category_Name)
VALUES
    (1, 'Classroom'),
    (2, 'Auditorium'),
    (3, 'Computer lab');

-- @block
INSERT INTO Rooms (id_room, Room_Name, Room_Building, Room_Campus, Room_Location, id_category, is_reserved, event_time, Room_State)
VALUES
    ('A101', 101, 'Building A', 'République Campus', '2nd floor', 1, FALSE, NULL, 'Available'),
    ('B110', 110, 'Building B', 'République Campus', '2nd floor', 2, TRUE, '2023-09-20 14:00:00', 'Course in progress'),
    ('E001', 001, 'Building E', 'République Campus', '1st floor', 2, TRUE, '2023-09-20 14:00:00', 'Course in progress'),
    ('C001', 001, 'Building C', 'République Campus', '1st floor', 2, TRUE, '2023-09-20 14:00:00', 'Course in progress'),
    ('K101', 101, 'Building K', 'Gorki Campus', '2nd floor', 2, TRUE, '2023-09-20 14:00:00', 'Course in progress'),
    ('M201', 201, 'Building M', 'Monod Campus', '3rd floor', 1, FALSE, NULL, 'In exam');

-- @block
INSERT INTO Groups (id_group, Group_Creation, Group_Password, Group_Name, Group_Size, Group_State)
VALUES
    (1, '2023-09-15', 'AEZJFJZEF', 'Studying Computer Science', 5, 'Public'),
    (2, '2023-09-16', 'JDOIJSDOIJF', 'Project Group', 3, 'Private'),
    (3, '2023-09-17', 'AZEJOIJFZEF', 'Maths Group', 4, 'Full');

-- @block
INSERT INTO Reserve (id_room, id_user)
VALUES
    ('A101', 1),
    ('B110', 2),
    ('E001', 3);

-- @block
INSERT INTO Belong (id_user, id_group)
VALUES
    (1, 1),
    (2, 2),
    (3, 3);

-- @block
INSERT INTO Preferences (id_user, id_room)
VALUES
    (1, 'A101'),
    (2, 'B110'),
    (3, 'E001'),
    (1, 'K101'),
    (2, 'K101'),
    (3, 'K101'),
    (1, 'M201'),
    (2, 'M201'),
    (3, 'M201');

-- @block
INSERT INTO Classroom_Equipment (Device_Name, Device_Type, Device_Location, Device_Description, Device_Status, Room_Id)
VALUES
    ('Projector', 'Projector', 'Ceiling mount', 'High-quality HD projector for presentations.', 'Operational', 1),
    ('Smartboard', 'Interactive Whiteboard', 'Front wall', 'Interactive whiteboard with touchscreen for interactive learning.', 'Operational', 2),
    ('AC Unit', 'Air Conditioner', 'Ceiling', 'Air conditioner for temperature control.', 'Operational', 3),
    ('Table', 'Table', 'Center', 'Standard classroom table for seating and workspace.', 'Operational', 4),
    ('Chair', 'Chair', 'Around tables', 'Comfortable chairs for students.', 'Operational', 5),
    ('Whiteboard', 'Whiteboard', 'Front wall', 'Traditional whiteboard for writing and drawing.', 'Operational', 1),
    ('Blackboard', 'Blackboard', 'Back wall', 'Traditional blackboard for writing with chalk.', 'Operational', 2),
    ('Markers Set', 'Markers Set', 'Teacher desk', 'Set of colorful markers for whiteboard.', 'Operational', 3);
