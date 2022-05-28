exports.execute = function(args, message, player, battleEnemies, gameState) {
	if(gameState != "battle") return message.channel.send("You can only use this command during a battle!");
	let playCard = args[0];
	if(!playCard) return message.channel.send("You must specify a card to play!");
	let cardNumber = parseInt(playCard);
	if(isNaN(cardNumber)){
		//try to find a card with a matching name
		for(let i = 0; i < player.hand.length; i++){
			if(player.hand[i].name.toLowerCase() == playCard.toLowerCase()){
				cardNumber = i;
				break;
			}
		}
	}else cardNumber--;
	if(player.hand[cardNumber] == undefined) return message.channel.send("You don't have that card in your hand!");
	if(player.hand[cardNumber].cost > player.energy) return message.channel.send("You don't have enough energy to play that card!");
	let result;
	if(player.hand[cardNumber].selector){
		//this is a selector card, so we need to select an enemy
		let enemyIndex = parseInt(args[1]);
		//if there's only one enemy, we can just use the first index
		if(battleEnemies.length == 1) enemyIndex = 0;
		else if(args[1] == undefined) return message.channel.send("You must specify an enemy to play this card on!");
		else if(isNaN(enemyIndex)){
			//try to find an enemy with a matching name
			for(let i = 0; i < battleEnemies.length; i++){
				if(battleEnemies[i].name.toLowerCase() == args[1].toLowerCase()){
					enemyIndex = i;
					break;
				}
			}
		}else enemyIndex--;
		if(battleEnemies[enemyIndex] == undefined) return message.channel.send("Enemy not found!");
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
	message.channel.send(returnString);

	//discard the card
	player.discardCard(cardNumber);
}