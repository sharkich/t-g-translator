import {Phrase} from './phrase';

export class Translate {
    public source: Phrase;
    public result: Phrase;
    public id: string;
    public date: Date;

    constructor ({id, source, result, date}) {
        this.source = source instanceof Phrase ? source : new Phrase(source);
        this.result = result instanceof Phrase ? result : new Phrase(result);
        this.id = id || this.source.text;
        this.date = date || Date.now();
    }
}