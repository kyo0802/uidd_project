
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
}
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
    if (details.style.display === 'none' || details.style.display === '') {
        details.style.display = 'block';
    } else {
        details.style.display = 'none';
    }
}
