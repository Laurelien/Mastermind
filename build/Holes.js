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
var variables_1 = require("./variables");
var Pion_1 = require("./Pion");
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
exports.default = Hole;
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
                actualScoreDots[values - 1].style.backgroundColor = 'green';
                bons--;
            }
            else if (moities !== 0) {
                actualScoreDots[values - 1].style.backgroundColor = 'red';
                moities--;
            }
            values--;
        }
    };
    return ScoreHole;
}(Hole));
exports.ScoreHole = ScoreHole;
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
