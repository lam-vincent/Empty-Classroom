-- @block
CREATE TABLE Users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    bio TEXT,
    county TEXT,
);

-- @block