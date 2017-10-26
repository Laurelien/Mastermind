"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var variables_1 = require("./variables");
var Pion = (function () {
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
