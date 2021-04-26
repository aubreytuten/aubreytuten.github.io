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
                { "type": "RedAndBlueFlame", "x": 400, "y": groundY - 30 },
                { "type": "RedAndBlueFlame", "x":600, "y": groundY - 30},
                { "type": "RedAndBlueFlame", "x": 900, "y": groundY - 30 },
                { "type": "ballOfFire", "x": 1200, "y": groundY - 80 },
                { "type": "reward", "x": 1400, "y": groundY - 60 },
                { "type": "RedAndBlueFlame", "x": 1900, "y": groundY - 30 },
                { "type": "reward", "x": 1925, "y": groundY - 80 },
                { "type": "ballOfFire", "x": 2100, "y": groundY - 80 },
                { "type": "ballOfFire", "x": 2300, "y": groundY - 80 },
                { "type": "ballOfFire", "x": 2600, "y": groundY - 80 },
                { "type": "ballOfFire", "x": 2900, "y": groundY - 140 },
                /*{ "type": "fireHalo", "x": 4200, "y": groundY - 80 },*/

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

            if (objType === 'RedAndBlueFlame') {
                createRedAndBlueFlame(objX, objY);
            }else if (objType === 'ballOfFire') {
                createBallOfFire(objX, objY);
            }else if (objType === 'reward') {
                createReward(objX, objY);
            }/*else if (objType === 'fireHalo') {
                createFireHalo(objX, objY);
            }*/else{
                createBallOfFire(objX, objY)
            }
        }

        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);
        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
        
        /*
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
        */

        /*
        createSawBlade(400, groundY - 5);
        createSawBlade(600, groundY - 110);
        createSawBlade(900, groundY - 110);
        */

        function createRedAndBlueFlame(x, y) {
            var hitZoneSize = 10;
            var damageFromObstacle = 10;
            var RedAndBlueFlameHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            RedAndBlueFlameHitZone.x = x;
            RedAndBlueFlameHitZone.y = y;

            game.addGameItem(RedAndBlueFlameHitZone);   

            var obstacleImage = draw.bitmap('img/RedAndBlueFlame.png');
            RedAndBlueFlameHitZone.addChild(obstacleImage); 
            obstacleImage.x = -25;
            obstacleImage.y = -30;
            obstacleImage.scaleX = .12;
            obstacleImage.scaleY = .12;

            
        }


        function createBallOfFire(x, y)  {
                var fire = game.createGameItem('ballOfFire', 25);
                var fireImg = draw.bitmap('img/fire.png');
                fireImg.x = -25;
                fireImg.y = -25;
                fire.addChild(fireImg);
                fire.x = x;
                fire.y = y;
                fire.scaleX = .15;
                fire.scaleY = .15;
                game.addGameItem(fire);
                fire.velocityX = -2.5;
                    

                    fire.onPlayerCollision = function() {
                        game.changeIntegrity(-10);
                    };
                    fire.onProjectileCollision = function() {
                        fire.fadeOut();
                        game.increaseScore(100);
                    }
                    


        };

        //createBallOfFire(1300, groundY - 110);

        /*
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
            blueSquare.y = -30;
            crown.addChild(blueSquare);
            crown.x = x;
            crown.y = y;
            game.addGameItem(crown);

            crown.velocityX = -2;

            crown.onPlayerCollision = function() {
                game.changeIntegrity(10);
                crown.fadeOut();
            };

    //Need to find a way to fix and make this work //
            //could not figure out how to make show up//
/*
        function createFireHalo(x, y) {
            var fireHalo = game.createGameItem('fireHalo', 25);
            var haloImg = draw.bitmap('img/firehalo.png');
            haloImg.x = -25;
            haloImg.y = -25;
            fireHalo.addChild(haloImg);
            fireHalo.x = x;
            fireHalo.y = y;
            game.addGameItem(fireHalo);

            fireHalo.velocityX = -2;

            fireHalo.onPlayerCollision = function() {
                game.changeIntegrity(15);
                fireHalo.fadeOut();
            };

        }
*/
        
    };

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
