import Variables from './variables';
import Pion from './Pion';

export default class Hole {
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

export class MainHole extends Hole {

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
        if(this.line !== Variables.turn) return false;
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

export class ScoreHole extends Hole {

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
                actualScoreDots[values - 1].style.backgroundColor = 'green';
                bons--;
            }
            else if(moities !== 0) {
                actualScoreDots[values - 1].style.backgroundColor = 'red';
                moities--;
            }
            values--;
        }
    }
}

export class ReponseHole extends Hole {

    constructor(line: number, column: number, parent: any) {
        super(line, column, parent);
        this.elem = document.createElement('span');
    }

    draw(): void {
        this.elem.className = 'hole';
        this.parent.appendChild(this.elem);
    }

    cache(state: number) {
        this.parent.style.opacity = state;
    }

    fill() {
        let colorId: number = Math.floor(Math.random() * Variables.colors.length);
        // console.log(colorId);
        Variables.solution.push(colorId);
        this.elem.style.backgroundColor = Variables.colors[colorId];
    }
}