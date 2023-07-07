let multiplier = 2;
const nbRows = 4;
let boardTiles = [];
let solvedBoard = [];
let moves;

function shuffle(array) {
    let greyTile = array.pop();
    let m = array.length;
    let t, i;

    // While there remain elements to shuffle…
    while (m) {
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    array.push(greyTile);
}

function fillArr(multiplier) {
    let number = 1;
    for (let i = 0; i < 16; i++) {
        boardTiles[i] = number;
        number = number * multiplier;
        console.log(multiplier);
    }
    console.log(boardTiles);
    // boardTiles[49].empty = true;
}

function createBoard(arr) {
    let wrapper = document.getElementById("wrapper");
    while (wrapper.firstChild) {
        wrapper.removeChild(wrapper.lastChild);
    }

    for (let index = 0; index < arr.length; index++) {
        let div = document.createElement("div");
        div.innerHTML = arr[index].val;
        div.id = index;
        div.classList.add("box");
        if (div.id == 49) {
            div.classList.add("gray");
        }
        if (arr[index].empty === true && div.id != 49) {
            div.innerHTML = " ";
        }
        wrapper.appendChild(div);
    }

    let p = document.getElementById("solved");
    if (JSON.stringify(boardTiles) === JSON.stringify(solvedBoard)) {
        p.innerHTML = `U heeft de puzzel opgelost in ${moves} stappen.`;
        wrapper.classList.add("solved");
        document.querySelectorAll(".box").forEach((el) => {
            el.classList.add("solved");
        });
    } else {
        p.innerHTML = "";
        wrapper.classList.remove("solved");
        document.querySelectorAll(".box").forEach((el) => {
            el.classList.remove("solved");
        });
    }

    const onClick = (e) => {
        nextToEmptyTile(e.target.id, boardTiles);
    };

    document.querySelectorAll(".box").forEach((el) => {
        el.addEventListener("click", onClick);
    });

    const onChange = (e) => {
        document.getElementById("multiplier").removeEventListener("change", onChange);
        multiplier = e.target.value;
        main(multiplier);
    };

    document.getElementById("multiplier").addEventListener("change", onChange);

    return;
}

function getColumn(position) {
    return Math.floor(position / nbRows) * 1 + 1;
}

function getRow(position) {
    return (position % nbRows) + 1;
}

function nextToEmptyTile(key, arr) {
    key = parseInt(key);
    const empty = arr.findIndex((index) => index.empty === true);

    // rule: je mag niet EN van rij EN van kolom veranderen
    if (getColumn(key) !== getColumn(empty) && getRow(key) !== getRow(empty)) {
        console.error("Border reached!");
        return;
    }

    switch (true) {
        case arr[key + 1]?.empty:
            [arr[empty], arr[key]] = [arr[key], arr[empty]];
            break;
        case arr[key - 1]?.empty:
            [arr[empty], arr[key]] = [arr[key], arr[empty]];
            break;
        case arr[key + 10]?.empty:
            [arr[empty], arr[key]] = [arr[key], arr[empty]];
            break;
        case arr[key - 10]?.empty:
            [arr[empty], arr[key]] = [arr[key], arr[empty]];
            break;
        default:
            return;
    }
    arr[key].empty = true;
    arr[empty].empty = false;
    moves += 1;

    return createBoard(arr);
}

function main(multiplier) {
    moves = 0;
    fillArr(multiplier);
    solvedBoard = JSON.parse(JSON.stringify(boardTiles));
    shuffle(boardTiles);
    createBoard(boardTiles);
}

main(multiplier);
