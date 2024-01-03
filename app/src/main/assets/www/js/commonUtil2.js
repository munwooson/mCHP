	// $(document).ready(function() {
	// 	$("#agree").unbind('click').on('click', function() {
	// 		len = $(".check:checked").length ;
	// 		alert(len);
	// 	});
	// });
    

    $(function(){
        $('#cover').on('click', function(){
            close_menu();
        });
        $(".menu").unbind('click').bind('click', function(e) {
            e.preventDefault();
            open_menu();
        });
        $(".logo").unbind('click').bind('click', function(e) {
            e.preventDefault();
            gotoPage('home');
        });
        $(".page_logo").unbind('click').bind('click', function(e) {
            e.preventDefault();
            gotoPage('home');
        });



    });

function open_menu(){
    $('#cover').css({'z-index':'998'});
    $("#nav_menu").animate({
        right: '0'
    },100);
    
    $('#cover').animate({
        opacity:'0.7'
    },100);
    //windowByMask();
}
function close_menu(){
    $("#nav_menu").animate({
        right: '-80vw'
    },100);
    
    $('#cover').animate({
        opacity:'0'
    },100, function(){
        $( this ).after( 
            $('#cover').css({'z-index':'-999'})
        )
    });
}


function gotoPage(pageId){
    location.replace('../html/' + pageId + '.html');
}

function page01_memo_open(){
    $( "#page01_memo_popup" ).css({'display':'block'});
    $('#cover').css({'z-index':'99', 'opacity':'0.7'});
}

function page01_memo_close(){
    $( "#page01_memo_popup" ).css({'display':'none'});
    $('#cover').css({'z-index':'-999', 'opacity':'0'});

}


// function windowByMask(){
//     var maskHeight = $(document).height();
//     var maskWidth = $(window).width();
//     $('#mask').css({'width':maskWidth,'height':maskHeight});
//     //애니메이션 효과
//     $('#mask').fadeTo("fast",0.7);
// }

// function panelClose(){
//     $('#mask').fadeTo('fast', 0.0, function() {
//         $(this).hide();
//     });
// }
