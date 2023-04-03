(function () {

	var stores = {};

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

	var modData;
	GDT.on(GDT.eventKeys.saves.loading, function (e) {
		var data = e.data;
		modData = data.modData = data.modData || {};
		for (var id in modData) {
			GDT.getDataStore(id).data = modData[id];
		}
	});

	GDT.on(GDT.eventKeys.saves.saving, function (e) {
		var data = e.data;
		modData = data.modData = data.modData || {};
		for (var id in stores) {
			if (id in stores) {
				modData[id] = stores[id].data;
			}
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
