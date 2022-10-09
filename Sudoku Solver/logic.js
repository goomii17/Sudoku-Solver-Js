let sizes = [4, 9, 16];
let fsizes = [100, 32, 16];
let sizeIndx;
let sudokus4 = [];
let sudokus9 = [];
let sudokus16 = [];
let solutions4 = [];
let solutions9 = [];
let solutions16 = [];
let boxX = 0;
let boxY = 0;
let writeM = false;
let currentSudoku = 0;
let warning = false;
let phone = false;
let sudoku = [
    ["0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0"],
];
let originals = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
];
let hideBox = false;
function setup() {
    let width = 465;
    let detector = new MobileDetect(window.navigator.userAgent);
    if (detector.phone() !== null || detector.tablet() !== null) {
        console.log("HE");
        phone = true;
        width = 800;
        changeSettings();
    }
    let canvas = createCanvas(width, width);
    canvas.parent("canvasContainer");
    sizeIndx = document.getElementById("size").value;
    document.getElementById("reset").disabled = true;
    getx4();
    getx9();
    getx16();
    writeMode();
    disableButtons();
}

async function getx4() {
    // const response = await fetch('C:/Users/Gomi/OneDrive/Programacion/HTML-CSS-JS/Sudoku Solver/4x4.csv');
    const response = await fetch('http://localhost:52330/4x4.csv');
    const data = await response.text();
    data.split('\n').slice(1).forEach(element => {
        let s4 = (element.split(',')[0]);
        let sol4 = (element.split(',')[1]);
        let sudoku4 = [];
        let solucion4 = [];
        let ind = 0;
        for (let i = 0; i < 4; i++) {
            let fila = [];
            let fsol = [];
            for (let j = 0; j < 4; j++) {
                fila.push(s4[ind]);
                fsol.push(sol4[ind]);
                ind++;
            }
            solucion4.push(fsol);
            sudoku4.push(fila);
        }
        solutions4.push(solucion4);
        sudokus4.push(sudoku4);
    });
    // console.log(sudokus4);
}


async function getx9() {
    const response = await fetch('http://localhost:52330/9x9.csv');
    const data = await response.text();
    data.split('\n').slice(1).forEach(element => {
        let s9 = (element.split(',')[0]);
        let sol9 = (element.split(',')[1]);
        let sudoku9 = [];
        let solucion9 = [];
        let ind = 0;
        for (let i = 0; i < 9; i++) {
            let fila = [];
            let fsol = [];
            for (let j = 0; j < 9; j++) {
                fila.push(s9[ind]);
                fsol.push(sol9[ind]);
                ind++;
            }
            solucion9.push(fsol);
            sudoku9.push(fila);
        }
        solutions9.push(solucion9);
        sudokus9.push(sudoku9);
    });
    // console.log(sudokus9);
}

async function getx16() {
    const response = await fetch('http://localhost:52330/16x16.csv');
    const data = await response.text();
    data.split('\n').slice(1).forEach(element => {
        let s16 = (element.split(',')[0]);
        let sol16 = (element.split(',')[1]);
        let sudoku16 = [];
        let solucion16 = [];
        let ind = 0;
        for (let i = 0; i < 16; i++) {
            let fila = [];
            let fsol = [];
            for (let j = 0; j < 16; j++) {
                fila.push(s16[ind]);
                fsol.push(sol16[ind]);
                ind++;
            }
            solucion16.push(fsol);
            sudoku16.push(fila);
        }
        solutions16.push(solucion16);
        sudokus16.push(sudoku16);
    });
    // console.log(sudokus16);
}

function draw() {
    background(255);
    drawSudoku(sudoku);
}

function drawSudoku() {
    let s = sizes[sizeIndx];
    let l = width / s;
    for (let i = 0; i < s; i++) {
        for (let j = 0; j < s; j++) {
            rect(i * l, j * l, l, l);
        }
    }
    for (let i = sqrt(s); i < s; i += sqrt(s)) {
        push();
        strokeWeight(3);
        line(0, i * l, width, i * l);
        pop();
    }
    for (let i = sqrt(s); i < s; i += sqrt(s)) {
        push();
        strokeWeight(3);
        line(i * l, 0, i * l, height);
        pop();
    }
    push();
    for (let i = 0; i < s; i++) {
        for (let j = 0; j < s; j++) {
            let digit = sudoku[i][j];
            if (digit == 0) digit = "";
            if (originals[i][j] == -1) {
                fill(0);
                textStyle(BOLD);
            } else {
                fill(89, 158, 25);
                textStyle(BOLDITALIC);
            }
            let fsize = fsizes[sizeIndx];
            textAlign(CENTER, CENTER);
            textSize(fsize);
            if (phone) {
                textSize(fsize * 1.8);
            }
            text(digit, (j * l) + fsize / 6, (i * l) + fsize / 8, l, l);
        }
    }
    pop();
    push();
    strokeWeight(5);
    noFill();
    rect(1, 1, width - 2, height - 2);
    pop();
    if (writeM && !hideBox) {
        push();
        noFill();
        strokeWeight(2.5);
        stroke(5, 5, 255);
        let sz = (width / sizes[sizeIndx]);
        rect(boxX * sz, boxY * sz, sz, sz);
        pop();
    }
    if (warning) {
        push();
        fill(255, 5, 5);
        // rect(boxX*width/sizes[sizeIndx],boxY*width/sizes[sizeIndx],width/sizes[sizeIndx],height/sizes[sizeIndx]);
        rect(0, 0, width, height);
        warning = false;
        pop();
    }
}

function randomize() {
    reset();
    if (!writeM) {
        sizeIndx = document.getElementById("size").value;
        if (sizeIndx == 0) {
            let s = [];
            let o = [];
            currentSudoku = Math.trunc(random(9999));
            let strsud = sudokus4[currentSudoku];
            for (let i = 0; i < 4; i++) {
                let r = [];
                let ro = [];
                for (let j = 0; j < 4; j++) {
                    let num = (strsud[i][j]);
                    r.push(num);
                    if (num != 0) {
                        ro.push(-1);
                    } else {
                        ro.push(0);
                    }
                }
                o.push(ro);
                s.push(r);
            }
            originals = o;
            sudoku = s;
        } else if (sizeIndx == 1) {
            let s = [];
            let o = [];
            currentSudoku = Math.trunc(random(9999));
            let strsud = sudokus9[currentSudoku];
            for (let i = 0; i < 9; i++) {
                let r = [];
                let ro = [];
                for (let j = 0; j < 9; j++) {
                    let num = (strsud[i][j]);
                    r.push(num);
                    if (num != 0) {
                        ro.push(-1);
                    } else {
                        ro.push(0);
                    }
                }
                o.push(ro);
                s.push(r);
            }
            originals = o;
            sudoku = s;
        } else if (sizeIndx == 2) {
            let s = [];
            let o = [];
            currentSudoku = Math.trunc(random(2999));
            let strsud = sudokus16[currentSudoku];

            for (let i = 0; i < 16; i++) {
                let r = [];
                let ro = [];
                for (let j = 0; j < 16; j++) {
                    let num = (strsud[i][j]);
                    r.push(num);
                    if (num != 0) {
                        ro.push(-1);
                    } else {
                        ro.push(0);
                    }
                }
                o.push(ro);
                s.push(r);
            }
            originals = o;
            sudoku = s;
        }
    }
}

function reset() {
    sizeIndx = document.getElementById("size").value;
    let s = sizes[sizeIndx];
    let newsudoku = [];
    let neworiginals = [];
    for (let i = 0; i < s; i++) {
        let s1 = [];
        let s2 = [];
        for (let j = 0; j < s; j++) {
            s1.push("0");
            s2.push(0);
        }
        newsudoku.push(s1);
        neworiginals.push(s2);
    }
    sudoku = newsudoku;
    originals = neworiginals;
    solved = false;
    currentSudoku = Math.trunc(random(2999));
    hideBox = false;
    boxX = 0;
    boxY = 0;
}

function comingSoon() {
    push();
    translate(width / 2, height / 2);
    rotate(radians(15));
    textAlign(CENTER);
    textSize(52);
    fill(255, 5, 5);
    text("COMING SOON", 0, 0);
    pop();
}

function solve() {
    if (writeM) {
        hideBox = true;
        solveSudoku();
    } else {
        let solution;
        if (sizeIndx == 0) {
            solution = solutions4[currentSudoku];
        } else if (sizeIndx == 1) {
            solution = solutions9[currentSudoku];
        } else if (sizeIndx == 2) {
            solution = solutions16[currentSudoku];
        }
        for (let i = 0; i < sizes[sizeIndx]; i++) {
            for (let j = 0; j < sizes[sizeIndx]; j++) {
                if (sudoku[i][j] == 0) {
                    sudoku[i][j] = (solution[i][j]);
                }
            }
        }
    }
}

function writeMode() {
    writeM = !writeM;
    document.getElementById("reset").disabled = !document.getElementById("reset").disabled;
    document.getElementById("randomize").disabled = !document.getElementById("randomize").disabled;
    reset();
    if (!writeM) {
        randomize();
        document.getElementById("write").style.background = "#2c3e50";
    } else {
        document.getElementById("write").style.background = "#0e7a0e";
        hideBox = false;
        boxX = 0;
        boxY = 0;
    }
}

function keyPressed() {
    if (completed()) solved = false;
    let sz = (width / sizes[sizeIndx]);
    if (writeM) {
        if (key == "Backspace") {
            sudoku[boxY][boxX] = 0;
            originals[boxY][boxX] = 0;
        } else if (key == "ArrowUp") {
            if (boxY > 0) boxY--;
            mouseY -= sz;
        } else if (key == "ArrowDown") {
            mouseY += sz;
            if (boxY < sizes[sizeIndx] - 1) boxY++;
        } else if (key == "ArrowRight") {
            if (boxX < sizes[sizeIndx] - 1) boxX++;
            mouseX += sz;
        } else if (key == "ArrowLeft") {
            if (boxX > 0) boxX--;
            mouseX -= sz;
        } else if (valid(key.toUpperCase())) {
            originals[boxY][boxX] = -1;
            sudoku[boxY][boxX] = key.toUpperCase();
        }
    }
}

function valid(key) {
    let validChars = "123456789ABCDEFG";
    let top = sizes[sizeIndx];
    let t = false;
    for (let i = 0; i < top; i++) {
        if (key == validChars[i]) {
            t = true;
        }
    }
    if (!t) return false;
    sudoku[boxY][boxX] = key;
    for (let i = 0; i < sizes[sizeIndx]; i++) {
        for (let j = 0; j < sizes[sizeIndx]; j++) {
            if (sudoku[i][j] != 0) {
                if (!sePuede(sudoku[i][j], i, j)) {
                    sudoku[boxY][boxX] = "0";
                    warning = true;
                    return false;
                }
            }
        }
    }
    return true;
}

function sePuede(k, y, x) {
    let s = sizes[sizeIndx];
    for (let i = 0; i < s; i++) {
        if (x != i) {
            if (sudoku[y][i] == k) return false;
        }
    }
    for (let i = 0; i < s; i++) {
        if (y != i) {
            if (sudoku[i][x] == k) return false;
        }
    }
    let sq = Math.sqrt(s);
    let f = Math.trunc(y / sq) * sq;
    let c = Math.trunc(x / sq) * sq;
    for (let i = f; i < f + sq; i++) {
        for (let j = c; j < c + sq; j++) {
            if (x != j || y != i) {
                if (sudoku[i][j] == k) return false;
            }
        }
    }
    return true;
}

function completed() {
    for (let i = 0; i < sizes[sizeIndx]; i++) {
        for (let j = 0; j < sizes[sizeIndx]; j++) {
            if (sudoku[i][j] == 0) return false;
        }
    }
    return true;
}

let solved = false;
function solveSudoku() {
    if (!completed() && !solved) {
        for (let i = 0; i < sizes[sizeIndx]; i++) {
            for (let j = 0; j < sizes[sizeIndx]; j++) {
                if (sudoku[i][j] == 0) {
                    for (let k = 1; k < sizes[sizeIndx] + 1; k++) {
                        if (sizeIndx == 2) {
                            let digit = k;
                            if (k > 9) {
                                let letters = "ABCDEFG";
                                digit = letters[k - 10];
                            }
                            if (sePuede(digit, i, j)) {
                                sudoku[i][j] = digit;
                                solveSudoku();
                                if (!solved) sudoku[i][j] = 0;
                            }
                        } else {
                            if (sePuede(k, i, j)) {
                                sudoku[i][j] = k;
                                solveSudoku();
                                if (!solved) sudoku[i][j] = 0;
                            }
                        }
                    }
                    return;
                }
            }
        }
    } else {
        solved = true;
    }
}

function enterKey(key) {
    if (key == "Backspace") {
        sudoku[boxY][boxX] = 0;
        originals[boxY][boxX] = 0;
    } else if (valid(key)) {
        originals[boxY][boxX] = -1;
        sudoku[boxY][boxX] = key;
    }
}

function mousePressed() {
    if (mouseX > 0 && mouseX <= width && mouseY > 0 && mouseY <= height) {
        let size = width / sizes[sizeIndx];
        boxX = Math.trunc(mouseX / (size));
        boxY = Math.trunc(mouseY / (size));
    }
    if (writeM) hideBox = false;
}

function disableButtons() {
    for (let i = 1; i < sizes[sizeIndx] + 1; i++) {
        document.getElementById("b" + str(i)).disabled = false;
    }
    for (let i = sizes[sizeIndx] + 1; i < 17; i++) {
        document.getElementById("b" + str(i)).disabled = true;
    }
}

function changeSettings() {
    document.getElementById("title").style.fontSize = "80";
    document.getElementById("randomize").style.fontSize = "30";
    document.getElementById("write").style.fontSize = "30";
    document.getElementById("reset").style.fontSize = "30";
    document.getElementById("solve").style.fontSize = "30";
    document.getElementById("label").style.fontSize = "30";
    document.getElementById("size").style.width = "150";
    document.getElementById("size").style.height = "15";
    document.getElementById("thumb").innerHTML = "#size::-webkit-slider-thumb {width:33px;height:33px}";
    document.getElementById("canvasContainer").style.paddingTop = "100";
    document.getElementById("byMe").style.fontSize = "30";
    document.getElementById("numbers").style.width = "650";
    document.getElementById("b1").style.fontSize = "30";
    document.getElementById("b1").style.marginTop = "10";
    document.getElementById("b2").style.fontSize = "30";
    document.getElementById("b2").style.marginTop = "10";
    document.getElementById("b3").style.fontSize = "30";
    document.getElementById("b3").style.marginTop = "10";
    document.getElementById("b4").style.fontSize = "30";
    document.getElementById("b4").style.marginTop = "10";
    document.getElementById("b5").style.fontSize = "30";
    document.getElementById("b5").style.marginTop = "10";
    document.getElementById("b6").style.fontSize = "30";
    document.getElementById("b6").style.marginTop = "10";
    document.getElementById("b7").style.marginTop = "10";
    document.getElementById("b7").style.fontSize = "30";
    document.getElementById("b8").style.marginTop = "10";
    document.getElementById("b8").style.fontSize = "30";
    document.getElementById("b9").style.marginTop = "10";
    document.getElementById("b9").style.fontSize = "30";
    document.getElementById("b10").style.marginTop = "10";
    document.getElementById("b10").style.fontSize = "30";
    document.getElementById("b11").style.marginTop = "10";
    document.getElementById("b11").style.fontSize = "30";
    document.getElementById("b12").style.marginTop = "10";
    document.getElementById("b12").style.fontSize = "30";
    document.getElementById("b13").style.marginTop = "10";
    document.getElementById("b13").style.fontSize = "30";
    document.getElementById("b14").style.marginTop = "10";
    document.getElementById("b14").style.fontSize = "30";
    document.getElementById("b15").style.fontSize = "30";
    document.getElementById("b15").style.marginTop = "10";
    document.getElementById("b15").style.fontSize = "30";
    document.getElementById("b16").style.marginTop = "10";
    document.getElementById("b16").style.fontSize = "30";
}