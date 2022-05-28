const effects = require('./effects');

class Attack {
	constructor(damage, block, name){
		this.damage = damage;
		this.block = block;
		this.name = name;
	}
	dealDamage(player){
		//return the amount of damage the player took
		return player.takeDamage(this.damage);
	}
	gainBlock(enemy){
		return enemy.gainBlock(this.block);
	}
}

class Chomp extends Attack {
	constructor(){
		super(5, 0, "Chomp");
	}
	play(player, enemy){
		//return the amount of damage that the player took
		return {damage: this.dealDamage(player)};
	}
}

class Defend extends Attack {
	constructor(){
		super(0, 7, "Defend");
	}
	play(player, enemy){
		return {block: this.gainBlock(enemy)};
	}
}

class Weaken extends Attack {
	constructor(){
		super(0, 0, "Weaken");
	}
	play(player, enemy){
		return {playerEffects: [player.addEffect(new effects.Vulnerable(2, player))]};
	}
}

exports.Chomp = Chomp;
exports.Defend = Defend;
exports.Weaken = Weaken;