function init() {
    searchApi();
}

function searchApi() {
    var btn = $('.container #search-bar #btn');
    btn.click(callApi);
    $('.container #search-bar #search').keyup(pressApi);
}

function pressApi(event) {   
    if (event.which==13) {
        callApi(); 
    }
}


function callApi() {
    var input = $('.container #search-bar #search');
    var inputVal = input.val(); 
    var target = $('#movie-list');
    $('.movie-wall h1').hide();
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
            var flags =['de','en','es','fr','it','us','ja'];
            
            for (var i = 0; i < results.length; i++) {

                var result = results[i];
                var vote = result.vote_average;
                // console.log(vote);
                var lenguage = result.original_language;

                result['stars'] = starsVote(vote);

                if (flags.includes(lenguage)) {
                    result['flag'] = lenguage;
                }

                var movieHTML = compiled(result);
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
            var flags =['de','en','es','fr','it','us'];
            
            for (var i = 0; i < results.length; i++) {

                var result = results[i];
                var vote = result.vote_average;
                // console.log(vote);
                var lenguage = result.original_language;

                result['stars'] = starsVote(vote);
                
                if (flags.includes(lenguage)) {
                    result['flag'] = lenguage;
                }

                var seriesHTML = compiled(result);
                target.append(seriesHTML);
            }
            
        },
        error: function (error) {
            console.log(error);
        }
    });
    
}

function starsVote (vote) {

    var x = Math.ceil(vote / 2);
    var y = 5 - x;
  
    var stars = [];
  
    for (var i = 0; i < x; i++) {
      stars.push('fas');
    }
    for (var i = 0; i < y; i++) {
      stars.push('far');
    }
  
    return stars;
  }

// function star(vote){
//     var voteInt = Math.ceil(vote/2); 
//     var star = "";
//     for (var i=0;i<5;i++) {
//       if (i < voteInt) {
//         star += '<i class="fas fa-star"></i>';
//       } else {
//         star += '<i class="far fa-star"></i>';
//       }
//     }
//     return star;
//   }

$(document).ready(init);