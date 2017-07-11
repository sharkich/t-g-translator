import Dexie from 'dexie';

export interface IContact {
    id?: number,
    first: string,
    last: string
}

export class MyAppDatabase extends Dexie {
    // Declare implicit table properties.
    // (just to inform Typescript. Instanciated by Dexie in stores() method)
    public contacts: Dexie.Table<IContact, number>; // number = type of the primkey
    //...other tables goes here...

    constructor () {
        super('MyAppDatabase');
        this.version(1).stores({
            contacts: '++id, first, last',
            //...other tables goes here...
        });
    }
}