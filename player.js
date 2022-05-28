class Player {
	constructor(){
		this.health = 80;
		this.maxHealth = 80;
		this.energy = 3;
		this.block = 0;
		this.deck = [];
		this.hand = [];
		this.discard = [];
		this.graveyard = [];
		this.drawPile = [];
		this.effects = {};
		this.relics = {
			all: [],
			postbattle: [],
		};
	}
	addRelic(relic){
		this.relics.all.push(relic);
		this.relics[relic.activation].push(relic);
	}
	takeDamage(damage){
		if(this.effects.Vulnerable?.amount > 0) damage = Math.ceil(damage * 1.5);
		let actualDamage = Math.max(damage - this.block, 0);
		this.block -= damage;
		if(this.block < 0){
			this.health += this.block;
			this.block = 0;
		}
		//return the amount of damage taken
		return actualDamage;
	}
	gainHealth(amount){
		this.health += amount;
		if(this.health > this.maxHealth) this.health = this.maxHealth;
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
	play(card, enemy){
		return this.hand[card].play(this, enemy);
	}
	clearHand(){
		this.hand = [];
		this.drawPile = [];
		this.discard = [];
	}
	discardHand(){
		this.discard = this.discard.concat(this.hand);
		this.hand = [];
	}
	stockHand(){
		for(let i = 0; i < 5; i++){
			if(this.drawPile.length == 0) this.shuffleDiscard();
			this.hand.push(this.drawPile.pop());
		}
	}
	shuffleDeck(){
		this.drawPile = [...this.deck];
		this.drawPile.sort(() => Math.random() - 0.5);
	}
	shuffleDiscard(){
		this.drawPile = [...this.discard];
		this.discard = [];
		this.drawPile.sort(() => Math.random() - 0.5);
	}
	discardCard(index){
		this.discard.push(this.hand.splice(index, 1)[0]);
	}
	loseEnergy(amount){
		this.energy -= amount;
	}
	restoreEnergy(){
		this.energy = 3;
	}
}

exports.Player = Player;