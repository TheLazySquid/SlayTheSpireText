exports.execute = function(args, message, player, battleEnemies) {
	if(args.length == 0 || args[0] == "player"){
		//send the player's effects
		let returnString = "**Your effects:**\n";
		for(let effect in player.effects){
			returnString += `${player.effects[effect].amount} ${player.effects[effect].name}\n`;
		}
		message.channel.send(returnString);
	}else{
		//check if the enemy exists
		let enemyName = args[0];
		//check if it's a number
		enemyName = parseInt(enemyName);
		if(isNaN(enemyName)){
			//check if it's a name
			let enemyIndex = battleEnemies.findIndex(enemy => enemy.name.toLowerCase() == args[0].toLowerCase());
			if(enemyIndex != -1){
				let returnString = "**" + battleEnemies[enemyIndex].name + "'s effects:**\n";
				for(let effect in battleEnemies[enemyIndex].effects){
					returnString += `${battleEnemies[enemyIndex].effects[effect].amount} ${battleEnemies[enemyIndex].effects[effect].name}\n`;
				}
				message.channel.send(returnString);
			}else{
				message.channel.send("That enemy doesn't exist!");
			}
		}else{
			//check if it's a valid index
			enemyName--;
			if(battleEnemies[enemyName] == undefined){
				message.channel.send("That enemy doesn't exist!");
			}else{
				let returnString = "**" + battleEnemies[enemyName].name + "'s effects:**\n";
				for(let effect in battleEnemies[enemyName].effects){
					returnString += `${battleEnemies[enemyName].effects[effect].amount} ${battleEnemies[enemyName].effects[effect].name}\n`;
				}
				message.channel.send(returnString);
			}
		}
	}
}