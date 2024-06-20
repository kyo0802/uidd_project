
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

document.addEventListener('DOMContentLoaded', function () {
    const selects = document.querySelectorAll('.form-control');
    selects.forEach(select => {
      styleSelectOption(select);
      select.addEventListener('change', function () {
        styleSelectOption(select);
      });
    });
  
    function styleSelectOption(select) {
      const selectedOption = select.options[select.selectedIndex];
      if (selectedOption.disabled) {
        select.style.color = '#ADADAD'; 
      } else {
        select.style.color = 'black'; 
      }
    }
  });

  document.addEventListener('DOMContentLoaded', function() {
    var myModal = new bootstrap.Modal(document.getElementById('uploadImageModal'), {});
    myModal.show();
  });

  let isAnimating = false;

  document.addEventListener('DOMContentLoaded', () => {
    let isAnimating = false;
  
    document.querySelectorAll('.tab-button').forEach(button => {
      button.addEventListener('click', () => {
        if (isAnimating) return;
  
        const target = button.getAttribute('data-target');
        const activeContent = document.querySelector('.tab-content.active');
  
        if (activeContent && activeContent.id === target) return;
  
        const contentBox = document.querySelector('.content-box');
        const backgroundLayer = document.querySelector('.background-layer');
  
        isAnimating = true;
        document.querySelectorAll('.tab-button').forEach(btn => {
          btn.disabled = true;
        });
  
        document.querySelectorAll('.tab-button').forEach(btn => {
          btn.classList.remove('active');
          btn.style.zIndex = '0';
        });
        button.classList.add('active');
        button.style.zIndex = '2';
  
        if (activeContent) {
          activeContent.classList.remove('active');
          activeContent.classList.add('slide-out');
          setTimeout(() => {
            activeContent.style.display = 'none';
            activeContent.classList.remove('slide-out');
          }, 150);
        }
  
        const newContent = document.getElementById(target);
        newContent.style.display = 'block';
        setTimeout(() => {
          newContent.classList.add('active');
        }, 10);
  
        contentBox.classList.add('slide-out');
        backgroundLayer.classList.add('bg-slide-out');
        setTimeout(() => {
          contentBox.classList.remove('slide-out');
          contentBox.classList.add('slide-in');
          backgroundLayer.classList.remove('bg-slide-out');
          backgroundLayer.classList.add('bg-slide-in');
          setTimeout(() => {
            contentBox.classList.remove('slide-in');
            backgroundLayer.classList.remove('bg-slide-in');
  
            isAnimating = false;
            document.querySelectorAll('.tab-button').forEach(btn => {
              btn.disabled = false;
            });
          }, 300);
        }, 150);
  
        if (target === 'tab2') {
          fetchWalkData();
        }
      });
    });
  
    function fetchWalkData() {
      const email = localStorage.getItem('account');
      console.log('Retrieved email from localStorage:', email);
  
      if (!email) {
        console.error('No account found in localStorage');
        return;
      }
  
      fetch('/api/petdata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      })
        .then(response => {
          console.log('Response status:', response.status);
          return response.json();
        })
        .then(data => {
          console.log('Received data:', data);
          const walkRecordsContainer = document.getElementById('walk-records');
          walkRecordsContainer.innerHTML = '';
  
          if (data.length === 0) {
            walkRecordsContainer.innerHTML = '<p>No walk records found.</p>';
            return;
          }
  
          data.forEach(walk => {
            const walkRecord = document.createElement('div');
            walkRecord.classList.add('walk-record');
            const date = new Date(walk.walk_date);
            const localDate = date.toLocaleDateString('en-US', { timeZone: 'Asia/Taipei' });
            walkRecord.innerHTML = `
              <button class="record-item" onclick="toggleDetails(this)">
                <div class="record-summary">
                  <div class="record-date">${localDate}</div>
                  <div class="record-time">${walk.walk_time}</div>
                  <div class="record-duration">${walk.duration} 小時</div>
                  <div class="record-distance">${walk.distance} 公里</div>
                  <div class="record-note"><img src="images/icon_y.png" alt="note icon"></div>
                </div>
                <div class="record-details" style="display: none;">
                  <div class="total">
                    <p>總體分數</p>
                    <div class="stars">
                      ${generateStars(walk.satisfaction)}
                    </div>
                  </div>
                  <div class="routebar"></div>
                  <div class="details">
                    <div class="detail-bar">
                      <span>距離</span>
                      <div class="bar-container">
                        <div class="bar" style="width: ${(walk.distance / 5) * 100}%;">${walk.distance}</div>
                      </div>
                      <span class="bar-label">${walk.distance} 公里</span>
                    </div>
                    <div class="detail-bar">
                      <span>喝水量</span>
                      <div class="bar-container">
                        <div class="bar" style="width: ${walk.water}%;"></div>
                      </div>
                      <span class="bar-label">${walk.water} cc</span>
                    </div>
                    <div class="detail-ratings">
                      <div class="detail-rating">
                        <span>路線規劃</span>
                        <div class="stars">
                          ${generateStars(walk.route)}
                        </div>
                      </div>
                      <div class="detail-rating">
                        <span>停靠點 A</span>
                        <div class="stars">
                          ${generateStars(walk.A)}
                        </div>
                      </div>
                      <div class="detail-rating">
                        <span>停靠點 B</span>
                        <div class="stars">
                          ${generateStars(walk.B)}
                        </div>
                      </div>
                    </div>
                    <p class="note-title">備註:</p>
                    <p class="note-content">${walk.note}</p>
                  </div>
                </div>
              </button>
            `;
  
            walkRecordsContainer.appendChild(walkRecord);
          });
        })
        .catch(error => console.error('Error fetching walk data:', error));
    }
  });
  function editDogInfo() {
    var nameText = document.getElementById('dog-name-text');
    var genderText = document.getElementById('dog-gender-text');
    var birthdayText = document.getElementById('dog-birthday-text');
    var ageText = document.getElementById('dog-age-text');
    var weightText = document.getElementById('dog-weight-text');
    var sizeText = document.getElementById('dog-size-text');

    if (nameText.contentEditable === 'true') {
        // Save edited text
        nameText.contentEditable = 'false';
        genderText.contentEditable = 'false';
        birthdayText.contentEditable = 'false';
        ageText.contentEditable = 'false';
        weightText.contentEditable = 'false';
        sizeText.contentEditable = 'false';

        // Change button icon to edit
        document.querySelector('.edit-button img').src = '../images/編輯.png';
    } else {
        // Enable editing
        nameText.contentEditable = 'true';
        genderText.contentEditable = 'true';
        birthdayText.contentEditable = 'true';
        ageText.contentEditable = 'true';
        weightText.contentEditable = 'true';
        sizeText.contentEditable = 'true';

        // Focus the first editable element
        nameText.focus();

        // Change button icon to save
        document.querySelector('.edit-button img').src = '../images/save.png';
    }
}



  
  function toggleDetails(button) {
    const details = button.querySelector('.record-details');
    const summary = button.querySelector('.record-summary');
    if (details.style.display === 'none' || details.style.display === '') {
        details.style.display = 'flex';
        summary.style.color = '#092844';
    } else {
        details.style.display = 'none';
        summary.style.color = '';
    }
}

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
// login session end

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

function calculateAndDisplayRoute() {
    doucumnet.getElementById('feedback').style.display = 'block';

    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer();
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 22.99776836378852, lng: 120.21686402050172 },
        zoom: 10
    });
    directionsRenderer.setMap(map);

    var waiting = document.getElementById('waiting');
    var calculating = document.getElementById('calculating');
    var route = document.getElementById('route');
    var stop = document.getElementById('stop');
    var stop1 = document.getElementById('stop1');
    var stopb = document.getElementById('stopb');
    var placeinfo1 = document.getElementById('placeinfo1');
    var placeinfo2 = document.getElementById('placeinfo2');
    var placeinfo3 = document.getElementById('placeinfo3');
    var placeinfo4 = document.getElementById('placeinfo4');
    var mapElement = document.getElementById('map');
    var timeestimated = document.getElementById('timeestimated');
    var confirmPlace = document.getElementById('confirmPlace').textContent;

    waiting.style.display = 'block';
    calculating.style.display = 'block';
    route.style.display = 'block';
    mapElement.style.display = 'block';

    if (stop.value === '1') {
        stop1.style.display = 'none';
        stopb.style.display = 'none';
        placeinfo3.style.display = 'none';
    } else {
        stop1.style.display = 'flex';
    }

    if (!confirmPlace) {
        alert('請輸入出發地點');
        waiting.style.display = 'none';
        calculating.style.display = 'none';
        route.style.display = 'none';
        return;
    }

    var start = confirmPlace;
    var end = confirmPlace;
    var waypoints = [
        { location: "台南市北區勝利路206巷1號", stopover: true },
        { location: "台南市北區開元振興公園", stopover: true }
    ];

    placeinfo1.innerText = confirmPlace;
    placeinfo2.innerText = "台南市北區勝利路206巷1號";
    placeinfo3.innerText = stop.value === '1' ? '' : "台南市北區開元振興公園";
    placeinfo4.innerText = confirmPlace;

    directionsService.route({
        origin: start,
        destination: end,
        waypoints: waypoints,
        optimizeWaypoints: false,
        travelMode: 'WALKING'
    }, function(response, status) {
        if (status === 'OK') {
            directionsRenderer.setDirections(response);
            var legs = response.routes[0].legs;
            var output = '';

            for (var i = 0; i < legs.length; i++) {
                var leg = legs[i];
                var duration = leg.duration.text;
                output += duration + '　　　';
            }

            if (timeestimated) {
                timeestimated.innerHTML = output;
            } else {
                console.warn('Element with id "timeestimated" not found.');
            }

        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}


function pair(){
    document.getElementById('mapreq').style.display = 'block';
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
    document.getElementById('waiting').style.display='block';
    document.getElementById('calculating').style.display='block';
    document.getElementById('route').style.display='block';
    document.getElementById('map').style.display='block';
    document.getElementById('route').style.display='block';
}

function back(){
    document.getElementById('confirm').style.display='none';
    document.getElementById('waiting').style.display='none';
    document.getElementById('route').style.display='none';
    document.getElementById('calculating').style.display='none';
    document.getElementById('mapreq').style.display = 'block';
}

document.querySelectorAll('.chatbox').forEach(chatbox => {
    chatbox.addEventListener('click', function() {
      const matchId = this.getAttribute('data-match-id');
      localStorage.setItem('match_id', matchId);
    });
  });
  
  $(document).ready(function() {
    $('.chatbox').on('click', function() {
        var matchId = $(this).data('match-id'); // 假設每個聊天框有一個匹配 ID

        // 發送請求獲取聊天記錄
        $.get('/get_messages', { match_id: matchId }, function(response) {
            // 清空當前聊天框的訊息
            $('#chat-box').empty();
        
            // 遍歷返回的消息並動態生成聊天氣泡
            response.messages.forEach(function(message) {
                var messageText = message.message_text.trim(); // 去掉首尾空白字符

                // 檢查消息文本是否為空
                if (messageText) {
                    var messageElement = $('<div>').addClass('chat-message');
                    var bubbleElement = $('<div>').addClass('chat-bubble').text(messageText);
            
                    if (message.sender_email === localStorage.getItem("account")) {
                        messageElement.addClass('my-message'); // 如果是自己發的消息，添加特定樣式
                    } else {
                        messageElement.addClass('other-message'); // 如果是對方發的消息，添加特定樣式
                    }
            
                    messageElement.append(bubbleElement);
                    $('#chat-box').append(messageElement);
                }
            });
        });
    });

    $('#send').on('click', send);
});

function send() {
    var message = $('#mymsg').val().trim(); // 去掉首尾空白字符
    var chatBox = $('#chat-box');

    // 檢查消息文本是否為空
    if (message) {
        var messageElement = $('<div>').addClass('chat-message my-message');
        var bubbleElement = $('<div>').addClass('chat-bubble').text(message);
        messageElement.append(bubbleElement);
        chatBox.append(messageElement);
        chatBox.scrollTop(chatBox.prop('scrollHeight'));
        $('#msgcontent').text(message);

        // 清空輸入框
        $('#mymsg').val('');

        // 獲取用戶和匹配對象的詳情
        var user = localStorage.getItem("account");
        var matchId = localStorage.getItem("match_id"); // 假設 match_id 存在 localStorage

        // 使用 jQuery 發送訊息到伺服器
        var data = {
            user: user,
            match_id: matchId,
            message: message
        };

        $.post('/save_message', data, function(response) {
            console.log("訊息已存儲到資料庫");
        }).fail(function(error) {
            console.error('訊息儲存失敗:', error.responseText);
        });
    }
}

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
        setstep('3');      }).fail((error) => {
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

  // chat gpt api
    document.getElementById('msg_input').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    async function sendMessage() {
        const messageInput = document.getElementById('msg_input');
        const userMessage = messageInput.value;
        if (!userMessage.trim()) {
            return;
        }
        // 顯示用戶的消息
        var messageBox = document.createElement('div');
        messageBox.className = 'user_box';
        var newMessage = document.createElement('div');
        newMessage.className = 'message user_msg';
        newMessage.textContent = userMessage;
        messageBox.appendChild(newMessage);
        var textBox = document.getElementById('text_box');
        textBox.appendChild(messageBox);

        // 清空輸入框
        messageInput.value = '';
        try {
            const response = await fetch('http://luffy.ee.ncku.edu.tw:5920/gpt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userMessage })
            });

            var messageBox = document.createElement('div');
            messageBox.className = 'ai_box';
            const aiMsgDiv = document.createElement('div');
            aiMsgDiv.className = 'message ai_msg';
            if (response.ok) {
                const data = await response.json();           
                aiMsgDiv.textContent = data;
                messageBox.appendChild(aiMsgDiv);
            } else {
                aiMsgDiv.textContent = 'Error: ' + response.statusText;
                messageBox.appendChild(aiMsgDiv);
            }
            var textBox = document.getElementById('text_box');
            textBox.appendChild(messageBox);
        } catch (error) {
            aiMsgDiv.textContent = 'Error: ' + error.message;
            messageBox.appendChild(aiMsgDiv);
        }

        // 滾動到最新消息
        textBox.scrollTop = textBox.scrollHeight;
    } 
    document.addEventListener('DOMContentLoaded', function () {
        const stars = document.querySelectorAll('.star-rating .star');
        let currentRating = 0;
    
        stars.forEach(star => {
            star.addEventListener('mouseover', function () {
                resetStars();
                highlightStars(this);
            });
    
            star.addEventListener('mouseout', function () {
                resetStars();
                if (currentRating !== 0) {
                    highlightStars(stars[currentRating - 1]);
                }
            });
    
            star.addEventListener('click', function () {
                currentRating = this.getAttribute('data-value');
                resetStars();
                highlightStars(this, true);
            });
        });
    
        function resetStars() {
            stars.forEach(star => {
                star.classList.remove('hover');
                star.classList.remove('selected');
            });
        }
    
        function highlightStars(star, selected = false) {
            star.classList.add(selected ? 'selected' : 'hover');
            let prevSibling = star.previousElementSibling;
            while (prevSibling) {
                prevSibling.classList.add(selected ? 'selected' : 'hover');
                prevSibling = prevSibling.previousElementSibling;
            }
        }
    });
    
    document.addEventListener('DOMContentLoaded', function () {
        const circles = document.querySelectorAll('.circle-rating .circle');
        let currentRating = 0;
    
        circles.forEach(circle => {
            circle.addEventListener('mouseover', function () {
                resetCircles();
                highlightCircles(this);
            });
    
            circle.addEventListener('mouseout', function () {
                resetCircles();
                if (currentRating !== 0) {
                    highlightCircles(circles[currentRating - 1]);
                }
            });
    
            circle.addEventListener('click', function () {
                currentRating = this.getAttribute('data-value');
                resetCircles();
                highlightCircles(this, true);
            });
        });
    
        function resetCircles() {
            circles.forEach(circle => {
                circle.classList.remove('hover');
                circle.classList.remove('selected');
            });
        }
    
        function highlightCircles(circle, selected = false) {
            circle.classList.add(selected ? 'selected' : 'hover');
            let prevSibling = circle.previousElementSibling;
            while (prevSibling) {
                prevSibling.classList.add(selected ? 'selected' : 'hover');
                prevSibling = prevSibling.previousElementSibling;
            }
        }
    });
    function nextpage(){
        document.getElementById('content1').style.display='none';
        document.getElementById('content2').style.display='flex';
    }
    function lastpage(){
        document.getElementById('content1').style.display='flex';
        document.getElementById('content2').style.display='none';
    }
    function updateWaterValue() {
        var waterValue = document.getElementById('water').value;
        document.getElementById('water-display').textContent = waterValue + ' ml';
    }
    updateWaterValue();
    
    function showsheet(){
        document.getElementById('feedbacksheet').style.display='inline';
    }
    function submit(){
        document.getElementById('feedbacksheet').style.display='none';
        document.getElementById('feedback').style.display='none';
        alert('已收到本次回饋！');
    }
/*生成資料*/
  function toggleDetails(button) {
    const details = button.querySelector('.record-details');
    details.style.display = details.style.display === 'block' ? 'none' : 'block';
  }
  
  function generateStars(rating) {
    let stars = '';
    for (let i = 0; i < rating; i++) {
      stars += '<img src="images/黃星星滿.png" alt="star" class="star-icon">';
    }
    for (let i = rating; i < 5; i++) {
      stars += '<img src="images/黃星星.png" alt="star" class="star-icon">';
    }
    return stars;
  }