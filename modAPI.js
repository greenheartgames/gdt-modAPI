(function () {
	//this is the default modding API module that is loaded as the first mod and provides convenience methods for other mods.
	//generally methods are added to the global object GDT.
	var ready = function () {
		//example calls

		//Examples.addTopic();
		//Examples.addPlatform();
		//Examples.addEvent();
		//Examples.addResearch();
		//Examples.addMarketing();
	};

	var error = function () {
	};

	GDT.loadJs(['mods/gdt-modAPI/helpers/checks.js',
	'mods/gdt-modAPI/api/persistence.js',
	'mods/gdt-modAPI/api/events.js',
	'mods/gdt-modAPI/api/platforms.js',
	'mods/gdt-modAPI/api/topics.js',
	'mods/gdt-modAPI/api/research.js',
	'mods/gdt-modAPI/api/Marketing.js',
	'mods/gdt-modAPI/examples/examples.js'
	], ready, error);
})();