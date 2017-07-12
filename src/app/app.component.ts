import {AppService} from './app.service';

import {TranslatesService} from '../translates/translates.service';
import {Translate} from '../translates/translate.model';

import {SaveButtonComponent} from '../save-button.component/save-button.component';

const WRAPPER_FOR_SAVE_BUTTONS_EL = document.getElementById('gt-lang-submit');
const SOURCE_HTML_ID = 'source';
const RESULT_HTML_ID = 'result_box';

export class AppComponent {
    public favoritesCount: number;
    public favorites: Translate[] = [];
    public historiesCount: number;
    public histories: Translate[] = [];

    public saveButton: SaveButtonComponent;
    public sourceEl: HTMLElement;
    public resultEl: HTMLElement;

    private translatesService = new TranslatesService();

    constructor() {
        if (AppService.isFirstLaunch()) {
            // TODO: show first screen
        }

        /* Init UI */
        window.addEventListener('load', () => {
            this.saveButton = new SaveButtonComponent(WRAPPER_FOR_SAVE_BUTTONS_EL);

            this.sourceEl = document.getElementById(SOURCE_HTML_ID);
            this.saveButton.checkDisabled(this.sourceEl['value']);
            this.sourceEl.addEventListener('input', () => this.saveButton.checkDisabled(this.sourceEl['value']));
            this.sourceEl.addEventListener('change', () => this.saveButton.checkDisabled(this.sourceEl['value']));

            this.resultEl = document.getElementById(RESULT_HTML_ID);
        });

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
}