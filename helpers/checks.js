var Checks = {};
(function () {
	//helper methods to perform common checks

	Checks.error = function (m) {
		try {
			throw new Error(m);
		}
		catch (e) {
			Logger.LogModError(m, e, "A mod caused an error");
		}
	}

	Checks.checkAudienceWeightings = function (w) {
		if (!w || w.length < 3 || w.some(function (v) { return v < 0 || v > 1; })) {
			Checks.error('audience weigthing is invalid: {0}'.format(w));
			return false;
		}
		return true;
	};

	Checks.checkGenreWeightings = function (w) {
		if (!w || w.length < 6 || w.some(function (v) { return v < 0 || v > 1; })) {
			Checks.error('genre weigthing is invalid: {0}'.format(w));
			return false;
		}
		return true;
	};

	Checks.checkMissionOverrides = function (missionOverrides) {
		if (missionOverrides.length < 6
			|| missionOverrides.some(function (overrides) {
				return overrides.length < 6
					|| overrides.some(function (w) { return w > 1 || w < 0; });
		})) {
			Checks.error('invalid missionOverrides: {0}'.format(missionOverrides));
			return false;
		}
		return true;
	};

	Checks.checkDate = function (date) {
		//date is format y/m/w
		if (date && date.split) {
			var values = date.split("/");
			if (values && values.length == 3) {
				if (!values.some(function (v) { return v < 1; })) {
					if (values[1] <= 12
						&& values[2] <= 4) {
						return true;
					}
				}
			}
		}
		Checks.error('date invalid: {0}'.format(date));
		return false;
	};


	//dynamically check wether a property is present on obj
	Checks.checkPropertiesPresent = function (obj, props) {
		if (!obj)
			return false;
		if (!props)
			return true;
		for (var i = 0; i < props.length; i++) {
			var p = props[i];
			if (!p || p.length < 1)
				continue;
			if (!obj.hasOwnProperty(p)) {
				Checks.error('property not set on object: {0}'.format(p));
				return false;
			}
		}
		return true;
	};

	Checks.checkUniqueness = function (obj, prop, values, ignoreError) {
		var unique = !values.some(function (v) { return v[prop] == obj[prop]; });
		if (!unique && !ignoreError) {
			Checks.error('duplicate value for {0} found: {1}'.format(prop, obj[prop]));
		}
		return unique;
	};
})();