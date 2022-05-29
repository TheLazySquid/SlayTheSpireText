const {send, arrayIndexOf} = require('../other/utils');
const look = require('./look');

exports.execute = function(args, message, player, battleEnemies, game) {
	if(game.state != "rewards") return send("You can't accept rewards now!", message);
	if(args.length == 0) return send("You must specify a card to accept!",);
	//check if the card is valid
	let cardName = args[0].toLowerCase();
	let cardIndex = arrayIndexOf(game.cardOptions, cardName, (card, input) => card.name.toLowerCase() == input.toLowerCase());
	if(cardIndex == -1) return send("Card not found!", message);

	//add the card to the player's deck
	player.deck.push(game.cardOptions[cardIndex]);
	send(`Added ${game.cardOptions[cardIndex].name} to your deck!`, message);
	game.state = "map";
	look.execute([], message, player, battleEnemies, game);
}