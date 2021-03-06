const attacks = require('./attacks');

class Enemy {
	constructor(player, health, name, battleEnemies){
		this.health = health;
		this.block = 0;
		this.player = player;
		this.nextAttackIndex = 0;
		this.name = name;
		this.battleEnemies = battleEnemies;
		this.effects = {};
	}
	get nextAttack(){
		return this.attacks[this.nextAttackIndex];
	}
	get intent(){
		let returnMessage = `intends to ${this.nextAttack.name}`;
		let effects = [];
		if(this.nextAttack.effect.damage) effects.push(` to deal ${this.nextAttack.effect.damage} damage`);
		if(this.nextAttack.effect.block) effects.push(` to gain block`);
		if(this.nextAttack.effect.heal) effects.push(` to heal`);
		if(this.nextAttack.effect.playerEffects) effects.push(` to debuff you`);
		returnMessage += effects.join(" and");
		return returnMessage
	}
	addEffect(effect){
		//check if the buff is already applied
		if(effect.name in this.effects){
			this.effects[effect.name].amount += effect.amount;
		}else{
			this.effects[effect.name] = effect;
		}
		return {name: effect.name, amount: effect.amount};
	}
	removeEffect(effect){
		delete this.effects[effect.name];
	}
	gainBlock(amount){
		this.block += amount;
		return amount;
	}
	gainHealth(amount){
		this.health += amount;
		return amount;
	}
	takeDamage(damage){
		if((this.effects?.Vulnerable?.amount ?? 0) > 0) damage = Math.ceil(damage * 1.5);
		let actualDamage = Math.max(damage - this.block, 0);
		this.block -= damage;
		this.block = Math.max(this.block, 0);
		this.health -= actualDamage;
		let returnValue = {damage: actualDamage, blockRemoved: damage - actualDamage}
		if(this.health <= 0){
			this.battleEnemies.splice(this.battleEnemies.indexOf(this), 1);
			returnValue.dies = [this.name];
		}
		return returnValue;
	}
	playAttack(){
		let effectTaken = this.nextAttack.play(this.player, this);
		return effectTaken;
	}
	cycleAttacks(){
		this.nextAttackIndex++;
		if(this.nextAttackIndex >= this.attacks.length){
			this.nextAttackIndex = 0;
		}
	}
	clearBlock(){
		this.block = 0;
	}
}

class Bug extends Enemy {
	constructor(player, battleEnemies){
		super(player, 30, "Bug", battleEnemies);
		this.attacks = [
			new attacks.Chomp(),
			new attacks.Defend()
		]
	}
}

class Frog extends Enemy {
	constructor(player, battleEnemies){
		super(player, 50, "Frog", battleEnemies);
		this.attacks = [
			new attacks.Tounge(),
			new attacks.Heal()
		]
	}
}

exports.Bug = Bug;
exports.Frog = Frog;