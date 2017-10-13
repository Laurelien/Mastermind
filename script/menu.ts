/* Menu */
let onglets: any = document.querySelectorAll('#menu li ul li');
for(let i=0; i<onglets.length; i++) {
    if(onglets[i].dataset.stat) {
        onglets[i].addEventListener('click', (e: any) => {
            console.log(onglets[i].innerHTML);
            let stats = new Modal('Statistiques - ' + onglets[i].innerHTML, statsButtons);
                stats.show();
                stats.statistiques(onglets[i].dataset.stat, getStats(onglets[i].dataset.stat));
        });
    }
    else if(onglets[i].dataset.diff) {
        onglets[i].addEventListener('click', () => {
            console.log(onglets[i].dataset.diff);
        });
    }
    else if(onglets[i].dataset.opt) {
        onglets[i].addEventListener('click', () => {
            console.log(onglets[i].dataset.opt);
        });
    }
    else {
        onglets[i].addEventListener('click', (e: any) => {
            console.log(e);
        });
    }
}
const statsButtons: Buttons = {
    values: ['Fermer', 'Réinitialiser'],
    classes: ['default', 'danger'],
    event: [
        (modal: any) => {
            return modal.close();
        },
        (modal: any) => {
            return modal.erase();
        }
    ]
}

function getStats(ongelt: number): string {
    return 'onch';
}