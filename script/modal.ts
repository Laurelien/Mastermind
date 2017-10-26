import Buttons from './Buttons';

let fond: any = document.getElementById('fond');
// const modal: any = document.getElementById('modal');
// const h_modal = modal.querySelector('#h_modal');
// const b_modal = modal.querySelector('#b_modal');
// const f_modal = modal.querySelector('#f_modal');

let modalParts: any = {
    MAIN: document.getElementById('modal'),
    HEADER: document.getElementById('h_modal'),
    BODY: document.getElementById('b_modal'),
    FOOTER: document.getElementById('f_modal')
}

export default class Modal {
    titre: string;
    buttons: Buttons;
    template: any;

    constructor(titre: string, buttons: Buttons, template: any) {
        this.titre = titre;
        this.buttons = buttons;
        this.template = template;
    }

    base() {
        fond.style.display = 'flex';
        // Le titre
        let h1 = modalParts.HEADER.querySelector('h1');
        h1.innerHTML = this.titre;
        // Le corps
        modalParts.BODY.innerHTML = this.template;
        // Les boutons
        modalParts.FOOTER.innerHTML = '';
        let nbrBtns = this.buttons.values.length;
        for (let i = 0; i < nbrBtns; i++) {
            ((i: number) => {
                let value: string = this.buttons.values[i];
                let classe: string = this.buttons.classes[i];
                let e: any = this.buttons.event[i];
                let button = document.createElement('button');
                button.innerHTML = value;
                button.className = classe;
                button.addEventListener('click', () => {
                    e(this);
                });
                modalParts.FOOTER.appendChild(button);
            })(i);
        }
    }

    close() {
        fond.style.display = 'none';
    }

    supprStat(type: number) {
        console.log('On supprime la partie', type);
    }

    validateOption(type: number) {
        console.log('Validation de la partie', type);
    }

    userEvent(type: number | string) {
        console.log(type);
    }
}