(function () {
	GDT.addEvent = function (event) {
		if (!Checks.checkPropertiesPresent(event, ['id'])
			&& (event.notification || event.getNotification))
			return;
		if (!Checks.checkUniqueness(event, 'id', DecisionNotifications.modNotifications))
			return;

		DecisionNotifications.modNotifications.push(event);
	}
})();