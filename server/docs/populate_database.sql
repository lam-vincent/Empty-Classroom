-- @block
INSERT INTO Users (id_user, User_Name, User_Password, User_Class, User_Picture, User_Description, User_Promo, User_Role)
VALUES
    (1, 'Vincent', '$2b$10$nCuxogKInMDRJnOkv9N8X.W6xHBXH/.e4X/WVNpqgTxHplHXYc3IC', 'INT4', 'https://rubberduckvba.files.wordpress.com/2018/10/ducky-color.png', 'positive guy !', 2026, 'moderator'),
    (2, 'Alexandre', '$2b$10$nCuxogKInMDRJnOkv9N8X.W6xHBXH/.e4X/WVNpqgTxHplHXYc3IC', 'A', 'https://rubberduckvba.files.wordpress.com/2018/10/ducky-color.png', 'nicest guy !', 2026, 'moderator'),
    (3, 'Romain', '$2b$10$nCuxogKInMDRJnOkv9N8X.W6xHBXH/.e4X/WVNpqgTxHplHXYc3IC', 'B', 'https://rubberduckvba.files.wordpress.com/2018/10/ducky-color.png', 'funniest guy !', 2026, 'user');

-- @block
INSERT INTO RoomCategories (id_category, Category_Name)
VALUES
    (1, 'Classroom'),
    (2, 'Auditorium'),
    (3, 'Computer lab');

-- @block
INSERT INTO Rooms (id_room, Room_Name, Room_Building, Room_Campus, Room_Location, Room_State, Room_Category) VALUES
(7, 180, 'A', 'Campus 1', 'Floor 3, Room 302', 'Vacant', 'Study Room'),
(6, 145, 'A', 'Campus 3', 'Floor 1, Room 123', 'Occupied', 'Auditorium'),
(5, 130, 'A', 'Campus 2', 'Floor 2, Room 202', 'Vacant', 'Lounge'),
(4, 110, 'A', 'Campus 1', 'Floor 4, Room 404', 'Vacant', 'Laboratory'),
(3, 175, 'A', 'Campus 3', 'Floor 3, Room 301', 'Occupied', 'Boardroom'),
(2, 120, 'A', 'Campus 2', 'Floor 1, Room 101', 'Vacant', 'Classroom'),
(1, 150, 'A', 'Campus 1', 'Floor 2, Room 201', 'Occupied', 'Meeting Room'),
(8, 195, 'A', 'Campus 2', 'Floor 5, Room 555', 'Occupied', 'Office'),
(9, 105, 'A', 'Campus 3', 'Floor 2, Room 201', 'Vacant', 'Library'),
(10, 175, 'A', 'Campus 1', 'Floor 3, Room 301', 'Occupied', 'Gymnasium'),
(11, 115, 'A', 'Campus 2', 'Floor 1, Room 102', 'Vacant', 'Lounge'),
(12, 160, 'A', 'Campus 3', 'Floor 4, Room 007', 'Occupied', 'Seminar Room'),
(13, 185, 'A', 'Campus 1', 'Floor 4, Room 410', 'Occupied', 'Conference Room'),
(14, 140, 'A', 'Campus 2', 'Floor 2, Room 205', 'Vacant', 'Classroom'),
(15, 195, 'A', 'Campus 3', 'Floor 1, Room 101', 'Occupied', 'Boardroom'),
(16, 120, 'A', 'Campus 1', 'Floor 3, Room 303', 'Vacant', 'Laboratory'),
(17, 155, 'A', 'Campus 2', 'Floor 3, Room 302', 'Vacant', 'Lounge'),
(18, 110, 'A', 'Campus 3', 'Floor 2, Room 202', 'Occupied', 'Auditorium'),
(19, 130, 'A', 'Campus 1', 'Floor 5, Room 501', 'Vacant', 'Study Room'),
(20, 165, 'A', 'Campus 2', 'Floor 2, Room 203', 'Occupied', 'Office'),
(21, 115, 'A', 'Campus 3', 'Floor 4, Room 404', 'Vacant', 'Library'),
(22, 175, 'A', 'Campus 1', 'Floor 3, Room 302', 'Occupied', 'Gymnasium'),
(23, 125, 'A', 'Campus 2', 'Floor 1, Room 105', 'Vacant', 'Lounge'),
(24, 190, 'A', 'Campus 3', 'Floor 5, Room 505', 'Occupied', 'Seminar Room');

-- @block
INSERT INTO `Groups` (id_group, Group_Creation, Group_Password, Group_Name, Group_Size, Group_State)
VALUES
    (1, '2023-09-15', 'AEZJFJZEF', 'Studying Computer Science', 5, 'Public'),
    (2, '2023-09-16', 'JDOIJSDOIJF', 'Project Group', 3, 'Private'),
    (3, '2023-09-17', 'AZEJOIJFZEF', 'Maths Group', 4, 'Full');

-- @block
INSERT INTO Equipments (Equipment_Name, Equipment_Type, Equipment_Location, Equipment_Description, Equipment_Status)
VALUES
    ('Projector', 'Projector', 'Ceiling mount', 'High-quality HD projector for presentations.', 'Operational'),
    ('Smartboard', 'Interactive Whiteboard', 'Front wall', 'Interactive whiteboard with touchscreen for interactive learning.', 'Operational'),
    ('AC Unit', 'Air Conditioner', 'Ceiling', 'Air conditioner for temperature control.', 'Operational'),
    ('Table', 'Table', 'Center', 'Standard classroom table for seating and workspace.', 'Operational'),
    ('Chair', 'Chair', 'Around tables', 'Comfortable chairs for students.', 'Operational'),
    ('Whiteboard', 'Whiteboard', 'Front wall', 'Traditional whiteboard for writing and drawing.', 'Operational'),
    ('Blackboard', 'Blackboard', 'Back wall', 'Traditional blackboard for writing with chalk.', 'Operational'),
    ('Markers Set', 'Markers Set', 'Teacher desk', 'Set of colorful markers for whiteboard.', 'Operational');

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