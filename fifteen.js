
window.onload = function()
{
    gameOn();
    $("shufflebutton").onclick = shuffle;
};

//GLOBAL VARIABLES
var BOARD = [];
var puzzlePieces;

function arrangeTiles(tile, index)
{
    positionX(tile, index);
    positionY(tile, index);

    tile.style.backgroundPosition = (400 - getY(index)) + "px" + " " + (400 - getX(index)) + "px";
}

function layoutBoard()
{
    puzzlePieces = $$('#puzzlearea div');
    var idCounter = 0;
    puzzlePieces.each(function(element)
    {
        element.addClassName('puzzlepiece');
        element.id = idCounter;
        console.log(element.id); //FIXME
        arrangeTiles(element, idCounter);
        BOARD[idCounter] = 1;
        idCounter++;
    });
    BOARD[15] = 0;
}

function move(tile, indexToMoveTo)
{
    positionX(tile, indexToMoveTo);
    positionY(tile, indexToMoveTo);

    BOARD[indexToMoveTo] = 1;
    console.log(tile.id); //FIXME
    console.log(BOARD[tile.id]); //FIXME
    BOARD[tile.id] = 0;
    tile.id = indexToMoveTo;
    console.log(tile.id); //FIXME
}

function makeMove(tile)
{
    puzzlePieces[tile].onclick = function()
    {
        var indexToMoveTo = movableTile(parseInt(puzzlePieces[tile].id));
        console.log("INDEX:" + indexToMoveTo); //FIXME
        if (indexToMoveTo != -1)
        {
            move(puzzlePieces[tile], indexToMoveTo);
        }
    }
}

function makeRandomMove(tile)
{
    var indexToMoveTo = emptyTile();
    move(puzzlePieces[tile], indexToMoveTo);
}

function layoutBoardRandom()
{
    for (var n = 0; n < 10; n++)
    {
        var i = Math.floor(Math.random() * 15);
        console.log("RANDOM: " +i);
        makeRandomMove(i);
    }

}

function shuffle()
{
  layoutBoardRandom();
}

function gameOn()
{
    layoutBoard();
    for (var i = 0; i < 15; i++) //FIXME change to each loop
    {
        makeMove(i);
        onHover(i);
    }
}

function onHover(i)
{
    puzzlePieces[i].onmouseover = function()
    {
        var index = movableTile(parseInt(puzzlePieces[i].id));
        if (index != -1)
        {
            puzzlePieces[i].addClassName('movablepiece');
        }
        else
        {
            puzzlePieces[i].removeClassName('movablepiece');
        }
    }

}

function getY(index)
{

    return (index % 4) * 100;
}

function getX(index)
{
    return Math.floor(index / 4) * 100;
}

function positionY(tile, index)
{
    tile.style.left = getY(index) + "px";
}

function positionX(tile, index)
{
    tile.style.top = getX(index) + "px";

}



function emptyTile()
{
    for (var tilePosition = 0; tilePosition < 16; tilePosition++)
    {
        if (BOARD[tilePosition] === 0)
        {
            return tilePosition;
        }
    }
}

function movableTile(tilePosition)
{
    var emptyTilePosition = emptyTile();
    if ((tilePosition % 4 != 0 && tilePosition - 1 == emptyTilePosition) ||
        (tilePosition % 4 != 3 && tilePosition + 1 == emptyTilePosition) ||
        (tilePosition + 4 == emptyTilePosition) || (tilePosition - 4 == emptyTilePosition))
    {
        return emptyTilePosition;
    }
    return -1;
}

//TODO: IMPLEMENT SHUFFLE
//TODO: IMPLEMENT SPECIAL FEATURE
