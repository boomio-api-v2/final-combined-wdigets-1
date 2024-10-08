<!--
In this game you need to move the basket right of left across the screen
using left and right arrow buttons trying to catch as many fruit
as you can. The fruit are continuously falling from above. Different types of fruit give you
different score. The order is this (from highest to lowest scoring:)
melon -> pineapple -> orange -> apple -> banana. The score also depends on the speed
the fruit is falling at. The faster it is falling, the more score you get.
The game keeps tracks of your total score, the number of fruit you missed, and how many you caught.
Upon missing 10 pieces of fruit, the game is over. You can restart the game by pressing ENTER
on the game over screen. The game also shows the hi score which updates at the game over screen
if you succeeded to beat it.

The game also uses music and a couple of sound effects.
-->
<!DOCTYPE html>
<html>
    <head>
        <title>Fruit Catcher</title>
        <meta charset="UTF-8">
    </head>
    <style type="text/css">
		canvas	
		{
            border: 1px solid black;
            position: absolute;
            background-color: transparent;
		}

	</style>
    
    <script type="text/javascript">
        
        window.onload = function()
        {
            var canvas = document.getElementById("canvas");
            var context = canvas.getContext("2d");
            var canvasBack = document.getElementById("backgroundCanvas");
            var contextBack = canvasBack.getContext("2d");
            
            //Timer for the Timeout - needed in order to clear it
            var timer;
            
            //Keeps track of hi score
            var hiscore = 0;
            
            //Background image, music track, and arrays of sounds.
            //Arrays are needed so that the same sounds
            //can overlap with each other
            var background = new Image();
            background.src = 'Images/jungle.jpg';
            var catchSounds = [];
            var catchSoundCounter = 0;
            for(var i = 0; i < 5; i++)
            {
                var catchSound = new Audio();
                catchSound.src = 'Audio/bleep.wav';
                catchSounds.push(catchSound);
            }
            
            var music = new Audio();
            music.src = 'Audio/MarimbaBoy.wav';
            music.loop = true;
            
            var smashSounds = [];
            var smashCounter = 0;
            for(var i = 0; i < 5; i++)
            {
                var smash = new Audio();
                smash.src = 'Audio/smash.mp3';
                smashSounds.push(smash);
            }
            
            var player;
            var fruits = [];
            var numberOfFruits = 15;
            
            //Player constructor
            function Player()
            {
                this.gameOver = false;
                this.score = 0;
                this.fruitsCollected = 0;
                this.fruitsMissed = 0;
                this.playerWidth = 150;
                this.playerHeight = 90;
                this.playerSpeed = 10;
                this.x = canvas.width / 2;
                this.y = canvas.height - this.playerHeight;
                this.playerImage = new Image();
                this.playerImage.src = 'Images/basket2.png';
                
                //Draws the player
                this.render = function()
                {
                    context.drawImage(this.playerImage, this.x, this.y);
                }
                
                //Moves the player left
                this.moveLeft = function()
                {
                    if(this.x > 0)
                    {
                        this.x -= this.playerSpeed;
                    }
                }
                
                //Moves the player right
                this.moveRight = function()
                {
                    if(this.x < canvas.width - this.playerWidth)
                    {
                        this.x += this.playerSpeed;
                    }
                }
            }
            
            //Fruit constructor
            function Fruit()
            {
                this.fruitNumber = Math.floor(Math.random() * 5);
                this.fruitType = "";
                this.fruitScore = 0;
                this.fruitWidth = 50;
                this.fruitHeight = 50;
                this.fruitImage = new Image();
                this.fruitSpeed = Math.floor(Math.random() * 3 + 1);
                this.x = Math.random() * (canvas.width - this.fruitWidth);
                this.y = Math.random() * -canvas.height - this.fruitHeight;
                
                //Creates a different kind of fruit depending on the fruit number
                //which is generated randomly
                this.chooseFruit = function()
                {
                    if(this.fruitNumber == 0)
                    {
                        this.fruitType = "banana";
                        this.fruitScore = 5 * this.fruitSpeed;
                        this.fruitImage.src = 'Images/banana2.png';
                    }
                    else if(this.fruitNumber == 1)
                    {
                        this.fruitType = "apple";
                        this.fruitScore = 10 * this.fruitSpeed;
                        this.fruitImage.src = 'Images/apple2.png';
                    }
                    else if(this.fruitNumber == 2)
                    {
                        this.fruitType = "orange";
                        this.fruitScore = 15 * this.fruitSpeed;
                        this.fruitImage.src = 'Images/orange2.png';
                    }
                    else if(this.fruitNumber == 3)
                    {
                        this.fruitType = "pineapple";
                        this.fruitScore = 20 * this.fruitSpeed;
                        this.fruitImage.src = 'Images/pineapple2.png';
                    }
                    else if(this.fruitNumber == 4)
                    {
                        this.fruitType = "melon";
                        this.fruitScore = 25 * this.fruitSpeed;
                        this.fruitImage.src = 'Images/melon2.png';
                    }
                }
                
                //Makes the fruit descend.
                //While falling checks if the fruit has been caught by the player
                //Or if it hit the floor.
                this.fall = function()
                {
                    if(this.y < canvas.height - this.fruitHeight)
                    {
                        this.y += this.fruitSpeed;
                    }
                    else
                    {
                        // smashSounds[smashCounter].play();
                        if(smashCounter == 4)
                        {
                            smashCounter = 0;
                        }
                        else
                        {
                            smashCounter++;
                        }
                        
                        player.fruitsMissed += 1;
                        this.changeState();
                        this.chooseFruit();
                    }
                    this.checkIfCaught();
                }
                
                //Checks if the fruit has been caught by the player
                //If it is caught, the player score and fruit counter is increased, and
                //the current fruit changes its state and becomes a different fruit.
                this.checkIfCaught = function()
                {
                    if(this.y >= player.y)
                    {
                        if((this.x > player.x && this.x < (player.x + player.playerWidth)) ||
                          (this.x + this.fruitWidth > player.x && this.x + this.fruitWidth < (player.x + player.playerWidth)))
                        {
                            // catchSounds[catchSoundCounter].play();
                            if(catchSoundCounter == 4)
                            {
                                catchSoundCounter = 0;
                            }
                            else
                            {
                                catchSoundCounter++;
                            }
                            
                            player.score += this.fruitScore;
                            player.fruitsCollected += 1;
                            
                            this.changeState();
                            this.chooseFruit();
                        }
                    }
                }
                
                //Randomly updates the fruit speed, fruit number, which defines the type of fruit
                //And also changes its x and y position on the canvas.
                this.changeState = function()
                {
                    this.fruitNumber = Math.floor(Math.random() * 5);
                    this.fruitSpeed = Math.floor(Math.random() * 3 + 1);
                    this.x = Math.random() * (canvas.width - this.fruitWidth);
                    this.y = Math.random() * -canvas.height - this.fruitHeight;
                }
                
                //Draws the fruit.
                this.render = function()
                {
                    context.drawImage(this.fruitImage, this.x, this.y);
                }
            }
            
            //Adds controls. Left arrow to move left, right arrow to move right.
            //ENTER to restart only works at the game over screen.
            window.addEventListener("keydown", function(e)
            {
		 	    e.preventDefault();
                if(e.keyCode == 37)
                {
                    player.moveLeft();
                }
                else if(e.keyCode == 39)
                {
                    player.moveRight();
                }
                else if(e.keyCode == 13 && player.gameOver == true)
                {
                    main();
                    window.clearTimeout(timer);
                }
             });
            
            main();

            //Fills an array of fruits, creates a player and starts the game
            function main()
            {
                contextBack.font = "bold 23px Velvetica";
                contextBack.fillStyle = "WHITE";
                player = new Player();
                fruits = [];

                for(var i = 0; i < numberOfFruits; i++)
                {
                    var fruit = new Fruit();
                    fruit.chooseFruit();
                    fruits.push(fruit);
                }
                
                startGame();
            }
            
            function startGame()
            {
                updateGame();
                window.requestAnimationFrame(drawGame);
            }

            //Checks for gameOver and makes each fruit in the array fall down.
            function updateGame()
            {
                // music.play();
                if(player.fruitsMissed >= 10)
                {
                    player.gameOver = true;
                }
                
                for(var j = 0; j < fruits.length; j++)
                {
                    fruits[j].fall();
                }
                timer = window.setTimeout(updateGame, 30);
            }
            
            //Draws the player and fruits on the screen as well as info in the HUD.
            function drawGame()
            {
                if(player.gameOver == false)
                {
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    contextBack.clearRect(0, 0, canvasBack.width, canvasBack.height);

                    contextBack.drawImage(background, 0, 0);
                    player.render();

                    for(var j = 0; j < fruits.length; j++)
                    {
                        fruits[j].render();
                    }
                    contextBack.fillText("SCORE: " + player.score, 50, 50);
                    contextBack.fillText("HI SCORE: " + hiscore, 250, 50);
                    contextBack.fillText("FRUIT CAUGHT: " + player.fruitsCollected, 500, 50);
                    contextBack.fillText("FRUIT MISSED: " + player.fruitsMissed, 780, 50);
                }
                else
                {
                    //Different screen for game over.
                    for(var i = 0; i < numberOfFruits; i++)
                    {
                        console.log("Speed was" + fruits[fruits.length - 1].fruitSpeed);
                        fruits.pop();
                    }
                    
                    if(hiscore < player.score)
                    {
                        hiscore = player.score;
                        contextBack.fillText("NEW HI SCORE: " + hiscore, (canvas.width / 2) - 100, canvas.height / 2);
                    }
                    contextBack.fillText("PRESS ENTER TO RESTART", (canvas.width / 2) - 140, canvas.height / 2 + 50);
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    
                }
                window.requestAnimationFrame(drawGame);
                
            }
        }
    
    </script>
    
    </head>
    <body style="margin-left:15%; margin-top:3%;">
        <canvas id="backgroundCanvas" width="1024" height="650"></canvas>
        <canvas id="canvas" width="1024" height="650"></canvas>
    </body>
</html>