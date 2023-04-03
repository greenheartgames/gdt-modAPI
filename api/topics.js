// Add topics to game.
// Takes an array of topic objects defined like:
// { 
//    id: "Game Dev", // Must be unique
//    name: "Game Dev".localize("game topic"), // User-friendly name
//    iconUrl: "", // GDT.getRelativePath() + "/images/myImage.png" (see documentation for details)
//    genreWeightings: [.6, .7, .6, 1, .6, .8], // genreWeightings (see documentation for details)
//    audienceWeightings: [0.9, 1, 0.7] // audienceWeightings (see documentation for details)
//    missionOverrides: { ... } // Optional overrides for missions (see documentation for details)
// }
// Id's must be unique.
function addTopics(values) {
  const validTopics = values.filter(t => (
    Checks.checkPropertiesPresent(t, ['name', 'id', 'genreWeightings', 'audienceWeightings']) &&
    Checks.checkAudienceWeightings(t.audienceWeightings) &&
    Checks.checkGenreWeightings(t.genreWeightings) &&
    Checks.checkUniqueness(t, 'id', Topics.topics, true) &&
    Checks.checkUniqueness(t, 'name', Topics.topics, true) &&
    (!t.missionOverrides || Checks.checkMissionOverrides(t.missionOverrides))
  ));

  Topics.topics.push(...validTopics);
}

(function () {
  GDT.addTopics = addTopics;
})();
