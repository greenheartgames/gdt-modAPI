(function () {
	//this is the default modding API module that is loaded as the first mod and provides convenience methods for other mods.
	//generally methods are added to the global object GDT.
	var ready = function () {
		//example calls

		//Examples.addTopic();
		//Examples.addPlatform();
		//Examples.addEvent();
		//Examples.addResearch();
	};

	var error = function () {
	};

	GDT.loadJs(['helpers/checks.js',
	'api/persistence.js',
	'api/events.js',
	'api/platforms.js',
	'api/topics.js',
	'api/research.js',
	'examples/examples.js'
	], ready, error);
})();