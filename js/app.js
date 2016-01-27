// create an app used to search for an artist's most popular songs
$(document).ready( function() {
  // settings for carousel
  var $slider = $('.slider'); // class or id of carousel slider
  var $slide = 'li'; // could also use 'img' if you're not using a ul
  var $transition_time = 1000; // 1 second
  var $time_between_slides = 4000; // 4 seconds

  

  //user input handler
  $('#eventForm').submit(function(e){
    e.preventDefault();
    var location = $('.eventLocation').val();
    var keywords = $('.eventName').val();
    getEvent(location, keywords);

  });
  //get user location country code
  $.get("http://ipinfo.io", function (response) {
    $('.eventLocation').val(response.country);
  }, "jsonp"); 


  //call the API to output the available events
  var getEvent = function(location, keywords) {
      var request = { 
        location: location,
        keywords: keywords,
        app_key:"dnxNj23MHn3Mg8fH"
      };
      $.ajax({
        url: "http://api.eventful.com/json/events/search",
        data: request,
        dataType: "jsonp",//use jsonp to avoid cross origin issues
        type: "GET"
      })
      .done(function(result){ //this waits for the ajax to return with a succesful promise object
        // console.log(url);
        //console.log(result.events);
        displayEvents(result)
        
      });  
    
  }

  function displayEvents(result){
    var allEvents=result.events.event;
    var pageCount = result.page_items;
    var imageFix="img/bg.jpg";
    // console.log(image);
    $(".event_list").empty();
    $.each(allEvents, function(i, item) {
      //console.log(allEvents[i].title);
      //console.log(pageCount);
      var resultHtml = "";
      $(".results").show();

      if (result.events.event[i].image) {
        var imageResult = result.events.event[i].image.medium.url;

        resultHtml = "<div class='ev_img clearfix'><img src=" + imageResult +"><br/><h1><a href="+allEvents[i].url+">"+allEvents[i].title+"</a></h1><p class='description'>"+allEvents[i].description+"</p><p class='venueName'>"+allEvents[i].venue_name+"</p><p class='date'>"+allEvents[i].start_time+"</p>"
        
      }
      else {
        resultHtml = "<div class='ev_img clearfix'><img src=" + imageFix +"><h1><a href="+allEvents[i].url+">"+allEvents[i].title+"</a></h1><p class='description'>"+allEvents[i].description+"</p><p class='venueName'>"+allEvents[i].venue_name+"</p><p class='date'>"+allEvents[i].start_time+"</p>"
      }

      $(".event_list ").append( resultHtml );

    });
  
  }


/*code related to the gallery slide rotator*/
 

  function slides(){
    return $slider.find($slide);
  }

  slides().fadeOut();

  // set active classes
  slides().first().addClass('active');
  slides().first().fadeIn($transition_time);

  // auto scroll 
  $interval = setInterval(
    function(){
      var $i = $slider.find($slide + '.active').index();

      slides().eq($i).removeClass('active');
      slides().eq($i).fadeOut($transition_time);

      if (slides().length == $i + 1) $i = -1; // loop to start

      slides().eq($i + 1).fadeIn($transition_time);
      slides().eq($i + 1).addClass('active');
    }
    , $transition_time +  $time_between_slides 
  );


  



 });