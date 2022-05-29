const discord = require('discord.js');

exports.send = function(text, message, title){
	let embed = new discord.MessageEmbed()
	if(title != undefined) embed.setTitle(title)
	embed.setColor(0x00AE86);
	embed.setDescription(text);
	message.channel.send({embeds: [embed]});
}

exports.shuffle = function(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

exports.arrayIndexOf = function(array, value, match){
	let number = parseInt(value);
	if(isNaN(number)){
		//try to find a card with a matching name
		for(let i = 0; i < array.length; i++){
			if(match(array[i], value)){
				number = i;
				break;
			};
		}
	}else number--;
	if(array[number] == undefined) return -1;
	return number;
}

exports.rand = function(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min)
}