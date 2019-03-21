const { range, from, forkJoin } = rxjs;
const { map, filter } = rxjs.operators;

class BibleApi {
    getVerses(q, vs) {
        var observables = vs.map(v => this._query(q, v));
        return forkJoin(observables).pipe(
            map((verses_array) => {
                var res = {};
                var verses = verses_array[0];
                for (var verses of verses_array) {
                    for (var verse of verses) {
                        for (var key in verse) {
                            for (var prop in verse[key]) {
                                if (res.hasOwnProperty(prop)) {
                                    res[prop].push(verse[key][prop]);
                                } else {
                                    res[prop] = [verse[key][prop]];
                                }
                            }
                            
                            
                        }
                    }
                }
                return res;
            }),
        );
    }

    _query(p, v) {
        var promise = jQuery.ajax({
            url:'https://getbible.net/json',
            dataType: 'jsonp',
            data: `p=${p}&v=${v}`,
            jsonp: 'getbible',
            }).promise();
        return from(promise).pipe(
            map((json) => {
                return json.book.map((book) => {
                    var verses = [];
                    for (var key in book.chapter) {
                        verses.push({[book.chapter_nr+ ':'+ key]: book.chapter[key].verse});
                    }
                    return verses;
                });
            }),
        );
    }
}
