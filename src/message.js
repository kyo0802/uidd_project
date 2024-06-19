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
        $(".modal-lg").css("width", "500px");
    }
    else if(stepNumber == 3) {
        $(".modal-lg").css("width", "700px");
    }
    else {
        $("button[class='signback']").removeAttr("data-bs-target", "#exampleModal3");
        $("button[class='signback']").removeAttr("data-bs-toggle", "modal");
        $(".modal-lg").css("width", "500px");
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
$(document).ready(function() {
            let user = localStorage.getItem("account");

            if (user === null) {
                $("#profile_box").css("display", "none");
                $("#profile").css("display", "block");

                $('#login_btn').click(function(event) {
                    event.preventDefault();

                    const account = $('#email').val();
                    const password = $('#password').val();

                    const input_data = {
                        account: account,
                        password: password,
                    };

                    $.post('./login', input_data, function(data) {
                        localStorage.setItem("account", account);
                        $("#login_btn").css("background-color", "#FFC533");
                        $("#login_btn").css("color", "white");
                        alert('Login successful');
                        location.reload();
                    }).fail(function(error) {
                        $("#wrong_account").html("帳號不存在或密碼錯誤");
                        $("#email").css("border-color", "red");
                        $("#password").css("border-color", "red");
                        alert('Login failed: ' + error.responseText);
                    });
                });
            } else {
                $("#profile").css("display", "none");
                $("#profile_box").css("display", "inline");

                $("#logout").click(function() {
                    localStorage.clear();
                    location.reload();
                });
            }
        });
$(document).ready(() => {
    $('#submit-button').click((event) => {
      event.preventDefault(); 
  
      const account = $('#account').val();
      const password = $('#register-pw').val();
      const f_name = $('#f_name').val();
      const l_name = $('#l_name').val();
      const identity = $('input[name="who"]:checked').val();
      const petname = $('#petName').val();
      const petgender = $('#petGender').val();
      const petsize = $('#petSize').val();
      const petage = $('#petAge').val();
      const region = $('#region').val();
      const district = $('#district').val();
      const gps = $('input[name="locationService"]:checked').val();
  
      const input_data = {
        account: account,
        password: password,
        f_name: f_name,
        l_name: l_name,
        identity: identity,
        petname: petname,
        petgender: petgender,
        petsize: petsize,
        petage: petage,
        region: region,
        district: district,
        gps: gps
      };
  
      $.post('./register', input_data, (data) => {
        alert('Registration successful');
      }).fail((error) => {
        alert('Registration failed: ' + error.responseText);
      });
    });
});

// city json begin
const cityjson = './CityCountyData.json';
fetch(cityjson)
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

// hide content
$(document).ready(function() {
    if(user != null) {
        $(".mainpage").css("display", "grid");
        $("#no_login").css("display", "none");
    }
    else {
        $(".mainpage").css("display", "none");
        $("#no_login").css("display", "block");
    }
})
