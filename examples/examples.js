var Examples = {};
(function () {
	Examples.addTopic = function () {
		GDT.addTopics([
		{
			id: "Assassin",
			name: "Assassin".localize("game topic"),
			genreWeightings: [1, 1, 1, .6, .6, .6],
			audienceWeightings: [0.6, 0.8, 1]
		}
		]);
	};

	Examples.addPlatform = function () {
		var icon = GDT.getRelativePath() + '/examples/img/greenheartOne.png';
		GDT.addPlatform(
			{
				id: 'Greenheart One',
				name: 'Greenheart One',
				company: 'Greenheart Games',
				startAmount: 0.15,
				unitsSold: 0.358,
				licencePrize: 5000,
				published: '1/3/4',
				platformRetireDate: '4/6/2',
				developmentCosts: 10000,
				genreWeightings: [0.9, 1, 1, 0.9, 1, 0.7],
				audienceWeightings: [0.9, 1, 0.8],
				techLevel: 1,
				iconUri: icon,
				events: [
					{
						id: '10537DA1-58F1-4F23-8854-F1E2621933BF',
						date: '1/2/1',
						getNotification: function (company) {
							return new Notification({
								header: "Industry News".localize(),
								text: "Coming out of nowhere a company called Greenheart Games has announced that it will publish a new game console called the Greenheart One {0}.".localize().format(General.getETADescription('1/2/1', '1/3/4')),
								image: icon
							});
						}
					}
				]
			});
	};

	Examples.addEvent = function () {
		/*
		example event:
		when does it fire: random event, only in the first office when a game is in development
		what happens: neighbours kid spies on game dev, resulting in several options.
		*/

		var eventId = "F413351E-2108-4967-A989-A7E98D4DEED5";//any string, but needs to be globally unique

		var myRandomEvent = {
			id: eventId,
			isRandom: true, //if you want to test this event, you can set this to false and it will trigger during dev. of the first game.
			maxTriggers: 1,
			trigger: function (company) {
				//only in first office and only while a game is in development.
				//most events that fire during game-dev work better if they don't fire right at the start or right at the end, that's why we use isGameProgressBetween
				return company.currentLevel == 1 && company.isGameProgressBetween(0.2, 0.9);
			},
			//because we dynamically create the notification every time the event triggers, we use getNotification
			getNotification: function (company) {
				var game = company.currentGame;

				var msg = "It seems that kids in the neighbourhood have started chatting about your upcoming game {0}. Rumour has it, that Billy, your neighbours kid, snuck into the garage and spied on some of the design papers.{n}How he managed to do this is a mystery. You could swear you were sitting in the garage the entire time!\nHow do you want to react?\n\nYou could talk to the parents to get him punished, ignore the incident or maybe invite some of the neighbours over to show them more of the game."
					.localize().format(game.title);
				//notice how we break up the story in two screens by using {n}. This creates a better flow than having one longer block of text.
				//Also, since this is a story with multiple options and the buttons can only hold a small amount of text, we explain the options beforehand.

				//the chatting among kids, creates a bit of hype.
				//since the event isn't delayed we can do this directly on the company, otherwise we could call adjustHype() on the notification object to schedule the effect with the notification.
				company.adjustHype(5 + 10 * company.getRandom());//increase hype between 5 and 15.

				return new Notification({
					sourceId: eventId,//this is important, otherwise nothing will happen when the player selects an option.
					header: "Billy, the kid".localize(),//granted, this is a silly header.
					text: msg,
					options: ["Talk to parents".localize(), "Ignore incident".localize(), "Invite over".localize()]//maximum of three choices
				});
			},
			complete: function (decision) {
				//decision is a number and will correspond to the index of the option that was chosen.
				//0=talk to parents, 1=ignore incident, 2=invite over
				//it's best if every decision has a different outcome

				var company = GameManager.company;//we fetch the company object for use later.

				if (decision === 0) {//talk to parents
					//we create a new, simple notification to tell the outcome. no sourceId or options are necessary this time.
					var n = new Notification({
						header: "Billy, the kid".localize(),//keep the header consistent with the prior part of the story
						text: "You talk to the parents about Billy's actions and they promise it won't happen again.".localize()
					});
					n.adjustHype(5 + 10 * company.getRandom());//increase hype between 5 and 15.

					company.activeNotifications.addRange(n.split()); //since this notificaton should be shown immediately (not one second later) we insert it into activeNotifications. calling .split() ist just good practice in case we use {n} inside the notification.
					return;
				}
				if (decision === 1) {//ignore incident
					//nothing happens at first, but in a few weeks Billy again breaks in...
					var n = new Notification({
						header: "Vanished documents".localize(),
						text: "You were working on some intricate design documents the other day but now you can't find them anymore. Small foot prints on the floor suggest that someone might have taken them.\nUnfortunately you have to recreate the documents (-500 cr.) - This might have been Billy's work".localize(),
						weeksUntilFired: 1 + 2 * company.getRandom()
					});
					n.adjustCash(-500, "restoring documents");
					company.notifications.push(n);//this notification isn't shown immediately so we add it to the normal company.notifications array.
					return;
				}
				if (decision === 2) {//invite him over
					var n = new Notification({
						header: "Billy, the kid".localize(),//keep the header consistent with the prior part of the story
						text: "You invite Billy, his parents and a couple of other interested neighbours over and show them the game in-progress. The kids are super-excited and for weeks you hear them talk about it afterwards.".localize()
					});
					n.adjustHype(15 + 25 * company.getRandom());//increase hype between 15 and 40
					company.activeNotifications.addRange(n.split()); //since this notificaton should be shown immediately (not one second later) we insert it into activeNotifications. calling .split() ist just good practice in case we use {n} inside the notification.
					return;
				}
			}
		};

		GDT.addEvent(myRandomEvent);
	};

	Examples.addResearch = function () {
		GDT.addResearchItem(
		{
			id: "Swift Loading", //Must be unique
			name: "Swift loading".localize(), //Display name
			v: 4, //Tech level
			canResearch: function (company) {
				return LevelCalculator.getMissionLevel('Level Design') > 5 //The "Level Design" level has to be at least 6
			},
			category: "Level Design",
			categoryDisplayName: "Level Design".localize()
		});
	};
})();