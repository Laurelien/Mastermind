import Variables from './variables';

export default class Pion {
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
        this.pion.dataset.color = arraySearch(Variables.colors, this.color);
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

function arraySearch(array: Array<string>, value: string): number | boolean { // Retourne le numéro associé à la couleur
    for (let i=0; i<array.length; i++)
        if (array[i] === value)                    
            return i;
    return false;
}