import Modal from './modal';
import Buttons from './Buttons';
import Board from './Board';
import {MainHole, ScoreHole, ReponseHole} from './Holes';

import Variables from './variables';

let onglets = document.querySelectorAll('#menu li ul li');
let ongletsLen: number = onglets.length;

window.addEventListener('click', (e) => {
	for(let i=0; i<ongletsLen; i++) {
		if(e.target === onglets[i]) {
			setEvent(onglets[i].id);
		}
	}
});

(function init() {
    let board = new Board(Variables.lignes, Variables.colonnes);
        board.draw();
})();


let btn: any = document.getElementById('validate');
    btn.addEventListener('click', checkResult);

function checkResult() {    
    let divSolution:any = document.querySelector('#solution');
    let lineTurn: any = document.querySelectorAll('.ligne')[Variables.turn];
    let lineTurnChildren: any = lineTurn.childNodes;
    // console.log(lineTurnChildren);            
    Variables.entree.length = 0;
    for(let i=0; i<lineTurnChildren.length; i++) {
        if(lineTurnChildren[i].firstChild !== null) {
            let filledHole: any = lineTurnChildren[i];
            // console.log(filledHole.firstChild.dataset.color);
            Variables.entree.push(parseInt(filledHole.firstChild.dataset.color));
        }
        else return false;
    }
    let bons: number = 0;
    let dPos: number[] = [];
    let dValues: number[] = [];
    for(let i=0; i<Variables.colonnes; i++) {
        for(let j=0; j<Variables.colonnes; j++) {
            if(Variables.entree[i] === Variables.solution[j] && i === j) {
                bons++;
                dPos.push(i);
                dValues.push(Variables.entree[i]);
            }
        }
    }
    let s_reste: number[] = Variables.solution.slice();
    let e_reste: number[] = Variables.entree.slice();
    console.log(bons + ' biens placés', dPos);
    for(let i=Variables.colonnes-1; i>-1; i--) {
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
    let scores = new ScoreHole(Variables.turn, 0, null).fill(bons, reste);
    Variables.turn++;
    if(Variables.turn === Variables.lignes) {
        divSolution.style.opacity = 1;
        let restart = function() {
            console.log('Rejouer')
        };
        let endTitre = 'Perdu !';
        let endButtons: Buttons = {
            values: ['Rejouer', 'Arrêter'],
            classes: ['primary', 'default'],
            event: [
                (m: Modal) => {
                    m.userEvent(restart);
                },
                (m: Modal) => {
                    m.close();
                }
            ]
        };
        let endTemplate: string = `Partie terminée et vous avez perdu ! Voulez-vous rejouer ou arrêter ici et changer les paramètres ?`
        let modalLose = new Modal(endTitre, endButtons, endTemplate).base();
    }
    if(bons === Variables.colonnes) { // Si on a la réponse
        divSolution.style.opacity =  1;
        let endTitre = 'Gagné !';
        let restart = function() {
            console.log('Rejouer');
            window.location.reload();
        };
        let endButtons: Buttons = {
            values: ['Rejouer', 'Arrêter'],
            classes: ['primary', 'default'],
            event: [
                (m: Modal) => {
                    m.userEvent(restart);
                },
                (m: Modal) => {
                    m.close();
                }
            ]
        };
        let endTemplate: string = `Félicitation vous avez gagné ! Voulez-vous rejouer ou arrêter ici et changer les paramètres ?`;
        let modalWin = new Modal(endTitre, endButtons, endTemplate).base();
    }
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

/* Fonctions menu */

function setEvent(type: string) {
	switch(type) {
		case 'new_pp':
			partiePerso();
		break;
	}
}

function partiePerso() {
    let pp_titre = 'Personnaliser une partie';
    let creer_pp = function() {
        let nbr_lin: any = document.querySelector('#pp_lin');
        let nbr_col: any = document.querySelector('#pp_col');
        console.log(nbr_lin.value, nbr_col.value);
        // let nouvelle_partie = new Board(nbr_lin.value, nbr_col.value);
        //     nouvelle_partie.draw();
    };
	let pp_buttons: Buttons = {
		values: ['Créer', 'Annuler'],
		classes: ['primary', 'default'],
		event: [
			(m: Modal) => {
				return m.userEvent(creer_pp);
			},
			(m: Modal) => {
				return m.close();
			}
		]
	};
	let pp_template = `
		<label for="pp_lin">Lignes (entre 5 et 15)</label> <input id="pp_lin" type="number" value="10" min="5" max="15" required/><br />
		<label for="pp_col">Colonnes (entre 5 et 15)</label> <input id="pp_col" type="number" value="4" min="5" max="15" required/>
	`;
	let pp_modal = new Modal(pp_titre, pp_buttons, pp_template);
		pp_modal.base();
}

function setColors() {
	console.log('onch');
}
