let projectsVisible = false;

function openProjects() {
    const Projtable = document.querySelector('.projectstable');
    const ProjectCards = document.querySelectorAll('.cards');
    const ProjtableExit = document.querySelector('.xButton1');

    if (!projectsVisible) {
        Projtable.style.display = "block";
        ProjtableExit.style.display = "block";
        ProjectCards.forEach(card => {
            card.style.display = "block";
        });
        projectsVisible = true;
    }
}

function closeProjects() {
    const Projtable = document.querySelector('.projectstable');
    const ProjtableExit = document.querySelector('.xButton1');
    const ProjectCards = document.querySelectorAll('.cards');
    const CardText = document.querySelector('.cardText');

    Projtable.style.display = "none";
    ProjtableExit.style.display = "none";
    CardText.style.display = "none";
    ProjectCards.forEach(card => {
        card.style.display = "none";
    });
    projectsVisible = false;
}

let bookVisible = false;

function toggleBook(){
    const bookContent = document.querySelector('#book-content');

    if (!bookVisible) {
        bookContent.style.display = "block";
        bookVisible = true;
    } else{
        bookContent.style.display = "none";
        bookVisible = false;
    }
}

const images = ["Images/FunnyImages/angrycat.gif",
"Images/FunnyImages/aprun.gif",
"Images/FunnyImages/jam.gif",
"Images/FunnyImages/jigglin.gif",
"Images/FunnyImages/kok.gif",
"Images/FunnyImages/thevoices.gif",
"Images/FunnyImages/bop.gif",
"Images/FunnyImages/disco.gif",
"Images/FunnyImages/edit.gif",
"Images/FunnyImages/erm.gif",
"Images/FunnyImages/happy.gif",
"Images/FunnyImages/huh.gif",
"Images/FunnyImages/look.gif",
"Images/FunnyImages/russia.gif",
"Images/FunnyImages/shake.gif",
"Images/FunnyImages/wonky.gif",
"Images/FunnyImages/yonk.gif"
];

document.addEventListener('DOMContentLoaded', _ => {
    [...document.getElementsByClassName('randImg')].forEach(e => {
      const randImageIndex = ~~(Math.random() * images.length);
      e.src = images[randImageIndex];
    }); 
});

document.addEventListener('DOMContentLoaded', function () {
    let currentlyMovedCard = null; // Variable to keep track of the currently moved card
    let zIndex = 4; // Initial z-index value

    // Set a single target position (top and left) for all cards
    const targetPosition = {
        top: '1600px', // Adjust to your desired top position
        left: '450px', // Adjust to your desired left position
    };

    // Function to toggle the card's position between original and target
    function toggleCardPosition(card) {
        const cardText = document.querySelector('.cardText');

        if (card && card.getAttribute('data-original-position')) {
            const originalPosition = JSON.parse(
                card.getAttribute('data-original-position')
            );
            const currentPosition = {
                top: card.style.top || getComputedStyle(card).top,
                left: card.style.left || getComputedStyle(card).left,
            };

            // Round the top and left values to 2 decimal places for comparison
            const roundToDecimalPlaces = 2;
            const currentTop = parseFloat(currentPosition.top).toFixed(
                roundToDecimalPlaces
            );
            const originalTop = parseFloat(originalPosition.top).toFixed(
                roundToDecimalPlaces
            );

            const currentLeft = parseFloat(currentPosition.left).toFixed(
                roundToDecimalPlaces
            );
            const originalLeft = parseFloat(originalPosition.left).toFixed(
                roundToDecimalPlaces
            );

            console.log('Original Position:', originalPosition);
            console.log('Current Position:', currentPosition);

            if (
                currentTop === originalTop &&
                currentLeft === originalLeft
            ) {
                console.log('Moving card to target position');
                card.style.top = targetPosition.top;
                card.style.left = targetPosition.left;
                card.style.zIndex = zIndex++; // Increase z-index
                currentlyMovedCard = card;

                // Call the function to change card text based on the moved card
                changeCardText(currentlyMovedCard);
            } else {
                console.log('Moving card to original position');
                moveCardToOriginalPosition(card);
                currentlyMovedCard = null;

                // Call the function to change card text based on the moved card (when moving back)
                changeCardText(currentlyMovedCard);
            }
        }

        // Check if any card is currently moved
        const isAnyCardMoved = Array.from(cards).some((card) => {
            const currentPosition = {
                top: card.style.top || getComputedStyle(card).top,
                left: card.style.left || getComputedStyle(card).left,
            };
            const originalPosition = JSON.parse(
                card.getAttribute('data-original-position')
            );
            const roundToDecimalPlaces = 2;
            const currentTop = parseFloat(currentPosition.top).toFixed(
                roundToDecimalPlaces
            );
            const originalTop = parseFloat(originalPosition.top).toFixed(
                roundToDecimalPlaces
            );
            const currentLeft = parseFloat(currentPosition.left).toFixed(
                roundToDecimalPlaces
            );
            const originalLeft = parseFloat(originalPosition.left).toFixed(
                roundToDecimalPlaces
            );

            return currentTop !== originalTop || currentLeft !== originalLeft;
        });

        // Set display style for cardText based on whether any card is moved
        cardText.style.display = isAnyCardMoved ? 'block' : 'none';
    }

    // Function to move a card back to its original position
    function moveCardToOriginalPosition(card) {
        const originalPosition = JSON.parse(
            card.getAttribute('data-original-position')
        );
        card.style.top = originalPosition.top;
        card.style.left = originalPosition.left;
    }

    // Function to handle card click
    function handleCardClick(card) {
        console.log('Card clicked:', card); // Log the card element
        toggleCardPosition(card);
    }

    // Function to set the initial position of the cards
    function setInitialCardPosition(card) {
        const currentPosition = getComputedStyle(card);
        card.style.top = currentPosition.top;
        card.style.left = currentPosition.left;
    }

    // Event listeners for each card to set their initial position
    const cards = document.querySelectorAll('.cards');
    cards.forEach((card) => {
        setInitialCardPosition(card);
        card.addEventListener('click', function () {
            console.log('Card clicked:', this.id); // Log the card ID when clicked
            toggleCardPosition(this);
        });

        // Store the original position (top and left) as a data attribute
        const originalPosition = {
            top: getComputedStyle(card).top,
            left: getComputedStyle(card).left,
        };
        card.setAttribute('data-original-position', JSON.stringify(originalPosition));
    });

    // Function to change card text based on the moved card
    function changeCardText(movedCard) {
        const projectTitle = document.querySelector('.cardText h1');
        const projectDesc = document.querySelector('.cardText h2');

        if (movedCard) {
            // If a card is moved, update the text based on the moved card
            if (movedCard.id === 'card1') {
                projectTitle.textContent = 'Figma prototype';
                projectDesc.innerHTML = 'This is my prototype for this website, as you can see it does not really look the same but the general idea was there. I do like the real website way better than the prototype though. Link: <a href="https://www.figma.com/file/c2hyxM4rWD75cfoXuZoYod/Untitled?type=design&node-id=0%3A1&mode=design&t=6oezmMrpY1cBD1BB-1" target="_blank">Link to Figma</a>';
            } else if (movedCard.id === 'card2') {
                projectTitle.textContent = 'Project 2';
                projectDesc.textContent = 'Don\'t know what it\'ll be';
            } else if (movedCard.id === 'card3') {
                projectTitle.textContent = 'Project 3';
                projectDesc.textContent = 'Hopefully there will be one';
            }
        } else {
            // If no card is moved, display default text
            projectTitle.textContent = 'Code Brokey';
            projectDesc.textContent = 'I apologize for the inconvenience, martian code bugs have chomped down on my JavaScript and as a result this text does not display correctly';
        }
    }
});

let socialsVisible = false;

function showSocials(){
    const socials = document.querySelector('#socials');

    if (!socialsVisible) {
        socials.style.display = "block";
        socialsVisible = true;
    } else{
        socials
        .style.display = "none";
        socialsVisible = false;
    }
}