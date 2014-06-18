var snapper;
$(function() {
	snapper = new Snap({
		element: document.getElementById('content')
	});
});

$(function(){
//	  getUserInfo();
	  $('#menuIcon').on('click', function(){

          if( snapper.state().state=="left" ){
              snapper.close();
          } else {
              snapper.open('left');
          }  
      });

	  
    $( "#map2" ).click(function( event ) {
	    	$("#map2").css("background-color","white")
	    	$("#maps2").css("color","#358fbc");
	    	$("#chat2").css("background-color","#358fbc")
	      $("#chats2").css("color","white");
	      });
    $( "#chat2" ).click(function( event ) {
        $("#map2").css("background-color","#358fbc")
        $("#maps2").css("color","white");
        $("#chat2").css("background-color","white")
        $("#chats2").css("color","#358fbc");
        });

    $('#tagTap').on('click', function(){
    	  //      getCurrentLocation();
    	        $('.locationTag').fadeIn(400).delay(1500).fadeOut(400); 
    	    });
    
    
    $("#prChat").click(function(){
     	$('#prChat_content').css("display", "block");
     	$('#grChat_content').css("display", "none");
    		
    	
    });
    $("#grChat").click(function(){
	    	$('#grChat_content').css("display", "block");
	    	$('#prChat_content').css("display", "none");
    });
    
    
    
    
    
    
    
    
    
    
}); 
