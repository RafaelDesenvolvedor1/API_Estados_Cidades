const env = process.env.NODE_ENV || 'configDB';

module.exports = require(`./config/${env}.js`);