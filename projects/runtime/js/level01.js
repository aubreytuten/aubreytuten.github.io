var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game


        var levelData = {
        
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 400, "y": groundY },
                { "type": "sawblade", "x": 600, "y": groundY },
                { "type": "sawblade", "x": 900, "y": groundY },
                { "type": "enemy", "x": 900, "y": groundY },
                { "type": "reward", "x": 500, "y": groundY - 60 },
            ]
        };

            var obj;
            var objX;
            var objY;
            var objType;

        for (var i = 0; i < levelData.gameItems.length; i++) {
 
            obj = levelData.gameItems[i];
            objX = obj.x;
            objY = obj.y;
            objType = obj.type;

            if (objType === 'sawBlade') {
                createObstacle(objX, objY);
            }else if (objType === 'enemy') {
                createEnemy(objX, objY);
            }else if (objType === 'reward'{
                createReward(objX, objY);
            }else{
                createBallOfFire(objX, objY)
            }
        }

        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
        
        function createSawBlade(x, y) {
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            sawBladeHitZone.x = x;
            sawBladeHitZone.y = y;

            game.addGameItem(sawBladeHitZone);   

            var obstacleImage = draw.bitmap('img/sawblade.png');
            sawBladeHitZone.addChild(obstacleImage); 
            obstacleImage.x = -25;
            obstacleImage.y = -25;
        }

        /*
        createSawBlade(400, groundY - 5);
        createSawBlade(600, groundY - 110);
        createSawBlade(900, groundY - 110);
        */

        function createBallOfFire(x, y) {
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var ballOfFireHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            ballOfFireHitZone.x = x;
            ballOfFireHitZone.y = y;

            game.addGameItem(ballOfFireHitZone);   

            var obstacleImage = draw.bitmap('img/fire.png')
            ballOfFireHitZone.addChild(obstacleImage); 
            obstacleImage.x = -25;
            obstacleImage.y = -45;
            obstacleImage.scaleX = .15;
            obstacleImage.scaleY = .15;
        };

        //createBallOfFire(1300, groundY - 110);

        function createEnemy(x, y) {
            var enemy = game.createGameItem('enemy', 25);
            var redSquare = draw.rect(50, 50, 'red');
            redSquare.x = -25;
            redSquare.y = -25;
            enemy.addChild(redSquare);
            enemy.x = 400;
            enemy.y = groundY-50;
            game.addGameItem(enemy);

            enemy.velocityX = -1;

            enemy.onPlayerCollision = function() {
            game.changeIntegrity(-10);
            enemy.fadeOut();
            };

            enemy.onProjectileCollision = function() {
            game.increaseScore(100);
            enemy.fadeOut();
            };
        }

        /*
        createEnemy(400, groundY-10);
        createEnemy(800, groundY-100);
        createEnemy(1200, groundY-50);
        */

        function createReward(x, y) {
            var crown = game.createGameItem('crown', 25);
            var blueSquare = draw.bitmap('img/crown.png');
            blueSquare.scaleX = .025;
            blueSquare.scaleY = .025;
            blueSquare.x = -30;
            blueSquare.y = -25;
            crown.addChild(blueSquare);
            crown.x = 400;
            crown.y = groundY - 50;
            game.addGameItem(crown);

            crown.velocityX = -2;

            crown.onPlayerCollision = function() {
                game.changeIntegrity(10);
                crown.fadeOut();
            };

        }

        //createReward(400, groundY - 60);
       


        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
