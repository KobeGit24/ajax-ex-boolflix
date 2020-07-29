function init() {
    getWallFilm();
    getSearch();
    searchApi();
    infoOnHover();
}

function getWallFilm () {
    $.ajax({
        url : `https://api.themoviedb.org/3/trending/all/day?api_key=aebf9ba0680152a5c118e16606ba7947&media_type=all&time_window=day`,
        method : 'GET',
        data : {
            'api_key': 'aebf9ba0680152a5c118e16606ba7947',
            'media_type': 'all',
            'time_window': 'day'
        },
        success: function (data) {

            var results = data.results;
            var targetWall = $('#wall');
            var template = $('#movie-template').html();
            var compiled = Handlebars.compile(template);
            var flags =['de','en','es','fr','it','us','ja','hi','zh'];
            
            for (var i = 0; i < results.length; i++) {

                var result = results[i];
                var vote = result.vote_average;
                var language = result.original_language;

                result.stars = starsVote(vote);

                if (flags.includes(language)) {
                    result.flag = language;
                }

                var cardHTML = compiled(result);
                targetWall.append(cardHTML);
            }
        },
        error: function (error) {
            console.log(error);
        }

    }); 
}

function getSearch() {
    var search = $('.container #search-bar>i');
    search.click(function () {
        $('.container #search-bar #btn').fadeIn(1000);
        $('.container #search-bar #search').fadeIn(1000);
    });       
}

function searchApi() {
    var btn = $('.container #search-bar #btn');
    btn.click(callApi);
    $('.container #search-bar #search').keyup(pressApi);
}

function pressApi(event) {   
    if (event.which==13 || event.keyCode==13) {
        callApi(); 
    }
}

function callApi() {
    var input = $('.container #search-bar #search');
    var inputVal = input.val(); 
    var targetMovie = $('#movie-list');
    var targetSeries = $('#series-list');
    var targetWall = $('#wall');
    $('.movie-wall h1').hide();
    targetWall.html('');
    targetMovie.html('');
    targetSeries.html('');
    if (inputVal != '') {
        apiOrganize('movie', inputVal);
        apiOrganize('tv', inputVal);     
    } else {
        input.addClass('border');
    }
}

function apiOrganize(type,inputVal) {

    $.ajax({
        url : `https://api.themoviedb.org/3/search/${type}`,
        method : 'GET',
        data : {
            'api_key': 'aebf9ba0680152a5c118e16606ba7947',
            'query': inputVal
        },
        success: function (data) {

            var results = data.results;
            var targetMovie = $('#movie-list');
            var targetSeries = $('#series-list');
            var template = $('#movie-template').html();
            var compiled = Handlebars.compile(template);
            var flags =['de','en','es','fr','it','us','ja','hi','zh'];
            
            for (var i = 0; i < results.length; i++) {

                var result = results[i];
                var vote = result.vote_average;
                var language = result.original_language;

                result.stars = starsVote(vote);

                if (type == 'movie') {
                    result.type = 'Movie';  
                } else if (type == 'tv') {
                    result.type = 'Serie';
                }

                if (flags.includes(language)) {
                    result.flag = language;
                }

                var cardHTML = compiled(result);

                if (type == 'movie') {
                    targetMovie.append(cardHTML);
                } else if (type == 'tv') {
                    targetSeries.append(cardHTML);
                }
            }
        },
        error: function (error) {
            console.log(error);
        }

    });
}

function starsVote (vote) {

    var x = Math.ceil(vote / 2);
    var stars = '';
    for (var i = 0; i < 5; i++) {
        if (i< x) {
            stars+='<i class="fas fa-star"></i>';   
        } else {
            stars+='<i class="far fa-star"></i>';
        }
        
    }
    return stars;
}

function infoOnHover() {

    $(document).on('mouseenter mouseleave', '.single-movie', function (event) {
        $(this).children('#info').slideToggle('slow');
        $(this).children('#img').slideToggle('slow');
    });
    
}

$(document).ready(init);