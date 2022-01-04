const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class covidInfo extends Model {};

covidInfo.init(
    {
        StateAbbr: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        Pop: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        TotalVacc: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        CompVacc: {
            type: DataTypes.DECIMAL(4, 3),
            allowNull: true
        },
        NewCases: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        Cases: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        DensityPerHundredThousand: {
            type: DataTypes.DECIMAL(5, 1),
            allowNull: true
        },
        InfectionRateRl: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        DensityRl: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        ContactTracersRl: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        PositiveRatioRl: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        ICUCapRatRl: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        NewDeaths: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        Deaths: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        BedCap: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        BedUsageTotal: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        BedUsageCovid: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        ICUCap: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        ICUUsageTotal: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        ICUUsageCovid: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        ICUCapRatio: {
            type: DataTypes.DECIMAL(3, 2),
            allowNull: true
        },
        RiskLevelRl: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        // underscored: true,
        modelName: 'covidInfo',
    }
);

module.exports = covidInfo;