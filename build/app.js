/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Variables = {
    turn: 0,
    colors: ['#ff0000', 'green', 'blue', 'orange', 'purple', '#666', '#ff89be'],
    solution: [],
    start: true,
    playing: false,
    end: false,
    entree: [],
    lignes: 10,
    colonnes: 4
};
exports.default = Variables;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

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
var variables_1 = __webpack_require__(0);
var Pion_1 = __webpack_require__(2);
var Hole = /** @class */ (function () {
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
exports.default = Hole;
var MainHole = /** @class */ (function (_super) {
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
        if (this.line !== variables_1.default.turn)
            return false;
        var data = e.dataTransfer.getData('text');
        /* let copy = document.createElement('span');
            copy.style.backgroundColor = data;
            copy.className = 'colorDot'; */
        var copy = new Pion_1.default(data, false).toElement();
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
exports.MainHole = MainHole;
var ScoreHole = /** @class */ (function (_super) {
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
exports.ScoreHole = ScoreHole;
var ReponseHole = /** @class */ (function (_super) {
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
        this.parent.style.opacity = state;
    };
    ReponseHole.prototype.fill = function () {
        var colorId = Math.floor(Math.random() * variables_1.default.colors.length);
        // console.log(colorId);
        variables_1.default.solution.push(colorId);
        this.elem.style.backgroundColor = variables_1.default.colors[colorId];
    };
    return ReponseHole;
}(Hole));
exports.ReponseHole = ReponseHole;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var variables_1 = __webpack_require__(0);
var Pion = /** @class */ (function () {
    function Pion(color, draggable) {
        var _this = this;
        this.color = color;
        // this.colorId = colorId;
        this.draggable = draggable;
        this.pion = document.createElement('span');
        this.pion.draggable = this.draggable;
        this.pion.dataset.color = arraySearch(variables_1.default.colors, this.color);
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
exports.default = Pion;
function arraySearch(array, value) {
    for (var i = 0; i < array.length; i++)
        if (array[i] === value)
            return i;
    return false;
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var modal_1 = __webpack_require__(4);
var Board_1 = __webpack_require__(5);
var Holes_1 = __webpack_require__(1);
var variables_1 = __webpack_require__(0);
var onglets = document.querySelectorAll('#menu li ul li');
var ongletsLen = onglets.length;
window.addEventListener('click', function (e) {
    for (var i = 0; i < ongletsLen; i++) {
        if (e.target === onglets[i]) {
            setEvent(onglets[i].id);
        }
    }
});
(function init() {
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
        var restart_1 = function () {
            console.log('Rejouer');
        };
        var endTitre = 'Perdu !';
        var endButtons = {
            values: ['Rejouer', 'Arrêter'],
            classes: ['primary', 'default'],
            event: [
                function (m) {
                    m.userEvent(restart_1);
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
        var endTitre = 'Gagné !';
        var restart_2 = function () {
            console.log('Rejouer');
            window.location.reload();
        };
        var endButtons = {
            values: ['Rejouer', 'Arrêter'],
            classes: ['primary', 'default'],
            event: [
                function (m) {
                    m.userEvent(restart_2);
                },
                function (m) {
                    m.close();
                }
            ]
        };
        var endTemplate = "F\u00E9licitations vous avez gagn\u00E9 ! Voulez-vous rejouer ou arr\u00EAter ici et changer les param\u00E8tres ?";
        var modalWin = new modal_1.default(endTitre, endButtons, endTemplate).base();
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
/* Fonctions menu */
function setEvent(type) {
    switch (type) {
        case 'new_pp':
            partiePerso();
            break;
    }
}
function partiePerso() {
    var pp_titre = 'Personnaliser une partie';
    var creer_pp = function () {
        var nbr_lin = document.querySelector('#pp_lin');
        var nbr_col = document.querySelector('#pp_col');
        console.log(nbr_lin.value, nbr_col.value);
        // let nouvelle_partie = new Board(nbr_lin.value, nbr_col.value);
        //     nouvelle_partie.draw();
    };
    var pp_buttons = {
        values: ['Créer', 'Annuler'],
        classes: ['primary', 'default'],
        event: [
            function (m) {
                return m.userEvent(creer_pp);
            },
            function (m) {
                return m.close();
            }
        ]
    };
    var pp_template = "\n\t\t<label for=\"pp_lin\">Lignes (entre 5 et 15)</label> <input id=\"pp_lin\" type=\"number\" value=\"10\" min=\"5\" max=\"15\" required/><br />\n\t\t<label for=\"pp_col\">Colonnes (entre 5 et 15)</label> <input id=\"pp_col\" type=\"number\" value=\"4\" min=\"5\" max=\"15\" required/>\n\t";
    var pp_modal = new modal_1.default(pp_titre, pp_buttons, pp_template);
    pp_modal.base();
}
function setColors() {
    console.log('onch');
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var fond = document.getElementById('fond');
// const modal: any = document.getElementById('modal');
// const h_modal = modal.querySelector('#h_modal');
// const b_modal = modal.querySelector('#b_modal');
// const f_modal = modal.querySelector('#f_modal');
var modalParts = {
    MAIN: document.getElementById('modal'),
    HEADER: document.getElementById('h_modal'),
    BODY: document.getElementById('b_modal'),
    FOOTER: document.getElementById('f_modal')
};
var Modal = /** @class */ (function () {
    function Modal(titre, buttons, template) {
        this.titre = titre;
        this.buttons = buttons;
        this.template = template;
    }
    Modal.prototype.base = function () {
        var _this = this;
        fond.style.display = 'flex';
        // Le titre
        var h1 = modalParts.HEADER.querySelector('h1');
        h1.innerHTML = this.titre;
        // Le corps
        modalParts.BODY.innerHTML = this.template;
        // Les boutons
        modalParts.FOOTER.innerHTML = '';
        var nbrBtns = this.buttons.values.length;
        for (var i = 0; i < nbrBtns; i++) {
            (function (i) {
                var value = _this.buttons.values[i];
                var classe = _this.buttons.classes[i];
                var e = _this.buttons.event[i];
                var button = document.createElement('button');
                button.innerHTML = value;
                button.className = classe;
                button.addEventListener('click', function () {
                    e(_this);
                });
                modalParts.FOOTER.appendChild(button);
            })(i);
        }
    };
    Modal.prototype.close = function () {
        fond.style.display = 'none';
    };
    Modal.prototype.supprStat = function (type) {
        console.log('On supprime la partie', type);
    };
    Modal.prototype.validateOption = function (type) {
        console.log('Validation de la partie', type);
    };
    Modal.prototype.userEvent = function (f) {
        f();
    };
    return Modal;
}());
exports.default = Modal;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var variables_1 = __webpack_require__(0);
var Holes_1 = __webpack_require__(1);
var Pion_1 = __webpack_require__(2);
var Board = /** @class */ (function () {
    function Board(lignes, colonnes) {
        this.lignes = lignes;
        this.colonnes = colonnes;
    }
    Board.prototype.draw = function () {
        // console.log(this.lignes);
        // On commence par le trous principaux
        var places = document.getElementById('places');
        places.innerHTML = '';
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
        scoreDots.innerHTML = '';
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
        solutionDiv.innerHTML = '';
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


/***/ })
/******/ ]);
