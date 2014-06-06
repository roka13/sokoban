/**
Sokoban main file.
Use together with stylesheet.css leveldata.js and sokoban.html
@author Göran Karlsson 
This is a modified clone of the old Sokoban Game
*/

        var Direction = {
			Down: 0,
            Left: 1,
            Right: 2,
            Up: 3
        };
            
        var Tile = {
            None: -1,
            Empty: 0,
            Wall: 1,
            box: 2,
			openDoor: 3,
			closedDoor: 4,
			Start: 5,
			target: 6
        };
        
            //graphics
        var canvas,
			context,    
			mapTiles = new Array(),
			playerTiles = new Array();
        
			                       
            //selected level
        var currentLevel = 0,
			levelMap,
			placedboxs,
			moves = 0,
			pushes = 0,
			finished,
			doorOpen,
			tileXSize = 32,
			tileYSize = 32;
            
            // History of moves, to undo if necessary.
        var step = new Array(),  
			maxSteps = 500;
			
/**
 * A Player as an object.
*/
		var player = new playerObject();        
 
        function playerObject(){
                this.x = 0;
                this.y = 0;
                this.startX = 0;
                this.startY = 0;
                this.startDir = 0;
                this.d = 0;      
                             
                this.setPos = function(x,y,d){
                    this.x = x;
                    this.y = y;
                    this.d = d;
                }
                
           
                this.moveUp = function(){ 
					this.d = Direction.Up;
           			 if(handleMove(0,-1)){
                            this.y -= 1;
                            moves += 1;
                    }
                }
                
                this.moveDown = function(){
				   this.d = Direction.Down;
           			  if(handleMove(0,1)){
                            this.y += 1;
                            moves += 1;
                    }
                }
                
                this.moveLeft = function(){
				   this.d = Direction.Left;
             		 if(handleMove(-1,0)){
                            this.x -= 1;
                            moves += 1;
                    }
                }
                
                this.moveRight = function(){
				 this.d = Direction.Right;
                    if(handleMove(1,0)){
                            this.x += 1;
                            moves += 1;
                    }
                }
        }
                                    
        function stepObject(px,py,pd,cm,cx,cy){
                this.playerPrevX = px;
                this.playerPrevY = py;
                this.playerPrevDir = pd;
                this.boxMoved = cm;
                if(this.boxMoved){
                    this.boxX = cx;
                    this.boxY = cy;
                }
        }
			
     	function addStep(px,py,pd,cm,cx,cy){
	         if(step.length === maxSteps){
                  step.shift();
            }
            step.push(new stepObject(px,py,pd,cm,cx,cy));
        }
            
        function undoMove(){
            if(step.length > 0){
                var thisStep = step.pop();
                 player.setPos(thisStep.playerPrevX,thisStep.playerPrevY,thisStep.playerPrevDir);
                if(thisStep.boxMoved){			
					levelMap[thisStep.boxY][thisStep.boxX] = Tile.Empty;
						
                    	switch(thisStep.playerPrevDir){
							case Direction.Up:
								levelMap[thisStep.boxY + 1][thisStep.boxX] = Tile.box;
							break;
                            case Direction.Left:
                                 levelMap[thisStep.boxY][thisStep.boxX + 1] = Tile.box;
                            break;	
                            case Direction.Right:
                                 levelMap[thisStep.boxY][thisStep.boxX - 1] = Tile.box;
                            break;	
                            case Direction.Down:
                                 levelMap[thisStep.boxY - 1][thisStep.boxX] = Tile.box;
                            break;
                        }
                }
		
					
             drawField();
            } 
			else {
			    $('#finish').css('background-color','red');
				$('#finish').text( 'Det finns inga fler drag att ångra ').fadeIn('slow');
				$('#finish').fadeOut(4000);	
             }
        }
			
	
        function tileFromImage(img){
		 // console.log('drawingimage');
            this.canvas = document.createElement("canvas");
            this.ctx = this.canvas.getContext("2d");
            this.canvas.width = 32;
            this.canvas.height = 32;
		    this.ctx.drawImage(img,0,0);
        }
            
        function tileFromSubImage(img, srcX, srcY, subW, subH){
	        this.canvas = document.createElement("canvas");
            this.ctx = this.canvas.getContext("2d");
            this.canvas.width = 32;
            this.canvas.height = 32;
            this.ctx.drawImage(img,srcX,srcY,subW,subH,0,0,32,32);
        }

		var ImageLoader = {
            imgArray: [],
            toLoad: 0,
            tileArray: [],
            callback: 0,
            init:   function(array,callback){
                        this.imgArray = array;
                        this.toLoad = this.imgArray.length;
                        this.callback = callback;
                        for(i in this.imgArray){
                                this.tileArray[i] = 0;					
						}						
					},
				
            startLoading: function(){
                    for(i in this.imgArray){
				//		console.log('startloading');
                        img = new Image;
                        img.src = this.imgArray[i];
                        img.imgIndex = i;
                        img.onload = function(){
                                        ImageLoader.finishedLoading(this);
									}
                    }
                },
				
            finishedLoading: function(img){
			    //	console.log('finishloading');
                        this.toLoad -= 1;
                        this.tileArray[img.imgIndex] = new tileFromImage(img);
                        if(this.toLoad <= 0){
                           this.callback(this.tileArray);
                        }
					}
        }
            
        function loadPlayerTiles(){
		    var playerTileSet;
			playerTileSet = new Image();
			playerTileSet.src = "sprites/my_sprites.png";
			playerTileSet.onload = function(){
                    context.drawImage(playerTileSet,0,0);
                    for(i=0;i<4;i++){			              
                        playerTiles[i] = new Array();
                        playerTiles[i].push(new tileFromSubImage(playerTileSet,0,i*32,32,32));
                    }  
                  resetLevel();
                }
        }
            
        function mapTilesLoaded(tileArray){
                mapTiles = tileArray;
                loadPlayerTiles();
        }
		
/**
Main start of building the playground
*/          
        window.onload = function(){                               
					canvas = document.getElementById("myDrawing");
					context = canvas.getContext("2d");
					ImageLoader.init(new Array("sprites/my_sprites_floor.png","sprites/my_sprites_brick_pattern_blue.png","sprites/my_sprites_box.png","sprites/open_door.png","sprites/closed_door.png"),mapTilesLoaded);
					ImageLoader.startLoading();
		}

/**
 Function to check for all unnecessary walls
*/		                              
        function bordersWallsOnly(map,x,y,xMax,yMax){  
            for(yDif = -1; yDif <= 1; yDif++){
                for(xDif = -1; xDif <= 1; xDif++){
                    if(!(yDif === 0 && xDif === 0)){
							newX = x + xDif;
							newY = y + yDif;
                        if(newX >= 0 && newX <= xMax){
                            if(newY >= 0 && newY <= yMax){
                                if(map[newY][newX] != Tile.Wall && map[newY][newX] != Tile.None){
                                      return false;
                                }
                            }
                        }
                    }
                }
            }
            return true;
        }
        
        function removeWalls(map){    
            xMax = level[currentLevel].levelWidth - 1;
            yMax = level[currentLevel].levelHeight - 1;
            xMin = 0;
            yMin = 0;
            for(i=0;i<=yMax;i++){
                for(j=0;j<=xMax;j++){
                    if(bordersWallsOnly(map,j,i,xMax,yMax)){
                            map[i][j] = Tile.None;
                    }
                }
            }	
        } 

        function resetLevel(){
            levelMap = new Array();	
				// console.log('resetlevel');
            for(i=0;i<level[currentLevel].levelHeight;i++){
                levelMap[i] = new Array();
                for(j=0;j<level[currentLevel].levelWidth;j++){
                    switch(level[currentLevel].levelMapOrig[i][j]){
                        case 1:
                           levelMap[i][j] = Tile.Wall;
						break;
                        case 2:
                            levelMap[i][j] = Tile.box;
						break;
						case 3:
                            levelMap[i][j] = Tile.openDoor;
						break;
						case 4:
                            levelMap[i][j] = Tile.closedDoor;
						break;
							
                        default:
							levelMap[i][j] = Tile.Empty;
						break;
                    }
                }
            }
                // resets the player
                player.setPos(level[currentLevel].playerStartX,level[currentLevel].playerStartY,player.startDir);
             
			placedboxs = 0;
            moves = 0;
            pushes = 0;
            step.length = 0;
            finished = false;
			doorOpen = false;
               
			removeWalls(levelMap);  
			  resizeInterface();
			drawField();
			updateStats();
			
			/**
			Next call to function hideCheat() is to hide the two cheet buttons
			comment out next row to make them visible and working
			*/
			hideCheat();
        }
		
		/**
			Function to hide the two cheat buttons
		*/
		function hideCheat(){
			$('.hidden').hide();
		}
          
        function gotoNextLevel(){
            if(currentLevel < (level.length - 1)){
                currentLevel += 1;	
                clearCanvas();
                resetLevel();
		    }
        }
		
		function gotoPrevLevel(){
                if(currentLevel > 0){
                    currentLevel -= 1;
                    clearCanvas();
                    resetLevel();
                }
        }
      
        function gotoFirstLevel(){
                currentLevel= 0;
                clearCanvas();
                resetLevel();
		}
            
        function clearCanvas(){
            var canvas = document.getElementById("myDrawing");
            var context = canvas.getContext("2d");
            context.clearRect(0, 0, canvas.width, canvas.height);
        }
            
/**
function to check if the level is finished
*/            
        function checkField(){   	
             placedboxs = 0;
            for(i=0;i<level[currentLevel].levelHeight;i++){			
                for(j=0;j<level[currentLevel].levelWidth;j++){
                    if(levelMap[i][j] === Tile.box){
                        if(level[currentLevel].levelMapOrig[i][j] === Tile.target ){           
                           placedboxs += 1;
		                }	
                    }
                }
            }				
            if((placedboxs === level[currentLevel].boxesToPlace) && !finished ){  
                if((currentLevel + 1) < level.length){
					finished=true;
				    $('#finish').css('background-color','#18F21B');
					$('#finish').html( 'Lagret är fyllt. Gå till nästa<br/> lager via någon stängd dörr ').fadeIn('slow');
					$('#finish').fadeOut(4000);
			    }
				else {
				    $('#finish').css('background-color','#18F21B');
					$('#finish').html( 'GRATTIS Du har fixat alla lager!<br/>  ').fadeIn('slow');
                }
            }
        }
/**
function to check if there is a door to open
*/			
		function checkClosedDoor(x,y) {     
		testDoor(x,y+1);
			testDoor(x,y-1);
			testDoor(x+1,y);
			testDoor(x-1,y);
			return;
		}
/**
function to test if the door shall be opened
*/			
		function testDoor(x,y){           
			if(levelMap[y][x]  == Tile.closedDoor) {
				levelMap[y][x] = Tile.openDoor;
			 	doorOpen = true;
				drawTile(x,y);
			}		
			return;
		}
			
                                    
        function drawField(){
			//console.log('drawFields');			
            for(i=0;i<level[currentLevel].levelHeight;i++){			
                for(j=0;j<level[currentLevel].levelWidth;j++){
                         drawTile(j,i);
                }
            }				
			context.drawImage(playerTiles[player.d][0].canvas,player.x*tileXSize,player.y*tileYSize);
        }
            
        function drawPartial(){
		//	console.log('drawpartial');
            switch(player.d){
                case Direction.Up:
                    drawTile(player.x,player.y - 1);
                    drawTile(player.x,player.y + 1);
                break;
                case Direction.Left:
                    drawTile(player.x + 1,player.y);
                    drawTile(player.x - 1,player.y);
                break
                case Direction.Right:
                    drawTile(player.x + 1,player.y);
                    drawTile(player.x - 1,player.y);
                break;
                case Direction.Down:
                    drawTile(player.x,player.y - 1);
                     drawTile(player.x,player.y + 1);
                 break;
            }	
            drawTile(player.x,player.y);
         	context.drawImage(playerTiles[player.d][0].canvas,player.x*tileXSize,player.y*tileYSize);
        }
            
        function drawTile(x,y){
			//console.log('drawtile');
            switch(levelMap[y][x]){
                case Tile.None:
                    drawRectangle(x*tileXSize,y*tileYSize,tileXSize,tileYSize,"#EFEFEF");  // background around the level
                break;
                case Tile.Wall:
                    context.drawImage(mapTiles[Tile.Wall].canvas,x*tileXSize,y*tileYSize);	
                break;
                case Tile.box:
					//	console.log('tilebox');
                    context.drawImage(mapTiles[Tile.box].canvas,x*tileXSize,y*tileYSize);
                break;
				case Tile.openDoor:
				    context.drawImage(mapTiles[Tile.Empty].canvas,x*tileXSize,y*tileYSize);
                    context.drawImage(mapTiles[Tile.openDoor].canvas,x*tileXSize,y*tileYSize);
                break;	
				case Tile.closedDoor:
					 context.drawImage(mapTiles[Tile.closedDoor].canvas,x*tileXSize,y*tileYSize);
                break;	
					
                default:
                    context.drawImage(mapTiles[Tile.Empty].canvas,x*tileXSize,y*tileYSize);
                    if(level[currentLevel].levelMapOrig[y][x] === Tile.target){
                        drawCircle(x*tileXSize + 16, y*tileYSize + 16, 7, "#FF0000");  // draw target point
                    }
                    if(level[currentLevel].levelMapOrig[y][x] === Tile.Start){
                        drawCircle(x*tileXSize + 16, y*tileYSize + 16, 7, "#00FF00"); // draw start point 
                    }
                 break;
            }
        }
                                    
           
		function handleMove(xdif,ydif){
			//console.log('handlemoves');
			if (doorOpen){
				gotoNextLevel();
				return false;
			}
				
	        if(levelMap[player.y + ydif][player.x + xdif] != Tile.Wall){ 		// check that there is no wall 
				if (finished){
					sound('Footstep.wav');
					checkClosedDoor(player.x + xdif,player.y + ydif);
					return true;
				}
	
                if(levelMap[player.y + ydif][player.x + xdif] === Tile.box){   // check if there is a box
                    if(levelMap[player.y + (ydif * 2)][player.x + (xdif * 2)] === Tile.Empty){ // and then check if there nothing behind it
                        levelMap[player.y + ydif][player.x + xdif] = Tile.Empty;             // move the box
                        levelMap[player.y + (ydif * 2)][player.x + (xdif * 2)] = Tile.box;
						addStep(player.x, player.y, player.d, true, player.x + (xdif * 2), player.y + (ydif * 2));  
                        pushes += 1;
						sound('scratch.wav');	
						return true;
                    }	
                }
				else {
				    addStep(player.x,player.y,player.d,false,0,0);    
					sound('Footstep.wav');  
                    return true;
                }
            }
         return false;
        }
                                    
         document.onkeydown = function(event){
		     var key;
			key = event.keyCode || event.which;
            switch(key){
                case 38: player.moveUp(); break;	 
                case 37: player.moveLeft(); break;  
                case 39: player.moveRight(); break;  
                case 40: player.moveDown(); break;  
                default: break; 
            }
            drawPartial();
            checkField();
            updateStats();
        }
            
        function drawCircle(x,y,r,fillCol){   
            context.fillStyle=fillCol;
            context.beginPath();
            context.arc(x,y,r,0,Math.PI*2,true);
            context.closePath();
             context.fill();
        }
        
        function drawRectangle(x,y,w,h,fillCol){    
             context.fillStyle=fillCol;
             context.fillRect(x,y,w,h);
        }
            
        function updateStats(){
		 //  console.log('updating stats');
		 
			$("#levelInfo").text("Lager: " + (currentLevel + 1) );
            $("#stepsInfo").text("Förflyttningar: " + moves);
            $("#pushesInfo").text( "Knuffningar: " + pushes);
            $("#boxsInfo").text("Lådor på plats: " + placedboxs + " / "  + level[currentLevel].boxesToPlace);	
	
		}
		
		function resizeInterface(){
                canvas.width = level[currentLevel].levelWidth * tileXSize;
                canvas.height = level[currentLevel].levelHeight * tileYSize;
				var bredd =  canvas.width + 'px',
					hejd = canvas.height + 'px';
				$('#scoreBoard')
					.css('width','bredd')
					.css('height','hejd' );
        		$('#levelControl')
					.css('width', 'bredd');
            }
 
		/**
		 The sound to play when  a key is pressed .
		param jingle  The complete filename for the sound ie sound?.wav
		*/   
		function sound(jingle){
			$('#sound').html("<audio id=soundEfx src = audio/" + jingle + "></audio>");
			soundEfx = document.getElementById("soundEfx");
			soundEfx.play();
		}
		 

			
	$('.navmenu a').hover(function(){
			var url = $(this).attr('id');
			if ($('#help').is(':visible')){
			$('#help').hide()
			.css( 'background-color',' #989898');
			}
			else{
				switch(url){
					case 'nextVer':
						$('#help').html(nextVersion);
					break;
					case 'about':
						$('#help').html(aboutTxt);
					break;
					case 'install':
						$('#help').html(installTxt);
					break;	
					case 'helpButton':
						$('#help').html(helpText);
					break;	
					default:
						$('#help').text('')
						  .css('background-color', '#EFEFEF');
					break;
				}
				$('#help').show();
			}		
	});				

			
     
      
