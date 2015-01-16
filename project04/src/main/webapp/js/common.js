$(".ui-icon-nodisc").click(function(){
	/*$.mobile.lodPage("menu.html",options);*/
    $("#left-panel").load("menu02.html");
    $('#login').page('destroy').page();
  });

/* swiperight */
$(document).on("pageinit", "#login", function() {
	var $page = $(this);
	$page.on("swiperight", function(e) {
		if ($page.jqmData("panel") !== "open") {
			if (e.type === "swiperight") {
				$("#left-panel").load("menu02.html");
				$page.find("#left-panel").panel("open");
			}
		}
	});
});


/* touchSwipe.js 플러그인 */
/*$( document ).on( "pageinit", "#demo-page", function() {
    var $page = $(this);

     //Enable swiping...
     $("body").swipe( {
       //Generic swipe handler for all directions
       swipeRight:function(event, direction, distance, duration, fingerCount, fingerData) {
    
    	   $("#mypanel").load("menu.html"); 
     $page.find( "#mypanel" ).panel( "open" );
        },
       //Default is 75px, set to 0 for demo so any distance triggers swipe
        threshold:0
     });
   });*/