	// $(document).ready(function() {
	// 	$("#agree").unbind('click').on('click', function() {
	// 		len = $(".check:checked").length ;
	// 		alert(len);
	// 	});
	// });
var APPLICATION_NAME = 'mCHP';
    document.addEventListener("backbutton", onBackKeyDown, false);

    function onBackKeyDown() {
        // Handle the back button
            navigator.notification.confirm(
                "앱을 종료하시겠습니까?",
                confirmExit,
                APPLICATION_NAME,
                ["YES", "NO"]
            );

    }
     function confirmExit(buttonIndex){
                        if(buttonIndex == 1){
                            exit();
                        }else{}
                    }

     function exit(){
        cordova.plugins.exit();
     }



    $(function(){
        $('#cover').on('click', function(){
           // close_menu();
        });
        $(".menu").unbind('click').bind('click', function(e) {
            e.preventDefault();
           // open_menu();
        });
        $(".logo").unbind('click').bind('click', function(e) {
            e.preventDefault();
            gotoPage('home');
        });
        $(".page_logo").unbind('click').bind('click', function(e) {
            e.preventDefault();
            gotoPage('home');
        });

        $('.list').css({'top':$('.list_container'). offset().top});

        $('.page_tab').unbind('click').bind('click', function(e) {
            e.preventDefault();
            $('.page_tab').css({'background-color':'', 'color':''});
            $(this).css({'background-color':'#0058c2', 'color':'#fff'});
            //background-color: #0058c2 ;color:#fff
            console.info($(this).index());
            $('.tabs').css({'display':'none'});
            $('#tab'+ $(this).index()).css({'display':''});
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
    console.info(pageId);
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

function dialog_open1(){
    $( "#dialog_content" ).css('backgound-color', '#00C853');
    $( "#dialog" ).dialog();
}
function dialog_open2(){
    $( "#dialog_content" ).css('backgound-color', '#00B0FF');
    $( "#dialog" ).dialog();
}

function page_popup(color){
    $(".dialog_content").css({'background-color':color});
    $("#page_popup").css({'display':'block'});
    $('#cover').css({'z-index':'99', 'opacity':'0.7'});

};

function page_close(){
    $("#page_popup").css({'display':'none'});
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

