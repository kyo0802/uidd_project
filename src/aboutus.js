var userRole = 'none';  
var activeStepId='1';

function selectRole(role) {
    userRole = role; 

    if (role === 'a') {
        activeStepId='1.5';
    } else {
        activeStepId='2';
    }
}
function setstep(idd){
activeStepId=idd;

}
function goBack() {
    
    switch (activeStepId) {
        case '3':
            showStep('2');  
            break;
        case '2':
            if (userRole === 'a') {
                showStep('1.5');
            } else {
                userRole = 'none';  
            }
            break;
        case '1.5':                  
            userRole = 'none'; 
            break;
        default:
            console.error('Unhandled case or unknown step');
            break;
    }
}
document.getElementById('loginModal').addEventListener('hidden.bs.modal', function () {

    showStep('1');
    resetIcons();  
    userRole = 'none';  
    activeStepId = '1';  
});
function updateIconsDisplay(stepNumber) {
    var icons = [
        document.getElementById('progressicon1'),
        document.getElementById('progressicon2'),
        document.getElementById('progressicon3'),
        document.getElementById('progressicon4'),
        document.getElementById('progressicon5'),
        document.getElementById('progressicon6'),
        document.getElementById('progressicon7'),
        document.getElementById('progressicon8'),
        document.getElementById('progressicon9'),
        document.getElementById('progressicon10')
    ];

    icons.forEach(icon => { if (icon) icon.style.display = 'none'; });


    let displayIcons = [];
    switch (stepNumber) {
        case '1':
            break;
        case '1.5':
            displayIcons = [1, 2, 0];
            break;
        case '2':
            if (userRole === 'a') {
                displayIcons = [3, 4, 2];
            } else {
                displayIcons = [7, 6];
            }
            break;
        case '3':
            if (userRole === 'a') {
                displayIcons = [1, 3, 5];
            } else {
                displayIcons = [9, 8];
            }
            break;
        default:
            console.error('Unexpected step: ' + stepNumber);
            return;
    }

    displayIcons.forEach(index => {
        if (icons[index]) {
            icons[index].style.display = 'block';
        }
    });
}

function showStep(stepNumber) {
    var steps = document.querySelectorAll('.active-step, .inactive-step');
    steps.forEach(function(step) {
        step.style.display = 'none';
        step.classList.remove('active-step');
        step.classList.add('inactive-step');
    });

    var currentStep = document.getElementById('step' + stepNumber);
    if (currentStep) {
        currentStep.style.display = 'block';
        currentStep.classList.add('active-step');
        currentStep.classList.remove('inactive-step');
        activeStepId = stepNumber;  
        updateIconsDisplay(stepNumber);  
    } else {
        console.error('Step not found: step' + stepNumber);
    }
    if(stepNumber == 1.5 || (stepNumber == 2 && userRole == 'b')) {
    $("button[class='signback']").attr("data-bs-target", "#exampleModal3");
    $("button[class='signback']").attr("data-bs-toggle", "modal");
    }
    else {
    $("button[class='signback']").removeAttr("data-bs-target", "#exampleModal3");
    $("button[class='signback']").removeAttr("data-bs-toggle", "modal");
    }
}
var submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener("click", redirectToHomepage);

function redirectToHomepage() {

    window.location.href = "./index.html";
}

window.onload = function() {
    var hash = window.location.hash;

    if (hash.includes("loginModal")) {
    var loginModal = document.getElementById("loginModal");
    var bsModal = new bootstrap.Modal(loginModal);
    bsModal.show();
    }
};

var who;
$("input[name=who]").click( function(){
    if($("input[name=who]:checked")) {
        $("input[name=who]:checked").each(function() {
        who = $(this).val();
        //var next = "#"+who;
        //$("button[name=who]").attr("data-bs-target", next);
        })
    }
})

$("button[name='who']").click(function() {
    if(who == "register_lover"){
        selectRole('b');showStep('2');setstep('2')
    }
    else{
        selectRole('a');showStep('1.5');setstep('1.5')
        
    }
})

// eye icon of password invisible or not
$(".eye_close").click(function() {
    $(".eye_close").css("display", "none");
    $(".eye_open").css("display", "inline");
    $("#password").attr("type", "text");
});

$(".eye_open").click(function() {
    $(".eye_close").css("display", "inline");
    $(".eye_open").css("display", "none");
    $("#password").attr("type", "password");
});


document.querySelector('.navbar-toggler').addEventListener('click', function() {
    var overlay = document.getElementById('overlay');
    if (overlay.style.display === 'none' || overlay.style.display === '') {
        overlay.style.display = 'block'; // 显示遮盖层
        document.body.style.overflow = 'hidden'; // 禁止背景滚动
    } else {
        overlay.style.display = 'none'; // 隐藏遮盖层
        document.body.style.overflow = ''; // 恢复背景滚动
    }
});
    
// save account in local storage in login session
var account = "", user = "";
user = localStorage.getItem("account")
$(document).ready(function() {
    if(user === null) {
        $("#profile_box").css("display", "none")
        $("#profile").css("display", "inline")
        $("#login_btn").click(function() {
            account = $("#email").val();
            localStorage.setItem("account", account);  
            $("#login_btn").css("background-color", "#FFC533")  
            $("#login_btn").css("color", "white")
            /*
            if(account == "database user data") {
                is_login = true;
                user = localStorage.getItem("account")
            }
            else {
                $("#wrong_account").html("帳號不存在或密碼錯誤")
                $("#email").css("border-color", "red")
                $("#password").css("border-color", "red")
            }
            */
            user = localStorage.getItem("account")
            location.reload()
        });
    }
    else {
        $("#profile").css("display", "none")
        $("#profile_box").css("display", "inline")
        $("#logout").click(function() {
            // logout and clear local storage
            localStorage.clear()
            location.reload()
            $("#profile_box").css("display", "none")
            $("#profile").css("display", "inline")
        })
    }
})
