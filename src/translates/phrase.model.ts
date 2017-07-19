const LANGUAGES = {
    english: 'EN',
    russian: 'RU'
};

export class Phrase {
    public text: string;
    public language: string;

    constructor ({text, language, isTransform = false}) {
        this.text = '' + text;
        if (isTransform) {
            this.text = this.text.trim();
            if (this.text.indexOf('...') === this.text.length - 3) {
                this.text = this.text.substr(0, this.text.length - 3);
            }
            console.log(`transform (${text})->(${this.text})`);
        }
        this.language = language || LANGUAGES.english;
    }
}