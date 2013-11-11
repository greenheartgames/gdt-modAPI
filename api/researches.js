(function () {
	/* Format
	{
		id: "Better dialogues",
		name: "Better dialogues".localize(),
		v: 1,
		canResearch: function (company) {
			return LevelCalculator.getMissionLevel('Dialogs') > 2;
		},
		category: category,
		categoryDisplayName: categoryDisplayName
	};
	/*  */

	var checkResearch = function (research) {
		if (!(Checks.checkPropertiesPresent(research, ['id', 'name', 'v', 'category', 'categoryDisplayName'])
			&& Checks.checkUniqueness(research, 'id', Research.engineItems)
			&& Checks.checkResearchV(research, 'v')))
			return false;
			
		return true;
	};
	
	GDT.addResearch  = function (research) {
		if(checkResearch(research))
			return;
			
		Research.engineItems.push(research);
	};
})();