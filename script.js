function getRemainingTime(et) {
    var dt = Date.parse(et) - Date.parse(new Date());
    var seconds = Math.floor((dt / 1000) % 60);
    var minutes = Math.floor((dt / 1000 / 60) % 60);
    var hours = Math.floor((dt / (1000 * 60 * 60)) % 24);
    var days = Math.floor(dt / (1000 * 60 * 60 * 24));
    return { days, hours, minutes, seconds };
}

function initRemainingTime(id, endTime) {
    var clock = document.getElementById(id);
    var daysSpan = clock.querySelector('.days');
    var hoursSpan = clock.querySelector('.hours');
    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');

    function updateRemainingTime() {
        var t = getRemainingTime(endTime);
        daysSpan.innerHTML = ('0' + t.days).slice(-2);
        hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

        if (t.total <= 0) {
            clearInterval(timeInterval);
            daysSpan.innerHTML = '00';
            hoursSpan.innerHTML = '00';
            minutesSpan.innerHTML = '00';
            secondsSpan.innerHTML = '00';
        }
    }

    updateRemainingTime();
    var timeInterval = setInterval(updateRemainingTime, 1000);
}

// Set the countdown to any days from now
var timeForBigDay = new Date(new Date().getTime() + 99 * 24 * 60 * 60 * 1000);
initRemainingTime('reminder-clock', timeForBigDay);

const stickyTop = document.querySelector(".sticky-top");
const offcanvas = document.querySelector(".offcanvas");

offcanvas.addEventListener("show.bs.offcanvas", function () {
    stickyTop.style.overflow = "visible";
});

offcanvas.addEventListener("hidden.bs.offcanvas", function () {
    stickyTop.style.overflow = "hidden";
});

const rootELement = document.querySelector(":root");

function disableScroll() {
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    window.onscroll = function () {
        window.scrollTo(scrollTop, scrollLeft);
    };

    rootELement.style.scrollBehavior = "auto";
}

function enableScroll() {
    window.onscroll = function () {};
    rootELement.style.scrollBehavior = "smooth";
    localStorage.setItem("opened", "true");
}

if (!localStorage.getItem("opened")) {
    disableScroll();
}

disableScroll();
