const cards = require('./cards');

class Game {
	constructor(){
		this.state = "battle";
		this.cardOptions = [];
		this.nextPaths = [];
		this.floor = 0;
		this.rooms = {
			"Enemy": [
				["Bug", "Bug"],
				["Frog"]
			]
		}
	}
	generateCardOptions(amount){
		this.cardOptions = [];
		let cardNames = Object.getOwnPropertyNames(cards);
		//generate 3 unique cards	
		for(let i = 0; i < amount; i++){
			let cardIndex = Math.floor(Math.random() * cardNames.length);
			let card = new cards[cardNames[cardIndex]]();
			this.cardOptions.push(card);
			cardNames.splice(cardIndex, 1);
		}
	}
	generateNextPaths(){
		//60% chance of 1 path, 30% chance of 2 paths, 10% chance of 3 paths
		let pathAmount = Math.floor(Math.random() * 10);
		if(pathAmount <= 5) pathAmount = 1;
		else if(pathAmount <= 8) pathAmount = 2;
		else pathAmount = 3;
		for(let i = 0; i < pathAmount; i++){
			switch(this.floor){
				case 0:
					this.nextPaths.push("Enemy");
					break;
				case 9:
					this.nextPaths.push("Treasure");
				case 15:
					this.nextPaths.push("Rest");
				case 16:
					this.nextPaths.push("Boss");
					break;
				default:
					//60% enemy, 5% elite, 5% rest, 10% merchant, 20% unknown
					let path = Math.floor(Math.random() * 100);
					// if(path <= 60) paths.push("Enemy");
					// else if(path <= 65) paths.push("Elite");
					// else if(path <= 75) paths.push("Rest");
					// else if(path <= 85) paths.push("Merchant");
					// else paths.push("Unknown");
					this.nextPaths.push("Enemy");
			}
		}
	}
}

exports.Game = Game;