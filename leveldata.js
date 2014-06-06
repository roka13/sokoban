/** To build a new level. Use the structure below
and just add a new level.
Mark surrounding walls with an '@'. Boxes with 'o'
target places with 'x'. The pusher with 'z' and the
closed door to next level with 'c'. You can also 
add 'd' for an open door where the pusher can pass but not the boxes.
Leave the floor elements with a spacebar. Every LevelDataLine must 
have the same lenght. Make sure that the levels is surrounded with at least
one '@' at all sides.
*/

var level = new Array();

/**
my own easy testlevel 
*/
 var levelDataLine = new Array();
levelDataLine[0] =  "@@@@@@@@";
levelDataLine[1] =  "@   @@@@";
levelDataLine[2] =  "@ zd@ @@";
levelDataLine[3] =  "@ o   c@";
levelDataLine[4] =  "@ @   @@";
levelDataLine[5] =  "@  x  @@";
levelDataLine[6] =  "@@@@@@@@";
level[0] = new levelObject(levelDataLine);

// levels below is copied and converted from Internet
var levelDataLine = new Array();
levelDataLine[0] =  "@@@@@@@@@@@@@@@@@@@@";
levelDataLine[1] =  "@@@@@@   c@@@@@@@@@@";
levelDataLine[2] =  "@@@@@@o  @@@@@@@@@@@";
levelDataLine[3] =  "@@@@@@  o@@@@@@@@@@@";
levelDataLine[4] =  "@@@@  o o @@@@@@@@@@";
levelDataLine[5] =  "@@@@ @ @@ @@@@@@@@@@";
levelDataLine[6] =  "@@   @ @c @@@@@  xx@";
levelDataLine[7] =  "@@ o  o          xx@";
levelDataLine[8] =  "@@@@@@ @@@ @d@@  xx@";
levelDataLine[9] =  "@@@@@@     @z@@@@@@@";
levelDataLine[10] = "@@@@@@@@@@@@@@@@@@@@";
level[1] = new levelObject(levelDataLine);


levelDataLine = new Array();
levelDataLine[0] = "@@@@@@@@@@@@@@";
levelDataLine[1] = "@xx  @     @@@";
levelDataLine[2] = "@xx  @ o  o  @";
levelDataLine[3] = "@xx  @o@@@@  @";
levelDataLine[4] = "@xx    z @@  @";
levelDataLine[5] = "@xx  @ @  o @@";
levelDataLine[6] = "@@@@@@ @@o o @";
levelDataLine[7] = "@@@ o  o o o @";
levelDataLine[8] = "@@@    @     @";
levelDataLine[9] = "@@@@@@@@@@@c@@";
levelDataLine[10] = "@@@@@@@@@@@@@@";
level[2] = new levelObject(levelDataLine);

 
levelDataLine = new Array();
levelDataLine[0] = "@@@@@@@@@@@@@@@@@@@@";
levelDataLine[1] = "@@@@@@@@@@     z@@@@";
levelDataLine[2] = "@@@@@@@@@@ o@o @@@@@";
levelDataLine[3] = "@@@@@@@@@@ o  o@@@@@";
levelDataLine[4] = "@@@@@@@@@@@o o @@@@@";
levelDataLine[5] = "@@@@@@@@@@ o @ @@@@@";
levelDataLine[6] = "@@xxxx  @@ o  o  c@@";
levelDataLine[7] = "@@@xxx    o  o   @@@";
levelDataLine[8] = "@@xxxx  @@@@@@@@@@@@";
levelDataLine[9] = "@@@@@@@@@@@@@@@@@@@@";
level[3] = new levelObject(levelDataLine);

levelDataLine = new Array();
levelDataLine[0] = "@@@@@@@@@@@@@@@@@@@@";
levelDataLine[1] = "@@@@@@@@@@@@@@@@@@@@";
levelDataLine[2] = "@@@@@@@@@@@@c  xxxx@";
levelDataLine[3] = "@@@@@@@@@@@@@  xxxx@";
levelDataLine[4] = "@@    @  o o   xxxx@";
levelDataLine[5] = "@@ ooo@o  o @  xxxx@";
levelDataLine[6] = "@@  o     o @  xxxx@";
levelDataLine[7] = "@@ oo @o o o@@@@@@@@";
levelDataLine[8] = "@@  o @     @@@@@@@@";
levelDataLine[9] = "@@@ @@@@@@@@@@@@@@@@";
levelDataLine[10] = "@@    @    @@@@@@@@@";
levelDataLine[11] = "@@     o   @@@@@@@@@";
levelDataLine[12] = "@@  oo@oo  z@@@@@@@@";
levelDataLine[13] = "@@    @    @@@@@@@@@";
levelDataLine[14] = "@@@@@@@@@@@@@@@@@@@@";
level[4] = new levelObject(levelDataLine);

levelDataLine = new Array();
levelDataLine[0] = "@@@@@@@@@@@@@@@@@@@@";
levelDataLine[1] = "@@@@@@@@@@@@@@@@@@@@";
levelDataLine[2] = "@@@@@@@@@@   c@@@@@@";
levelDataLine[3] = "@@@@@@@@@@ @o@@  @@@";
levelDataLine[4] = "@@@@@@@@@@     o @@@";
levelDataLine[5] = "@@@@@@@@@@ @@@   @@@";
levelDataLine[6] = "@@xxxx  @@ o  o@@@@@";
levelDataLine[7] = "@@xxxx    o oo @@@@@";
levelDataLine[8] = "@@xxxx  @@o  o z@@@@";
levelDataLine[9] = "@@@@@@@@@@  o  @@@@@";
levelDataLine[10] = "@@@@@@@@@@ o o  @@@@";
levelDataLine[11] = "@@@@@@@@@@@@ @@ @@@@";
levelDataLine[12] = "@@@@@@@@@@@@    @@@@";
levelDataLine[13] = "@@@@@@@@@@@@@@@@@@@@";
level[5] = new levelObject(levelDataLine);

levelDataLine = new Array();
levelDataLine[0] = "@@@@@@@@@@@@@@@@@@@@";
levelDataLine[1] = "@@@@@@@@@@@@@@@@@@@@";
levelDataLine[2] = "@@@@@@@@@@@@@@@@@@@@";
levelDataLine[3] = "@@@@@xx  @@@@z@@@@@@";
levelDataLine[4] = "@@@@@xx  @@@   @@@@@";
levelDataLine[5] = "@@@@@xx     oo @@@@@";
levelDataLine[6] = "@@@@@xx  @ @ o @@@@@";
levelDataLine[7] = "@@@@@xx@@@ @ o @@@@@";
levelDataLine[8] = "@@@@@@@@ o @o  @@@@@";
levelDataLine[9] = "@@@@@@@@  o@ o @@@@@";
levelDataLine[10] = "@@@@@@@@ o  o  c@@@@";
levelDataLine[11] = "@@@@@@@@  @@   @@@@@";
levelDataLine[12] = "@@@@@@@@@@@@@@@@@@@@";
level[6] = new levelObject(levelDataLine);

levelDataLine = new Array();
levelDataLine[0] = "@@@@@@@@@@@@@@@@@@@@";
levelDataLine[1] = "@@@@@@@@@@@@@@@@@@@@";
levelDataLine[2] = "@@@@@@@@@@@@@@@@@@@@";
levelDataLine[3] = "@@@@@@@@@@@   @@@@@@";
levelDataLine[4] = "@@@@@ @ z@@ oo @@@@@";
levelDataLine[5] = "@@@@    o      @@@@@";
levelDataLine[6] = "@@@@  o  @@@   c@@@@";
levelDataLine[7] = "@@@@@@ @@@@@o@@@@@@@";
levelDataLine[8] = "@@@@ o  @@@ xx@@@@@@";
levelDataLine[9] = "@@@@ o o o xxx@@@@@@";
levelDataLine[10] = "@@@@    @@@xxx@@@@@@";
levelDataLine[11] = "@@@@ oo @@@xxx@@@@@@";
levelDataLine[12] = "@@@@  @@@@@@@@@@@@@@";
levelDataLine[13] = "@@@@@@@@@@@@@@@@@@@@";
level[7] = new levelObject(levelDataLine);

/**
Function to map all elements in an array
*/
function levelObject(datalineArray){
	this.boxesToPlace = 0;
	this.levelMapOrig = new Array();
	this.levelHeight = datalineArray.length;   // y-axis
	
	for(i=0;i<this.levelHeight;i++){
		this.levelMapOrig[i] = new Array();
		this.levelWidth = datalineArray[i].length;  // x-axis
		for(j=0;j<this.levelWidth;j++){
		
		
	        if(datalineArray[i][j] === "@"){
				this.levelMapOrig[i][j] = 1;  // map  @ to a  wall
			}else if(datalineArray[i].charAt(j) == "o"){
				this.levelMapOrig[i][j] = 2;// map o to a box
			}else if(datalineArray[i].charAt(j) == "x"){
				this.levelMapOrig[i][j] = 6;// map x to a target
				this.boxesToPlace += 1;
			}else if(datalineArray[i].charAt(j) == "z"){ // map startposition
				this.levelMapOrig[i][j] = 5; 
				this.playerStartX = j;
				this.playerStartY = i;
				
			}else if(datalineArray[i].charAt(j) == "d"){ // open door
				this.levelMapOrig[i][j] = 3; 
				// 
			}else if(datalineArray[i].charAt(j) == "c"){ // closed door
				this.levelMapOrig[i][j] = 4;  // 	
			
				}
			else {
				this.levelMapOrig[i][j] = 0;
			}	
		}
	}
}