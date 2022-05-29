const {send, arrayIndexOf, rand} = require('../other/utils');
const enemies = require('../classes/enemies');
const look = require('./look');

exports.execute = function(args, message, player, battleEnemies, game) {
	if(game.state != "map") send("You can't go anywhere!", message);
	//determine where the player is going
	let goToIndex = arrayIndexOf(game.nextPaths, args[0], (path, input) => path.toLowerCase() == input.toLowerCase());
	if(goToIndex == -1) return send("Invalid direction!", message);
	let goTo = game.nextPaths[goToIndex];

	//generate the next encounter
	battleEnemies = [];
	game.rooms[goTo][rand(0, game.rooms[goTo].length - 1)].forEach(enemy => {
		battleEnemies.push(new enemies[enemy](player, battleEnemies));
	});

	//start the battle
	game.state = "battle";
	player.
	look.execute([], message, player, battleEnemies, game);
}