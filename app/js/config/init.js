// config/init.js
// Application wide configuration parameters

function configService() {
    return {
        api: {
            // API version number
            version: 0.2,
            // Base URL for every outgoing API request
            base: '/api/v0.2/'
        }
    };
}

var config = angular.module('lighthouse.config', [])
    .factory('configService', configService);

module.exports = config;