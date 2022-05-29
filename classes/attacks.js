const effects = require('./effects');

class Attack {
	constructor(effect, name){
		this.effect = effect;
		this.name = name;
	}
	dealDamage(player){
		//return the amount of damage the player took
		return player.takeDamage(this.effect.damage);
	}
	gainBlock(enemy){
		return enemy.gainBlock(this.effect.block);
	}
}

class Chomp extends Attack {
	constructor(){
		super({damage: 5}, "Chomp");
	}
	play(player, enemy){
		//return the amount of damage that the player took
		return {damage: this.dealDamage(player)};
	}
}

class Defend extends Attack {
	constructor(){
		super({block: 7}, "Defend");
	}
	play(player, enemy){
		return {block: this.gainBlock(enemy)};
	}
}

class Weaken extends Attack {
	constructor(){
		super({playerEffects: [{name: "Vulnerable", amount: 2}]}, "Weaken");
	}
	play(player, enemy){
		return {playerEffects: [player.addEffect(new effects.Vulnerable(2, player))]};
	}
}

class Tounge extends Attack {
	constructor(){
		super({damage: 5, playerEffects: [{name: "Vulnerable", amount: 2}]}, "Tounge");
	}
	play(player, enemy){
		let dmg = this.dealDamage(player);
		let result = {playerEffects: [player.addEffect(new effects.Vulnerable(2, player))]}
		return Object.assign(dmg, result);
	}
}

class Heal extends Attack {
	constructor(){
		super({heal: 5}, "Heal");
	}
	play(player, enemy){
		return {heal: enemy.gainHealth(5)};
	}
}

exports.Chomp = Chomp;
exports.Defend = Defend;
exports.Weaken = Weaken;
exports.Tounge = Tounge;
exports.Heal = Heal;