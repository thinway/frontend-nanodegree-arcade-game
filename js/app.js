// Enemies our player must avoid
var Enemy = function() {
    'use strict';
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // The enemy coordinates
    this.x = 0;
    this.y = 0;
    // Its speed
    this.speed = 0;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    'use strict';
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x = this.x + this.speed * dt;

    if ( this.x > 490 ) {
        this.x = -100;
    }
};

// init method for bugs. Called from initializedEnemies()
Enemy.prototype.init = function(row, speed, enemy) {
    'use strict';
    this.x = -350 * enemy; // Keep enemies on the same row apart enough from each other
    this.y = row;
    this.speed = speed;
    allEnemies.push(this);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    'use strict';
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    'use strict';
    // Load a random player's sprite
    var sprites = [
        'images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png'
    ];

    this.sprite = sprites[randomInt(0,sprites.length - 1)];

    // Player's coordinates
    this.reset();
};

// When the player is killed by a bug or reaches the water
Player.prototype.reset = function() {
    'use strict';
    this.x = 200;
    this.y = 320;
};

Player.prototype.update = function(dt) {
    'use strict';
    // First of all check if the player has reached the water or any limit of the cavas
    if (this.y < 0) {
        alert("Cool!!! You've reached the fresh water!");
        // so return to the start position
        this.reset();
    }
    if (this.x > 402) {
        // Don't go beyond the right limit
        this.x = 402;
    }

    if (this.y > 320) {
        // Don't go beyond the bottom limit
        this.y = 391;
    }

    if (this.x < -2) {
        // Don't go beyond the left limit
        this.x = -2;
    }

    // And next, check if the player has been reached by a bug
    var index;
    var upLimit;
    var rightLimit;
    var bottomLimit;
    var leftLimit;

    for(index = 0; index < allEnemies.length; index+=1) {
        // Set up the limits of the enemy
        upLimit = allEnemies[index].y + 50;
        rightLimit = allEnemies[index].x + 50;
        bottomLimit = allEnemies[index].y - 50;
        leftLimit = allEnemies[index].x - 50;
        // And check if the player is inside that limit
        if (this.y < upLimit && this.x < rightLimit &&  this.x > leftLimit && this.y > bottomLimit ) {
            alert("Nooo, feel the jaws of that ladybird!!");
            // In that case, the player dies and returns to the start position
            this.reset();
        }
    }
};

Player.prototype.render = function() {
    'use strict';
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(userInput) {
    'use strict';
    if (userInput == "up") {
        this.y = this.y - 83;
    } else if (userInput == "right") {
        this.x = this.x + 101;
    } else if (userInput == "down") {
        this.y = this.y + 83;
    }  else if (userInput == "left") {
        this.x = this.x - 101;
    }
    // Debug: the player's coordinates
    console.log("x,y = " + this.x + "," + this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// The vertical coordinate of each pavement row on the canvas
var rows = [60,145,230];

var allEnemies = [];

// Create the bugs army
function initEnemies() {
    'use strict';
    var index = 0;
    var speed;
    var numEnemiesRow;
    var aEnemy;
    var enemy;
    while ( index < rows.length ) {
        speed = randomInt(200, 400);
        numEnemiesRow = 1;

        for (aEnemy = 0; aEnemy < numEnemiesRow; aEnemy+=1) {
            enemy = new Enemy();
            enemy.init(rows[index], speed, aEnemy);
        }
        index = index + 1;
    }
}

// Creating the enemies
initEnemies();

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    'use strict';
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Generate a random int between min and max. Both included.
function randomInt(min, max) {
    'use strict';
    max++;
    return Math.floor(Math.random() * (max - min)) + min;
}