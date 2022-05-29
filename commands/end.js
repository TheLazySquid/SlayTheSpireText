const look = require('./look');
const endBattle = require('../other/battleend');
const {send} = require('../other/utils');

exports.execute = function(args, message, player, battleEnemies, game) {
	if(game.state != "battle") return send("You can only use this command during a battle!", message);
	if(battleEnemies.length == 0){
		endBattle.execute(message, player, battleEnemies, game);
		return;
	}
	player.restoreEnergy();
	player.discardHand();
	player.stockHand();
	let totalDamage = 0;
	//trigger all the effect's passive
	for(let i = 0; i < battleEnemies.length; i++){
		for(let effect in battleEnemies[i].effects){
			battleEnemies[i].effects[effect].update();
		}
	}
	//trigger all the player's effect's passive
	for(let effect in player.effects){
		player.effects[effect].update();
	}
	let turnMessage = "**Turn ended!**\n";
	for(let i = 0; i < battleEnemies.length; i++){
		let effect = battleEnemies[i].playAttack()
		if(effect.block){
			turnMessage += `${battleEnemies[i].name} gained ${effect.block} block!\n`;
		}
		if(effect.playerEffects){
			for(let j = 0; j < effect.playerEffects.length; j++){
				turnMessage += `${battleEnemies[i].name} gave you ${effect.playerEffects[j].amount} ${effect.playerEffects[j].name}!\n`;
			}
		}
		if(effect.heal){
			turnMessage += `${battleEnemies[i].name} healed for ${effect.heal} health!\n`;
		}
		totalDamage += effect.damage;
		battleEnemies[i].cycleAttacks();
	}
	if(totalDamage > 0){
		turnMessage += `you took ${totalDamage} damage!\n`;
	}
	//remove all block
	for(let i = 0; i < battleEnemies.length; i++){
		battleEnemies[i].clearBlock();
	}
	player.clearBlock();
	
	send(turnMessage, message);
	look.execute(args, message, player, battleEnemies, game);
}