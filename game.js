let happiness = 80;

const character = document.getElementById("character");
const happinessBar = document.getElementById("happiness");
const gameArea = document.getElementById("gameArea");


let tiredness = 30;

const tirednessBar =
    document.getElementById("tiredness");

// -------------------------
// PIKMIN POSITION
// -------------------------

let x = 550;
let y = 152;

const speed = 5;


// -------------------------
// CLICK PIKMIN
// -------------------------

character.addEventListener("click", function() {

    // Increase happiness
    happiness += 5;

    if (happiness > 100) {
        happiness = 100;
    }

    happinessBar.style.width = happiness + "%";


    // Create heart
    const heart = document.createElement("div");

    heart.className = "heart";

    heart.textContent = "♥";


    // Random position around Pikmin
    const randomX = Math.random() * 50 - 25;
    const randomY = Math.random() * 30 - 15;

    heart.style.left =
        (x + character.offsetWidth / 2 + randomX) + "px";

    heart.style.top =
        (y + randomY) + "px";


    // Add heart to the room
    gameArea.appendChild(heart);


    // Remove after animation
    setTimeout(function() {
        heart.remove();
    }, 1000);

});


// -------------------------
// MOVEMENT
// -------------------------

document.addEventListener("keydown", function(event) {

    // Move up
    if (
        event.key === "w" ||
        event.key === "W" ||
        event.key === "ArrowUp"
    ) {
        y -= speed;
    }


    // Move down
    if (
        event.key === "s" ||
        event.key === "S" ||
        event.key === "ArrowDown"
    ) {
        y += speed;
    }


    // Move left
    if (
        event.key === "a" ||
        event.key === "A" ||
        event.key === "ArrowLeft"
    ) {
        x -= speed;
    }


    // Move right
    if (
        event.key === "d" ||
        event.key === "D" ||
        event.key === "ArrowRight"
    ) {
        x += speed;
    }


    // -------------------------
    // ROOM BOUNDARIES
    // -------------------------

const roomWidth = gameArea.clientWidth;
const roomHeight = gameArea.clientHeight;

const pikminWidth = character.offsetWidth;
const pikminHeight = character.offsetHeight;


// Left wall
if (x < 0) {
    x = 0;
}


// Right wall
if (x + pikminWidth > roomWidth) {
    x = roomWidth - pikminWidth;
}


// Floor boundary
const floorTop = roomHeight * 0.67;

if (y + pikminHeight < floorTop) {
    y = floorTop - pikminHeight;
}


// Bottom edge
if (y + pikminHeight > roomHeight) {
    y = roomHeight - pikminHeight;
}

    // -------------------------
    // ACTUALLY MOVE PIKMIN
    // -------------------------

    character.style.left = x + "px";
    character.style.top = y + "px";

});
// =========================
// LOADING SCREEN
// =========================

const loadingScreen = document.getElementById("loadingScreen");
const loadingProgress = document.getElementById("loadingProgress");
const loadingText = document.getElementById("loadingText");
const loadingPercent = document.getElementById("loadingPercent");
const loadingTip = document.getElementById("loadingTip");


let loading = 0;


const loadingMessages = [
    "Preparing...",
    "Eating blueberries...",
    "Getting everything ready...",
    "Almost done..."
];


const loadingTips = [
    "Tip: Explore every room!",
    "Tip: Keep an eye out for the special note.",
    "Tip: There may be secrets to find..."
];


const loadingInterval = setInterval(function() {

    loading += 1;


    // Update progress bar
    loadingProgress.style.width = loading + "%";


    // Update percentage
    loadingPercent.textContent = loading + "%";


    // Change loading message
    const messageIndex =
        Math.floor(loading / 20);

    if (messageIndex < loadingMessages.length) {

        loadingText.textContent =
            loadingMessages[messageIndex];

    }


    // Change tip
    const tipIndex =
        Math.floor(loading / 20);

    if (tipIndex < loadingTips.length) {

        loadingTip.textContent =
            loadingTips[tipIndex];

    }


    // Finished
    if (loading >= 100) {

        clearInterval(loadingInterval);


       loadingText.textContent =
    "Pikmin is ready for an adventure with you!";


loadingPercent.textContent =
    "100%";

loadingTip.textContent =
    "Enjoy my love!";


        setTimeout(function() {

    // Put the title screen in place BEFORE
    // removing the loading screen

    showTitleScreen();

    loadingScreen.classList.add("fadeOut");

    setTimeout(function() {

        loadingScreen.style.display = "none";

    }, 1000);

}, 1000);

    }

}, 120);
// =========================
// TITLE SCREEN
// =========================

const titleScreen = document.getElementById("titleScreen");
const startButton = document.getElementById("startButton");


function showTitleScreen() {

    titleScreen.style.display = "flex";

}


// Start the game

startButton.addEventListener("click", function() {

    titleScreen.classList.add("fadeOut");

    setTimeout(function() {

        titleScreen.style.display = "none";

    }, 800);

});

// =========================
// BATHROOM TRANSITION
// =========================

const nextRoom = document.getElementById("nextRoom");
const game = document.getElementById("game");
const bathroom = document.getElementById("bathroom");

nextRoom.addEventListener("click", function() {

    game.style.display = "none";

    bathroom.style.display = "block";

});

// =========================
// BATHROOM MOVEMENT
// =========================

const bathroomPikmin = document.getElementById("bathroomPikmin");
const bathroomArea = document.getElementById("bathroomArea");

let bathroomX = 400;
let bathroomY = 150;

document.addEventListener("keydown", function(event) {

    // Only move bathroom Pikmin when bathroom is visible
    if (bathroom.style.display !== "block") {
        return;
    }

    if (
        event.key === "w" ||
        event.key === "W" ||
        event.key === "ArrowUp"
    ) {
        bathroomY -= speed;
    }

    if (
        event.key === "s" ||
        event.key === "S" ||
        event.key === "ArrowDown"
    ) {
        bathroomY += speed;
    }

    if (
        event.key === "a" ||
        event.key === "A" ||
        event.key === "ArrowLeft"
    ) {
        bathroomX -= speed;
    }

    if (
        event.key === "d" ||
        event.key === "D" ||
        event.key === "ArrowRight"
    ) {
        bathroomX += speed;
    }

    // Bathroom boundaries
    const roomWidth = bathroomArea.clientWidth;
    const roomHeight = bathroomArea.clientHeight;

    const pikminWidth = bathroomPikmin.offsetWidth;
    const pikminHeight = bathroomPikmin.offsetHeight;

    if (bathroomX < 0) {
        bathroomX = 0;
    }

    if (bathroomX + pikminWidth > roomWidth) {
        bathroomX = roomWidth - pikminWidth;
    }

    // Keep Pikmin on the floor
    const floorTop = roomHeight * 0.67;

    if (bathroomY + pikminHeight < floorTop) {
        bathroomY = floorTop - pikminHeight;
    }

    if (bathroomY + pikminHeight > roomHeight) {
        bathroomY = roomHeight - pikminHeight;
    }

    bathroomPikmin.style.left = bathroomX + "px";
    bathroomPikmin.style.top = bathroomY + "px";

});

// =========================
// BATHROOM ITEMS & CLEANLINESS
// =========================

const sponge = document.getElementById("sponge");
const cleanlinessBar = document.getElementById("cleanliness");

let cleanliness = 80;

// =========================
// CLEANLINESS SLOWLY DECREASES
// =========================

setInterval(function() {

    cleanliness -= 1;

    if (cleanliness < 0) {
        cleanliness = 0;
    }

    cleanlinessBar.style.width = cleanliness + "%";

}, 5000);

// =========================
// HAPPINESS SLOWLY DECREASES
// =========================

setInterval(function() {

    happiness -= 1;

    if (happiness < 0) {
        happiness = 0;
    }

    happinessBar.style.width = happiness + "%";

}, 5000);

// =========================
// BACK TO LIVING ROOM
// =========================

const previousRoom = document.getElementById("previousRoom");

previousRoom.addEventListener("click", function() {

    bathroom.style.display = "none";

    game.style.display = "block";

});

// =========================
// SPONGE CLEANING
// =========================

let spongeCleaning = false;
let lastFoamTime = 0;


// Hold sponge

sponge.addEventListener("mousedown", function(event) {

    event.preventDefault();

    spongeCleaning = true;

});


// Release sponge

document.addEventListener("mouseup", function() {

    spongeCleaning = false;

});


// Check for cleaning

bathroomArea.addEventListener("mousemove", function(event) {

    if (!spongeCleaning) {
        return;
    }


    const spongeRect =
        sponge.getBoundingClientRect();

    const pikminRect =
        bathroomPikmin.getBoundingClientRect();


    // Check if sponge overlaps Pikmin

    const touching =
        spongeRect.right > pikminRect.left &&
        spongeRect.left < pikminRect.right &&
        spongeRect.bottom > pikminRect.top &&
        spongeRect.top < pikminRect.bottom;


    if (!touching) {
        return;
    }


    // =========================
    // CLEANLINESS
    // =========================

    cleanliness += 1;


    if (cleanliness > 100) {
        cleanliness = 100;
    }


    cleanlinessBar.style.width =
        cleanliness + "%";


    // =========================
    // FOAM
    // =========================

    const now = Date.now();


    if (now - lastFoamTime < 150) {
        return;
    }


    lastFoamTime = now;


    for (let i = 0; i < 5; i++) {

        const bubble =
            document.createElement("div");


        bubble.className = "bubble";


        const areaRect =
            bathroomArea.getBoundingClientRect();


        const spreadX =
            Math.random() * 40 - 20;

        const spreadY =
            Math.random() * 35 - 17.5;


        bubble.style.left =
            (
                event.clientX -
                areaRect.left +
                spreadX -
                11
            ) + "px";


        bubble.style.top =
            (
                event.clientY -
                areaRect.top +
                spreadY -
                11
            ) + "px";


        const size =
            Math.random() * 12 + 18;


        bubble.style.width =
            size + "px";

        bubble.style.height =
            size + "px";


        bathroomArea.appendChild(bubble);


        setTimeout(function() {

            bubble.remove();

        }, 1000);

    }

});

// =========================
// SPONGE MOVEMENT
// =========================

bathroomArea.addEventListener("mousemove", function(event) {

    const rect =
        bathroomArea.getBoundingClientRect();

    const mouseX =
        event.clientX - rect.left;

    const mouseY =
        event.clientY - rect.top;


    sponge.style.left =
        (mouseX - sponge.offsetWidth / 2) + "px";

    sponge.style.top =
        (mouseY - sponge.offsetHeight / 2) + "px";

});

// =========================
// BATHROOM TO BEDROOM
// =========================

const nextBedroom = document.getElementById("nextBedroom");
const previousBedroom = document.getElementById("previousBedroom");
const bedroom = document.getElementById("bedroom");


// Bathroom → Bedroom

if (nextBedroom) {

    nextBedroom.addEventListener("click", function() {

        bathroom.style.display = "none";

        bedroom.style.display = "block";

    });

}


// Bedroom → Bathroom

if (previousBedroom) {

    previousBedroom.addEventListener("click", function() {

        bedroom.style.display = "none";

        bathroom.style.display = "block";

    });

}

// =========================
// BEDROOM MOVEMENT
// =========================

let bedroomX = 400;
let bedroomY = 150;

document.addEventListener("keydown", function(event) {

    // Only move bedroom Pikmin when bedroom is visible
    if (bedroom.style.display !== "block") {
        return;
    }

    // Move up
    if (
        event.key === "w" ||
        event.key === "W" ||
        event.key === "ArrowUp"
    ) {
        bedroomY -= speed;
    }

    // Move down
    if (
        event.key === "s" ||
        event.key === "S" ||
        event.key === "ArrowDown"
    ) {
        bedroomY += speed;
    }

    // Move left
    if (
        event.key === "a" ||
        event.key === "A" ||
        event.key === "ArrowLeft"
    ) {
        bedroomX -= speed;
    }

    // Move right
    if (
        event.key === "d" ||
        event.key === "D" ||
        event.key === "ArrowRight"
    ) {
        bedroomX += speed;
    }


    // =========================
    // BEDROOM BOUNDARIES
    // =========================

    const roomWidth = bedroomArea.clientWidth;
    const roomHeight = bedroomArea.clientHeight;

    const pikminWidth = bedroomPikmin.offsetWidth;
    const pikminHeight = bedroomPikmin.offsetHeight;


    // Left wall

    if (bedroomX < 0) {
        bedroomX = 0;
    }


    // Right wall

    if (bedroomX + pikminWidth > roomWidth) {
        bedroomX = roomWidth - pikminWidth;
    }


    // Floor boundary

    const floorTop = roomHeight * 0.65;

    if (bedroomY + pikminHeight < floorTop) {
        bedroomY = floorTop - pikminHeight;
    }


    // Bottom edge

    if (bedroomY + pikminHeight > roomHeight) {
        bedroomY = roomHeight - pikminHeight;
    }


    // =========================
    // MOVE PIKMIN
    // =========================

    bedroomPikmin.style.left =
        bedroomX + "px";

    bedroomPikmin.style.top =
        bedroomY + "px";

});

// =========================
// BED INTERACTION
// =========================

const bed = document.getElementById("bed");
const bedroomPikmin = document.getElementById("bedroomPikmin");
const sleepingPikmin = document.getElementById("sleepingPikmin");
const sleepMessage = document.getElementById("sleepMessage");
const sleepOverlay = document.getElementById("sleepOverlay");
const sleepZzz = document.getElementById("sleepZzz");

let sleeping = false;


bed.addEventListener("click", function() {

    // Don't allow clicking the bed again while sleeping

    if (sleeping) {
        return;
    }


    // Start sleeping

    sleeping = true;

    // Hide normal Pikmin and show sleeping Pikmin
    bedroomPikmin.style.display = "none";
    sleepingPikmin.style.display = "block";


    // Show sleepy message

    sleepMessage.style.display = "block";


    // Darken room

    setTimeout(function() {

        sleepOverlay.classList.add("sleeping");

    }, 800);


    // Hide sleepy message

    setTimeout(function() {

        sleepMessage.style.display = "none";

    }, 2000);


    // Show Zzz

    setTimeout(function() {

        sleepZzz.style.display = "block";

    }, 2500);


    // Recover tiredness

    const sleepInterval = setInterval(function() {

        tiredness -= 2;

        if (tiredness < 0) {
            tiredness = 0;
        }

        tirednessBar.style.width =
            tiredness + "%";

    }, 1000);


    // Wake up after 10 seconds

    setTimeout(function() {

        clearInterval(sleepInterval);


        // Stop sleeping

        sleeping = false;


        // Hide Zzz

        sleepZzz.style.display = "none";


        // Brighten room

        sleepOverlay.classList.remove("sleeping");

        // Restore normal Pikmin
        sleepingPikmin.style.display = "none";
        bedroomPikmin.style.display = "block";


    }, 10000);

});

// =========================
// RECOVER TIREDNESS
// =========================

const sleepInterval = setInterval(function() {

    if (!sleeping) {
        return;
    }

    tiredness -= 2;

    if (tiredness < 0) {
        tiredness = 0;
    }

    tirednessBar.style.width =
        tiredness + "%";

}, 1000);


// =========================
// TIREDNESS SLOWLY INCREASES
// =========================

setInterval(function() {

    tiredness += 1;

    if (tiredness > 100) {
        tiredness = 100;
    }

    tirednessBar.style.width =
        tiredness + "%";

}, 5000);

// =========================
// OPEN LETTER
// =========================

const note = document.getElementById("note");
const letterPopup = document.getElementById("letterPopup");
const closeLetter = document.getElementById("closeLetter");


note.addEventListener("click", function() {

    letterPopup.style.display = "flex";

});


closeLetter.addEventListener("click", function() {

    letterPopup.style.display = "none";

});
