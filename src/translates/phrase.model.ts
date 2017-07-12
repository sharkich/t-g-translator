const LANGUAGES = {
    english: 'EN',
    russian: 'RU'
};

export class Phrase {
    public text: string;
    public language: string;

    constructor ({text, language}) {
        this.text = ('' + text).trim();
        this.language = language || LANGUAGES.english;
    }
}