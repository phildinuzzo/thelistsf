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

  // Fix body tag due to poor HTML decisions a long time ago...
  if (window.location.pathname.length > 1) {
    $('body').css('overflow', 'hidden');
  } else {
    $('body').css('overflow', 'initial');
  }

  // Remove auto outlines
  $('.search').css('outline', 'none');

  // Handle header alignment...
  function headerSize(){
    $('.showheader').each(function(i){
      var $tr = $(".showtd[data-index=" + i + "]:visible");
      $(this).css('width', $tr.width() + 'px');
      if (i === 8) {
        $('.showheaderdiv').show()
      }
    });
  };

  setInterval(function(){
    $('.showheaderdiv').show();
  }, 200);

  $('.shows').show();
  headerSize();

  $(window).resize(function(){
    headerSize();
  });

  // Background images
  $(function(){
      var bgimage = new Image();
      bgimage.src="/mosh.png";

      $(bgimage).load(function(){
          $(".homebody").css("background-image","url("+$(this).attr("src")+")").fadeIn();
      });
  });

  $(function(){
      var bgimage = new Image();
      bgimage.src="/background.png";

      $(bgimage).load(function(){
          $("#topbar").css("background-image","url("+$(this).attr("src")+")");
      });
  });

  // Filters


  // Sorting
  var aAsc = [];
  showSort = function(nr) {
    console.log('show-sort');
    aAsc[nr] = aAsc[nr]=='asc'?'desc':'asc';
    $('.shows>tbody>tr').tsort('td:eq('+nr+')',{order:aAsc[nr], data:'attr'});
  };


  // Search
  var $searchClear = $('.search-clear');

  function showSearch(term){
    if (term === "") {
      $('.showtr').show();
      $searchClear.hide();
    } else {
      $searchClear.show();
      $('.showtr').each(function(i){
        var contents = $(this).children('td').text().trim();
        if (contents.toLowerCase().indexOf(term) > 0) {
          $(this).show();
        } else {
          $(this).hide();
          if ($('.showtr').length === i + 1 && $('.showtr:visible').length === 0) {
            // Stuff to do when No Results
          }
        }
        if ($('.showtr').length === i + 1) {
          // Stuff to do when Done
        }
      });
    }
  }

  $('.search-btn').on('click', function(e){
    var e = $('.search-input').val().toLowerCase().trim();
    showSearch(e);
  });

  $('.search-input').on('keyup', function(e){
    if (e.keyCode == 13) {
      var term = $(this).val().toLowerCase().trim();
      showSearch(term);
    }
  });

  $searchClear.on('click', function(){
    term = '';
    showSearch(term);
    $('.search-input').val('');
  });

// Gon gem had problems being imported in application.html
// This IF statement prevents errors...
if (gon.attr) {
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

}






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