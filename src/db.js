const Sequelize = require('sequelize');
const config = require('./environmentConfig');



let sequelize = null;

const {
    db: {database, username, password, params}
} = config;

module.exports = () => {
    if(!sequelize){
        sequelize = new Sequelize(
            database,
            username, 
            password,
            params
        );
    }

    return sequelize;
}