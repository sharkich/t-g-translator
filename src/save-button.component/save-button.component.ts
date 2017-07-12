const TITLE = 'Save';
const CLASS_NAME = 'tg__btn-save';
const CLASS_NAME_DISABLED = CLASS_NAME + '__disabled';

export class SaveButtonComponent {
    public el: HTMLElement;

    private isDisabled: boolean;

    constructor(wrapperEl: HTMLElement, title: string = TITLE) {
        this.el = document.createElement('a');
        this.el.appendChild(document.createTextNode(title));
        this.el.classList.add(CLASS_NAME);
        this.el.onclick = this.onclick;
        wrapperEl.appendChild(this.el);
    }

    onclick() {
        if (this.isDisabled) return;
        console.log('click');
    }

    checkDisabled(sourceValue: string) {
        if (sourceValue && this.isDisabled) {
            this.isDisabled = false;
            this.el.classList.remove(CLASS_NAME_DISABLED);
        } else if (!sourceValue && !this.isDisabled) {
            this.isDisabled = true;
            this.el.classList.add(CLASS_NAME_DISABLED);
        }
    }
}