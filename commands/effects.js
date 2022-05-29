const {send, arrayIndexOf} = require('../other/utils');

exports.execute = function(args, message, player, battleEnemies, game) {
	if(game.state != "battle") return send("You can only use this during a battle!", message);
	if(args.length == 0 || args[0] == "player"){
		//send the player's effects
		let returnString = "";
		for(let effect in player.effects){
			returnString += `${player.effects[effect].amount} ${player.effects[effect].name}\n`;
		}
		send(returnString, message, "Your effects:");
	}else{
		let enemyIndex = arrayIndexOf(battleEnemies, args[0], (enemy, input) => enemy.name.toLowerCase() == input.toLowerCase());
		if(enemyIndex == -1) return send("Enemy not found!", message);
		//send the enemy's effects
		let returnString = "";
		for(let effect in battleEnemies[enemyIndex].effects){
			returnString += `${battleEnemies[enemyIndex].effects[effect].amount} ${battleEnemies[enemyIndex].effects[effect].name}\n`;
		}
		send(returnString, message, `${battleEnemies[enemyIndex].name}'s effects:`);
	}
}
exports.aliases = ["buffs", "buff"];