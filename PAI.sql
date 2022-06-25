CREATE DATABASE Przetargi;

USE Przetargi;

CREATE TABLE Tender (
    Id INT NOT NULL AUTO_INCREMENT,
    Name VARCHAR(255) NOT NULL,
    Owner VARCHAR(255) NOT NULL,
    Description TEXT NOT NULL,
    Budget INT NOT NULL,
    StartDate DATETIME NOT NULL,
    EndDate DATETIME NOT NULL,
    PRIMARY KEY(Id)
);

CREATE TABLE Offer (
    Id INT NOT NULL AUTO_INCREMENT,
    Owner VARCHAR(255) NOT NULL,
    Price INT NOT NULL,
    SubmissionDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    TenderId INT NOT NULL,
    PRIMARY KEY(Id),
    FOREIGN KEY (TenderId) REFERENCES Tender(Id) ON DELETE CASCADE
);

INSERT INTO Tender (
    Name,
    Owner,
    Description,
    Budget,
    StartDate,
    EndDate
) VALUES (
    'Budowa drogi',
    'Gmina Adamów',
    "Budowa drogi o długości 5km w centrum miasta Adamów",
    1500000,
    '2022-05-23 12:00:00',
    '2022-10-23 23:59:59'
);

INSERT INTO Offer (
    Owner,
    Price,
    TenderId
) VALUES (
    'Budmax',
    '1200000',
    1
);

INSERT INTO Offer (
    Owner,
    Price,
    TenderId
) VALUES (
    'Budmim',
    '1000000',
    1
);
