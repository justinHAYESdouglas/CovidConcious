DROP DATABASE IF EXISTS livecheap_db;
CREATE DATABASE livecheap_db;

USE livecheap_db;

CREATE TABLE CovidInfo(
	StateAbbr varchar(20),
    Pop INT,
    TotalVacc INT,
    CompVacc INT,
    NewCases INT,
    Cases INT,
    DensityPerHundredThousand INT,
    InfectionRatePerCase INT,
    NewDeaths INT,
    Deaths INT,
    BedCap INT,
    BedUsageTotal INT,
    BedUsageCovid INT,
    ICUCap INT,
    ICUUsageTotal INT,
    ICUUsageCovid INT,
    ICUCapRatio INT,
    RiskLevel INT
);