import {Translate} from '../translates/translate.model';

const TITLE = 'List';

const CLASS_NAME = 'tg__list';

const TITLE_CLASS_NAME = CLASS_NAME + '__title';
const LIST_CLASS_NAME = CLASS_NAME + '__list';

const LIST_ITEM_CLASS_NAME = LIST_CLASS_NAME + '__item';
const LIST_ITEM_SOURCE_CLASS_NAME = LIST_ITEM_CLASS_NAME + '__source';
const LIST_ITEM_DELIMITER_CLASS_NAME = LIST_ITEM_CLASS_NAME + '__delimiter';
const LIST_ITEM_RESULT_CLASS_NAME = LIST_ITEM_CLASS_NAME + '__result';

export class ListComponent {
    public el: HTMLElement;
    public elTitle: HTMLElement;
    public title: string;

    public elList: HTMLElement;
    private count: number;
    private list: Translate[];

    public onRemove: ((Translate) => void);

    constructor(wrapperEl: HTMLElement, title: string = TITLE) {
        this.el = document.createElement('div');
        this.el.classList.add(CLASS_NAME);
        wrapperEl.appendChild(this.el);

        this.title = title;
        this.elTitle = document.createElement('h2');
        this.elTitle.classList.add(TITLE_CLASS_NAME);
        this.el.appendChild(this.elTitle);

        this.elList = document.createElement('div');
        this.el.appendChild(this.elList);

        this.setCount();
        this.setList();
    }

    setCount(count: number = 0) {
        this.elTitle.innerHTML = count ? `${this.title} <span>(${count})</span>` : this.title;
    }

    setList(list: Translate[] = []) {
        const LIST_EL = document.createElement('div');
        LIST_EL.classList.add(LIST_CLASS_NAME);

        this.list = list;

        list.forEach((translate: Translate) => {
            const TRANSLATE_EL = document.createElement('div');
            TRANSLATE_EL.classList.add(LIST_ITEM_CLASS_NAME);

            let el;

            el = document.createElement('span');
            el.classList.add(LIST_ITEM_SOURCE_CLASS_NAME);
            el.appendChild(document.createTextNode(translate.source.text));
            TRANSLATE_EL.appendChild(el);

            el = document.createElement('span');
            el.classList.add(LIST_ITEM_DELIMITER_CLASS_NAME);
            el.innerHTML = ' &mdash; ';
            TRANSLATE_EL.appendChild(el);

            el = document.createElement('span');
            el.classList.add(LIST_ITEM_RESULT_CLASS_NAME);
            el.appendChild(document.createTextNode(translate.result.text));
            TRANSLATE_EL.appendChild(el);

            el = document.createElement('span');
            el.innerHTML = `<div class="clear-button goog-toolbar-button"><span class="jfk-button-img"></span></div>`;
            el.onmouseover = () => {
                TRANSLATE_EL.classList.add('is-remove');
            };
            el.onmouseout = () => {
                TRANSLATE_EL.classList.remove('is-remove');
            };
            el.onclick = () => {
                console.log('click', this);
                if (this.onRemove) {
                    this.onRemove(translate);
                }
            };
            TRANSLATE_EL.appendChild(el);

            LIST_EL.appendChild(TRANSLATE_EL);
        });

        this.elList.innerHTML = '';
        this.elList.appendChild(LIST_EL);
    }
}