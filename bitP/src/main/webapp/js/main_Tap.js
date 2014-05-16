var snapper;
window.onload = mainTap;
    $(function() {
      snapper = new Snap({
        element: document.getElementById('content')
        });
      });
function mainTap() {
    
    $('#menuIcon').on('click', function(){

          if( snapper.state().state=="left" ){
              snapper.close();
          } else {
              snapper.open('left');
          }
      });

    
    $( "#map" ).click(function( event ) {
    	$("#map").css("background-color","white")
    	$("#maps").css("color","#4682B4");
    	$("#chat").css("background-color","#4682B4")
      $("#chats").css("color","white");
      });
    $( "#chat" ).click(function( event ) {
        $("#map").css("background-color","#4682B4")
        $("#maps").css("color","white");
        $("#chat").css("background-color","white")
        $("#chats").css("color","#4682B4");
        });
    
    
    $('#tagTap').on('click', function(){
        $('.locationTag').fadeIn(400).delay(1500).fadeOut(400); 
    });
    
	$("#selectBtn").on('click', function(){
		$("#selectBtn").css("display","none");
		$("#f_Btn").css("display","none");
	 });
	
	$("#hh").on('click', function(){
		alert("aaa");
	 });
	
	
}

