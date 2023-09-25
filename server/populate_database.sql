INSERT INTO
    Users (
        Id_user,
        User_Name,
        User_Password,
        User_Class,
        User_Picture,
        User_Description,
        User_Promo
    )
VALUES
    (
        1,
        'Vincent',
        '$2b$10$nCuxogKInMDRJnOkv9N8X.W6xHBXH/.e4X/WVNpqgTxHplHXYc3IC',
        'INT4',
        'https://rubberduckvba.files.wordpress.com/2018/10/ducky-color.png',
        'positive guy !',
        2026
    ),
    (
        2,
        'Alexandre',
        '$2b$10$nCuxogKInMDRJnOkv9N8X.W6xHBXH/.e4X/WVNpqgTxHplHXYc3IC',
        'A',
        'https://rubberduckvba.files.wordpress.com/2018/10/ducky-color.png',
        'nicest guy !',
        2026
    ),
    (
        3,
        'Romain',
        '$2b$10$nCuxogKInMDRJnOkv9N8X.W6xHBXH/.e4X/WVNpqgTxHplHXYc3IC',
        'B',
        'https://rubberduckvba.files.wordpress.com/2018/10/ducky-color.png',
        'funniest guy !',
        2026
    );

INSERT INTO
    RoomCategory (id_categoryid, RoomCategory_name)
VALUES
    (1, 'Classroom'),
    (2, 'Auditorium'),
    (3, 'Computer lab');

INSERT INTO
    RoomStates (id_stateid, RoomState_name)
VALUES
    (1, 'Available'),
    (2, 'Course in progress'),
    (3, 'In exam'),
    (4, 'Study session'),
    (5, 'Event');

INSERT INTO
    GroupStates (id_groupstateid, GroupState_Name)
VALUES
    (1, 'Public'),
    (2, 'Private'),
    (3, 'Full');

INSERT INTO
    Rooms (
        Id_room,
        Room_Name,
        Room_Building,
        Room_Campus,
        Room_Location,
        id_categoryid,
        id_stateid,
        is_reserved,
        event_time
    )
VALUES
    (
        'A101',
        101,
        'Building A',
        'République Campus',
        '2nd floor',
        1,
        1,
        FALSE,
        NULL
    ),
    (
        'B110',
        110,
        'Building B',
        'République Campus',
        '2nd floor',
        2,
        2,
        TRUE,
        '2023-09-20 14:00:00'
    ),
    (
        'E001',
        001,
        'Building E',
        'République Campus',
        '1st floor',
        2,
        2,
        TRUE,
        '2023-09-20 14:00:00'
    ),
    (
        'C001',
        001,
        'Building C',
        'République Campus',
        '1st floor',
        2,
        2,
        TRUE,
        '2023-09-20 14:00:00'
    ),
    (
        'K101',
        101,
        'Building K',
        'Gorki Campus',
        '2nd floor',
        2,
        2,
        TRUE,
        '2023-09-20 14:00:00'
    ),
    (
        'M201',
        201,
        'Building M',
        'Monod Campus',
        '3rd floor',
        1,
        3,
        FALSE,
        NULL
    );

INSERT INTO
    Groups (
        Id_group,
        Group_Creation,
        Group_Password,
        Group_Name,
        Group_Size,
        id_groupstateid
    )
VALUES
    (
        1,
        '2023-09-15',
        'AEZJFJZEF',
        'Studying Computer Science',
        5,
        1
    ),
    (
        2,
        '2023-09-16',
        'JDOIJSDOIJF',
        'Project Group',
        3,
        2
    ),
    (
        3,
        '2023-09-17',
        'AZEJOIJFZEF',
        'Maths Group',
        4,
        3
    );

INSERT INTO
    Reserve (Id_room, Id_user)
VALUES
    ('A101', 1),
    ('B110', 2),
    ('E001', 3);

INSERT INTO
    Belong (Id_user, Id_group)
VALUES
    (1, 1),
    (2, 2),
    (3, 3);

INSERT INTO
    Preferences (Id_user, Id_room)
VALUES
    (1, 'A101'),
    (2, 'B110'),
    (3, 'E001');