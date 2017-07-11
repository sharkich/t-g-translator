
import {Translate} from './models/translate';

const WRAPPER_FOR_BUTTONS_EL = document.getElementById('gt-lang-submit');
const WRAPPER_FOR_CONTENT_EL = document.getElementById('gt-lc'); // || gt-src-c
const WRAPPER_CONTENT_EL = document.createElement('div');
WRAPPER_CONTENT_EL.className = 'tg_content';
WRAPPER_FOR_CONTENT_EL.appendChild(WRAPPER_CONTENT_EL);

/* DB */

const DB_NAME_KEY = 'tg-translates';
const DB_STORAGE_KEY = 'translates';
const DB_INDEX_KEY = 'SomeIndex';

let DB, STORE_DB, TX_DB, INDEXED_DB, OPEN_DB;

/* RUNNING */

const CLEAR_EL = document.createElement('div');
CLEAR_EL.className = 'tg__c';

const SAVE_LINK_EL = document.createElement('a');
SAVE_LINK_EL.appendChild(document.createTextNode('Save'));
SAVE_LINK_EL.className = 'tg__btn-save';
SAVE_LINK_EL.onclick = () => {
    // Add some data
    const SOURSE_EL = document.getElementById('source');
    let sourse = SOURSE_EL['value'];
    const SOURSE_LANG_EL = document.getElementById('gt-sl');
    let sourse_lang = SOURSE_LANG_EL['value'];
    const RESULT_EL = document.getElementById('result_box');
    let result = RESULT_EL.innerText;
    let result_lang = RESULT_EL.getAttribute('lang');

    const OPEN_DB = INDEXED_DB.open(DB_NAME_KEY, 1);
    OPEN_DB.onsuccess = () => {
        // Start a new transaction
        DB = OPEN_DB.result;
        TX_DB = DB.transaction(DB_STORAGE_KEY, 'readwrite');
        STORE_DB = TX_DB.objectStore(DB_STORAGE_KEY);
        STORE_DB.index(DB_INDEX_KEY);

        STORE_DB.put(new Translate({
            id: null,
            source: {
                text: sourse,
                language: sourse_lang
            },
            result: {
                text: result,
                language: result_lang
            },
            date: null
        }));

        // Close the db when the transaction is done
        TX_DB.oncomplete = () => {
            DB.close();
            console.log('saved', sourse);
            openDB();
        }
    };
};

//Appending `Save` button to DOM
WRAPPER_FOR_BUTTONS_EL.appendChild(SAVE_LINK_EL);

let phrases = [];

openDB();

function openDB () {
    phrases = [];

    INDEXED_DB = window.indexedDB || window['mozIndexedDB'] || window['webkitIndexedDB'] || window['msIndexedDB'] || window['shimIndexedDB'];
    OPEN_DB = INDEXED_DB.open(DB_NAME_KEY, 1);

    // Create the schema
    OPEN_DB.onupgradeneeded = () => {
        DB = OPEN_DB.result;
        STORE_DB = DB.createObjectStore(DB_STORAGE_KEY, {keyPath: 'date'});
        STORE_DB.createIndex(DB_INDEX_KEY, ['source.language', 'result.language']);
    };

    // Read data
    OPEN_DB.onsuccess = () => {
        // Start a new transaction
        DB = OPEN_DB.result;
        TX_DB = DB.transaction(DB_STORAGE_KEY, 'readwrite');
        STORE_DB = TX_DB.objectStore(DB_STORAGE_KEY);
        STORE_DB.index(DB_INDEX_KEY);

        const GET_ALL_DB = STORE_DB.getAll();

        GET_ALL_DB.onsuccess = () => {
            GET_ALL_DB.result.forEach((result) => phrases.push(new Translate(result)));
            renderList();
        };

        // Close the db when the transaction is done
        TX_DB.oncomplete = () => DB.close();
    };
}

function renderList () {
    WRAPPER_CONTENT_EL.innerHTML = '';

    // Generate output from phrases
    const LIST_EL = document.createElement('div');
    LIST_EL.className = 'tg__list';
    phrases.forEach((phrase) => {
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
    WRAPPER_CONTENT_EL.appendChild(CLEAR_EL);

    // H2
    let el = document.createElement('h2');
    el.appendChild(document.createTextNode(`Saved phrases (${phrases.length})`));
    WRAPPER_CONTENT_EL.appendChild(el);

    WRAPPER_CONTENT_EL.appendChild(LIST_EL);
}

import {MyAppDatabase, IContact} from './services/db';
const db = new MyAppDatabase();
db.contacts.put({first: "First name " + Math.random(), last: "Last name " + Math.random()});