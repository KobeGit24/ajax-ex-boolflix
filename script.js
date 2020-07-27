function init() {
    searchApi();
}

function searchApi() {
    var input = $('.container #search');
    var btn = $('.container #btn');
    btn.click(function () {
        var inputVal = input.val(); 
    
        $.ajax({
            url : 'https://api.themoviedb.org/3/search/movie?',
            method : 'GET',
            data : {
                'api_key': 'aebf9ba0680152a5c118e16606ba7947',
                'query': inputVal
            },
            success: function (data) {

                var results = data.results;
                var template = $('#movie-template').html();
                var compiled = Handlebars.compile(template);
                var target = $('#movie-list');

                for (var i = 0; i < results.length; i++) {
                    var movieTitle = results[i].title;
                    var movieOriginalTitle = results[i]['original_title'];
                    var movielenguage = results[i]['original_language'];
                    var movieVote = results[i]['vote_average'];

                    var movieHTML = compiled({
                        'title': movieTitle,
                        'titleOriginal' : movieOriginalTitle,
                        'lenguage' : movielenguage,
                        'vote': movieVote
                    });
                    
                    target.append(movieHTML);
                }
                
            },
            error: function (error) {
                console.log(error);
            }

        });
    });
}

$(document).ready(init);