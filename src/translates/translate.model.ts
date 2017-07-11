import {Phrase} from './phrase';

export class Translate {
    // private id: string;
    public date: Date; // Date.now() ?
    public source: Phrase;
    public result: Phrase;

    constructor ({id = '', date = new Date(), source, result}) {
        // this.id = id;
        this.date = date;
        this.source = source instanceof Phrase ? source : new Phrase(source);
        this.result = result instanceof Phrase ? result : new Phrase(result);
    }
}