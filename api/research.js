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
	*/


	var checkResearchV = function (value) {
		if ([1, 2, 4, 6, 8, 10, 12, 14].indexOf(value) == -1) {
			Checks.error('wrong value v for research item: ' + value);
			return false;
		}
		return true;
	};

	var checkResearchItem = function (research) {
		if (!(Checks.checkPropertiesPresent(research, ['id', 'name', 'v', 'category', 'categoryDisplayName'])
			&& Checks.checkUniqueness(research, 'id', Research.getAllItems())
			&& checkResearchV(research.v)))
			return false;

		return true;
	};

	GDT.addResearchItem = function (research) {
		if (!checkResearchItem(research))
			return;

		Research.engineItems.push(research);
	};
})();