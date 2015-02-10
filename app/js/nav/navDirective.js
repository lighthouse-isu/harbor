/*
 * navDirective
 * Allows for ngView like behavior on the global navigation.
 */
function navDirective() {
    return {
        'restrict': 'A',
        'controller': 'navController',
        'template': require('./templates/nav.html')
    };
}

module.exports = navDirective;