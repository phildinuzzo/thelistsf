$(document).ready(function(){

  var bodyheight = $(document).height() - $('.header').height() - 100;
  $(".scrollingArea").height(bodyheight);

  $(window).load(function() {
      var bodyheight = $(document).height() - $('.header').height() - 100;
      $(".scrollingArea").height(bodyheight);
  });

  $(window).resize(function() {
      var bodyheight = $(document).height() - $('.header').height() - 100;
      $(".scrollingArea").height(bodyheight);
  });


  $('.dateheader').css('max-width', $('.date').first().width());
  $(window).resize(function(){
    $('.dateheader').css('max-width', $('.date').first().width());
  });
  // console.log(bodyheight);

  // Background images
  $(function(){
      var bgimage = new Image();
      bgimage.src="/mosh.png";

      $(bgimage).load(function(){
          $("#bgimage2").css("background-image","url("+$(this).attr("src")+")").fadeIn();
      });
  });

  $(function(){
      var bgimage = new Image();
      bgimage.src="/background.png";

      $(bgimage).load(function(){
          $("#topbar").css("background-image","url("+$(this).attr("src")+")");
      });
  });


  console.log(gon.shows[0].sortdate);

  allShows = gon.shows;

  function sortByKey(array, key) {
      return array.sort(function(a, b) {
          var x = a[key]; var y = b[key];
          return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      });
  }

  sortedShows = sortByKey(allShows, 'sortdate');


  console.log(sortedShows);

  // $('#search').on('click', 'li', searchAll);

  //   function searchAll(){
  //   // var imdb = $(this).attr('data-id');
  //   $.ajax({
  //     url: "/search",
  //     method: 'get',
  //     dataType: 'jsonp',
  //     success: function(results){
  //         $('#mainlist').html('');
  //         var date = results['date'];
  //         var bands = results['bands'];
  //         var venue = results['venue'];
  //         var time = results['time'];
  //         var ages = results['ages'];
  //         var price = results['price'];
  //         var pit = results['pit'];
  //         var inout = results['inout'];
  //         var sellout = results['sellout'];
  //         var soldout = results['soldout'];
  //         var notes = results['notes'];
  //         var rec = results['rec'];

  //         $('#mainlist').append('<tr>');
  //         $('#image').append('<img src="' + poster + '">');
  //         $('#detail').append('<li>' + plot + '</li>');
  //         $('#detail').append('<li>' + year + '</li>');
  //         $('#detail').append('<li>' + genre + '</li>');
  //         $('#detail').append('<li>' + actors + '</li>');
  //         $('#detail').append('<li>' + directors + '</li>');
  //         $('#detail').append('<li>' + rated + '</li>');

  //         } // End success
  //       }); // End Ajax
  //     } // End anon function

    // $('form').bind('keyup submit', function(event){
    //   event.preventDefault();
    //   var input = $('input').val();
    //   $.ajax({
    //     url: "http://www.omdbapi.com/?s=" + input,  // API URL
    //     method: 'get',
    //     dataType: 'jsonp',
    //     success: function(results){
    //       $('h3').removeClass('hidden');
    //       $('#listings').html('');
    //       // $('#detail').html('');
    //       var r = results.Search;
    //       for(var i = 0; i < r.length; i += 1) {
    //         var movie = r[i];
    //         var imdb = r[i]["imdbID"];
    //         var title = r[i]["Title"];
    //         var li = $('<li data-id="' + imdb + '">' + movie['Title'] + ' (' + movie['Year'] + ')</li>').appendTo('#listings');
    //         }

    //     } // End success
    //   }); // End Ajax
    // }); // End anon function
});