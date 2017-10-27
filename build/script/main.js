"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var modal_1 = require("./modal");
var Board_1 = require("./Board");
// const colors: Array<string> = ['#ff0000', 'green', 'blue', 'orange', 'purple'];
var start = true;
var playing = false;
var end = false;
// let solution: Array<number> = [];
var entree = [];
// let turn: number = 0;
// let categories: any = JSON.parse(localStorage.getItem('categories'));
// let fond: any = document.getElementById('fond');
var lignes = 10;
var colonnes = 4;
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
    var board = new Board_1.default(lignes, colonnes);
    board.draw();
})();
var btn = document.getElementById('validate');
btn.addEventListener('click', checkResult);
function checkResult() {
    var lineTurn = document.querySelectorAll('.ligne')[turn];
    var lineTurnChildren = lineTurn.childNodes;
    // console.log(lineTurnChildren);            
    entree.length = 0;
    for (var i = 0; i < lineTurnChildren.length; i++) {
        if (lineTurnChildren[i].firstChild !== null) {
            var filledHole = lineTurnChildren[i];
            // console.log(filledHole.firstChild.dataset.color);
            entree.push(parseInt(filledHole.firstChild.dataset.color));
        }
        else
            return false;
    }
    var bons = 0;
    var dPos = [];
    var dValues = [];
    for (var i = 0; i < colonnes; i++) {
        for (var j = 0; j < colonnes; j++) {
            if (entree[i] === solution[j] && i === j) {
                bons++;
                dPos.push(i);
                dValues.push(entree[i]);
            }
        }
    }
    var s_reste = solution.slice();
    var e_reste = entree.slice();
    console.log(bons + ' biens placés', dPos);
    for (var i = colonnes - 1; i > -1; i--) {
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
    var scores = new ScoreHole(turn, 0, null).fill(bons, reste);
    turn++;
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
