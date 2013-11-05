(function () {

	var checkPlatform = function (platform) {
		if (!(Checks.checkPropertiesPresent(platform, ['id', 'name', 'startAmount', 'unitsSold', 'licencePrize', 'published', 'platformRetireDate', 'developmentCosts', 'genreWeightings', 'audienceWeightings', 'techLevel', 'iconUri'])
			&& Checks.checkUniqueness(platform, 'id', Platforms.allPlatforms)
			&& Checks.checkAudienceWeightings(platform.audienceWeightings)
			&& Checks.checkGenreWeightings(platform.genreWeightings)))
			return false;

		if (!(Checks.checkDate(platform.published)
			&& Checks.checkDate(platform.platformRetireDate)))
			return false;

		if (platform.marketPoints) {
			for (var i = 0; i < platform.marketPoints.length; i++) {
				if (!Checks.checkDate(platform.marketPoints[i].date))
					return false;
			}
		}

		return true;
	};


	GDT.addPlatform = function (platform) {
		if (!checkPlatform(platform))
			return;

		Platforms.allPlatforms.push(platform);
		if (platform.events) {
			for (var i = 0; i < platform.events.length; i++) {
				GDT.addEvent(platform.events[i]);
			}
		}
	};
})();