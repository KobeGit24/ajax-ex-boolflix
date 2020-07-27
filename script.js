function init() {
    var input = $('.container #search');
    var btn = $('.container #btn');
    // btn.click(function () {
    //     var inputVal = input.val(); 
    //     console.log(inputVal);
    // });
    btn.click(searchApi);
}

function searchApi() {
    var input = $('.container>#search');
    var inputVal = input.val();
   $.ajax({
    url : 'api.themoviedb.org/3/search/movie?',
    method : 'GET',
    data : {
        'api_key': 'aebf9ba0680152a5c118e16606ba7947',
        'query': 'ritorno al futuro'
    },
    success: function (data) {

        var response = data.response;
        var success = data.success;

        console.log(data);
        console.log(response);
        console.log(success);
        
    },
    error: function (error) {
        console.log(error);
    }

   });
}

$(document).ready(init);