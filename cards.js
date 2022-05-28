const effects = require('./effects');

class Card {
	constructor(cost, effect, name, selector){
		this.cost = cost;
		this.effect = effect;
		this.name = name;
		this.selector = selector;
	}
	get description(){
		let returnString = "";
		returnString += `${this.name} - ${this.cost} energy`;
		if(this.effect.damage) returnString += ` - ${this.effect.damage} damage`;
		if(this.effect.block) returnString += ` - ${this.effect.block} block`;
		if(this.effect.enemyEffects){
			for(let effect of this.effect.enemyEffects){
				returnString += ` - ${effect.amount} ${effect.name}`;
			}
		}
		return returnString;
	}
	dealDamage(enemy){
		return enemy.takeDamage(this.effect.damage);
	}
}

class Strike extends Card {
	constructor(){
		super(1, {damage: 5}, "Strike", true);
	}
	play(player, enemy){
		player.loseEnergy(this.cost);
		let result = this.dealDamage(enemy);
		return result;
	}
}

class Defend extends Card {
	constructor(){
		super(1, {block: 5}, "Defend", false);
	}
	play(player){
		player.loseEnergy(this.cost);
		return {block: player.gainBlock(this.effect.block)};
	}
}

class Bash extends Card {
	constructor(){
		super(2, {damage: 8, enemyEffects: [{name: "Vulnerable", amount: 2}]}, "Bash", true);
	}
	play(player, enemy){
		player.loseEnergy(this.cost);
		let result = this.dealDamage(enemy);
		let effectRes = enemy.addEffect(new effects.Vulnerable(2, enemy));
		return Object.assign(result, {enemyEffects: [effectRes]});
	}
}

// exports all classes
exports.Strike = Strike;
exports.Defend = Defend;
exports.Bash = Bash;