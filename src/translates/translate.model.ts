import {Phrase} from './phrase.model';

export class Translate {
    public id: number;
    public date: Date; // Date.now() ?
    public source: Phrase;
    public result: Phrase;

    constructor (resourse: any = {}) {
        if (resourse.id) {
            this.id = resourse.id;
        }
        this.date = resourse.date;
        this.source = resourse.source instanceof Phrase ? resourse.source : new Phrase(resourse.source);
        this.result = resourse.result instanceof Phrase ? resourse.result : new Phrase(resourse.result);
    }

    get isEmpty (): boolean {
        return !this.source.text.length || !this.result.text.length;
    }
}