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
    (97101, 101, 'Building A', 'République Campus', '2nd floor', 1, FALSE, NULL, 'Available'),
    (98110, 110, 'Building B', 'République Campus', '2nd floor', 2, TRUE, '2023-09-20 14:00:00', 'Course in progress'),
    (101001, 1, 'Building E', 'République Campus', '1st floor', 2, TRUE, '2023-09-20 14:00:00', 'Course in progress'),
    (99001, 1, 'Building C', 'République Campus', '1st floor', 2, TRUE, '2023-09-20 14:00:00', 'Course in progress'),
    (107101, 101, 'Building K', 'Gorki Campus', '2nd floor', 2, TRUE, '2023-09-20 14:00:00', 'Course in progress'),
    (109201, 201, 'Building M', 'Monod Campus', '3rd floor', 1, FALSE, NULL, 'In exam');

-- @block
INSERT INTO `Groups` (id_group, Group_Creation, Group_Password, Group_Name, Group_Size, Group_State)
VALUES
    (1, '2023-09-15', 'AEZJFJZEF', 'Studying Computer Science', 5, 'Public'),
    (2, '2023-09-16', 'JDOIJSDOIJF', 'Project Group', 3, 'Private'),
    (3, '2023-09-17', 'AZEJOIJFZEF', 'Maths Group', 4, 'Full');

-- @block
INSERT INTO Equipment (Equipment_Name, Equipment_Type, Equipment_Location, Equipment_Description, Equipment_Status, Room_Id)
VALUES
    ('Projector', 'Projector', 'Ceiling mount', 'High-quality HD projector for presentations.', 'Operational', 97101),
    ('Smartboard', 'Interactive Whiteboard', 'Front wall', 'Interactive whiteboard with touchscreen for interactive learning.', 'Operational', 98110),
    ('AC Unit', 'Air Conditioner', 'Ceiling', 'Air conditioner for temperature control.', 'Operational', 101001),
    ('Table', 'Table', 'Center', 'Standard classroom table for seating and workspace.', 'Operational', 99001),
    ('Chair', 'Chair', 'Around tables', 'Comfortable chairs for students.', 'Operational', 107101),
    ('Whiteboard', 'Whiteboard', 'Front wall', 'Traditional whiteboard for writing and drawing.', 'Operational', 97101),
    ('Blackboard', 'Blackboard', 'Back wall', 'Traditional blackboard for writing with chalk.', 'Operational', 98110),
    ('Markers Set', 'Markers Set', 'Teacher desk', 'Set of colorful markers for whiteboard.', 'Operational', 101001);

-- @block
INSERT INTO Reserve (id_room, id_user)
VALUES
    (97101, 1),
    (98110, 2),
    (101001, 3);

-- @block
INSERT INTO Belong (id_user, id_group)
VALUES
    (1, 1),
    (2, 2),
    (3, 3);

-- @block
INSERT INTO Prefer (id_user, id_room)
VALUES
    (1, 97101),
    (2, 98110),
    (3, 101001),
    (1, 107101),
    (2, 107101),
    (3, 107101),
    (1, 109201),
    (2, 109201),
    (3, 109201);

-- @block
INSERT INTO Is_Equiped (id_room, id_equipment)
VALUES
    (97101, 1),
    (98110, 2),
    (101001, 3),
    (99001, 4),
    (107101, 5),
    (97101, 6),
    (98110, 7),
    (101001, 8);