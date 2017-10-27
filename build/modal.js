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
var Modal = (function () {
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
    Modal.prototype.userEvent = function (type) {
        console.log(type);
    };
    return Modal;
}());
exports.default = Modal;
