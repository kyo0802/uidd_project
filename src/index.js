document.addEventListener('DOMContentLoaded', function() {
    var prevButton = document.querySelector('.prev_button');
    var nextButton = document.querySelector('.next_button');
    var cardContainers = document.querySelectorAll('[class^="card_container_"]');

    var currentCardIndex = 0;

    prevButton.addEventListener('click', function() {
        updateCardContents(1);
    });

    nextButton.addEventListener('click', function() {
        updateCardContents(-1);
    });

    function updateCardContents(direction) {
        cardContainers = document.querySelectorAll('[class^="card_container_"]');

        currentCardIndex = (currentCardIndex + direction + cardContainers.length) % cardContainers.length;
    
        // 先將所有卡片的內容存入一個陣列
        var contents = [];
        for (var i = 0; i < cardContainers.length; i++) {
            contents.push(cardContainers[i].innerHTML);
        }
    
        // 根據 currentCardIndex 和方向來更新陣列
        if (direction === 1) {
            var last = contents.pop();
            contents.unshift(last);
        } else if (direction === -1) {
            var first = contents.shift();
            contents.push(first);
        }
        console.log(contents[0]);
        
        console.log(contents[1]);

        console.log(contents[2]);
        // 將更新後的陣列內容放回卡片中
        for (var i = 0; i < cardContainers.length; i++) {
            var className = "card_container_" + (i);
            var cardContainer = document.querySelector("." + className);
            cardContainer.innerHTML = contents[i];
    
            // 移除或添加 overlay_image
            var overlayImage = cardContainer.querySelector('.overlay_image');
            if (className === "card_container_1") {
                // 如果 overlay_image 存在且不是第二個卡片，則移除它
                overlayImage.remove();
            } 
            else if (!overlayImage && (className !== "card_container_0" || className !== "card_container_2")) {
                // 如果 overlay_image 不存在且是第一個或第三個卡片，則添加它
                var img = document.createElement('img');
                img.src = "../images/index/bg.png";
                img.className = "overlay_image";
                cardContainer.appendChild(img);
            }
        }
    }
    
});
