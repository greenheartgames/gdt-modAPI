(function () {
	GDT.addEvent = function (event) {
		if (!Checks.checkPropertiesPresent(event, ['id', 'notification']) 
			&& typeof event.notification !== 'function') {
			Checks.error('Invalid event object: ' + JSON.stringify(event));
			return;
		}
		if (!Checks.checkUniqueness(event, 'id', DecisionNotifications.modNotifications)) {
			Checks.error('Duplicate event ID: ' + event.id);
			return;
		}

		DecisionNotifications.modNotifications.push(event);
	}
})();
