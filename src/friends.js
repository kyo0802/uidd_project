$(document).ready(function() {
    $(document).click(function() {
        if($("input[id='btnradio2']:checked").val() == 'on') {
            $("label[for='btnradio1']").removeClass('btn1_checked')
            $("label[for='btnradio2']").addClass('btn2_checked')
            $("#friend_container").hide();
            $("#interest_container").show();
            $("#interest_container").css('visibility', 'visible');
        }
        else {
            $("label[for='btnradio1']").addClass('btn1_checked')
            $("label[for='btnradio2']").removeClass('btn2_checked')
            $("#interest_container").hide();
            $("#friend_container").show();
        }
        
    })    
})