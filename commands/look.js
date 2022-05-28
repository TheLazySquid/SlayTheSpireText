exports.execute = function(args, message, player, battleEnemies, gameState) {
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
	message.channel.send(`${returnString}`);
}