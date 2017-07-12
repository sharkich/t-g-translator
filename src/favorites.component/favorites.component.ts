const TITLE = 'Favorites';
const CLASS_NAME = 'tg__favorites';

export class FavoritesComponent {
    public el: HTMLElement;

    constructor(wrapperEl: HTMLElement, title: string = TITLE) {
        this.el = document.createElement('div');
        this.el.classList.add(CLASS_NAME);
        wrapperEl.appendChild(this.el);

        this.el.innerHTML = title;
    }
}