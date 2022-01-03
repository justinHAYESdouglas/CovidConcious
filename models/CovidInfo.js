const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class covidInfo extends Model {};

covidInfo.init(
    {
        StateAbbr: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
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
            type: DataTypes.INTEGER,
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
            type: DataTypes.INTEGER,
            allowNull: true
        },
        InfectionRatePerCase: {
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
            type: DataTypes.INTEGER,
            allowNull: true
        },
        RiskLevel: {
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