function init() {
    searchApi();
}

function searchApi() {
    var btn = $('.container #btn');
    btn.click(callApi);
    $('.container #search').keyup(pressApi);
}

function pressApi(event) {   
    if (event.which==13) {
        callApi(); 
    }
}


function callApi() {
    var input = $('.container #search');
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
            var template = $('#movie-template').html();
            var compiled = Handlebars.compile(template);
            
            for (var i = 0; i < results.length; i++) {

                var vote = results[i]['vote_average'];
                var vote = starVote(vote);
                var vote = vote.html();
                console.log(vote);
                var movieHTML = compiled(results[i]);
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
            var starOne = $('#template>#one').clone();
            var starTwo = $('#template>#two').clone();
            var starThree = $('#template>#three').clone();
            var starFour = $('#template>#four').clone();
            var starFive = $('#template>#five').clone();
            
            for (var i = 0; i < results.length; i++) {

                var vote = results[i]['vote_average'];
                var vote = starVote(vote);
                var vote = vote.html();
                console.log(vote);
                var seriesHTML = compiled(results[i]);
                target.append(seriesHTML);
            }
            
        },
        error: function (error) {
            console.log(error);
        }
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