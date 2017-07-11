import {AppService} from './app.service';
import {TranslatesService} from '../translates/translates.service';
import {Translate} from '../translates/translate.model';
import {Phrase} from '../translates/phrase';

export class AppComponent {
    public favorites: Translate[] = [];
    public histories: Translate[] = [];

    private db = new TranslatesService();

    constructor() {
        console.log('AppComponent.constructor');
        if (AppService.isFirstLaunch()) {
            // TODO: show first screen
        }

        // this.translatesService.getFavorites()
        //     .then(favorites => {
        //         console.log('favorite', favorites);
        //         this.favorites = favorites;
        //     });
        //
        // this.translatesService.getHistories()
        //     .then(histories => {
        //         console.log('histories', histories);
        //         this.histories = histories;
        //     });

        // Add
        // for (let i = 100; i--;) {
        //     this.db.histories.add(new Translate({
        //         source: new Phrase({
        //             text: 'xsource-text' + Math.random(),
        //             language: 'en'
        //         }),
        //         result: new Phrase({
        //             text: 'xresult-text' + Math.random(),
        //             language: 'ru'
        //         })
        //     }))
        //         .then(() => {
        //             return this.db.histories.toArray();
        //         })
        //         .then(histories => {
        //             console.log('My histories: ' + JSON.stringify(histories));
        //         })
        //         .catch(e => {
        //             console.error('error: ' + e.stack || e);
        //         });
        // }
    }
}