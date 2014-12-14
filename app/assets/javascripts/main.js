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
    $('.no-results').remove();
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
            $('.scrollingArea').append('<h5 class="no-results">No results for <span>"' + term + '"</span> ...could be a good band name.</h5>');
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
    $('.no-results').remove();
    $('.search-input').val('');
  });

  // Filters
  $('.custom-label-checkbox').on('click', function(){
    console.log($(this))
    //Hide everything, then show depending on checks
    if ($(this).siblings('.custom-checkbox').prop('checked') === false) {
      console.log('YES check');
      // Pass on a filter term and an index so the search function know where to look
      // Maybe add/remove terms to an array?
    } else {
      console.log('no check');

    }

  });

    //   $('#checkbox1').change(function() {
    //     if($(this).is(":checked")) {
    //         var returnVal = confirm("Are you sure?");
    //         $(this).attr("checked", returnVal);
    //     }
    //     $('#textbox1').val($(this).is(':checked'));
    // });

  // Style for main links...
  // $('h3').mouseover(function(){
  //   // var $text = $(this).text();
  //   $(this).hide();
  //   $('.crookedTitle').show();
  // }).mouseout(function(){
  //   $(this).show();
  //   $('.crookedTitle').hide();
  // });




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

/////////////////////////////////////////////////////////////////

// var a = [1, 1, 1, 2, 999, 999, 'a', 'a', 'test', 'test', 'test', 'Idaho', true, true, false, [1, 2], [1, 2], [1, 2], [1, 2, 3], {a: 'b', c: 'd'}, {a: 'b', c: 'd'}, {c: 'd', a: 'b'}, {e: 'f'}];
// console.log(a);


// var arrayHandler = function(a, arr, index) {
//   for (var i=0; i < arr.length; i++) {
//     if (arr[i] instanceof Array && a.length === arr[i].length && index !== i) {
//       for (var e = a.length; e--;) {
//         if (a[e] !== arr[i][e]) {
//           return
//         }
//       }
//       return 2;
//     }
//   }
// }


// var sortObject = function(obj) {
//   var keys = [];

//   for (var k in obj) {
//     if (obj.hasOwnProperty(k)) {
//       keys.push(k);
//     }
//   }

//   keys.sort();
//   var newObj = {};

//   for (var i = 0; i < keys.length; i++) {
//     newObj[keys[i]] = obj[keys[i]];
//   }
//   return newObj;
// }


// var objectHandler = function(a, arr, index) {
//   for (var i=0; i < arr.length; i++) {
//     if (arr[i] instanceof Object && Object.keys(a).length === Object.keys(arr[i]).length && index !== i) {
//       var obj1 = sortObject(a);
//       var obj2 = sortObject(arr[i]);
//       if (JSON.stringify(obj1) === JSON.stringify(obj2)) {
//         return 2;
//       }
//     }
//   }
// }


// var dedupe = function(arr){
//   var length;
//   for (var i=0; i < arr.length; i++) {
//     if (arr[i] instanceof Array) {
//       length = arrayHandler(arr[i], arr, i);
//     } else if (arr[i] instanceof Object) {
//       length = objectHandler(arr[i], arr, i);
//     } else {
//       length = arr.filter(function(value){
//         return value === arr[i];
//       }).length;
//     }

//     if (length > 1) {
//       console.log(a)
//       arr.splice(i, length - 1);
//       console.log(a)
//     }

//   }
//   console.log(a);
// }


// dedupe(a);

// Dog = new Object;










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