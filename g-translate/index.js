(() => {
    /* CONSTANTS */

    const WRAPPER_FOR_BUTTONS_EL = document.getElementById('gt-lang-submit');
    const WRAPPER_FOR_CONTENT_EL = document.getElementById('gt-lc'); // || gt-src-c

    const LANGUAGES = {
        english: 'EN',
        russian: 'RU'
    };

    /* DB */

    const DB_NAME_KEY = 'tg-translates';
    const DB_STORAGE_KEY = 'translates';
    const DB_INDEX_KEY = 'SomeIndex';

    const INDEXED_DB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
    const OPEN_DB = INDEXED_DB.open(DB_NAME_KEY, 1);

    // Create the schema
    OPEN_DB.onupgradeneeded = () => {
        const DB = OPEN_DB.result;
        const STORE_DB = DB.createObjectStore(DB_STORAGE_KEY, {keyPath: 'id'});
        STORE_DB.createIndex(DB_INDEX_KEY, ['source.language', 'result.language']);
    };

    /* CLASSES */

    class Phrase {
        constructor ({text, language}) {
            this.text = '' + text;
            this.language = language || LANGUAGES.english;
        }
    }

    class Translate {
        constructor ({id, source, result}) {
            this.id = id || source.text;
            this.source = source instanceof Phrase ? source : new Phrase(source);
            this.result = result instanceof Phrase ? result : new Phrase(result);
        }
    }

    /* RUNNING */

    const CLEAR_EL = document.createElement('div');
    CLEAR_EL.className = 'c';

    const SAVE_LINK_EL = document.createElement('a');
    SAVE_LINK_EL.appendChild(document.createTextNode('Save'));
    SAVE_LINK_EL.className = 'tg__btn-save';
    SAVE_LINK_EL.onclick = () => {
        console.log('click');
        // Add some data
        PHRASES.forEach((phrase) => {
            console.log('try to put', phrase);
            STORE_DB.put(phrase);
        });
    };

    //Appending to DOM
    WRAPPER_FOR_BUTTONS_EL.appendChild(SAVE_LINK_EL);

    const PHRASES = [];

    // Init data
    (() => {

        // PHRASES.push(new Translate({
        //     source: new Phrase({
        //         text: 'language',
        //         language: LANGUAGES.english
        //     }),
        //     result: new Phrase({
        //         text: 'язык',
        //         language: LANGUAGES.russian
        //     })
        // }));
        // PHRASES.push(new Translate({
        //     source: new Phrase({
        //         text: 'adorable',
        //         language: LANGUAGES.english
        //     }),
        //     result: new Phrase({
        //         text: 'обожаемый',
        //         language: LANGUAGES.russian
        //     })
        // }));
        // PHRASES.push(new Translate({
        //     source: new Phrase({
        //         text: 'гипотетически',
        //         language: LANGUAGES.russian
        //     }),
        //     result: new Phrase({
        //         text: 'Hypothetically',
        //         language: LANGUAGES.english
        //     })
        // }));
        // PHRASES.push(new Translate({
        //     source: new Phrase({
        //         text: 'мачь на вашей стороне',
        //         language: LANGUAGES.russian
        //     }),
        //     result: new Phrase({
        //         text: 'the ball in your court',
        //         language: LANGUAGES.english
        //     })
        // }));
    })();


    function renderList () {
        // Generate output from PHRASES
        const LIST_EL = document.createElement('div');
        LIST_EL.className = 'tg__list';
        PHRASES.forEach((phrase) => {
            const TRANSLATE_EL = document.createElement('div');
            TRANSLATE_EL.className = 'tg__list__translate';

            let el;

            el = document.createElement('span');
            el.className = 'tg__source-text';
            el.appendChild(document.createTextNode(phrase.source.text));
            TRANSLATE_EL.appendChild(el);

            el = document.createElement('span');
            el.className = 'tg__delimiter';
            el.innerHTML = ' &mdash; ';
            TRANSLATE_EL.appendChild(el);

            el = document.createElement('span');
            el.className = 'tg__result-text';
            el.appendChild(document.createTextNode(phrase.result.text));
            TRANSLATE_EL.appendChild(el);

            LIST_EL.appendChild(TRANSLATE_EL);
        });

        //Appending to DOM
        WRAPPER_FOR_CONTENT_EL.appendChild(CLEAR_EL);

        // H2
        let el = document.createElement('h2');
        el.appendChild(document.createTextNode(`Saved phrases (${PHRASES.length})`));
        WRAPPER_FOR_CONTENT_EL.appendChild(el);

        WRAPPER_FOR_CONTENT_EL.appendChild(LIST_EL);
    }

    OPEN_DB.onsuccess = () => {
        // Start a new transaction
        const DB = OPEN_DB.result;
        const TX_DB = DB.transaction(DB_STORAGE_KEY, 'readwrite');
        const STORE_DB = TX_DB.objectStore(DB_STORAGE_KEY);
        STORE_DB.index(DB_INDEX_KEY);
        
        const GET_ALL_DB = STORE_DB.getAll();

        GET_ALL_DB.onsuccess = () => {
            GET_ALL_DB.result.forEach((result) => PHRASES.push(new Translate(result)));
            renderList();
        };

        // Close the db when the transaction is done
        TX_DB.oncomplete = function() {
            DB.close();
        };
    };

})();