const TITLE = 'Save';
const CLASS_NAME = 'tg__btn-save';
const CLASS_NAME_DISABLED = CLASS_NAME + '__disabled';

export class SaveButtonComponent {
    public el: HTMLElement;
    public onclick: (() => void);

    private isDisabled: boolean;

    constructor(wrapperEl: HTMLElement, title: string = TITLE) {
        this.el = document.createElement('a');
        this.el.appendChild(document.createTextNode(title));
        this.el.classList.add(CLASS_NAME);
        this.el.onclick = this.handleOnClick.bind(this);
        wrapperEl.appendChild(this.el);
    }

    handleOnClick() {
        if (this.isDisabled) return;
        if (this.onclick) {
            this.onclick();
        }
    }

    checkDisabled(sourceValue: string) {
        if (sourceValue) {
            if (this.isDisabled) {
                this.el.classList.remove(CLASS_NAME_DISABLED);
            }
            this.isDisabled = false;
        } else if (!sourceValue) {
            if (!this.isDisabled) {
                this.el.classList.add(CLASS_NAME_DISABLED);
            }
            this.isDisabled = true;
        }
    }
}