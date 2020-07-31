function init() {
    getWallFilm();
    getSearch();
    searchApi();
    infoOnHover();
}

function getWallFilm () {

    $('#movie-wall>h4').hide();
    $.ajax({
        url : `https://api.themoviedb.org/3/trending/all/week?api_key=aebf9ba0680152a5c118e16606ba7947&media_type=all&time_window=day`,
        method : 'GET',
        data : {
            'api_key': 'aebf9ba0680152a5c118e16606ba7947',
            'media_type': 'all',
            'time_window': 'week'
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

                result.stars = starsVote(vote);;

                if (flags.includes(language)) {
                    result.flag = language;
                }

                if(result.overview.length > 150) {
                    result.overview = result.overview.substring(0, 150) + '...';
                }

                var cardHTML = compiled(result);
                targetWall.append(cardHTML);

                printCast(result.media_type,result.id);
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
    targetWall.html('');
    targetMovie.html('');
    targetSeries.html('');
    if (inputVal != '') {
        input.removeClass('border');
        $('.movie-wall h2').hide();
        $('#movie-wall>h5').show();
        apiOrganize('movie', inputVal);
        apiOrganize('tv', inputVal); 
    } else {
        input.addClass('border');
        getWallFilm();
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

                if(result.overview.length > 150) {
                    result.overview = result.overview.substring(0, 150) + '...';
                }

                var cardHTML = compiled(result);

                if (type == 'movie') {
                    targetMovie.append(cardHTML);
                } else if (type == 'tv') {
                    targetSeries.append(cardHTML);
                }

                printCast(type,result.id);
            }
        },
        error: function (error) {
            console.log(error);
        }

    });
}

function printCast(type,id) {
    
    $.ajax ({

        url: `https://api.themoviedb.org/3/${type}/${id}/credits`,
        method: 'GET',
        data: {
            'api_key': 'aebf9ba0680152a5c118e16606ba7947'
        },
        success: function (data) {
            
            var cast = data.cast;
            var casts = '';

            for(var i=0; i<cast.length && i<4; i++) {
                var actor = cast[i];
                casts += ` <li>${actor.name}</li> `;
            }

            var castHtml = $(`[data-db="${id}"]`);
            castHtml.find('#cast').append(casts);

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

    $(document).on('mouseenter', '.single-movie', function (event) {
        $(this).children('#img').hide();
        $(this).children('#info').fadeIn(1000);
    });

    $(document).on('mouseleave', '.single-movie', function (event) {
        $(this).children('#info').hide();
        $(this).children('#img').show();
    });
    
}

$(document).ready(init);
