var rows = 3;
var columns = 3;

var currTile; // tessera toccata
var otherTile; // tessera destinazione (vuota / 3.png)

var turns = 0;

var imgOrder = ["4", "2", "8", "5", "1", "6", "7", "9", "3"];

window.onload = function() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = imgOrder[r * columns + c] + ".png";

            // Evento touch per dispositivi mobili
            tile.addEventListener("touchstart", touchTile, { passive: false });

            document.getElementById("board").append(tile);
        }
    }
}

function touchTile(e) {
    e.preventDefault(); // Previene lo scrolling accidentale mentre si gioca
    currTile = this;

    // Cerca la tessera vuota ("3.png") all'interno della griglia
    let tiles = document.querySelectorAll("#board img");
    for (let i = 0; i < tiles.length; i++) {
        if (tiles[i].src.includes("3.png")) {
            otherTile = tiles[i];
            break;
        }
    }

    if (!otherTile) return;

    // Coordinate tessera toccata
    let currCord = currTile.id.split("-");
    let r = parseInt(currCord[0]);
    let c = parseInt(currCord[1]);

    // Coordinate tessera vuota
    let otherCord = otherTile.id.split("-");
    let r2 = parseInt(otherCord[0]);
    let c2 = parseInt(otherCord[1]);

    // Verifica adiacenza
    let moveLeft  = r == r2 && c2 == c - 1;
    let moveRight = r == r2 && c2 == c + 1;
    let moveUp    = c == c2 && r2 == r - 1;
    let moveDown  = c == c2 && r2 == r + 1;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;
    
    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;

        currTile.src = otherImg;
        otherTile.src = currImg;

        turns++;
        document.getElementById("turns").innerText = turns;
    }
}

function resetBoard() {
    let tiles = document.querySelectorAll("#board img");

    for (let i = 0; i < tiles.length; i++) {
        tiles[i].src = imgOrder[i] + ".png";
    }

    turns = 0;
    document.getElementById("turns").innerText = turns;
}