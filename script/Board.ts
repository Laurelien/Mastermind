import Variables from './variables';
import {MainHole, ScoreHole, ReponseHole} from './Holes';
import Pion from './Pion';

export default class Board {
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
            places.innerHTML = '';
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
            scoreDots.innerHTML = '';
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
        for(let i=0; i<Variables.colors.length; i++) {
            let colorDot = new Pion(Variables.colors[i], true);
                colorDot.draw();
        }
        // La solution
        let solutionDiv: any = document.getElementById('solution');
            solutionDiv.innerHTML = '';
        for(let i=0; i<this.colonnes; i++) {
            let reponseHole = new ReponseHole(1, i, solutionDiv);
                reponseHole.draw(); // On dessine les trous
                reponseHole.fill(); // On remplie aléatoirement
                reponseHole.cache(0);
        }
    }
}
