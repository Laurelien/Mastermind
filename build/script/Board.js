"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var colors = ['#ff0000', 'green', 'blue', 'orange', 'purple'];
var turn = 0;
var solution = [];
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
                var hole = new MainHole(i, j, block);
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
                    var scoreHole = new ScoreHole(i, j, col);
                    scoreHole.draw();
                }
                block.appendChild(col);
            }
            scoreDots.appendChild(block);
        }
        // Les couleurs possibles
        for (var i = 0; i < colors.length; i++) {
            var colorDot = new Pion(colors[i], true);
            colorDot.draw();
        }
        // La solution
        var solutionDiv = document.getElementById('solution');
        for (var i = 0; i < this.colonnes; i++) {
            var reponseHole = new ReponseHole(1, i, solutionDiv);
            reponseHole.draw(); // On dessine les trous
            reponseHole.fill(); // On remplie aléatoirement
            reponseHole.cache('hidden');
        }
    };
    return Board;
}());
exports.default = Board;
var Hole = (function () {
    function Hole(line, column, parent) {
        this.line = line;
        this.column = column;
        this.parent = parent;
        this.elem = document.createElement('span');
    }
    Hole.prototype.draw = function () {
        // console.log(this.column);
    };
    return Hole;
}());
var MainHole = (function (_super) {
    __extends(MainHole, _super);
    function MainHole(line, column, parent) {
        var _this = _super.call(this, line, column, parent) || this;
        _this.elem = document.createElement('span');
        _this.elem.addEventListener('dragover', function (e) {
            e.preventDefault();
        });
        _this.elem.addEventListener('drop', function (e) {
            _this.drop(e);
        });
        return _this;
    }
    MainHole.prototype.draw = function () {
        this.elem.className = 'hole';
        this.parent.appendChild(this.elem);
    };
    MainHole.prototype.drop = function (e) {
        e.preventDefault();
        // console.log(this.line);
        if (this.line !== turn)
            return false;
        var data = e.dataTransfer.getData('text');
        /* let copy = document.createElement('span');
            copy.style.backgroundColor = data;
            copy.className = 'colorDot'; */
        var copy = new Pion(data, false).toElement();
        // copy.place(this.line, this.column);
        var target;
        if (e.target.className !== 'hole') {
            target = e.target.parentNode;
            target.removeChild(e.target);
        }
        else
            target = e.target;
        target.appendChild(copy);
    };
    return MainHole;
}(Hole));
var ScoreHole = (function (_super) {
    __extends(ScoreHole, _super);
    function ScoreHole(line, column, parent) {
        var _this = _super.call(this, line, column, parent) || this;
        _this.elem = document.createElement('span');
        return _this;
    }
    ScoreHole.prototype.draw = function () {
        this.elem.className = 'scoreHole';
        this.parent.appendChild(this.elem);
    };
    ScoreHole.prototype.fill = function (bons, moities) {
        var values = bons + moities;
        // console.log(bons + ' biens placés' + ', ' + moities + ' mal placés.');
        var actualCase = document.querySelectorAll('.case')[this.line];
        // console.log(actualCase);
        var actualScoreDots = actualCase.querySelectorAll('.scoreHole');
        // console.log(actualScoreDots);
        while (values > 0) {
            if (bons !== 0) {
                actualScoreDots[values - 1].style.backgroundColor = 'black';
                bons--;
            }
            else if (moities !== 0) {
                actualScoreDots[values - 1].style.backgroundColor = 'white';
                moities--;
            }
            values--;
        }
    };
    return ScoreHole;
}(Hole));
var ReponseHole = (function (_super) {
    __extends(ReponseHole, _super);
    function ReponseHole(line, column, parent) {
        var _this = _super.call(this, line, column, parent) || this;
        _this.elem = document.createElement('span');
        return _this;
    }
    ReponseHole.prototype.draw = function () {
        this.elem.className = 'hole';
        this.parent.appendChild(this.elem);
    };
    ReponseHole.prototype.cache = function (state) {
        this.parent.style.visibility = state;
    };
    ReponseHole.prototype.fill = function () {
        var colorId = Math.floor(Math.random() * colors.length);
        // console.log(colorId);
        solution.push(colorId);
        this.elem.style.backgroundColor = colors[colorId];
    };
    return ReponseHole;
}(Hole));
var Pion = (function () {
    function Pion(color, draggable) {
        var _this = this;
        this.color = color;
        // this.colorId = colorId;
        this.draggable = draggable;
        this.pion = document.createElement('span');
        this.pion.draggable = this.draggable;
        this.pion.dataset.color = arraySearch(colors, this.color);
        this.pion.className = 'colorDot';
        this.pion.style.background = this.color;
        this.pion.addEventListener('dragstart', function (e) {
            _this.drag(e);
        });
    }
    Pion.prototype.draw = function () {
        var colorsDiv = document.getElementById('colors');
        colorsDiv.appendChild(this.pion);
    };
    Pion.prototype.place = function (line, column) {
        // console.log(line);
        var lines = document.querySelectorAll('#places .ligne')[line];
        return lines.childNodes[column];
    };
    Pion.prototype.toElement = function () {
        return this.pion;
    };
    Pion.prototype.drag = function (e) {
        e.dataTransfer.setData('text', this.color);
    };
    return Pion;
}());
function arraySearch(array, value) {
    for (var i = 0; i < array.length; i++)
        if (array[i] === value)
            return i;
    return false;
}
