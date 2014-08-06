(function () {

	var stores = {};

	/*
	provides data access to save game data and settings.
	usage:

	var store = GDT.getDataStore("myPluginId");
	store.data["key"]=value; //save game specific settings
	store.settings["key"]=value; //app-wide settings
	*/
	GDT.getDataStore = function (pluginId) {
		if (stores.hasOwnProperty(pluginId))
			return stores[pluginId];

		if (!DataStore.settings.modData)
			DataStore.settings.modData = {};

		if (!DataStore.settings.modData[pluginId])
			DataStore.settings.modData[pluginId] = {};

		var obj = {
			data: {},
			settings: DataStore.settings.modData[pluginId]
		};

		stores[pluginId] = obj;

		return obj;
	};

	//set data property in all stores to modData[plugin-id] value when loading a save game.
	GDT.on(GDT.eventKeys.saves.loading, function (e) {
		var data = e.data;
		var modData = data['modData'];
		if (!modData) {
			modData = data.modData = {};
		}
		for (var id in modData) {//where item is the id of a plugin
			if (modData.hasOwnProperty(id)) {
				GDT.getDataStore(id).data = modData[id];
			}
		}
	});

	//set data property of all existing mod stores to modData[plugin-id] when saving a game.
	GDT.on(GDT.eventKeys.saves.saving, function (e) {
		var data = e.data;
		var modData = data['modData'];
		if (!modData) {
			modData = data.modData = {};
		}
		for (var id in stores) {
			if (!stores.hasOwnProperty(id))
				continue;
			modData[id] = stores[id].data;
		}
	});

	GDT.on(GDT.eventKeys.saves.newGame, function (e) {
		for (var key in stores) {
			if (stores.hasOwnProperty(key)) {
				stores[key].data = {};
			}
		}
	});

})();