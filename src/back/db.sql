CREATE TABLE IF NOT EXISTS link(
    id int(10) PRIMARY KEY AUTO_INCREMENT,
    url varchar(255),
    header varchar(255)
);

CREATE TABLE IF NOT EXISTS guest(
    id int(10) PRIMARY KEY AUTO_INCREMENT,
    linkId int(10),
    name varchar(255),
    surname varchar(255),
    secondName varchar(255),
    transfer bit,
    food varchar(255),
    alcohole varchar(255),
    hasChild bit,
    approved bit,

    FOREIGN KEY (linkId) REFERENCES link(id)
    
);

CREATE TABLE IF NOT EXISTS child(
    id int(10) PRIMARY KEY AUTO_INCREMENT,
    guestId int(10),
    name varchar(255),
    age int(2),
    FOREIGN KEY (guestId) REFERENCES guest(id)
);

CREATE TABLE IF NOT EXISTS neighbour(
    id int PRIMARY KEY AUTO_INCREMENT,
    guestId int(10),
    neighbourId int(10),
    FOREIGN KEY (guestId) REFERENCES guest(id),
    FOREIGN KEY (neighbourId) REFERENCES guest(id),
    UNIQUE (guestId, neighbourId)
);