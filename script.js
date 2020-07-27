function init() {
    searchApi();
}

function searchApi() {
    var input = $('.container #search');
    var btn = $('.container #btn');
    btn.click(function () {
        var inputVal = input.val(); 
        var target = $('#movie-list');
        target.html('');
    
        $.ajax({
            url : 'https://api.themoviedb.org/3/search/movie?',
            method : 'GET',
            data : {
                'api_key': 'aebf9ba0680152a5c118e16606ba7947',
                'query': inputVal
            },
            success: function (data) {

                var results = data.results;
                console.log('data',data);
                console.log('results',results);
                var template = $('#movie-template').html();
                var compiled = Handlebars.compile(template);
                
                for (var i = 0; i < results.length; i++) {
                    var movieTitle = results[i].title;
                    var movieOriginalTitle = results[i]['original_title'];
                    var movielenguage = results[i]['original_language'];
                    var movieVote = results[i]['vote_average'];
                    var star = starVote(movieVote);

                    var movieHTML = compiled({
                        'title': movieTitle,
                        'titleOriginal' : movieOriginalTitle,
                        'lenguage' : movielenguage,
                        'vote': star
                    });
                    
                    target.append(movieHTML);
                }
                
            },
            error: function (error) {
                console.log(error);
            }

        });

        $.ajax({
            url : 'https://api.themoviedb.org/3/search/tv?',
            method : 'GET',
            data : {
                'api_key': 'aebf9ba0680152a5c118e16606ba7947',
                'query': inputVal
            },
            success: function (data) {

                var results = data.results;
                var template = $('#movie-template').html();
                var compiled = Handlebars.compile(template);
                
                for (var i = 0; i < results.length; i++) {
                    var seriesTitle = results[i].name;
                    var seriesOriginalTitle = results[i]['original_name'];
                    var movielenguage = results[i]['original_language'];
                    var movieVote = results[i]['vote_average'];
                    var star = starVote(movieVote);

                    var seriesHTML = compiled({
                        'title': seriesTitle,
                        'titleOriginal' : seriesOriginalTitle,
                        'lenguage' : movielenguage,
                        'vote': star
                    });
                    
                    target.append(seriesHTML);
                }
                
            },
            error: function (error) {
                console.log(error);
            }
        });
        input.val("");
    });
}

function starVote(x) {
    var starOne = $('#template>#one').clone();
    var starTwo = $('#template>#two').clone();
    var starThree = $('#template>#three').clone();
    var starFour = $('#template>#four').clone();
    var starFive = $('#template>#five').clone();
    var x;
    var y = Math.round(x)
    if (y <= 1 || y == 2) {
        x = starOne;  
    } else if (y == 3 || y == 4) {
        x = starTwo;   
    } else if (y == 5 || y == 6) {
        x = starThree;    
    } else if (y == 7 || y == 8) {
        x = starFour;
    } else if (y == 9 || y == 10) {     
        x = starFive;
    }
    return x;
}

$(document).ready(init);