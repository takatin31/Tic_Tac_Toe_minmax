var arene = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

var arene2 = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

var nbrt = 9;

var turn = true; // X turn ==> true
var won = false;
var nbrEmpty = 9;
var tree;
var turn2 = true;


function setup() {
    createCanvas(450, 450);
    initDraw();
    tree = new Tree();
}

function draw() {


    if (!turn && !won && nbrEmpty != 0) {
        var turn2 = turn;
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                arene2[i][j] = arene[i][j];
            }
        }
        tree = new Tree();
        AITurn(arene2, tree.root, !turn2);

        var node = tree.root.next;
        //tree.root = node;

        //arene[node.l][node.c] = 1;
        //drawO(node.l, node.c);

        verify(node.l, node.c);
        nbrEmpty--;
    }
}

function plTurn(arene, root) {
    var arene2 = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];

    var found = false;

    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            arene2[i][j] = arene[i][j];
        }
    }

    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (arene[i][j] == 0) {
                var node = new Node(i, j);
                root.addNode(node);
                arene2[i][j] = 10;
                AITurn(arene2, node);
                found = true;
            }
        }
    }

    if (!found) {
        if (VerifyX(arene)) {
            root.points = -10;
        } else {
            if (VerifyO(arene))
                root.points = 10;
            else
                root.points = 0;
        }
    } else {
        root.calculatePoints(false);
    }
}


function AITurn(arene, root, turn) {
    var arene2 = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];

    var found = false;
    var turn2 = turn;


    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (arene[i][j] == 0) {
                for (var k = 0; k < 3; k++) {
                    for (var l = 0; l < 3; l++) {
                        arene2[k][l] = arene[k][l];
                    }
                }
                var node = new Node(i, j);
                root.addNode(node);
                if (turn2)
                    arene2[i][j] = 1;
                else
                    arene2[i][j] = 10;
                if (VerifyX(arene)) {
                    node.points = -10;
                } else {
                    if (VerifyO(arene)) {
                        node.points = 10;

                    } else
                        AITurn(arene2, node, !turn);
                }
                //console.log(arene);

                found = true;
            }
        }
    }

    if (!found) {

        if (VerifyX(arene)) {
            root.points = -10;
        } else {
            if (VerifyO(arene)) {
                root.points = 10;

            } else
                root.points = 0;
        }
        //console.log(arene);
        //console.log(root.points);
    } else {
        root.calculatePoints(turn);
    }
}

function initDraw() {
    background(51);
    stroke(255);
    strokeWeight(3);
    noFill();
    line(150, 0, 150, 450);
    line(300, 0, 300, 450);
    line(0, 150, 450, 150);
    line(0, 300, 450, 300);
}

function drawX(l, c) {
    var x = c * 150 + 20;
    var y = l * 150 + 20;

    arene[l][c] = 10;
    line(x, y, x + 100, y + 100);
    line(x, y + 100, x + 100, y);
}

function drawO(l, c) {
    var x = c * 150 + 75;
    var y = l * 150 + 75;

    arene[l][c] = 1;
    ellipse(x, y, 100, 100);
}

function VerifyX(arene) {
    var result = false;

    for (var i = 0; i < 3 && !result; i++) {
        if (sumHor(arene, i) == 30 || sumVer(arene, i) == 30) {
            result = true;
            return result;
        }
    }

    result = (sumDiag(arene, 0) == 30) || (sumDiag(arene, 1) == 30);
    return result;
}

function VerifyO(arene) {
    var result = false;

    for (var i = 0; i < 3 && !result; i++) {
        if (sumHor(arene, i) == 3 || sumVer(arene, i) == 3) {
            result = true;
            return result;
        }
    }

    result = (sumDiag(arene, 0) == 3) || (sumDiag(arene, 1) == 3);
    return result;
}

function sumHor(arene, i) {
    var sum = 0;
    for (var j = 0; j < 3; j++) {
        sum += arene[i][j];
    }
    return sum;
}

function sumVer(arene, i) {
    var sum = 0;
    for (var j = 0; j < 3; j++) {
        sum += arene[j][i];
    }
    return sum;
}

function sumDiag(arene, i) {
    if (i == 0)
        return (arene[0][0] + arene[1][1] + arene[2][2]);
    else
        return (arene[0][2] + arene[1][1] + arene[2][0]);
}

function verify(l, c) {
    if (turn) {
        drawX(l, c);
        won = VerifyX(arene);
    } else {
        drawO(l, c);
        won = VerifyO(arene);
    }
    if (!won)
        turn = !turn;
    else {
        if (turn) {
            console.log("Player Won");
        } else {
            console.log("Computer Won");
        }
    }
}

function mouseClicked() {
    if (mouseX < 450 && mouseY < 450 && !won) {
        var l = floor(mouseY / 150);
        var c = floor(mouseX / 150);
        nbrt--;
        if (arene[l][c] == 0) {
            verify(l, c);
            nbrEmpty--;
            if (nbrEmpty == 0) {
                console.log("it's a draw");
            }
        }
    }
}