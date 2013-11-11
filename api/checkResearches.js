var Check = {};
(function () {
	Checks.checkResearchV = function (obj, prop) {
		if (((prop == [1, 2, 4, 6, 8, 10, 12, 14]))) {
			Checks.error('wrong value for {0} found: {1}'.format(prop, obj[prop]));
		}
	};
})();