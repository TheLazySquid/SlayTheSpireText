const { Client, Intents, Collection, Permissions, MessageActionRow, MessageAttachment, MessageEmbed } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.DIRECT_MESSAGES], partials: ["CHANNEL"] });
const fs = require('fs');
const cards = require('./cards');
const playerClass = require('./player');
const enemies = require('./enemies');
const relics = require('./relics');
const {token} = require('./token');


client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')).map(file => file.split('.')[0]);
var commands = {};
for(const file of commandFiles){
	const command = require(`./commands/${file}`);
	commands[file] = command;
}

//initialize the game
var gameState = "battle";
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
    if(message.channel.type == "DM") return;
	let args = message.content.split(" ");
	let commandName = args[0];
	args = args.slice(1);
	if(commandFiles.includes(commandName)){
		commands[commandName].execute(args, message, player, battleEnemies, gameState);
	}else{
		//check if the command is the name of a card
		for(let i = 0; i < player.hand.length; i++){
			if(player.hand[i].name.toLowerCase() == commandName.toLowerCase()){
				commands["play"].execute([commandName].concat(args), message, player, battleEnemies, gameState);
				return;
			}
		}
	}
});

client.login(token);