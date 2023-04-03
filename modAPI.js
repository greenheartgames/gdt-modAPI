const modAPI_GreenheartGames = {};

(() => {
  modAPI_GreenheartGames.path = GDT.getRelativePath();
  const ready = () => {
    // Example calls
    // Examples.addTopic();
    // Examples.addPlatform();
    // Examples.addEvent();
    // Examples.addResearch();
  };
  const error = () => {};

  const scripts = [
    'helpers/checks.js',
    'api/persistence.js',
    'api/events.js',
    'api/platforms.js',
    'api/topics.js',
    'api/research.js',
    'examples/examples.js',
  ];

  Promise.all(
    scripts.map(script => GDT.loadJs(`${modAPI_GreenheartGames.path}/${script}`))
  ).then(ready).catch(error);
})();
