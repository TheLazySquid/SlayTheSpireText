const discord = require('discord.js');
const {send} = require('../other/utils');

exports.execute = function(args, message, player, battleEnemies, game) {
	//send the player's deck
	let deckString = "";
	for(let i = 0; i < player.deck.length; i++){
		deckString += `${i+1}. ${player.deck[i].description}\n`;
	}
	send(deckString, message, "Your deck:");
}