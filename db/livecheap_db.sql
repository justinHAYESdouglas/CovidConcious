DROP DATABASE IF EXISTS livecheap_db;
CREATE DATABASE livecheap_db;

USE livecheap_db;

CREATE TABLE CovidInfo(
	Id INT,
	StateAbbr varchar(20),
    Pop INT,
    TotalVacc INT,
    CompVacc DECIMAL(4, 3),
    NewCases INT,
    Cases INT,
    DensityPerHundredThousand DECIMAL(5, 1),
    InfectionRatePerCase DECIMAL(4, 2),
    NewDeaths INT,
    Deaths INT,
    BedCap INT,
    BedUsageTotal INT,
    BedUsageCovid INT,
    ICUCap INT,
    ICUUsageTotal INT,
    ICUUsageCovid INT,
    ICUCapRatio DECIMAL(3, 2),
    RiskLevel INT
);