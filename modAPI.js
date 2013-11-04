(function () {
	//this is the default modding API module that is loaded as the first mod and provides convenience methods for other mods.
	//generally methods are added to the global object GDT.

	requireLoad(['mods/gdt-modAPI/api/topics.js'], ready);

	var ready = function () {


		//example
		//GDT.addTopics([
		//{
		//	id: "Assassin",
		//	name: "Assassin".localize("game topic"),
		//	genreWeightings: [1, 1, 1, .6, .6, .6],
		//	audienceWeightings: [0.6, 0.8, 1]
		//}
		//]);

	};
})();