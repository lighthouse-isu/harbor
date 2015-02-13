/*
 * userModel.js
 * Stores state related to a particular user
 */

function userModel() {
    return {
        // State
        Email: '',

        // Event handlers
        handlers: {
          'listUsers': 'listUsers'
        },

        listUsers: function (r) {
            this.users = r.response;
            this.emitChange();
        },

        // State access
        exports: {
            getUsers: function () {
                return this.users;
            }
        }
    };
}

module.exports = userModel;
