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
    if(who == "lover"){
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
    citySelect.value = '臺北市';
    populateAreas();
    areaSelect.value = '108';
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

// register form required
function validateForm(formId) {
    var form = document.getElementById(formId);
    var inputs = form.querySelectorAll('input[required], select[required]');
    var allValid = true;

    inputs.forEach(function(input) {
        if (!input.value.trim()) {
            allValid = false;
            input.classList.add('is-invalid'); // 添加 is-invalid 类
        } else {
            input.classList.remove('is-invalid'); // 移除 is-invalid 类
        }
    });

    return allValid;
}

$(".back_btn").click(function() {
    $("#continue1").removeAttr('data-bs-target');
    $("#continue1").removeAttr('data-bs-toggle');
})

document.getElementById('continue1').addEventListener('click', function(event) {
    var button = this;
    if (validateForm("basic")) {
        button.setAttribute('data-bs-target', '#exampleModal3');
        button.setAttribute('data-bs-toggle', 'modal');
        button.click();
        button.style.backgroundColor = '#003466';
    } 
    else {
        alert('請填寫所有必填項目');        
    }
});

document.getElementById('continue15').addEventListener('click', function(event) {
    if (validateForm("step1.5")) {
        var button = this;
        showStep('2')
        setstep('2')
    } 
    else {  
        alert('請填寫所有必填項目'); 
    }
});

// card
document.addEventListener('DOMContentLoaded', function() {
    var user = localStorage.getItem("account");

    if (user != null) {
        $(".mainpage").css("display", "flex");
        $("#no_login").css("display", "none");

        var prevButton = document.querySelector('.prev_button');
        var nextButton = document.querySelector('.next_button');
        var cardContainers = document.querySelectorAll('[class^="card_container_"]');
        var allCardContents = [];
        var shuffledCardContents = [];
        var currentCardIndex = 0;

        function fetchCards() {
            return fetch('/api/cards')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .catch(error => {
                    console.error('Failed to fetch cards', error);
                    return [];
                });
        }
        
        function getRandomImage() {
            return Math.random() < 0.5 ? "yes.png" : "mark.png";
        }

        function createCardHtmlAndSetBackground(cardData, index) {
            const image = cardData.image;
            const email = cardData.email;
            const html = `
                <div class="card_bg" data-email="${email}">
                    <div class="card_dog" data-image="${image}">
                    </div>
                    <div class="dynamicText">${cardData.pet}</div>
                    <div class="card_data">
                        <img src="../images/card/mt/circle.png" style="width: 4px; height: 4px;">
                        體型
                        <img src="../images/card/mt/${getRandomImage()}" style="width: 10px; height: 10px;">
                        <img src="../images/card/mt/circle.png" style="width: 4px; height: 4px;">
                        年齡
                        <img src="../images/card/mt/${getRandomImage()}" style="width: 10px; height: 10px;">
                        <img src="../images/card/mt/circle.png" style="width: 4px; height: 4px;">
                        性別
                        <img src="../images/card/mt/${getRandomImage()}" style="width: 10px; height: 10px;">
                    </div>
                    <div class="card_dis">現在在您附近</div>
                    <div class="card_button">
                        <img src="../images/card/mt/x.png" class="button_card" alt="Button 1" style="width: 60px; height: 60px;">
                        <a href="./message.html"><img src="../images/card/mt/match.png" class="button_card" alt="Button 2" onclick="createMatch()" style="width: 80px; height: auto;"></a>
                        <img src="../images/card/mt/like.png" class="button_card" alt="Button 3" style="width: 60px; height: 60px;">
                    </div>
                </div>
            `;
            return { html, image, email };
        }


        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        function initializeCards() {
            fetchCards().then(data => {
                allCardContents = data
                    .map((cardData, index) => createCardHtmlAndSetBackground(cardData, index))
                    .filter(cardContent => cardContent.email !== user); // Filter out current user's cards
                shuffledCardContents = shuffleArray([...allCardContents]);
                updateCardContents(0);
            });
        }
        function updateCardContents(direction) {
            currentCardIndex = (currentCardIndex + direction + shuffledCardContents.length) % shuffledCardContents.length;
            for (var i = 0; i < cardContainers.length; i++) {
                var index = (currentCardIndex + i) % shuffledCardContents.length;
                var cardContent = shuffledCardContents[index];
                cardContainers[i].innerHTML = cardContent.html;
                var cardDog = cardContainers[i].querySelector('.card_dog');
                if (cardDog) {
                    cardDog.style.backgroundImage = `url(${cardContent.image})`;
                    cardDog.style.backgroundSize = 'contain';
                    cardDog.style.backgroundPosition = 'center';
                    cardDog.style.backgroundRepeat = 'no-repeat';
                    cardDog.style.height = '40%';
                    cardDog.style.width = 'auto';
                    cardDog.style.marginTop = '10%';
                }
            }
            updateOverlayImages();
        }

        function updateOverlayImages() {
            for (var i = 0; i < cardContainers.length; i++) {
                var className = "card_container_" + i;
                var cardContainer = document.querySelector("." + className);
                var overlayImage = cardContainer.querySelector('.overlay_image');
                if (className === "card_container_1") {
                    if (overlayImage) overlayImage.remove();
                } else if (!overlayImage && (className === "card_container_0" || className === "card_container_2")) {
                    var img = document.createElement('img');
                    img.src = "../images/index/bg.png";
                    img.className = "overlay_image";
                    cardContainer.appendChild(img);
                }
            }
        }

        prevButton.addEventListener('click', function() {
            updateCardContents(-1);
        });

        nextButton.addEventListener('click', function() {
            updateCardContents(1);
        });

        initializeCards();
    } else {
        document.querySelector(".mainpage").style.display = "none";
        document.getElementById("no_login").style.display = "block";
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
        showStep('3');
        setstep('3');
      }).fail((error) => {
        alert('Registration failed: ' + error.responseText);
      });
    });
  });

document.getElementById('petForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const categories = ['size', 'age', 'activity', 'duration', 'distance'];
    let isValid = true;
    var text = "";
    const formData = {
        petName: $('#petName').val(),
        size: [],
        age: [],
        activity: [],
        duration: [],
        distance: []
    };

    categories.forEach(category => {
        const checkboxes = document.querySelectorAll(`input[name="${category}"]:checked`);
        if (checkboxes.length === 0) {
            isValid = false;
            text = text + "'" + document.querySelector(`input[name="${category}"]`).parentElement.parentElement.querySelector('.sub_title').textContent + "' ";
        }
        else {
            formData[category] = Array.from(checkboxes).map(cb => cb.value);
        }
    });
    
    if (!isValid) {
        alert("請至少選一個 "+text);
    }
    else {
        $.post('/favor', formData, function(data) {
            alert('提交成功');
            redirectToHomepage(); // 假設這個函數存在並且處理頁面重定向
        }).fail(function(error) {
            alert('提交失敗: ' + error.responseText);
        });
    }
});

  function createMatch() {
    var user1 = localStorage.getItem("account");

    // Get the card_container_1 .card_bg element and extract the data-email attribute
    var cardContainer = document.querySelector('.card_container_1 .card_bg');
    if (cardContainer) {
        var user2 = cardContainer.getAttribute('data-email');
        console.log('User2:', user2); // Debugging line to check if user2 is correctly fetched

        if (!user2) {
            alert('配對失敗: 缺少必要的參數');
            return;
        }

        var data = {
            user1_email: user1,
            user2_email: user2
        };

        $.post('/create_match', data, function(response) {
            localStorage.setItem("match_id", response.match_id);
            alert('配對成功，match_id: ' + response.match_id);
        }).fail(function(error) {
            console.error('配對失敗:', error.responseText);
            alert('配對失敗: ' + error.responseText);
        });
    } else {
        alert('配對失敗: 缺少必要的參數');
    }
}