(function () {
	var checkPlatform = function (platform) {
		if (!(
			Checks.checkPropertiesPresent(platform, ['id', 'name', 'startAmount', 'unitsSold', 'licencePrize', 'published', 'platformRetireDate', 'developmentCosts', 'genreWeightings', 'audienceWeightings', 'techLevel', 'iconUri'])
			&& Checks.checkAudienceWeightings(platform.audienceWeightings)
			&& Checks.checkGenreWeightings(platform.genreWeightings)
			&& Checks.checkDate(platform.published)
			&& Checks.checkDate(platform.platformRetireDate)
			&& Checks.checkUniqueness(platform, 'id', Platforms.allPlatforms)
			&& (platform.marketPoints ? platform.marketPoints.every(function(mp) { return Checks.checkDate(mp.date) }) : true)
		)) {
			return false;
		}

		return true;
	};

	GDT.addPlatform = function (platform) {
		if (!checkPlatform(platform))
			return;

		Platforms.allPlatforms.push(platform);

		var events = platform.events;
		if (events) {
			for (var i = 0, l = events.length; i < l; i++) {
				GDT.addEvent(events[i]);
			}
		}
	};
})();
