import {AppService} from './app.service';

import {TranslatesService} from '../translates/translates.service';
import {Translate} from '../translates/translate.model';

import {SaveButtonComponent} from '../save-button.component/save-button.component';
import {FavoritesComponent} from '../favorites.component/favorites.component';

const WRAPPER_FOR_SAVE_BUTTONS_HTML_ID = 'gt-lang-submit';
const WRAPPER_FOR_LISTS_HTML_ID = 'gt-text-top';
const LISTS_HTML_ID = 'tg__lists';
const LISTS_CLASS_NAME = LISTS_HTML_ID;

const SOURCE_HTML_ID = 'source';
const RESULT_HTML_ID = 'result_box';

const DEBOUNCE_TIME_HISTORY = 1000;

export class AppComponent {
    public favoritesCount: number;
    public favorites: Translate[] = [];
    public historiesCount: number;
    public histories: Translate[] = [];

    public saveButtonComponent: SaveButtonComponent;

    public sourceEl: HTMLElement;
    public sourceChangingTimer: number;
    public resultEl: HTMLElement;

    public favoritesComponent: FavoritesComponent;

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
            });
    }

    initUI() {
        /* saveButton */
        this.saveButtonComponent = new SaveButtonComponent(document.getElementById(WRAPPER_FOR_SAVE_BUTTONS_HTML_ID));
        this.saveButtonComponent.onclick = this.saveFavorite.bind(this);

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
        this.favoritesComponent = new FavoritesComponent(LIST_EL);

        /* Histories */
        this.favoritesComponent = new FavoritesComponent(LIST_EL, 'History');
    }

    onChangeSource() {
        if (this.sourceChangingTimer) {
            clearTimeout(this.sourceChangingTimer);
        }
        this.sourceChangingTimer = setTimeout(this.saveHistory.bind(this), DEBOUNCE_TIME_HISTORY);
        this.saveButtonComponent.checkDisabled(this.sourceEl['value']);
    }

    saveHistory() {
        console.log('saveHistory', this.sourceEl['value']);
    }

    saveFavorite() {
        console.log('saveFavorite', this.sourceEl['value']);
    }
}