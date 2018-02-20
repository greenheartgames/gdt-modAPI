(function () {
	/*
		adds topics to game.
		takes array of topic objects defined like
		{ 
			id: "Game Dev", //must be unique
			name: "Game Dev".localize("game topic"), //user-friendly name
			iconUrl: "",//GDT.getRelativePath() + "/images/myImage.png" (see documentation for details)
			genreWeightings: [.6, .7, .6, 1, .6, .8],  //genreWeightings (see documentation for details)
			audienceWeightings: [0.9, 1, 0.7]  //audienceWeightings (see documentation for details)
		}

		additional option property missionOverrides. Example:


	
		id's must be unique
		*/
	GDT.addTopics = function (values) {
		if (!values)
			return;
		//filter out invalid topics
		for (var i = 0; i < values.length; i++) {
			var t = values[i];
			if (!(Checks.checkPropertiesPresent(t, ['name', 'id', 'genreWeightings', 'audienceWeightings'])
				&& Checks.checkAudienceWeightings(t.audienceWeightings)
				&& Checks.checkGenreWeightings(t.genreWeightings)
				&& Checks.checkUniqueness(t, 'id', Topics.topics, true)
				&& Checks.checkUniqueness(t, 'name', Topics.topics, true)))
				continue;

			if (t.missionOverrides
				&& !Checks.checkMissionOverrides(t.missionOverrides)) {
				continue;
			}

			//add topic to game.
			Topics.topics.push(t);
		}
	};
})();