/**
 * Created by Swapnil on 4/11/2017.
 */

var nano = require('nano')('http://localhost:5984');
var test = nano.db.use('testhotel');

// test.list(function(err,body){
//     if(!err) {
//         body.rows.forEach(function (doc) {
//             console.log(doc.key);
//         })
//     }
// });

test.view('hotellist', 'hotellist', function(err,body){
    if(!err) {
        body.rows.forEach(function (doc) {
            console.log(doc.key, doc.value);
        })
    }
});
