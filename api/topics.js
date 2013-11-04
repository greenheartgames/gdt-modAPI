(function () {
	/*
		adds topics to game.
		takes array of topic objects defined like
		{ 
			id: "Game Dev", //must be unique
			name: "Game Dev".localize("game topic"), //user-friendly name
			genreWeightings: [.6, .7, .6, 1, .6, .8],  //genreWeightings (see documentation for details)
			audienceWeightings: [0.9, 1, 0.7]  //audienceWeightings (see documentation for details)
		}

		additional option property missionOverrides. see wiki for example and explanation.
	
		id's must be unique
		*/
	GDT.addTopics = function (values) {
		if (!values)
			return;
		//filter out invalid topics
		for (var i = 0; i < values.length; i++) {
			var t = values[i];
			//check must-have properties
			if (t.id && t.name && t.genreWeightings && t.audienceWeightings) {
				if (Topics.topics.some(function (t2) { return t2.id == t.id; })) {
					Logger.LogInfo('skipping topic ({0}). topic with id already present'.format(t.id));
					continue;
				}
				if (t.genreWeightings.length < 6
					|| t.genreWeightings.some(function (w) { return w > 1 || w < 0; })) {
					Logger.LogInfo('skipping topic ({0}). invalid genreWeightings'.format(t.id));
					continue;
				}
				if (t.audienceWeightings.length < 3
					|| t.audienceWeightings.some(function (w) { return w > 1 || w < 0; })) {
					Logger.LogInfo('skipping topic ({0}). invalid audienceWeightings'.format(t.id));
					continue;
				}
				if (t.missionOverrides) {
					if (t.missionOverrides.length < 6 
						|| t.missionOverrides.some(function (overrides) {
							return overrides.length < 9
								|| overrides.some(function (w) { return w > 1 || w < 0; });
					})) {
						Logger.LogInfo('skipping topic ({0}). invalid missionOverrides'.format(t.id));
						continue;
					}
				}

				//add topic to game.
				Topics.topics.push(t);
			}
		}
	};
})();
