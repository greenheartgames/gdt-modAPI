(function () {

	//Example for Custom Marketing

	// 	id: "MagazineMarketing",
	//	name: "Advertise in Magazines".localize(),
	//	shortName: "Magazines".localize("short name"),
	//	description: "Advertise in gaming magazines to get the game well known before it hits the shelves.".localize(),
	// 	marketingFactor: 0.5,
	// 	cost: 5E4

	var checkMarketing = function (Marketing) {
		if (!(Checks.checkPropertiesPresent(Marketing, ['id', 'name', 'shortName', 'description','marketingFactor', 'cost'])
			&& Checks.checkUniqueness(Marketing, 'id', Missions.MarketingMissions))
			&& Marketing.marketingFactor <= 0)
			return false;

		return true;
	};

	GDT.addMarketing = function (Marketing) {
		if (!checkMarketing(Marketing))
			return;

		Missions.MarketingMissions.push(Marketing);
	};
})();