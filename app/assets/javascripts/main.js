$(document).ready(function(){

  // Fix body tag due to poor HTML decisions a long time ago...
  if (window.location.pathname.length > 1) {
    $('body').css('overflow', 'hidden');
  } else {
    $('body').css('overflow', 'initial');
  }

  // Remove auto outlines
  $('.search, a').css('outline', 'none');

  // Handle header alignment and set size of scrollable area
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

  $(window).load(function() {
      var bodyheight = $(document).height() - $('.header').height() - 100;
      $(".scrollingArea").height(bodyheight);
  });

  $(window).resize(function(){
    var bodyheight = $(document).height() - $('.header').height() - 100;
    $(".scrollingArea").height(bodyheight);
    headerSize();
  });

  // Handle big background images
  $(function(){
      var bgimage = new Image();
      var bgimage2 = new Image();
      bgimage.src="/mosh.png";
      bgimage2.src="/background.png";

      $(bgimage).load(function(){
          $(".homebody").css("background-image","url("+$(this).attr("src")+")");
      });

      $(bgimage2).load(function(){
          $("#topbar").css("background-image","url("+$(this).attr("src")+")");
      });

  });

  // Sorting
  var aAsc = [];
  showSort = function(nr) {
    console.log('show-sort');
    aAsc[nr] = aAsc[nr]=='asc'?'desc':'asc';
    $('.shows>tbody>tr').tsort('td:eq('+nr+')',{order:aAsc[nr], data:'attr'});
  };

  // Search
  var $searchClear = $('.search-clear');

  var searchShows = function(term){
    $('.showtr').each(function(i){
      var contents = $(this).children('td').text().trim();

      // if (term.some(function(v) { return contents.indexOf(v) >= 0; })) {
      //     $(this).show();
      // }


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

  var searchHandler = function(term){
    $('.no-results').remove();
    if (term === "") {
      $('.showtr').show();
      $searchClear.hide();
    } else {
      $searchClear.show();
      searchShows(term);
    }
  }

  $('.search-btn').on('click', function(){
    var e = $('.search-input').val().toLowerCase().trim();
    searchHandler(e);
  });

  $('.search-input').on('keyup', function(e){
    if (e.keyCode == 13) {
      var term = $(this).val().toLowerCase().trim();
      searchHandler(term);
    }
  });

  $searchClear.on('click', function(){
    term = '';
    searchHandler(term);
    $('.no-results').remove();
    $('.search-input').val('');
  });

  // Filters - work in progress
  var filters = ['a/a', '21+', 'Pit warning!', '****', '$10 or less', '$20 or less', 'cancelled'];
  var selected = [];
  $('.custom-label-checkbox').on('click', function(){
    setTimeout(function(){
      $('.custom-checkbox').each(function(i){
        if ($(this).prop('checked') === true) {
          if (selected.indexOf(filters[i]) < 0) {
            selected.push(filters[i])
          }
        } else {
          var index = selected.indexOf(filters[i])
          if (index > -1) {
              selected.splice(index, 1);
          }
        }
      });

      searchHandler(selected);
      console.log(selected);

    }, 500);
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

});