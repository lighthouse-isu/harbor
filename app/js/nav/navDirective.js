/*
 * navDirective
 * Allows for ngView like behavior on the global navigation.
 */
function navDirective() {
    return {
        'controller': 'navController',
        'template': require('./templates/nav.html')
    };
}

module.exports = navDirective;