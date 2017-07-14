import {AppService} from './app.service';

import {TranslatesService} from '../translates/translates.service';
import {Translate} from '../translates/translate.model';

import {SaveButtonComponent} from '../save-button.component/save-button.component';
import {ListComponent} from '../list.component/list.component';
import {Phrase} from "../translates/phrase.model";

const WRAPPER_FOR_SAVE_BUTTONS_HTML_ID = 'gt-lang-submit';
const WRAPPER_FOR_LISTS_HTML_ID = 'gt-text-top';
const LISTS_HTML_ID = 'tg__lists';
const LISTS_CLASS_NAME = LISTS_HTML_ID;

const SOURCE_HTML_ID = 'source';
const SOURCE_LANG_HTML_ID = 'gt-sl';
const RESULT_HTML_ID = 'result_box';
const TRANSLATE_HTML_ID = 'gt-submit';

const DEBOUNCE_TIME_HISTORY = 1000;

export class AppComponent {
    public favoritesCount: number;
    public favorites: Translate[] = [];
    public historiesCount: number;
    public histories: Translate[] = [];

    public saveButtonComponent: SaveButtonComponent;

    public translateButtonEl: HTMLElement;

    public sourceEl: HTMLElement;
    public sourceLangEl: HTMLElement;
    public sourceChangingTimer: number;
    public resultEl: HTMLElement;

    public favoritesComponent: ListComponent;
    public historiesComponent: ListComponent;

    private translatesService = new TranslatesService();

    constructor() {
        if (AppService.isFirstLaunch()) {
            // TODO: show first screen
        }

        /* Init UI */
        window.addEventListener('load', this.initUI.bind(this));

        /* Get data */
        this.translatesService.getAll()
            .then(({favoritesCount, favorites, historiesCount, histories}) => {
                this.favoritesCount = favoritesCount;
                this.favorites = favorites;
                this.historiesCount = historiesCount;
                this.histories = histories;

                this.favoritesComponent.setCount(this.favoritesCount);
                this.favoritesComponent.setList(this.favorites);

                this.historiesComponent.setCount(this.historiesCount);
                this.historiesComponent.setList(this.histories);
            });
    }

    initUI() {
        /* saveButton */
        this.saveButtonComponent = new SaveButtonComponent(document.getElementById(WRAPPER_FOR_SAVE_BUTTONS_HTML_ID));
        this.saveButtonComponent.onclick = this.saveFavorite.bind(this);

        this.translateButtonEl = document.getElementById(TRANSLATE_HTML_ID);
        this.translateButtonEl.onclick = this.saveHistory.bind(this);

        this.sourceLangEl = document.getElementById(SOURCE_LANG_HTML_ID);
        this.sourceEl = document.getElementById(SOURCE_HTML_ID);
        this.onChangeSource();
        this.sourceEl.addEventListener('input', this.onChangeSource.bind(this));
        this.sourceEl.addEventListener('change', this.onChangeSource.bind(this));

        this.resultEl = document.getElementById(RESULT_HTML_ID);

        const WRAPPER = document.getElementById(WRAPPER_FOR_LISTS_HTML_ID);

        const CLEAR_BOTH = document.createElement('div');
        CLEAR_BOTH.classList.add('tg__c');
        WRAPPER.appendChild(CLEAR_BOTH);

        const LIST_EL = document.createElement(LISTS_HTML_ID);
        LIST_EL.classList.add(LISTS_CLASS_NAME);
        WRAPPER.appendChild(LIST_EL);

        /* Favorites */
        this.favoritesComponent = new ListComponent(LIST_EL, 'Favorite');
        this.favoritesComponent.onRemove = (translate: Translate) => {
            this.translatesService.removeFavorite(translate)
                .then(this.updateFavoritesList.bind(this));
        };

        /* Histories */
        this.historiesComponent = new ListComponent(LIST_EL, 'History');
        this.historiesComponent.onRemove = (translate: Translate) => {
            this.translatesService.removeHistory(translate)
                .then(this.updateHistoriesList.bind(this));
        };
    }

    onChangeSource() {
        if (this.sourceChangingTimer) {
            clearTimeout(this.sourceChangingTimer);
        }
        this.sourceChangingTimer = setTimeout(this.saveHistory.bind(this), DEBOUNCE_TIME_HISTORY);
        this.saveButtonComponent.checkDisabled(this.sourceEl['value']);
    }

    private getTranslate(): Translate {
        return new Translate({
            source: new Phrase({
                text: this.sourceEl['value'],
                language: this.sourceLangEl['value']
            }),
            result: new Phrase({
                text: this.resultEl.innerText,
                language: this.resultEl.getAttribute('lang')
            })
        });
    }

    saveHistory() {
        const translate = this.getTranslate();
        const findTranslate = this.histories.find((el) =>
            el.result.text === translate.result.text &&
            el.source.text === translate.source.text
        );
        if (findTranslate) return;
        this.translatesService.addHistory(translate)
            .then(this.updateHistoriesList.bind(this));
    }

    saveFavorite() {
        const translate = this.getTranslate();
        const findTranslate = this.favorites.find((el) =>
            el.result.text === translate.result.text &&
            el.source.text === translate.source.text
        );
        if (findTranslate) return;
        this.translatesService.addFavorite(translate)
            .then(this.updateFavoritesList.bind(this));
    }

    private updateHistoriesList(list) {
        this.histories = list;
        this.historiesComponent.setList(list);
        this.translatesService.getHistoriesCount()
            .then((count) => {
                this.historiesCount = count;
                this.historiesComponent.setCount(count);
            });
    }

    private updateFavoritesList(list) {
        this.favorites = list;
        this.favoritesComponent.setList(list);
        this.translatesService.getFavoritesCount()
            .then((count) => {
                this.favoritesCount = count;
                this.favoritesComponent.setCount(count);
            });
    }
}