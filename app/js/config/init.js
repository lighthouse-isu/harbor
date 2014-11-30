// config/init.js
// Application wide configuration parameters

function configService() {
    return {
        api: {
            // API version number
            version: 0.1,
            // Base URL for every outgoing request
            base: '/api/v0.1'
        }
    };
}

var config = angular.module('lighthouse.config', [])
    .factory('configService', configService);

module.exports = config;