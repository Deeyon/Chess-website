var selectedPieceId = null;
var whiteSquares = document.getElementsByClassName("row")[0].getElementsByClassName("whiteSq");
var blackSquares = document.getElementsByClassName("row")[0].getElementsByClassName("blackSq");
var colorFlag = 0; // flag to check if the color has been changed, 0 means not, 1 means yes (red and white)
const leftEdgeSquares = [1, 9, 17, 25, 33, 41, 49, 57]; // squares on the left edge of the board
const rightEdgeSquares = [8, 16, 24, 32, 40, 48, 56, 64]; // squares on the right edge of the board
const secondLeftEdgeSquares = [2, 10, 18, 26, 34, 42, 50, 58]; // squares on the second left edge of the board
const secondRightEdgeSquares = [7, 15, 23, 31, 39, 47, 55, 63]; // squares on the second right edge of the board
var queenMove = false //to disable resetColor function when calling rookMovementHighlight and bishopMovementHighlight together.
var whiteTurn = true;
// Run disableBlackMoves once at the beginning
window.onload = function() {
    disableBlackMoves();
};

//idName is the id of the square
//srcName is the name of the piece or color
function hasImage(idName, srcName){
    var squareId = document.getElementById(idName);
    var image = squareId.getElementsByTagName("img")[0];
    if (image == null) {
        // console.log("No image found in square with id: " + idName);
        return false;
    }
    var imgSrc = image.src;
    if (imgSrc.includes(srcName)) {
        // console.log("TRUE")
        // console.log("imgSrc: " + imgSrc);
        // console.log("srcName: " + srcName);
        return true;
    }
    console.log("FALSE");
    console.log("imgSrc: " + imgSrc);
    console.log("srcName: " + srcName);
    return false;
}

function resetColor(){ //helper function for move() to reset orange color squares after a move
    if(queenMove==false){
        for (var i = 0; i<whiteSquares.length; i++){
            if(colorFlag==1){ // wheat
                // console.log("Changing wheat square color to smoke");
                whiteSquares[i].style.backgroundColor = "whitesmoke";
                blackSquares[i].style.backgroundColor = "red";
            }
            else{
                whiteSquares[i].style.backgroundColor = "wheat";
                blackSquares[i].style.backgroundColor = "green";
            }
        }
    }

}


function changeColor(){
    console.log("Changing color of squares");

    for (var i = 0; i<whiteSquares.length; i++){
        if(colorFlag==0){ // wheat
            // console.log("Changing wheat square color to smoke");
            whiteSquares[i].style.backgroundColor = "whitesmoke";
            blackSquares[i].style.backgroundColor = "red";
        }
        else{
            whiteSquares[i].style.backgroundColor = "wheat";
            blackSquares[i].style.backgroundColor = "green";
        }
    }

    if(colorFlag==0){
        colorFlag = 1; // change to red and white
    }
    else{
        colorFlag = 0; // change to green and wheat
    }

}

function disableBlackMoves(){
    for (var i = 0; i<whiteSquares.length; i++){
        // console.log(whiteSquares[i]);
        // console.log(hasImage(whiteSquares[i].id,"black"))
        if(hasImage(whiteSquares[i].id,"black")){
            whiteSquares[i].getElementsByTagName("img")[0].removeAttribute("onclick");
        }
        if(hasImage(blackSquares[i].id,"black")){
            blackSquares[i].getElementsByTagName("img")[0].removeAttribute("onclick");
        }
    }
    console.log("disabled black moves")
    whiteTurn=true;
}

function enableBlackMoves(){
    // var square = document.getElementById("56").getElementsByTagName("img")[0];
    for (var i = 0; i<whiteSquares.length; i++){
        if(hasImage(whiteSquares[i].id,"blackPawn")){
            whiteSquares[i].getElementsByTagName("img")[0].setAttribute("onclick","blackPawnMovementHighlight(this.parentElement.id)");
        }
        if(hasImage(blackSquares[i].id,"blackPawn")){
            blackSquares[i].getElementsByTagName("img")[0].setAttribute("onclick","blackPawnMovementHighlight(this.parentElement.id)");
        }

        //rook
        if(hasImage(whiteSquares[i].id,"blackRook")){
            whiteSquares[i].getElementsByTagName("img")[0].setAttribute("onclick","rookMovementHighlight(this.parentElement.id)");
        }
        if(hasImage(blackSquares[i].id,"blackRook")){
            blackSquares[i].getElementsByTagName("img")[0].setAttribute("onclick","rookMovementHighlight(this.parentElement.id)");
        }

        //bishop
        if(hasImage(whiteSquares[i].id,"blackBishop")){
            whiteSquares[i].getElementsByTagName("img")[0].setAttribute("onclick","bishopMovementHighlight(this.parentElement.id)");
        }
        if(hasImage(blackSquares[i].id,"blackBishop")){
            blackSquares[i].getElementsByTagName("img")[0].setAttribute("onclick","bishopMovementHighlight(this.parentElement.id)");
        }

        //queen
        if(hasImage(whiteSquares[i].id,"blackQueen")){
            whiteSquares[i].getElementsByTagName("img")[0].setAttribute("onclick","queenMovementHighlight(this.parentElement.id)");
        }
        if(hasImage(blackSquares[i].id,"blackQueen")){
            blackSquares[i].getElementsByTagName("img")[0].setAttribute("onclick","queenMovementHighlight(this.parentElement.id)");
        }

        //knight
        if(hasImage(whiteSquares[i].id,"blackKnight")){
            whiteSquares[i].getElementsByTagName("img")[0].setAttribute("onclick","knightMovementHighlight(this.parentElement.id)");
        }
        if(hasImage(blackSquares[i].id,"blackKnight")){
            blackSquares[i].getElementsByTagName("img")[0].setAttribute("onclick","knightMovementHighlight(this.parentElement.id)");
        }

        //king
        if(hasImage(whiteSquares[i].id,"blackKing")){
            whiteSquares[i].getElementsByTagName("img")[0].setAttribute("onclick","kingMovementHighlight(this.parentElement.id)");
        }
        if(hasImage(blackSquares[i].id,"blackKing")){
            blackSquares[i].getElementsByTagName("img")[0].setAttribute("onclick","kingMovementHighlight(this.parentElement.id)");
        }

    }
    whiteTurn=false;
    console.log("enabled black moves")
}

function disableWhiteMoves(){
    for (var i = 0; i<whiteSquares.length; i++){
        if(hasImage(whiteSquares[i].id,"white")){
            whiteSquares[i].getElementsByTagName("img")[0].removeAttribute("onclick");
        }
        if(hasImage(blackSquares[i].id,"white")){
            blackSquares[i].getElementsByTagName("img")[0].removeAttribute("onclick");
        }
    }
    console.log("disabled white moves")
    whiteTurn=false;

}

function enableWhiteMoves(){
    for (var i = 0; i<whiteSquares.length; i++){
        if(hasImage(whiteSquares[i].id,"whitePawn")){
            whiteSquares[i].getElementsByTagName("img")[0].setAttribute("onclick","pawnMovementHighlight(this.parentElement.id)");
        }
        if(hasImage(blackSquares[i].id,"whitePawn")){
            blackSquares[i].getElementsByTagName("img")[0].setAttribute("onclick","pawnMovementHighlight(this.parentElement.id)");
        }

        //rook
        if(hasImage(whiteSquares[i].id,"whiteRook")){
            whiteSquares[i].getElementsByTagName("img")[0].setAttribute("onclick","rookMovementHighlight(this.parentElement.id)");
        }
        if(hasImage(blackSquares[i].id,"whiteRook")){
            blackSquares[i].getElementsByTagName("img")[0].setAttribute("onclick","rookMovementHighlight(this.parentElement.id)");
        }

        //bishop
        if(hasImage(whiteSquares[i].id,"whiteBishop")){
            whiteSquares[i].getElementsByTagName("img")[0].setAttribute("onclick","bishopMovementHighlight(this.parentElement.id)");
        }
        if(hasImage(blackSquares[i].id,"whiteBishop")){
            blackSquares[i].getElementsByTagName("img")[0].setAttribute("onclick","bishopMovementHighlight(this.parentElement.id)");
        }

        //queen
        if(hasImage(whiteSquares[i].id,"whiteQueen")){
            whiteSquares[i].getElementsByTagName("img")[0].setAttribute("onclick","queenMovementHighlight(this.parentElement.id)");
        }
        if(hasImage(blackSquares[i].id,"whiteQueen")){
            blackSquares[i].getElementsByTagName("img")[0].setAttribute("onclick","queenMovementHighlight(this.parentElement.id)");
        }

        //knight
        if(hasImage(whiteSquares[i].id,"whiteKnight")){
            whiteSquares[i].getElementsByTagName("img")[0].setAttribute("onclick","knightMovementHighlight(this.parentElement.id)");
        }
        if(hasImage(blackSquares[i].id,"whiteKnight")){
            blackSquares[i].getElementsByTagName("img")[0].setAttribute("onclick","knightMovementHighlight(this.parentElement.id)");
        }

        //king
        if(hasImage(whiteSquares[i].id,"whiteKing")){
            whiteSquares[i].getElementsByTagName("img")[0].setAttribute("onclick","kingMovementHighlight(this.parentElement.id)");
        }
        if(hasImage(blackSquares[i].id,"whiteKing")){
            blackSquares[i].getElementsByTagName("img")[0].setAttribute("onclick","kingMovementHighlight(this.parentElement.id)");
        }

    }
    whiteTurn=true;
    console.log("enabled white moves")

}

function pawnMovementHighlight(clicked_id){
    // console.log("Highlighting pawn movement");
    // console.log(clicked_id);

    resetColor(); //resetting color in case a previous piece was selected

    //moving frontwards
    frontSquare = document.getElementById(clicked_id-8);
    //in case there is a piece in the front square, it will not be highlighted because you cannot move there
    // and as a result u cant move to the double front square if there is a piece in the front square
    if(!hasImage(clicked_id-8, 'white') && !hasImage(clicked_id-8, 'black')){
        frontSquare.style.backgroundColor = "orange";

        if(clicked_id>=49 && clicked_id<=56){
            doubleFrontSquare = document.getElementById(clicked_id-16);
            if(!hasImage(clicked_id-16, 'white') && !hasImage(clicked_id-16, 'black')){
            doubleFrontSquare.style.backgroundColor = "orange";
            }
        }
    }
    
    //diagonally attacking only if there is a black piece in the diagonal squares
    
    //diagonal left
    if(!leftEdgeSquares.includes(parseInt(clicked_id))){         // check if not on left edge
        diagonalLeftSquare = document.getElementById(clicked_id-9);
        if(hasImage(clicked_id-9, 'black')){
            diagonalLeftSquare.style.backgroundColor = "orange";
        }
        // diagonalLeftSquare.style.backgroundColor = "pink"; // for visual clarity, can be removed later
    }

    //diagonal right
    if(!rightEdgeSquares.includes(parseInt(clicked_id))){ // check if not on right edge
        diagonalRightSquare = document.getElementById(clicked_id-7);
        if(hasImage(clicked_id-7, 'black')){
            diagonalRightSquare.style.backgroundColor = "orange";
        }
        // diagonalRightSquare.style.backgroundColor = "pink"; // for visual clarity, can be removed later

    }


    selectedPieceId = clicked_id; 
    SelectedPieceImageName = "whitePawn.png"; // setting the selected piece id and name to be used in move function
    SelectedPieceClassName = "whitePawn";
}

function blackPawnMovementHighlight(clicked_id){
    // console.log("Highlighting pawn movement");
    // console.log(clicked_id);

    resetColor(); //resetting color in case a previous piece was selected

    //moving frontwards
    frontSquare = document.getElementById(Number(clicked_id)+8);
    //in case there is a piece in the front square, it will not be highlighted because you cannot move there
    // and as a result u cant move to the double front square if there is a piece in the front square
    if(!hasImage(Number(clicked_id)+8, 'white') && !hasImage(Number(clicked_id)+8, 'black')){
        frontSquare.style.backgroundColor = "orange";

        if(clicked_id>=9 && clicked_id<=16){
            doubleFrontSquare = document.getElementById(Number(clicked_id)+16);
            if(!hasImage(Number(clicked_id)+16, 'white') && !hasImage(Number(clicked_id)+16, 'black')){
            doubleFrontSquare.style.backgroundColor = "orange";
            }
        }
    }
    
    //diagonally attacking only if there is a black piece in the diagonal squares
    
    //diagonal left
    if(!leftEdgeSquares.includes(parseInt(clicked_id))){         // check if not on left edge
        diagonalLeftSquare = document.getElementById(Number(clicked_id)+7);
        if(hasImage(Number(clicked_id)+7, 'white')){
            diagonalLeftSquare.style.backgroundColor = "orange";
        }
        // diagonalLeftSquare.style.backgroundColor = "pink"; // for visual clarity, can be removed later
    }

    //diagonal right
    if(!rightEdgeSquares.includes(parseInt(clicked_id))){ // check if not on right edge
        diagonalRightSquare = document.getElementById(Number(clicked_id)+9);
        if(hasImage(Number(clicked_id)+9, 'white')){
            diagonalRightSquare.style.backgroundColor = "orange";
        }
        // diagonalRightSquare.style.backgroundColor = "pink"; // for visual clarity, can be removed later

    }


    selectedPieceId = clicked_id; 
    SelectedPieceImageName = "blackPawn.png"; // setting the selected piece id and name to be used in move function
    SelectedPieceClassName = "blackPawn";
}

function rookMovementHighlight(clicked_id){
    resetColor(); //resetting color in case a previous piece was selected
    console.log("Highlighting rook movement");
    console.log("clicked_id: ", clicked_id);

    //moving frontwards
    for (var i = clicked_id-8; i>0; i=i-8){
        console.log("i frontwards: ", i);

        if(whiteTurn){

        
            //stops highlighting if there is a white piece blocking rooks path
            if(hasImage(i, "white")){
                break;
            }

            square = document.getElementById(i);
            square.style.backgroundColor = "orange";

            if(hasImage(i, "black")){ //if there is a black piece, stop highlighting after black piece is also highlighted since black piece is capturable
                break;
            }
        }
        else{
            //stops highlighting if there is a black piece blocking rooks path
            if(hasImage(i, "black")){
                break;
            }

            square = document.getElementById(i);
            square.style.backgroundColor = "orange";

            if(hasImage(i, "white")){ //if there is a white piece, stop highlighting after white piece is also highlighted since black piece is capturable
                break;
            }
        }
    }

    //moving backwards
    for (var i = Number(clicked_id)+8; i<65; i=i+8){
        console.log("i backwards: ", i);

        if(whiteTurn){
            //stops highlighting if there is a white piece blocking rooks path
            if(hasImage(i, "white")){
                break;
            }
    
            square = document.getElementById(i);
            square.style.backgroundColor = "orange";
    
            if(hasImage(i, "black")){ //if there is a black piece, stop highlighting after black piece is also highlighted since black piece is capturable
                break;
            }            
        }
        else{
            if(hasImage(i, "black")){
                break;
            }
    
            square = document.getElementById(i);
            square.style.backgroundColor = "orange";
    
            if(hasImage(i, "white")){ //if there is a black piece, stop highlighting after black piece is also highlighted since black piece is capturable
                break;
            }          
        }

    }

    //moving left
    if(!leftEdgeSquares.includes(parseInt(clicked_id))){ // check if not on left edge
        for (var i = clicked_id-1; !rightEdgeSquares.includes(parseInt(i)); i=i-1){
            console.log("i left: ", i);

                    //edge case if clicked id is 2
                    if(i<=0){
                        break;
                    }
    
                    //stops highlighting if there is a white piece blocking rooks path
                    if(whiteTurn){
                        if(hasImage(i, "white")){
                            break;
                        }
                
                        square = document.getElementById(i);
                        square.style.backgroundColor = "orange";
                
                        if(hasImage(i, "black")){ //if there is a black piece, stop highlighting after black piece is also highlighted since black piece is capturable
                            break;
                        }
                    }
                    else{
                        if(hasImage(i, "black")){
                            break;
                        }
                
                        square = document.getElementById(i);
                        square.style.backgroundColor = "orange";
                
                        if(hasImage(i, "white")){ //if there is a black piece, stop highlighting after black piece is also highlighted since black piece is capturable
                            break;
                        }
                    }

        }        
    }

    //moving right
    if(!rightEdgeSquares.includes(parseInt(clicked_id))){ // check if not on left edge
        for (var i = Number(clicked_id)+1; !leftEdgeSquares.includes(parseInt(i)); i=i+1){
            console.log("i right: ", i);

                    if(i>=65){
                        break;
                    }
    
                    //stops highlighting if there is a white piece blocking rooks path
                    if(whiteTurn){
                        if(hasImage(i, "white")){
                            break;
                        }
                
                        square = document.getElementById(i);
                        square.style.backgroundColor = "orange";
                
                        if(hasImage(i, "black")){ //if there is a black piece, stop highlighting after black piece is also highlighted since black piece is capturable
                            break;
                        }
                    }
                    else{
                        if(hasImage(i, "black")){
                            break;
                        }
                
                        square = document.getElementById(i);
                        square.style.backgroundColor = "orange";
                
                        if(hasImage(i, "white")){ //if there is a black piece, stop highlighting after black piece is also highlighted since black piece is capturable
                            break;
                        }
                    }

        }        
    }


    selectedPieceId = clicked_id;
    if(whiteTurn){
        SelectedPieceImageName = "whiteRook.png";
        SelectedPieceClassName = "whiteRook"; // setting the selected piece id and name to be used in move function
    }
    else{
        SelectedPieceImageName= "blackRook.png";
        SelectedPieceClassName = "blackRook";
    }

}

function bishopMovementHighlight(clicked_id){
    resetColor(); //resetting color in case a previous piece was selected

    console.log("Highlighting bishop movement");
    console.log("clicked_id: ", clicked_id);

    //moving frontwards diagonally left
    console.log("clicked id - 9: ", clicked_id-9);
    for (var i = clicked_id-9; !rightEdgeSquares.includes(parseInt(i)); i=i-9){
        console.log("i frontwards: L ", i);

        if(i<=0){
            break
        }

        //stops highlighting if there is a white piece blocking rooks path
        if(whiteTurn){
            if(hasImage(i, "white")){
                break;
            }
    
            square = document.getElementById(i);
            square.style.backgroundColor = "orange";
    
            if(hasImage(i, "black")){ //if there is a black piece, stop highlighting after black piece is also highlighted since black piece is capturable
                break;
            }
        }
        else{
            if(hasImage(i, "black")){
                break;
            }
    
            square = document.getElementById(i);
            square.style.backgroundColor = "orange";
    
            if(hasImage(i, "white")){ //if there is a black piece, stop highlighting after black piece is also highlighted since black piece is capturable
                break;
            }
        }

    }

        //moving frontwards diagonally right
        for (var i = clicked_id-7; !leftEdgeSquares.includes(parseInt(i)); i=i-7){
            console.log("i frontwards R: ", i);

            if(i<=0){
                break
            }
    
            //stops highlighting if there is a white piece blocking rooks path
            if(whiteTurn){
                if(hasImage(i, "white")){
                    break;
                }
        
                square = document.getElementById(i);
                square.style.backgroundColor = "orange";
        
                if(hasImage(i, "black")){ //if there is a black piece, stop highlighting after black piece is also highlighted since black piece is capturable
                    break;
                }
            }
            else{
                if(hasImage(i, "black")){
                    break;
                }
        
                square = document.getElementById(i);
                square.style.backgroundColor = "orange";
        
                if(hasImage(i, "white")){ //if there is a black piece, stop highlighting after black piece is also highlighted since black piece is capturable
                    break;
                }
            }

        }

        //moving diagonally left backwards
        for (var i = Number(clicked_id)+7; !rightEdgeSquares.includes(parseInt(i)); i=i+7){
            console.log("i backwards L: ", i);

            if(i>=65){
                break
            }
    
            if(whiteTurn){
                //stops highlighting if there is a white piece blocking rooks path
                if(hasImage(i, "white")){
                    break;
                }
        
                square = document.getElementById(i);
                square.style.backgroundColor = "orange";
        
                if(hasImage(i, "black")){ //if there is a black piece, stop highlighting after black piece is also highlighted since black piece is capturable
                    break;
                }
            }
            else{
                //stops highlighting if there is a white piece blocking rooks path
                if(hasImage(i, "black")){
                    break;
                }
        
                square = document.getElementById(i);
                square.style.backgroundColor = "orange";
        
                if(hasImage(i, "white")){ //if there is a black piece, stop highlighting after black piece is also highlighted since black piece is capturable
                    break;
                }
            }

        }

        //moving diagonally right backwards
        for (var i = Number(clicked_id)+9; !leftEdgeSquares.includes(parseInt(i)); i=i+9){
            console.log("i backwards R: ", i);

            if(i>=65){
                break
            }
            
            if(whiteTurn){
                //stops highlighting if there is a white piece blocking rooks path
                if(hasImage(i, "white")){
                    break;
                }
        
                square = document.getElementById(i);
                square.style.backgroundColor = "orange";
        
                if(hasImage(i, "black")){ //if there is a black piece, stop highlighting after black piece is also highlighted since black piece is capturable
                    break;
                }
            }
            else{
                if(hasImage(i, "black")){
                    break;
                }
        
                square = document.getElementById(i);
                square.style.backgroundColor = "orange";
        
                if(hasImage(i, "white")){ //if there is a black piece, stop highlighting after black piece is also highlighted since black piece is capturable
                    break;
                }
            }

        }

        selectedPieceId = clicked_id;

        if(whiteTurn){
            SelectedPieceImageName = "whiteBishop.png"
            SelectedPieceClassName = "whiteBishop"; // setting the selected piece id and name to be used in move function
        }
        else{
            SelectedPieceImageName = "blackBishop.png"
            SelectedPieceClassName = "blackBishop"; // setting the selected piece id and name to be used in move function
        }


    
}

function queenMovementHighlight(clicked_id){
    console.log("Highlighting queen movement");
    console.log("clicked_id: ", clicked_id);

    //queen movement = rook movement + bishop movement
    rookMovementHighlight(clicked_id);
    queenMove=true; //setting queenMove to true so that resetColor function is not called in bishopMovementHighlight function
    bishopMovementHighlight(clicked_id);
    queenMove = false; //resetting queenMove to false since resetColor function should be called in next piece

    selectedPieceId = clicked_id;

    if(whiteTurn){
        SelectedPieceImageName = "whiteQueen.png"
        SelectedPieceClassName = "whiteQueen";
    }
    else{
        SelectedPieceImageName = "blackQueen.png"
        SelectedPieceClassName = "blackQueen";
    }

}

function knightMovementHighlight(clicked_id){
    console.log("Highlighting knight movement");
    console.log("clicked_id: ", clicked_id);

    resetColor(); //resetting color in case a previous piece was selected

    //Tall L left movement front
    if(!leftEdgeSquares.includes(parseInt(clicked_id))){
        if(clicked_id-17>0){
            square = document.getElementById(clicked_id-17);
        
            if(whiteTurn){
                if(!hasImage(clicked_id-17, 'white')){
                    square.style.backgroundColor = "orange";
                }
            }
            else{
                if(!hasImage(clicked_id-17, 'black')){
                    square.style.backgroundColor = "orange";
                }
            }

        }
    }


    //Tall L right movement front
    if(!rightEdgeSquares.includes(parseInt(clicked_id))){
        if(clicked_id-15>0){
            square = document.getElementById(clicked_id-15);
        
            if(whiteTurn){
                if(!hasImage(clicked_id-15, 'white')){
                    square.style.backgroundColor = "orange";
                }
            }
            else{
                if(!hasImage(clicked_id-15, 'black')){
                    square.style.backgroundColor = "orange";
                }
            }

        }
    }

    //Broad L left movement front

    if(!leftEdgeSquares.includes(parseInt(clicked_id))){
        if(!secondLeftEdgeSquares.includes(parseInt(clicked_id))){ //stops from going over left edge if it is on second left edge
            if(clicked_id-10>0){ //if on front edge
                square = document.getElementById(clicked_id-10);
                if(whiteTurn){
                    if(!hasImage(clicked_id-10, 'white')){
                        square.style.backgroundColor = "orange";
                    }
                }
                else{
                    if(!hasImage(clicked_id-10, 'black')){
                        square.style.backgroundColor = "orange";
                    }
                }
            }
        }
    }

    //Broad L right movement front

    if(!rightEdgeSquares.includes(parseInt(clicked_id))){
        if(!secondRightEdgeSquares.includes(parseInt(clicked_id))){ //stops from going over left edge if it is on second left edge
            if(clicked_id-6>0){ // if on front edge of board
                square = document.getElementById(clicked_id-6);
                if(whiteTurn){
                    if(!hasImage(clicked_id-6, 'white')){
                        square.style.backgroundColor = "orange";
                    }
                }
                else{
                    if(!hasImage(clicked_id-6, 'black')){
                        square.style.backgroundColor = "orange";
                    }
                }

            }
        }
    }

    //Tall L left movement back
    if(!leftEdgeSquares.includes(parseInt(clicked_id))){
        console.log("clicked_id+15: ", Number(clicked_id)+15);
        if(Number(clicked_id)+15<=64){
            square = document.getElementById(Number(clicked_id)+15);
        
            if(whiteTurn){
                if(!hasImage(Number(clicked_id)+15, 'white')){
                    square.style.backgroundColor = "orange";
                }
            }
            else{
                if(!hasImage(Number(clicked_id)+15, 'black')){
                    square.style.backgroundColor = "orange";
                }
            }

        }
    }

    //Tall L right movement back
    if(!rightEdgeSquares.includes(parseInt(clicked_id))){
        console.log("clicked_id+17: ", Number(clicked_id)+17);
        if(Number(clicked_id)+17<=64){
            square = document.getElementById(Number(clicked_id)+17);
        
            if(whiteTurn){
                if(!hasImage(Number(clicked_id)+17, 'white')){
                    square.style.backgroundColor = "orange";
                }
            }
            else{
                if(!hasImage(Number(clicked_id)+17, 'black')){
                    square.style.backgroundColor = "orange";
                }
            }

        }
    }

    //Broad L left movement back
    if(!leftEdgeSquares.includes(parseInt(clicked_id))){
        if(!secondLeftEdgeSquares.includes(parseInt(clicked_id))){ //stops from going over left edge if it is on second left edge
            if(Number(clicked_id)+6<=64){ //if on front edge
                square = document.getElementById(Number(clicked_id)+6);
                if(whiteTurn){
                    if(!hasImage(Number(clicked_id)+6, 'white')){
                        square.style.backgroundColor = "orange";
                    }
                }
                else{
                    if(!hasImage(Number(clicked_id)+6, 'black')){
                        square.style.backgroundColor = "orange";
                    }
                }

            }
        }
    }



    //Broad L right movement back
    if(!rightEdgeSquares.includes(parseInt(clicked_id))){
        if(!secondRightEdgeSquares.includes(parseInt(clicked_id))){ //stops from going over left edge if it is on second left edge
            if(Number(clicked_id)+10<=64){ //if on front edge
                square = document.getElementById(Number(clicked_id)+10);
                if(whiteTurn){
                    if(!hasImage(Number(clicked_id)+10, 'white')){
                        square.style.backgroundColor = "orange";
                    }
                }
                else{
                    if(!hasImage(Number(clicked_id)+10, 'black')){
                        square.style.backgroundColor = "orange";
                    }
                }

            }
        }
    }

    selectedPieceId = clicked_id;
    if(whiteTurn){
        SelectedPieceImageName = "whiteKnight.png"
        SelectedPieceClassName = "whiteKnight";
    }
    else{
        SelectedPieceImageName = "blackKnight.png"
        SelectedPieceClassName = "blackKnight";
    }


}

function kingMovementHighlight(clicked_id){
    console.log("Highlighting king movement");
    console.log("clicked_id: ", clicked_id);
    resetColor(); //resetting color in case a previous piece was selected

    //moving frontwards
    if(clicked_id-8>0){
        frontSquare = document.getElementById(clicked_id-8);
        if(whiteTurn){
            if(!hasImage(clicked_id-8, 'white')){
                frontSquare.style.backgroundColor = "orange";
            }
        }
        else{
            if(!hasImage(clicked_id-8, 'black')){
                frontSquare.style.backgroundColor = "orange";
            }
        }
    }

    //moving frontwards right
    if(clicked_id-7>0){
        frontSquare = document.getElementById(clicked_id-7);
        if(whiteTurn){
            if(!hasImage(clicked_id-7, 'white')){
                frontSquare.style.backgroundColor = "orange";
            }
        }
        else{
            if(!hasImage(clicked_id-7, 'black')){
                frontSquare.style.backgroundColor = "orange";
            }
        }

    }

    //moving frontwards left
    if(clicked_id-9>0){
        frontSquare = document.getElementById(clicked_id-9);
        if(whiteTurn){
            if(!hasImage(clicked_id-9, 'white')){
                frontSquare.style.backgroundColor = "orange";
            }
        }
        else{
            if(!hasImage(clicked_id-9, 'black')){
                frontSquare.style.backgroundColor = "orange";
            }
        }

    }

    //moving left
    if(!leftEdgeSquares.includes(parseInt(clicked_id))){ // check if not on left edge
        leftSquare = document.getElementById(clicked_id-1);
        if(whiteTurn){
            if(!hasImage(clicked_id-1, 'white')){
                leftSquare.style.backgroundColor = "orange";
            }
        }
        else{
            if(!hasImage(clicked_id-1, 'black')){
                leftSquare.style.backgroundColor = "orange";
            }
        }

    }

    //moving right
    if(!rightEdgeSquares.includes(parseInt(clicked_id))){ // check if not on right edge
        rightSquare = document.getElementById(Number(clicked_id)+1);
        if(whiteTurn){
            if(!hasImage(Number(clicked_id)+1, 'white')){
                rightSquare.style.backgroundColor = "orange";
            }
        }
        else{
            if(!hasImage(Number(clicked_id)+1, 'black')){
                rightSquare.style.backgroundColor = "orange";
            }
        }

    }

    //moving backwards
    if(Number(clicked_id)+8<=64){
        backSquare = document.getElementById(Number(clicked_id)+8);
        if(whiteTurn){
            if(!hasImage(Number(clicked_id)+8, 'white')){
                backSquare.style.backgroundColor = "orange";
            }
        }
        else{
            if(!hasImage(Number(clicked_id)+8, 'black')){
                backSquare.style.backgroundColor = "orange";
            }
        }

    }

    //moving backwards left
    if(Number(clicked_id)+7<=64){
        backSquare = document.getElementById(Number(clicked_id)+7);
        if(whiteTurn){
            if(!hasImage(Number(clicked_id)+7, 'white')){
                backSquare.style.backgroundColor = "orange";
            }
        }
        else{
            if(!hasImage(Number(clicked_id)+7, 'black')){
                backSquare.style.backgroundColor = "orange";
            }
        }

    }

    //moving backwards right
    if(Number(clicked_id)+9<=64){
        backSquare = document.getElementById(Number(clicked_id)+9);
        if(whiteTurn){
            if(!hasImage(Number(clicked_id)+9, 'white')){
                backSquare.style.backgroundColor = "orange";
            }
        }
        else{
            if(!hasImage(Number(clicked_id)+9, 'black')){
                backSquare.style.backgroundColor = "orange";
            }
        }

    }


    selectedPieceId = clicked_id;

    if(whiteTurn){
        SelectedPieceImageName = "whiteKing.png"
        SelectedPieceClassName = "whiteKing";
    }
    else{
        SelectedPieceImageName = "blackKing.png"
        SelectedPieceClassName = "blackKing";
    }

}


function move(clicked_id){
    clickedSquare = document.getElementById(clicked_id);
    console.log("clicked id= "+ clicked_id);
    console.log("clicked square= "+ clickedSquare);

    if (clickedSquare.style.backgroundColor == "orange"){
        //moving piece

        //creating a white pawn image to put in the clicked orange square
        //will have to edit later so that its applicable for all pieces (using something like selectedPieceId)
        // console.log("orange square clicked");
        while(clickedSquare.hasChildNodes()){ //removes image of captured piece if any

            if(hasImage(clicked_id,"blackKing")){
                window.alert("Black king is captured. White won!");
                console.log(document.getElementsByClassName("blackKing"));
                const imageElement = document.getElementsByClassName("blackKing")[0];
                
                imageElement.style.transform = 'rotate(180deg)';
                resetColor();
                disableBlackMoves();
                disableWhiteMoves();
                return;
            }
            else if(hasImage(clicked_id,"whiteKing")){
                window.alert("White king is captured. Black won!");
                const imageElement = document.getElementsByClassName("whiteKing")[0];
                imageElement.style.transform = 'rotate(180deg)';
                resetColor();
                disableBlackMoves();
                disableWhiteMoves();
                return;
            }
            else{
                clickedSquare.removeChild(clickedSquare.firstChild);
            }
        }

        console.log("selectedPiece: ", SelectedPieceImageName);
        const whitePiece = document.createElement("img");
        whitePiece.src = "images/" + SelectedPieceImageName; //using the selectedPieceImageName variable to get the image of the piece
        whitePiece.className = SelectedPieceClassName;


        clickedSquare.appendChild(whitePiece);

        //setting whose turn it is
        if(SelectedPieceImageName.includes("white")){
            enableBlackMoves();
            disableWhiteMoves();
        }
        else{
            disableBlackMoves();
            enableWhiteMoves();
        }

        // removing white image from previos square
        previousSquare = document.getElementById(selectedPieceId); //put in move function

        // console.log("previous square id: ", previousSquare.id);
        // console.log("selectedpieceimagename: ", SelectedPieceImageName);
        if(SelectedPieceImageName=="whitePawn.png" && previousSquare.id>=9 && previousSquare.id<=16){
            var choice = window.prompt("Type in the name of the chess piece you want to promote your pawn to (queen,rook,bishop,knight) - ","queen");

            if(choice=="queen" || choice=="Queen" || choice=="q" || choice=="Q" || choice=="QUEEN"){
                console.log("Promoting pawn to queen");
                whitePiece.src = "images/whiteQueen.png"; //promoting pawn to queen if it reaches the last row
                whitePiece.className = "whiteQueen"; //changing class name to whiteQueen
                clickedSquare.appendChild(whitePiece); //appending the queen image to the clicked square
            }
            else if(choice =="knight" || choice=="night" || choice == "NIGHT" || choice=="k" || choice=="K" || choice=="Knight" || choice=="KNIGHT"){
                console.log("Promoting pawn to knight");
                whitePiece.src = "images/whiteKnight.png"; //promoting pawn to knight if it reaches the last row
                whitePiece.className = "whiteKnight"; //changing class name to whiteKnight
                clickedSquare.appendChild(whitePiece); //appending the knight image to the clicked square
            }
            else if(choice =="bishop" || choice=="Bishop" || choice=="b" || choice=="B" || choice=="BISHOP"){
                console.log("Promoting pawn to bishop");
                whitePiece.src = "images/whiteBishop.png"; //promoting pawn to bishop if it reaches the last row
                whitePiece.className = "whiteBishop"; //changing class name to whiteBishop
                clickedSquare.appendChild(whitePiece); //appending the bishop image to the clicked square
            }
            else if(choice =="rook" || choice=="Rook" || choice=="r" || choice=="R" || choice=="ROOK"){
                console.log("Promoting pawn to rook");
                whitePiece.src = "images/whiteRook.png"; //promoting pawn to bishop if it reaches the last row
                whitePiece.className = "whiteRook"; //changing class name to whiteBishop
                clickedSquare.appendChild(whitePiece); //appending the bishop image to the clicked square
            }
            else{
                window.alert("Invalid choice! Pawn will be promoted to queen by default.");
                console.log("Promoting pawn to queen by default");
                whitePiece.src = "images/whiteQueen.png"; //promoting pawn to queen if it reaches the last row
                whitePiece.className = "whiteQueen"; //changing class name to whiteQueen
                clickedSquare.appendChild(whitePiece); //appending the queen image to the clicked square
            }
        }

        if(SelectedPieceImageName=="blackPawn.png" && previousSquare.id>=49 && previousSquare.id<=56){
            var choice = window.prompt("Type in the name of the chess piece you want to promote your pawn to (queen,rook,bishop,knight) - ","queen");

            if(choice=="queen" || choice=="Queen" || choice=="q" || choice=="Q" || choice=="QUEEN"){
                console.log("Promoting pawn to queen");
                whitePiece.src = "images/blackQueen.png"; //promoting pawn to queen if it reaches the last row
                whitePiece.className = "blackQueen"; //changing class name to whiteQueen
                clickedSquare.appendChild(whitePiece); //appending the queen image to the clicked square
            }
            else if(choice =="knight" || choice=="night" || choice == "NIGHT" || choice=="k" || choice=="K" || choice=="Knight" || choice=="KNIGHT"){
                console.log("Promoting pawn to knight");
                whitePiece.src = "images/blackKnight.png"; //promoting pawn to knight if it reaches the last row
                whitePiece.className = "blackKnight"; //changing class name to whiteKnight
                clickedSquare.appendChild(whitePiece); //appending the knight image to the clicked square
            }
            else if(choice =="bishop" || choice=="Bishop" || choice=="b" || choice=="B" || choice=="BISHOP"){
                console.log("Promoting pawn to bishop");
                whitePiece.src = "images/blackBishop.png"; //promoting pawn to bishop if it reaches the last row
                whitePiece.className = "blackBishop"; //changing class name to whiteBishop
                clickedSquare.appendChild(whitePiece); //appending the bishop image to the clicked square
            }
            else if(choice =="rook" || choice=="Rook" || choice=="r" || choice=="R" || choice=="ROOK"){
                console.log("Promoting pawn to rook");
                whitePiece.src = "images/blackRook.png"; //promoting pawn to bishop if it reaches the last row
                whitePiece.className = "blackRook"; //changing class name to whiteBishop
                clickedSquare.appendChild(whitePiece); //appending the bishop image to the clicked square
            }
            else{
                window.alert("Invalid choice! Pawn will be promoted to queen by default.");
                console.log("Promoting pawn to queen by default");
                whitePiece.src = "images/whiteQueen.png"; //promoting pawn to queen if it reaches the last row
                whitePiece.className = "whiteQueen"; //changing class name to whiteQueen
                clickedSquare.appendChild(whitePiece); //appending the queen image to the clicked square
            }
        }

        while(previousSquare.hasChildNodes()){ //removes image of white pawn
            previousSquare.removeChild(previousSquare.firstChild);
        }
        selectedPieceId=null; //resetting selectedPieceId to null after moving the piece
        SelectedPieceImageName=""; //resetting SelectedPieceImageName to empty string after moving the piece
        SelectedPieceClassName=""; //resetting SelectedPieceClassName to empty string after moving the piece

        //removing orange color because move has been done
        resetColor();
        


    }
    else{
        // console.log("non orange square clicked.")
    }
}


// <!-- Credits for images of chess pieces:  -->

// <!-- White Pawn:By en:User:Cburnett - File:Chess plt45.svg, CC BY-SA 3.0, License: https://creativecommons.org/licenses/by-sa/3.0/deed.en
// Link: https://commons.wikimedia.org/w/index.php?curid=20363783 -->

// <!-- Black Pawn:By en:User:Cburnett - File:Chess pdt45.svg, CC BY-SA 3.0, License: https://creativecommons.org/licenses/by-sa/3.0/deed.en
// Link: https://commons.wikimedia.org/w/index.php?curid=20363782 -->

// <!-- White Knight:By en:User:Cburnett - File:Chess nlt45.svg, CC BY-SA 3.0, License: https://creativecommons.org/licenses/by-sa/3.0/deed.en
// Link: https://commons.wikimedia.org/w/index.php?curid=20363781 -->

// <!-- Black Knight:By en:User:Cburnett - File:Chess ndt45.svg, CC BY-SA 3.0 License: https://creativecommons.org/licenses/by-sa/3.0/deed.en
// Link: https://commons.wikimedia.org/w/index.php?curid=20363780 -->

// <!-- White Bishop:By en:User:Cburnett - File:Chess blt45.svg, CC BY-SA 3.0, License: https://creativecommons.org/licenses/by-sa/3.0/deed.en
// Link: https://commons.wikimedia.org/w/index.php?curid=20363777 -->

// <!-- Black Bishop:By en:User:Cburnett - File:Chess bdt45.svg, CC BY-SA 3.0, License: https://creativecommons.org/licenses/by-sa/3.0/deed.en
// Link: https://commons.wikimedia.org/w/index.php?curid=20363776 -->

// <!-- White Rook: By en:User:Cburnett - File:Chess rlt45.svg, CC BY-SA 3.0, License: https://creativecommons.org/licenses/by-sa/3.0/deed.en
// Link: https://commons.wikimedia.org/w/index.php?curid=20363775 -->

// <!-- Black Rook: By en:User:Cburnett - File:Chess rdt45.svg, CC BY-SA 3.0, License: https://creativecommons.org/licenses/by-sa/3.0/deed.en
// Link: https://commons.wikimedia.org/w/index.php?curid=20363786 -->

// <!-- White Queen:By en:User:Cburnett - File:Chess qlt45.svg, CC BY-SA 3.0, License: https://creativecommons.org/licenses/by-sa/3.0/deed.en
// Link: https://commons.wikimedia.org/w/index.php?curid=20363785 -->

// <!-- Black Queen:By en:User:Cburnett - File:Chess qdt45.svg, CC BY-SA 3.0, License: https://creativecommons.org/licenses/by-sa/3.0/deed.en
// Link: https://commons.wikimedia.org/w/index.php?curid=20363784 -->

// <!-- White King:By en:User:Cburnett - File:Chess klt45.svg, CC BY-SA 3.0, License: https://creativecommons.org/licenses/by-sa/3.0/deed.en
// Link: https://commons.wikimedia.org/w/index.php?curid=20363779 -->

// <!-- Black King:By en:User:Cburnett - File:Chess kdt45.svg, CC BY-SA 3.0, License: https://creativecommons.org/licenses/by-sa/3.0/deed.en
// Link: https://commons.wikimedia.org/w/index.php?curid=20363778 -->