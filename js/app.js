// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -100;
    this.y = Math.floor(Math.random() * 3) * 75 + 75;
    this.speed = 150 * Math.random() + 20;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = ( this.x + this.speed * dt ) % 1000;
    var dis = Math.sqrt(Math.pow((this.x - player.x),2) 
            + Math.pow((this.y - player.y),2));
    if ( dis < 70 ) {
        player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 300;
    this.speed = 1;
};

Player.prototype.reset = function() {
    console.log( 'reset');
    this.x = 200;
    this.y = 300;
};

Player.prototype.update = function(dt) {
    if ( this.y < 0 ) {
        this.reset();
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    switch (key) {
        case "left":
            if (this.x > 0) {
                this.x -= 100;
            }
            break;
        case "up":
            if (this.y > 0) {
                this.y -= 80;
            }
            break;
        case "right":
            if (this.x < 400) {
                this.x += 100;
            }
            break;
        case "down":
            if (this.y < 400) {
                this.y += 80;
            }
    }
};

var Score = function() {
    this.x = 0;
    this.y = 400;
    this.grade = 0;
    this.timer = 0;
};

Score.prototype.update = function(dt) {
    this.timer += 100 * dt;
};

Score.prototype.render = function() {
    ctx.fillText( "Score: " + this.grade + "\n" +
            "Timer: " + this.timer, this.x, this.y);
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for (var i = 7; i >= 0; i--) {
    allEnemies.push(new Enemy);
};

var player = new Player;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
