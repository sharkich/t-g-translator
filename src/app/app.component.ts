import {AppService} from './app.service';
import {TranslatesService} from '../translates/translates.service';
import {Translate} from '../translates/translate.model';

export class AppComponent {
    public favorites: Translate[] = [];
    public histories: Translate[] = [];

    private translatesService = new TranslatesService();

    constructor() {
        if (AppService.isFirstLaunch()) {
            // TODO: show first screen
        }

        this.translatesService.getHistories()
            .then((histories) => {
                this.histories = histories;
            });

        this.translatesService.getFavorites()
            .then((favorites) => {
                this.favorites = favorites;
            });
    }
}