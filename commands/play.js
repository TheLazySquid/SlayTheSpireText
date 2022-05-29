const {send, arrayIndexOf} = require('../other/utils');

exports.execute = function(args, message, player, battleEnemies, game) {
	if(game.state != "battle") return send("You can only use this command during a battle!", message);
	//check that the card the player wants to use is in their hand
	let playCard = args[0];
	if(!playCard) return send("You must specify a card to play!", message);
	let cardNumber = arrayIndexOf(player.hand, playCard, (card, input) => card.name.toLowerCase() == input.toLowerCase());
	if(cardNumber == -1) return send("You don't have a card called " + playCard + "!", message);
	if(player.hand[cardNumber].cost > player.energy) return send("You don't have enough energy to play that card!", message);

	let result;
	if(player.hand[cardNumber].selector){
		//this is a selector card, so we need to select an enemy
		let enemyIndex = parseInt(args[1]);
		//if there's only one enemy, we can just use the first index
		if(battleEnemies.length == 1) enemyIndex = 0;
		else if(args[1] == undefined) return send("You must specify an enemy to play this card on!", message);
		else{
			enemyIndex = arrayIndexOf(battleEnemies, args[1], (enemy, input) => enemy.name.toLowerCase() == input.toLowerCase());
		}
		if(battleEnemies[enemyIndex] == undefined) return send("Enemy not found!", message);
		result = player.play(cardNumber, battleEnemies[enemyIndex]);

	}else{
		result = player.play(cardNumber)
	}
	//make a response based on what was sent back
	let returnString = `Used ${player.hand[cardNumber].name}!\n`;
	if(result.damage) returnString += `Dealt ${result.damage} damage!\n`;
	if(result.blockRemoved) returnString += `Removed ${result.blockRemoved} block!\n`;
	if(result.dies){
		for(let i = 0; i < result.dies.length; i++){
			returnString += `${result.dies[i]} died!\n`;
		}
	}else if(result.damage){
		for(let i = 0; i < battleEnemies.length; i++){
			returnString += `${battleEnemies[i].name} has ${battleEnemies[i].health} health!\n`;
		}
	}
	if(result.block) returnString += `Gained ${result.block} block!\n`;
	if(result.enemyEffects){
		for(let i = 0; i < result.enemyEffects.length; i++){
			returnString += `${result.enemyEffects[i].amount} ${result.enemyEffects[i].name} applied!\n`;
		}
	}
	send(returnString, message);

	//discard the card
	player.discardCard(cardNumber);
}