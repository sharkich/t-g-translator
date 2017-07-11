import Dexie from 'dexie';

import {Translate} from './translate.model';

export const DATABASE_NAME = 'TG_TRANSLATES_TEST_1';
export const DEFAULT_LIMIT = 32;

export class TranslatesService extends Dexie {
    public favorites: Dexie.Table<Translate,number>;
    public histories: Dexie.Table<Translate,number>;

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
        console.log('getFavorite', limit);
        return Promise.resolve([]);
    }

    addFavorite(favorite: Translate) {
        console.log('addFavorite', favorite);
    }

    /* Histories */

    getHistories(limit: number = DEFAULT_LIMIT): Promise<Translate[]> {
        console.log('getHistory', limit);
        return Promise.resolve([]);
    }

    addHistory(history: Translate) {
        console.log('addHistory', history);
    }
}