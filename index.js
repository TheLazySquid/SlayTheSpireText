const { Client, Intents, Collection, Permissions, MessageActionRow, MessageAttachment, MessageEmbed } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.DIRECT_MESSAGES], partials: ["CHANNEL"] });
const fs = require('fs');
const cards = require('./classes/cards');
const playerClass = require('./classes/player');
const enemies = require('./classes/enemies');
const relics = require('./classes/relics');
const gameClass = require('./classes/game');
const {token} = require('./token');

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

//set up commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')).map(file => file.split('.')[0]);
var commands = {};
for(const file of commandFiles){
	const command = require(`./commands/${file}`);
	var aliases = command.aliases ?? [];
	commands[file] = command;
	for(let alias of aliases){
		commands[alias] = command;
	}
}

//initialize the game
var game = new gameClass.Game();
var player = new playerClass.Player();

var battleEnemies = []; 
let newEnemy = new enemies.Bug(player, battleEnemies);
battleEnemies.push(newEnemy);

for(let i = 0; i < 4; i++){
	player.deck.push(new cards.Strike());
	player.deck.push(new cards.Defend());
}
player.deck.push(new cards.Bash());
player.shuffleDeck();
player.stockHand();
player.addRelic(new relics.HealthRelic())

client.on('messageCreate', (message) => {
    if (message.author.bot) return;
    // if(message.channel.type == "DM") return;
	let args = message.content.split(" ");
	let commandName = args[0];
	args = args.slice(1);
	if(commandName in commands){
		commands[commandName].execute(args, message, player, battleEnemies, game);
	}else if(game.state == "battle"){
		//check if the command is the name of a card
		for(let i = 0; i < player.hand.length; i++){
			if(player.hand[i].name.toLowerCase() == commandName.toLowerCase()){
				commands["play"].execute([commandName].concat(args), message, player, battleEnemies, game);
				return;
			}
		}
	}else if(game.state == "rewards"){
		//check if the command is the name of a reward
		for(let i = 0; i < game.cardOptions.length; i++){
			if(game.cardOptions[i].name.toLowerCase() == commandName.toLowerCase()){
				commands["accept"].execute([commandName].concat(args), message, player, battleEnemies, game);
				return;
			}
		}
	}else if(game.state == "map"){
		//check if the command is a place to go
		if(["enemy", "merchant", "treasure", "elite", "rest", "boss", "1", "2", "3"].includes(commandName)){
			commands["go"].execute([commandName].concat(args), message, player, battleEnemies, game);
			return;
		}
	}
});

client.login(token);