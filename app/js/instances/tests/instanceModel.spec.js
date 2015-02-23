describe('instanceModel', function () {

    var _ = require('lodash');
    var actions,
        flux,
        instanceModel;

    var containers = [{Id: 'one', a: 10, b: 100}, {Id: 'two', a: 20, b: 200}];

    beforeEach(function () {
        angular.mock.module('lighthouse.app');
        angular.mock.inject(function (_actions_, _flux_, _instanceModel_) {
            actions = _actions_;
            flux = _flux_;
            instanceModel = _instanceModel_;
        });
    });

    it('should store container summaries', function () {
        flux.dispatch(actions.listContainers, {response: containers});
        expect(instanceModel.getContainers()).toEqual(containers);
    });

    it('should store container details', function () {
        var detail = {Id: 'one', here: 'is', some: 'data'};
        flux.dispatch(actions.inspectContainer, {response: detail});
        expect(instanceModel.getContainer('one')).toEqual(detail);
    });
});