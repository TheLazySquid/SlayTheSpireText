const cards = require('../classes/cards');
const look = require('../commands/look');

exports.execute = function(message, player, battleEnemies, game) {
	game.state = "rewards";
	game.floor++;
	player.relics.postbattle.forEach(relic => {
		relic.activate(player);
	});
	//give the player gold
	player.gold += Math.ceil(Math.random() * 10)+10;
	//choose 3 random cards to reward the player
	game.generateCardOptions(3);
	game.generateNextPaths();
	look.execute([], message, player, battleEnemies, game);
}