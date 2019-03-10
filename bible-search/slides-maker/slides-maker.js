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

function beautifyName(q) {
    for (const key in BOOK_NAME_MAP) {
        if (q.startsWith(key)) {
            return BOOK_NAME_MAP[key] + ' ' + q.replace(key, '');
        }
    }
    return q;
}

var BOOK_NAME_MAP = {
    matthew: '马太福音',
    make: '马可福音',
    luke: '路加福音',
    john: '约翰福音',
}