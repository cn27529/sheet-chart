$(document).ready(function (){

    function hide_menu(){
        //收起目錄
        //collapse navbar-collapse
        //$('#bs-example-navbar-collapse-1').hide()
        $('#bs-example-navbar-collapse-1').on('hidden.bs.collapse', function (e) {
            alert('Event fired on #' + e.currentTarget.id);
        })
    }

    /* 平順捲動的動作 */
    //$('a[href*=#]:not([href=#])').click(function() {
    $("a[href^='#']").click(function() {
    
        //alert('平順捲動的動作');
        
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html,body').animate({
                 //scrollTop: target.offset().top - 50
                 scrollTop: target.offset().top - 0
                }, 1000);
                return false;
            }
        }


    });

});
