exports.execute = function(message, player, battleEnemies, gameState) {
	gameState = "rewards";
	player.restoreEnergy();
	player.clearHand();
	player.shuffleDeck();
	player.stockHand();
	player.relics.postbattle.forEach(relic => {
		relic.activate(player);
	});

}