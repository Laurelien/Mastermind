"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var variables_1 = require("./variables");
var Holes_1 = require("./Holes");
var Pion_1 = require("./Pion");
var Board = (function () {
    function Board(lignes, colonnes) {
        this.lignes = lignes;
        this.colonnes = colonnes;
    }
    Board.prototype.draw = function () {
        // console.log(this.lignes);
        // On commence par le trous principaux
        var places = document.getElementById('places');
        for (var i = 0; i < this.lignes; i++) {
            var block = document.createElement('div');
            block.className = 'ligne';
            for (var j = 0; j < this.colonnes; j++) {
                var hole = new Holes_1.MainHole(i, j, block);
                hole.draw();
            }
            places.appendChild(block);
        }
        // Les trous pour donner l'avancement
        var scoreDots = document.getElementById('scoresDot');
        for (var i = 0; i < this.lignes; i++) {
            var block = document.createElement('div');
            block.className = 'case';
            for (var j = 0; j < 2; j++) {
                var col = document.createElement('div');
                col.className = 'col';
                for (var d = 0; d < 2; d++) {
                    var scoreHole = new Holes_1.ScoreHole(i, j, col);
                    scoreHole.draw();
                }
                block.appendChild(col);
            }
            scoreDots.appendChild(block);
        }
        // Les couleurs possibles
        for (var i = 0; i < variables_1.default.colors.length; i++) {
            var colorDot = new Pion_1.default(variables_1.default.colors[i], true);
            colorDot.draw();
        }
        // La solution
        var solutionDiv = document.getElementById('solution');
        for (var i = 0; i < this.colonnes; i++) {
            var reponseHole = new Holes_1.ReponseHole(1, i, solutionDiv);
            reponseHole.draw(); // On dessine les trous
            reponseHole.fill(); // On remplie aléatoirement
            reponseHole.cache(0);
        }
    };
    return Board;
}());
exports.default = Board;
