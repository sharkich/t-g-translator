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

    let DB, STORE_DB, TX_DB;
    const INDEXED_DB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
    const OPEN_DB = INDEXED_DB.open(DB_NAME_KEY, 1);

    // Create the schema
    OPEN_DB.onupgradeneeded = () => {
        DB = OPEN_DB.result;
        STORE_DB = DB.createObjectStore(DB_STORAGE_KEY, {keyPath: 'id'});
        STORE_DB.createIndex(DB_INDEX_KEY, ['source.language', 'result.language']);
    };

    /* CLASSES */

    class Phrase {
        constructor ({text, language}) {
            this.text = ('' + text).trim();
            this.language = language || LANGUAGES.english;
        }
    }

    class Translate {
        constructor ({id, source, result}) {
            this.source = source instanceof Phrase ? source : new Phrase(source);
            this.result = result instanceof Phrase ? result : new Phrase(result);
            this.id = id || this.source.text;
        }
    }

    /* RUNNING */

    const CLEAR_EL = document.createElement('div');
    CLEAR_EL.className = 'tg__c';

    const SAVE_LINK_EL = document.createElement('a');
    SAVE_LINK_EL.appendChild(document.createTextNode('Save'));
    SAVE_LINK_EL.className = 'tg__btn-save';
    SAVE_LINK_EL.onclick = () => {
        // Add some data
        let sourse = document.getElementById('source').value;
        let sourse_lang = document.getElementById('gt-sl').value;
        const RESULT_EL = document.getElementById('result_box');
        let result = RESULT_EL.innerText;
        let result_lang = RESULT_EL.getAttribute('lang');

        console.log('click', sourse, sourse_lang, result, result_lang);
        let t = new Translate({
            source: {
                text: sourse,
                language: sourse_lang
            },
            result: {
                text: result,
                language: result_lang
            }
        });
        console.log(t);

        const OPEN_DB = INDEXED_DB.open(DB_NAME_KEY, 1);
        OPEN_DB.onsuccess = () => {
            // Start a new transaction
            DB = OPEN_DB.result;
            TX_DB = DB.transaction(DB_STORAGE_KEY, 'readwrite');
            STORE_DB = TX_DB.objectStore(DB_STORAGE_KEY);
            STORE_DB.index(DB_INDEX_KEY);
            STORE_DB.put(t);
            // Close the db when the transaction is done
            TX_DB.oncomplete = function() {
                DB.close();
            };
        };
    };

    //Appending `Save` button to DOM
    WRAPPER_FOR_BUTTONS_EL.appendChild(SAVE_LINK_EL);

    const PHRASES = [];

    // Init data
    OPEN_DB.onsuccess = () => {
        // Start a new transaction
        DB = OPEN_DB.result;
        TX_DB = DB.transaction(DB_STORAGE_KEY, 'readwrite');
        STORE_DB = TX_DB.objectStore(DB_STORAGE_KEY);
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

})();