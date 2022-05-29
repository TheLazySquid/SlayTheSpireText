const {send} = require('../other/utils');

exports.execute = function(args, message, player, battleEnemies, game) {
	if(game.state == "map"){
		let returnString = "";
		for(let i = 0; i < game.nextPaths.length; i++){
			returnString += `${i + 1}. ${game.nextPaths[i]}\n`;
		}
		return send(returnString, message, "Where would you like to go?");
	}
	if(game.state == "rewards"){
		let returnString = "";
		for(let i = 0; i < game.cardOptions.length; i++){
			returnString += `${i+1}. ${game.cardOptions[i].description}\n`;
		}
		return send(returnString, message, "Choose a card to accept, or skip");
	}
	//describe the enemies intents
	let returnString = `${player.health}/${player.maxHealth} health - ${player.energy} energy - ${player.block} block - ${Object.keys(player.effects).length} effect(s)\n**enemies**\n`;
	for(let i = 0; i < battleEnemies.length; i++){
		returnString += `${i+1}: ${battleEnemies[i].name} - ${battleEnemies[i].health} health - ${battleEnemies[i].block} block - ${battleEnemies[i].intent}`;
		if(Object.keys(battleEnemies[i].effects).length > 0){
			returnString += ` - ${Object.keys(battleEnemies[i].effects).length} effect(s)`;
		}
		returnString += "\n";
	}
	//describe the player's hand
	if(player.hand.length == 0)  returnString += "**Your hand is empty!**";
	else{
		returnString += "**Your hand:**\n";
		for(let i = 0; i < player.hand.length; i++){
			returnString += `${i+1}: ${player.hand[i].description}\n`;
		}
	}
	send(returnString, message, "Current battle:");
}