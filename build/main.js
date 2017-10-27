"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var modal_1 = require("./modal");
var Board_1 = require("./Board");
var Holes_1 = require("./Holes");
var variables_1 = require("./variables");
// let 
// const colors: Array<string> = ['#ff0000', 'green', 'blue', 'orange', 'purple'];
// let start: boolean = true;
// let playing: boolean = false;
// let end: boolean = false;
// let solution: Array<number> = [];
// let entree: Array<number> = [];
// let turn: number = 0;
// let categories: any = JSON.parse(localStorage.getItem('categories'));
// let fond: any = document.getElementById('fond');
// let lignes: number = 10;
// let colonnes: number = 4;
(function init() {
    // On commence par demander le niveau de jeu (modal) (start = false, playing = true, end = false)
    var modalButtons = {
        values: ['Démarrer', 'Annuler'],
        classes: ['primary', 'default'],
        event: [
            function (m) {
                return m.userEvent('start');
            },
            function (m) {
                return m.close();
            }
        ]
    };
    var template = "Nouvelle partie en Normale ?";
    var modalStart = new modal_1.default('Nouvelle partie', modalButtons, template);
    modalStart.base();
    // On initialise le jeu suivant les paramètres (start = false, playing = true, end = false)
    var board = new Board_1.default(variables_1.default.lignes, variables_1.default.colonnes);
    board.draw();
})();
var btn = document.getElementById('validate');
btn.addEventListener('click', checkResult);
function checkResult() {
    var divSolution = document.querySelector('#solution');
    var lineTurn = document.querySelectorAll('.ligne')[variables_1.default.turn];
    var lineTurnChildren = lineTurn.childNodes;
    // console.log(lineTurnChildren);            
    variables_1.default.entree.length = 0;
    for (var i = 0; i < lineTurnChildren.length; i++) {
        if (lineTurnChildren[i].firstChild !== null) {
            var filledHole = lineTurnChildren[i];
            // console.log(filledHole.firstChild.dataset.color);
            variables_1.default.entree.push(parseInt(filledHole.firstChild.dataset.color));
        }
        else
            return false;
    }
    var bons = 0;
    var dPos = [];
    var dValues = [];
    for (var i = 0; i < variables_1.default.colonnes; i++) {
        for (var j = 0; j < variables_1.default.colonnes; j++) {
            if (variables_1.default.entree[i] === variables_1.default.solution[j] && i === j) {
                bons++;
                dPos.push(i);
                dValues.push(variables_1.default.entree[i]);
            }
        }
    }
    var s_reste = variables_1.default.solution.slice();
    var e_reste = variables_1.default.entree.slice();
    console.log(bons + ' biens placés', dPos);
    for (var i = variables_1.default.colonnes - 1; i > -1; i--) {
        for (var j = 0; j < dValues.length; j++) {
            if (dPos[j] === i) {
                e_reste.splice(i, 1);
                s_reste.splice(i, 1);
            }
        }
    }
    e_reste = filtreArray(e_reste);
    s_reste = filtreArray(s_reste);
    var reste = comparaison(e_reste, s_reste);
    var scores = new Holes_1.ScoreHole(variables_1.default.turn, 0, null).fill(bons, reste);
    variables_1.default.turn++;
    if (variables_1.default.turn === variables_1.default.lignes) {
        divSolution.style.opacity = 1;
        var endTitre = 'Perdu !';
        var endButtons = {
            values: ['Rejouer', 'Arrêter'],
            classes: ['primary', 'default'],
            event: [
                function (m) {
                    m.userEvent('resart');
                },
                function (m) {
                    m.close();
                }
            ]
        };
        var endTemplate = "Partie termin\u00E9e et vous avez perdu ! Voulez-vous rejouer ou arr\u00EAter ici et changer les param\u00E8tres ?";
        var modalLose = new modal_1.default(endTitre, endButtons, endTemplate).base();
    }
    if (bons === variables_1.default.colonnes) {
        divSolution.style.opacity = 1;
    }
}
function comparaison(arr1, arr2) {
    var l1 = arr1.length;
    var l2 = arr2.length;
    var common = 0;
    for (var i = 0; i < l1; i++) {
        for (var j = 0; j < l2; j++) {
            if (arr1[i] === arr2[j])
                common++;
        }
    }
    return common;
}
function difference(target, killer) {
    var targetLen = target.length;
    var killerLen = killer.length;
    for (var i = 0; i < targetLen; i++) {
        for (var j = 0; j < killerLen; j++) {
            if (target[i] === killer[j]) {
                target.splice(i, 1);
            }
        }
    }
    return target;
}
function arraySearch(array, value) {
    for (var i = 0; i < array.length; i++)
        if (array[i] === value)
            return i;
    return false;
}
function arraySplit(array, nbr) {
    var start, borne;
    var finalArray = [];
    for (var i = 0; i < nbr; i++) {
        start = i * nbr;
        borne = start + nbr;
        var subArray = [];
        for (start; start < borne; start++) {
            subArray.push(array[start]);
        }
        finalArray.push(subArray);
    }
    return finalArray;
}
function arrayUnified(array) {
    array = array.filter(function (item, index, inputArray) {
        return inputArray.indexOf(item) == index;
    });
}
function filtreArray(array) {
    array = array.filter(function (elem, index, self) {
        return index == self.indexOf(elem);
    });
    return array;
}
