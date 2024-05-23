
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
                showStep('1');
                userRole = 'none';  
            }
            break;
        case '1.5':
            showStep('1');
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
// login session end

// city json begin
const jsonUrl = './CityCountyData.json';
fetch(jsonUrl)
    .then(response => response.json())
    .then(data => {
        // 全域變數儲存 JSON 資料
        window.areaData = data;
        populateCities();
    })
    .catch(error => {
        console.error('Error fetching JSON:', error);
    });

const citySelect = document.getElementById('region');
const areaSelect = document.getElementById('district');

function populateCities() {
    const data = window.areaData;
    data.forEach(city => {
        let option = document.createElement('option');
        option.value = city.CityName;
        option.textContent = city.CityName;
        citySelect.appendChild(option);
    });
}

function populateAreas() {
    areaSelect.innerHTML = '<option value="">請選擇區域</option>';
    let selectedCity = citySelect.value;
    if (selectedCity) {
        let city = window.areaData.find(c => c.CityName === selectedCity);
        city.AreaList.forEach(area => {
            let option = document.createElement('option');
            option.value = area.ZipCode;
            option.textContent = area.AreaName;
            areaSelect.appendChild(option);
        });
    }
}
// city json end

function initMap() {
    var mapOptions = {
        center: { lat: 22.99776836378852, lng: 120.21686402050172 }, 
        zoom: 15 // 縮放級別
    };

    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
}

function showConfirm() {
    var place = document.getElementById('place').value;
    var time = document.getElementById('time').value;
    var stop = document.getElementById('stop').value;
    var specialRequest = '';
    var checkboxes = document.getElementsByName('specialRequest');
    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            specialRequest += checkbox.value + ', ';
        }
    });
    specialRequest = specialRequest.slice(0, -2); 

    document.getElementById('confirmPlace').textContent = place;
    document.getElementById('confirmTime').textContent = time + ' 分鐘';
    document.getElementById('confirmStop').textContent = stop + ' 個';
    document.getElementById('confirmSpecial').textContent = specialRequest;

    document.getElementById('mapreq').style.display = 'none';
    document.getElementById('confirm').style.display = 'block';
}

function showMap(){
    document.getElementById('map').style.display='block';
    document.getElementById('confirm').style.display='none';
}

$(document).ready(function() {
    $("#text_box").css("overflow", "auto")
    $('#msg_input').on('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // 防止默认的Enter键行为（如表单提交）

            let userInput = $(this).val();
            if (userInput.trim() !== '') {
                // 创建一个新的 message_box div
                var messageBox = document.createElement('div');
                messageBox.className = 'user_box';

                // 创建一个新的 message div，并设置其类和内容
                var newMessage = document.createElement('div');
                newMessage.className = 'message user_msg';
                newMessage.textContent = userInput;

                // 将新创建的 message div 添加到 message_box 中
                messageBox.appendChild(newMessage);

                // 将新创建的 message_box div 添加到 #text_box 中
                var textBox = document.getElementById('text_box');
                textBox.appendChild(messageBox);

                // 清空输入框
                msg_input.value = '';
            }
        }
    });
});