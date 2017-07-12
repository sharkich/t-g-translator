import {AppService} from './app.service';
import {TranslatesService} from '../translates/translates.service';
import {Translate} from '../translates/translate.model';

export class AppComponent {
    public favoritesCount: number;
    public favorites: Translate[] = [];
    public historiesCount: number;
    public histories: Translate[] = [];

    private translatesService = new TranslatesService();

    constructor() {
        if (AppService.isFirstLaunch()) {
            // TODO: show first screen
        }

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