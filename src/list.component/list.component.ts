import {Translate} from '../translates/translate.model';
import {Phrase} from "../translates/phrase.model";

const TITLE = 'List';

const CLASS_NAME = 'tg__list';

const TITLE_CLASS_NAME = CLASS_NAME + '__title';
const LIST_CLASS_NAME = CLASS_NAME + '__list';
const LOAD_MORE_CLASS_NAME = CLASS_NAME + '__load-more';
const DATE_CLASS_NAME = CLASS_NAME + '__date';
const HR_CLASS_NAME = CLASS_NAME + '__hr';

const LIST_ITEM_CLASS_NAME = LIST_CLASS_NAME + '__item';
const LIST_ITEM_SOURCE_CLASS_NAME = LIST_ITEM_CLASS_NAME + '__source';
const LIST_ITEM_DELIMITER_CLASS_NAME = LIST_ITEM_CLASS_NAME + '__delimiter';
const LIST_ITEM_RESULT_CLASS_NAME = LIST_ITEM_CLASS_NAME + '__result';

const SOURCE_HTML_ID = 'source';

export class ListComponent {
    public el: HTMLElement;
    public elTitle: HTMLElement;
    public title: string;

    public elList: HTMLElement;
    private count: number = 0;
    private list: Translate[] = [];

    public elLoadMore: HTMLElement;
    public onLoadMore: (() => void);

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

        this.elLoadMore = document.createElement('a');
        this.elLoadMore.classList.add(LOAD_MORE_CLASS_NAME);
        this.elLoadMore.innerText = 'Load More';
        this.elLoadMore.onclick = () => {
            if (this.onLoadMore) {
                this.onLoadMore();
            }
        };
        this.el.appendChild(this.elLoadMore);

        this.setCount();
        this.setList();
    }

    private checkLoadMore() {
        this.elLoadMore.style.visibility = this.list.length === this.count ? 'hidden' : 'visible';
    }

    setCount(count: number = 0) {
        this.count = count;
        this.elTitle.innerHTML = count ? `${this.title} <span>(${count})</span>` : this.title;
        this.checkLoadMore();
    }

    private generateDateString(date: Date) {
        return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
    }

    setList(list: Translate[] = []) {
        const LIST_EL = document.createElement('div');
        LIST_EL.classList.add(LIST_CLASS_NAME);

        this.list = list;
        this.checkLoadMore();

        let lastDate = '';

        list.forEach((translate: Translate) => {
            const TRANSLATE_EL = document.createElement('div');
            TRANSLATE_EL.classList.add(LIST_ITEM_CLASS_NAME);

            let el;

            let date = this.generateDateString(translate.date);
            if (date !== lastDate) {
                lastDate = date;
                el = document.createElement('hr');
                el.classList.add(HR_CLASS_NAME);
                LIST_EL.appendChild(el);

                el = document.createElement('div');
                el.classList.add(DATE_CLASS_NAME);
                el.innerText = date;
                LIST_EL.appendChild(el);
            }

            el = document.createElement('span');
            el.classList.add(LIST_ITEM_SOURCE_CLASS_NAME);
            el.appendChild(document.createTextNode(translate.source.text));
            el.classList.add('gt-baf-back');
            el.onclick = () => {
                this.onClickTranslate(translate.source, translate.result);
            };
            TRANSLATE_EL.appendChild(el);

            el = document.createElement('span');
            el.classList.add(LIST_ITEM_DELIMITER_CLASS_NAME);
            el.innerHTML = ' &mdash; ';
            TRANSLATE_EL.appendChild(el);

            el = document.createElement('span');
            el.classList.add(LIST_ITEM_RESULT_CLASS_NAME);
            el.classList.add('gt-baf-back');
            el.onclick = () => {
                this.onClickTranslate(translate.result, translate.source);
            };
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

    private onClickTranslate(from: Phrase, to: Phrase) {
        window.location.href = `/#${from.language}/${to.language}/${from.text}`;
        document.getElementById(SOURCE_HTML_ID)['value'] = from.text;
        window.scrollTo(0, 0);
    }
}