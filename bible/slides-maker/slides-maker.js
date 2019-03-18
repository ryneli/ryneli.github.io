function showPPT(q, slidesRootEl) {
    var books = q.split(';').map((str) => str.trim());
    for (var i = 0; i < books.length; ++i) {
        showBook(books[i], beautifyName(books[i]), slidesRootEl);
    }
}

function showBook(q, title, slidesRootEl) {
    new BibleApi().getVerses(q, ['cus', 'kjv']).subscribe((verses) => {
        var slideTitle = document.createElement("SECTION");
        slideTitle.innerHTML = '<h2>' + title + '</h2>';
        slidesRootEl.appendChild(slideTitle);
        console.log(verses);
        for (const verse in verses) {
            console.log(verses[verse].toString().length + ': ' + verses[verse]);
            var slide = document.createElement("SECTION");
            for (const t in verses[verse]) {
                slide.innerHTML += '<sup>' + verse + '</sup>' + ' ' + verses[verse][t] + '<br/>';
            }
            slidesRootEl.appendChild(slide);
        }
    });
}

function clear(slidesRootEl) {
    Array.from(slidesRootEl.children)
    .filter((childEl) => 
        childEl.tagName.toLowerCase() === 'section' && childEl.id != 'search')
    .map((childEl) => childEl.remove());
}

function beautifyName(q) {
    for (const key in BOOK_NAME_MAP) {
        if (q.toLowerCase().startsWith(key)) {
            return BOOK_NAME_MAP[key][0] + ' ' + q.toLowerCase().replace(key, '');
        }
    }
    return q;
}

var BOOK_NAME_MAP = {
    genesis: ['創世記', '創', 'Genesis', 'Gen'],
    exodus: ['出埃及記', '出', 'Exodus', 'Exo'],
    leviticus: ['利未記', '利', 'Leviticus', 'Lev'],
    numbers: ['民數記',	'民', 'Numbers', 'Num'],
    deuteronomy: ['申命記', '申', 'Deuteronomy', 'Deu'],
    /*
    約書亞記	書	Joshua	Jos
    士師記	士	Judges	Jug
    路得記	得	Ruth	Rut
    撒母耳記上	撒上	1 Samuel	1Sa
    撒母耳記下	撒下	2 Samuel	2Sa
    列王紀上	王上	1 Kings	1Ki
    列王紀下	王下	2 Kings	2Ki
    歷代志上	代上	1 Chronicles	1Ch
    歷代志下	代下	2 Chronicles	2Ch
    以斯拉記	拉	Ezra	Ezr
    尼希米記	尼	Nehemiah	Neh
    以斯帖記	斯	Esther	Est
    約伯記	伯	Job	Job
    詩篇	詩	Psalms	Psm
    箴言	箴	Proverbs	Pro
    傳道書	傳	Ecclesiastes	Ecc
    雅歌	歌	Song of Songs	Son
    以賽亞書	賽	Isaiah	Isa
    耶利米書	耶	Jeremiah	Jer
    耶利米哀歌	哀	Lamentations	Lam
    以西結書	結	Ezekiel	Eze
    但以理書	但	Daniel	Dan
    何西阿書	何	Hosea	Hos
    約珥書	珥	Joel	Joe
    阿摩司書	摩	Amos	Amo
    俄巴底亞書	俄	Obadiah	Oba
    約拿書	拿	Jonah	Jon
    彌迦書	彌	Micah	Mic
    那鴻書	鴻	Nahum	Nah
    哈巴谷書	哈	Habakkuk	Hab
    西番雅書	番	Zephaniah	Zep
    哈該書	該	Haggai	Hag
    撒迦利亞書	亞	Zechariah	Zec
    瑪拉基書	瑪	Malachi	Mal
    */
   
    matthew: ['馬太福音', '太', 'Matthew', 'Mat'],
    mark: ['馬可福音', '可', 'Mark', 'Mak'],
    luke: ['路加福音', '路', 'Luke', 'Luk'],
    john: ['約翰福音', '約', 'John', 'Jhn'],
    acts: ['使徒行傳', '徒', 'Acts', 'Act'],
    romans: ['羅馬書', '羅', 'Romans', 'Rom'],
    '1corinthians': ['哥林多前書', '林前', '1 Corinthians', '1Co'],
    '2corinthians': ['哥林多後書', '林後', '2 Corinthians', '2Co'],
    galatians: ['加拉太書', '加', 'Galatians', 'Gal'],
    /*
    以弗所書	弗	Ephesians	Eph
    腓利比書	腓	Philippians	Phl
    歌羅西書	西	Colossians	Col
    帖撒羅尼迦前書	帖前	1 Thessalonians	1Ts
    帖撒羅尼迦後書	帖後	2 Thessalonians	2Ts
    提摩太前書	提前	1 Timothy	1Ti
    提摩太後書	提後	2 Timothy	2Ti
    提多書	多	Titus	Tit
    腓利門書	門	Philemon	Phm
    希伯來書	來	Hebrews	Heb
    雅各書	雅	James	Jas
    彼得前書	彼前	1 Peter	1Pe
    彼得後書	彼後	2 Peter	2Pe
    約翰壹書	約一	1 John	1Jn
    約翰貳書	約二	2 John	2Jn
    約翰參書	約三	3 John	3Jn
    猶大書	猶	Jude	Jud
    啟示錄	啟	Revelation	Rev
    */
}
