
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
    // Resets to the first step and hides all special icons
    showStep('1');
    resetIcons();  // This function will hide all icons
    userRole = 'none';  // Reset the user role
    activeStepId = '1';  // Reset the active step ID
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

    // Hide all icons initially
    icons.forEach(icon => { if (icon) icon.style.display = 'none'; });

    // Decide which icons to show based on the step number and role
    let displayIcons = [];
    switch (stepNumber) {
        case '1':
            // No icons for step 1
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

    // Show only the selected icons
    displayIcons.forEach(index => {
        if (icons[index]) {
            icons[index].style.display = 'block';
        }
    });
}

// Call updateIconsDisplay every time a new step is shown
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
        activeStepId = stepNumber;  // 更新当前步骤
        updateIconsDisplay(stepNumber);  // 更新图标显示
    } else {
        console.error('Step not found: step' + stepNumber);
    }
}
