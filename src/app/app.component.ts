import {AppService} from './app.service';

import {TranslatesService} from '../translates/translates.service';
import {Translate} from '../translates/translate.model';

import {SaveButtonComponent} from '../save-button.component/save-button.component';

const WRAPPER_FOR_SAVE_BUTTONS_EL = document.getElementById('gt-lang-submit');
const SOURCE_HTML_ID = 'source';
const RESULT_HTML_ID = 'result_box';

const DEBOUNCE_TIME_HISTORY = 1000;

export class AppComponent {
    public favoritesCount: number;
    public favorites: Translate[] = [];
    public historiesCount: number;
    public histories: Translate[] = [];

    public saveButton: SaveButtonComponent;
    public sourceEl: HTMLElement;
    public sourceChangingTimer: number;
    public resultEl: HTMLElement;

    private translatesService = new TranslatesService();

    constructor() {
        if (AppService.isFirstLaunch()) {
            // TODO: show first screen
        }

        /* Init UI */
        window.addEventListener('load', this.initUI.bind(this));

        /* Get data */

        this.translatesService.getHistoriesCount()
            .then((historiesCount) => {
                console.log('historiesCount', historiesCount);
                this.historiesCount = historiesCount;
            });

        this.translatesService.getHistories()
            .then((histories) => {
                console.log('histories', histories);
                this.histories = histories;
            });

        this.translatesService.getFavoritesCount()
            .then((favoritesCount) => {
                console.log('favoritesCount', favoritesCount);
                this.favoritesCount = favoritesCount;
            });

        this.translatesService.getFavorites()
            .then((favorites) => {
                console.log('favorites', favorites);
                this.favorites = favorites;
            });
    }

    initUI() {
        this.saveButton = new SaveButtonComponent(WRAPPER_FOR_SAVE_BUTTONS_EL);
        this.saveButton.onclick = this.saveFavorite.bind(this);

        this.sourceEl = document.getElementById(SOURCE_HTML_ID);
        this.onChangeSource();
        this.sourceEl.addEventListener('input', this.onChangeSource.bind(this));
        this.sourceEl.addEventListener('change', this.onChangeSource.bind(this));

        this.resultEl = document.getElementById(RESULT_HTML_ID);
    }

    onChangeSource() {
        if (this.sourceChangingTimer) {
            clearTimeout(this.sourceChangingTimer);
        }
        this.sourceChangingTimer = setTimeout(this.saveHistory.bind(this), DEBOUNCE_TIME_HISTORY);
        this.saveButton.checkDisabled(this.sourceEl['value']);
    }

    saveHistory() {
        console.log('saveHistory', this.sourceEl['value']);
    }

    saveFavorite() {
        console.log('saveFavorite', this.sourceEl['value']);
    }
}