import Dexie from 'dexie';

import {Translate} from './translate.model';
import {Phrase} from './phrase.model';

export const DATABASE_NAME = 'TG_TRANSLATES_TEST_1';
export const DEFAULT_LIMIT = 32;

export class TranslatesService extends Dexie {
    public favorites: Dexie.Table<Translate, number>;
    public histories: Dexie.Table<Translate, number>;

    constructor() {
        super(DATABASE_NAME);
        console.log('TranslatesService.constructor');
        this.version(1).stores({
            favorites: '++id, date',//, source.text, result.text
            histories: '++id, date'//, source.text, result.text
        });
    }

    /* Favorites */

    getFavorites(limit: number = DEFAULT_LIMIT): Promise<Translate[]> {
        return this.favorites
            .reverse()
            .limit(limit)
            .toArray()
            .then((favorites) => {
                console.log('favorites', favorites);
                return favorites;
            });
    }

    addFavorite(favorite: Translate): Promise<Translate[]> {
        return this.favorites.add(favorite)
            .then(() => this.getFavorites())
            .catch(e => {
                console.error('error: ' + e.stack || e);
                return Promise.reject(e);
            });
    }

    /* Histories */

    getHistories(limit: number = DEFAULT_LIMIT): Promise<Translate[]> {
        return this.histories
            .reverse()
            .limit(limit)
            .toArray()
            .then((histories) => {
                console.log('histories', histories);
                return histories;
            });
    }

    addHistory(history: Translate): Promise<Translate[]> {
        return this.histories.add(history)
            .then(() => this.getHistories())
            .catch(e => {
                console.error('error: ' + e.stack || e);
                return Promise.reject(e);
            });
    }
}