const colors: Array<string> = ['#ff0000', 'green', 'blue', 'orange', 'purple'];
let solution: Array<number> = [];
let entree: Array<number> = [];
let turn: number = 0;

let categories: any = JSON.parse(localStorage.getItem('categories'));

let fond: any = document.getElementById('fond');

interface Buttons {
    values: string[];
    classes: string[];
    event: any;
}

interface Template {
    message: string;
    inputs: string[];
    min: number[];
    max?: number[];
    placeholdres?: string[];
}

class Modal {
    titre: string;
    buttons: Buttons;
    main: any;
    h_modal: any;
    b_modal: any;
    f_modal: any;

    constructor(titre: string, buttons: Buttons) {
        this.titre = titre;
        this.buttons = buttons;
        this.main = document.getElementById('modal');
        this.h_modal = this.main.querySelector('#h_modal');
        this.b_modal = this.main.querySelector('#b_modal');
        this.f_modal = this.main.querySelector('#f_modal');
    }

    show() {
        // On met le fond
        fond.style.display !== 'flex' ? fond.style.display = 'flex' : null;
        // On place le titre
        let h1 = this.h_modal.querySelector('h1');
            h1.innerHTML = this.titre;
        // On s'occupe des boutons, on initialise avant
        this.f_modal.innerHTML = '';
        for(let i=0; i<this.buttons.values.length; i++) {
            let button = document.createElement('button');
                button.type = 'button';
                button.className = this.buttons.classes[i];
                button.innerHTML = this.buttons.values[i];
                button.addEventListener('click', () => {
                    this.event(this.buttons.event[i]);
                });
            this.f_modal.appendChild(button);
        }
    }
    statistiques(onglet: number, template: string) {
        console.log(template);
    }
    event(e: any)  {
        e(this);
    }
    close () {
        fond.style.display = 'none';
    }
}

/* class Statistiques extends Modal {
    onglet: number;
    b_modal: any;
    constructor(titre: string, onglet: number, buttons: Buttons) {
        super(titre, buttons);
        this.onglet = onglet;
    }

    fill(template: string) {
        fond.style.display = 'flex';
    }
} */

/* const boutons: Buttons = {
    values : ['Valider', 'Annuler'],
    classes: ['primary', 'default'],
    event: [
        (modal: any) => {
            return modal.close();
        },
        (modal: any) => {
            return modal.close();
        }
    ]
}

let modal = new Modal('Partie personnalisée', boutons);
    modal.show(); */


class Board {
    lignes: number;
    colonnes: number;

    constructor(lignes: number, colonnes: number) {
        this.lignes = lignes;
        this.colonnes = colonnes;
    }

    draw(): void { // Methode pour créer l'aspect visiuel au lancement
        // console.log(this.lignes);
        // On commence par le trous principaux
        let places: any = document.getElementById('places');
        for(let i=0; i<this.lignes; i++) {
            let block = document.createElement('div');
                block.className = 'ligne';
            for(let j=0; j<this.colonnes; j++) {
                let hole = new MainHole(i, j, block);
                    hole.draw();
            }
            places.appendChild(block);
        }
        // Les trous pour donner l'avancement
        let scoreDots: any = document.getElementById('scoresDot');
        for(let i=0; i<this.lignes; i++) {
            let block = document.createElement('div');
                block.className = 'case';
            for(let j=0; j<2; j++) {
                let col = document.createElement('div');
                    col.className = 'col';
                    for(let d=0; d<2; d++) {
                        let scoreHole = new ScoreHole(i, j, col);
                            scoreHole.draw();
                    }
                block.appendChild(col);
            }
            scoreDots.appendChild(block);
        }
        // Les couleurs possibles
        for(let i=0; i<colors.length; i++) {
            let colorDot = new Pion(colors[i], true);
                colorDot.draw();
        }
        // La solution
        let solutionDiv: any = document.getElementById('solution');
        for(let i=0; i<this.colonnes; i++) {
            let reponseHole = new ReponseHole(1, i, solutionDiv);
                reponseHole.draw(); // On dessine les trous
                reponseHole.fill(); // On remplie aléatoirement
                reponseHole.cache('hidden');
        }
    }
}

class Hole {
    line: number;
    column: number;
    parent: any;
    elem: any;

    constructor(line: number, column: number, parent: any) {
        this.line = line;
        this.column = column;
        this.parent = parent;
        this.elem = document.createElement('span');
    }

    draw() {
        // console.log(this.column);
    }
}

class MainHole extends Hole {

    constructor(line: number, column: number, parent: any) {
        super(line, column, parent);
        this.elem = document.createElement('span');
        this.elem.addEventListener('dragover', (e: any) => {
            e.preventDefault();
        });
        this.elem.addEventListener('drop', (e: any) => {
            this.drop(e);
        })
    }

    draw(): void {
        this.elem.className = 'hole';
        this.parent.appendChild(this.elem);
    }

    drop(e: any) {
        e.preventDefault();
        // console.log(this.line);
        if(this.line !== turn) return false;
        let data = e.dataTransfer.getData('text');
        /* let copy = document.createElement('span');
            copy.style.backgroundColor = data;
            copy.className = 'colorDot'; */
        let copy = new Pion(data, false).toElement();
            // copy.place(this.line, this.column);
        let target: any;
        if(e.target.className !== 'hole') {
            target = e.target.parentNode;
            target.removeChild(e.target);
        }
        else target = e.target;
        target.appendChild(copy);
    }
}

class ScoreHole extends Hole {

    constructor(line: number, column: number, parent: any) {
        super(line, column, parent);
        this.elem = document.createElement('span');
    }

    draw(): void {
        this.elem.className = 'scoreHole';
        this.parent.appendChild(this.elem);
    }

    fill(bons: number, moities: number) {
        let values: number = bons + moities;
        // console.log(bons + ' biens placés' + ', ' + moities + ' mal placés.');
        let actualCase: any = document.querySelectorAll('.case')[this.line];
        // console.log(actualCase);
        let actualScoreDots: any = actualCase.querySelectorAll('.scoreHole');
        // console.log(actualScoreDots);
        while(values > 0) {
            if(bons !== 0) {
                actualScoreDots[values - 1].style.backgroundColor = 'black';
                bons--;
            }
            else if(moities !== 0) {
                actualScoreDots[values - 1].style.backgroundColor = 'white';
                moities--;
            }
            values--;
        }
    }
}

class ReponseHole extends Hole {

    constructor(line: number, column: number, parent: any) {
        super(line, column, parent);
        this.elem = document.createElement('span');
    }

    draw(): void {
        this.elem.className = 'hole';
        this.parent.appendChild(this.elem);
    }

    cache(state: string) {
        this.parent.style.visibility = state;
    }

    fill() {
        let colorId: number = Math.floor(Math.random() * colors.length);
        // console.log(colorId);
        solution.push(colorId);
        this.elem.style.backgroundColor = colors[colorId];
    }
}

class Pion {
    color: string;
    // colorId: number;
    pion: any;
    draggable: boolean;

    constructor(color: string, draggable: boolean) {
        this.color = color;
        // this.colorId = colorId;
        this.draggable = draggable;
        this.pion = document.createElement('span');
        this.pion.draggable = this.draggable;
        this.pion.dataset.color = arraySearch(colors, this.color);
        this.pion.className = 'colorDot';
        this.pion.style.background = this.color;
        this.pion.addEventListener('dragstart', (e: any) => {
            this.drag(e);
        });
    }

    draw() {
        let colorsDiv: any = document.getElementById('colors');
        colorsDiv.appendChild(this.pion);
    }

    place(line: number, column: number) {
        // console.log(line);
        let lines = document.querySelectorAll('#places .ligne')[line];
        return lines.childNodes[column];
    }

    toElement() {
        return this.pion;
    }

    drag(e: any) {
        e.dataTransfer.setData('text', this.color);
    }
}

/* class Settings {
    lignes?: number;
    colonnes?: number;
    difficulte?: number;

    constructor(lignes?: number, colonnes?: number, difficulte?: number) {
            this.lignes = lignes;
            this.colonnes = colonnes;
            this.difficulte = difficulte;
    }

    init() {

    }
} */

let lignes: number = 10;
let colonnes: number = 4;

(function init() {
    let board = new Board(lignes, colonnes);
        board.draw();
})();


let btn: any = document.getElementById('validate');
    btn.addEventListener('click', checkResult);
        /*  */

function checkResult() {
    let lineTurn: any = document.querySelectorAll('.ligne')[turn];
    let lineTurnChildren: any = lineTurn.childNodes;
    // console.log(lineTurnChildren);            
    entree.length = 0;
    for(let i=0; i<lineTurnChildren.length; i++) {
        if(lineTurnChildren[i].firstChild !== null) {
            let filledHole: any = lineTurnChildren[i];
            // console.log(filledHole.firstChild.dataset.color);
            entree.push(parseInt(filledHole.firstChild.dataset.color));
        }
        else return false;
    }
    let bons: number = 0;
    let dPos: number[] = [];
    let dValues: number[] = [];
    for(let i=0; i<colonnes; i++) {
        for(let j=0; j<colonnes; j++) {
            if(entree[i] === solution[j] && i === j) {
                bons++;
                dPos.push(i);
                dValues.push(entree[i]);
            }
        }
    }
    let s_reste: number[] = solution.slice();
    let e_reste: number[] = entree.slice();
    console.log(bons + ' biens placés', dPos);
    for(let i=colonnes-1; i>-1; i--) {
        for(let j=0; j<dValues.length; j++) {
            if(dPos[j] === i) {
                e_reste.splice(i, 1);
                s_reste.splice(i, 1);
            }
        }
    }
    e_reste = filtreArray(e_reste);
    s_reste = filtreArray(s_reste);
    let reste: number = comparaison(e_reste, s_reste);
    let scores = new ScoreHole(turn, 0, null).fill(bons, reste);
    turn++;
}

function comparaison(arr1: number[], arr2: number[]): number {
    let l1: number = arr1.length;
    let l2: number = arr2.length;
    let common: number = 0;
    for(let i=0; i<l1; i++) {
        for(let j=0; j<l2; j++) {
            if(arr1[i] === arr2[j]) common++;
        }
    }
    return common;
}

function difference(target: any, killer: any) {
    let targetLen = target.length;
    let killerLen = killer.length;
    for(let i=0; i<targetLen; i++) {
        for(let j=0; j<killerLen; j++) {
            if(target[i] === killer[j]) {
                target.splice(i, 1);
            }
        }
    }
    return target;
}

function arraySearch(array: Array<string>, value: string): number | boolean { // Retourne le numéro associé à la couleur
    for (let i=0; i<array.length; i++)
        if (array[i] === value)                    
            return i;
    return false;
}

function arraySplit(array: Array<number>, nbr: number) {
    let start: number, borne: number;
    let finalArray = [];
    for(let i=0; i<nbr; i++) {
        start = i * nbr;
        borne = start + nbr;
        let subArray = [];
        for(start; start < borne; start++) {
            subArray.push(array[start]);
        }
        finalArray.push(subArray);
    }

    return finalArray;
}

function arrayUnified(array: number[]) {
    array = array.filter(function(item: number, index: number, inputArray: number[]) {
        return inputArray.indexOf(item) == index;
    });
}

function filtreArray(array: number[]): number[] {
    array = array.filter(function(elem: number, index: number, self: number[]) {
        return index == self.indexOf(elem);
    });
    return array;
}