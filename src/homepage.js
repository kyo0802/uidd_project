
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
      const defaultText = '縣市' || '鄉、鎮、市、區'; 
  

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
      });
  });
  
  function editDogName() {
      var nameText = document.getElementById('dog-name-text');
      var nameInput = document.getElementById('dog-name-input');
  
      if (nameText.style.display === 'none') {
          nameText.innerText = nameInput.value;
          nameText.style.display = 'block';
          nameInput.style.display = 'none';
      } else {
          nameInput.value = nameText.innerText;
          nameText.style.display = 'none';
          nameInput.style.display = 'block';
          nameInput.focus();
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

    let user = localStorage.getItem("account");

    if (user === null) {
        $("#profile_box").css("display", "none");
        $("#login_form").css("display", "block");

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
        $("#login_form").css("display", "none");
        $("#profile_box").css("display", "inline");

        $("#logout").click(function() {
            localStorage.clear();
            location.reload();
        });
    }
});
// login session end


function calculateAndDisplayRoute() {
    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer();
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 22.99776836378852, lng: 120.21686402050172 },
        zoom: 10
    });
    directionsRenderer.setMap(map);

    document.getElementById('waiting').style.display='block';
    document.getElementById('calculating').style.display='block';
    document.getElementById('route').style.display='block';
    document.getElementById('map').style.display='block';
    document.getElementById('route').style.display='block';

    if ( document.getElementById('stop').value == '1' ) {
        document.getElementById('stop1').style.display = 'none';
        document.getElementById('stopb').style.display = 'none';
        document.getElementById('placeinfo3').style.display = 'none';
    }
    else{
        document.getElementById('stop1').style.display = 'flex';
    }

    var start = document.getElementById('confirmPlace').textContent;
    if (!start) {
        alert('請輸入出發地點');
        document.getElementById('waiting').style.display='none';
        document.getElementById('calculating').style.display='none';
        document.getElementById('route').style.display='none';
        return;
    }
    var end = document.getElementById('confirmPlace').textContent;
    var waypoints = [
        {
            location: "台南市北區勝利路206巷1號",
            stopover: true
        },
        {
            location: "台南市北區開元振興公園",
            stopover: true
        }
    ];

    document.getElementById('placeinfo1').innerText = document.getElementById('confirmPlace').textContent;
    document.getElementById('placeinfo2').innerText = "台南市北區勝利路206巷1號";
    if ( document.getElementById('stop').value == '1' ) {
        document.getElementById('placeinfo3').innerText = '';
    }
    else{
        document.getElementById('placeinfo3').innerText = "台南市北區開元振興公園";
    }
    document.getElementById('placeinfo4').innerText = document.getElementById('confirmPlace').textContent;
    
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

                    document.getElementById('timeestimated').innerHTML = output;
            // var route = response.routes[0].legs[0];
            //         var duration = route.duration.text;
            //         document.getElementById('timeestimated').innerText = duration;
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
  