let search_button = document.getElementById("btn-search");
let search_form = document.getElementById("search-form");
let menu_button = document.getElementById("btn-menu");
let menu_items = document.getElementsByClassName("nav-item");
let video = document.getElementById("video");
let popup_fail = document.getElementById("popup-fail");
let popup_success = document.getElementById("popup-success");
let form_submit = document.getElementById("btn-form-submit");
let range_min = document.getElementById("range-price-min");
let range_max = document.getElementById("range-price-max");


function changeClassMenuItem(item, index, array) {
    if (item.classList.contains("nav-item--active") || item.classList.contains("nav-item--logo")) {
        return item
    }
    if (item.classList.contains("hidden")) {
        item.classList.remove("hidden")
    }
    else {
        item.classList.add("hidden");
    }
    return item
}

function Increment(input) {
    if (+input.value < +input.getAttribute("max")) {
        input.value = parseInt(input.value) + 1
    }
}

function Decrement(input) {
    if (+input.value > +input.getAttribute("min")) {
        input.value = parseInt(input.value) - 1
    }
}

function ChangeRangePriceMin(min_val) {
    let s = min_val.innerHTML.slice(0, 3);
    s += range_min.value;
    min_val.innerHTML = s
}

function ChangeRangePriceMax(max_val) {
    let s = max_val.innerHTML.slice(0, 3);
    s += range_max.value;
    max_val.innerHTML = s
}

// SEARCH DECREMENT-INCREMENT

if (search_button) {
    search_button.addEventListener("click", function (event) {
        event.preventDefault();

        if (search_form.classList.contains("hidden")) {
            search_form.classList.remove("hidden")
        }
        else {
            search_form.classList.add("hidden")
        }
    });

    let adults = document.getElementById("adults");
    let adults_decr = document.getElementById("adults-decr");
    let adults_incr = document.getElementById("adults-incr");
    let children = document.getElementById("children");
    let children_decr = document.getElementById("children-decr");
    let children_incr = document.getElementById("children-incr");
    adults_decr.addEventListener("click", function (event) {

        Decrement(adults)
    });
    adults_incr.addEventListener("click", function (event) {
        event.preventDefault();
        Increment(adults)
    });
    children_decr.addEventListener("click", function (event) {
        event.preventDefault();
        Decrement(children)
    });
    children_incr.addEventListener("click", function (event) {
        event.preventDefault();
        Increment(children)
    })
}
;

// VIDEO CONTROLS

if (video) {
    let replay = document.getElementById("replay");
    let full_screen = document.getElementById("fullscreen");
    let volume_range = document.getElementById("video-range");

    video.addEventListener("click", function () {
        if (video.paused == true) {
            video.play();
        } else {
            video.pause();
        }
    });

    full_screen.addEventListener("click", function () {
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.mozRequestFullScreen) {
            video.mozRequestFullScreen(); // Firefox
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen(); // Chrome and Safari
        }
    });

    volume_range.addEventListener("change", function () {
        // Update the video volume
        video.volume = volume_range.value;
    });

    replay.addEventListener("click", function () {
        if (video.currentTime > 0) {
            video.currentTime = 0
        }
        video.play();
    })
}

if (range_min && range_max) {
    let min_val = document.getElementById("min-price");
    let max_val = document.getElementById("max-price");
    min_val.innerHTML += range_min.value;
    max_val.innerHTML += range_max.value;
    range_min.addEventListener("change", function () {
        event.preventDefault();
        ChangeRangePriceMin(min_val)
    });
    range_max.addEventListener("change", function () {
        event.preventDefault();
        ChangeRangePriceMax(max_val)
    });

    range_min.addEventListener("input", function () {
        event.preventDefault();
        ChangeRangePriceMin(min_val)
    });
    range_max.addEventListener("input", function () {
        event.preventDefault();
        ChangeRangePriceMax(max_val)
    })

}

// NAVIGATION ON SMALL SCREENS

menu_button.addEventListener("click", function (event) {
    event.preventDefault();
    if (menu_button.classList.contains("btn-menu--open")) {
        Array.from(menu_items).forEach(changeClassMenuItem);
        menu_button.classList.remove("btn-menu--open");
        menu_button.classList.add("btn-menu--close")
    }

    else {
        Array.from(menu_items).forEach(changeClassMenuItem);
        menu_button.classList.remove("btn-menu--close");
        menu_button.classList.add("btn-menu--open")
    }
});

if (popup_fail) {
    popup_fail.addEventListener("click", function (event) {
        event.preventDefault();
        let popup = document.getElementsByClassName("popup-fail")[0];
        popup.classList.add("hidden")
    });
}

if (popup_success) {
    popup_success.addEventListener("click", function (event) {
        event.preventDefault();
        let popup = document.getElementsByClassName("popup-success")[0];
        popup.classList.add("hidden")
    })
}

if (form_submit) {
    form_submit.addEventListener("click", function (event) {
        event.preventDefault();
        let popup = document.getElementsByClassName("popup-success")[0];
        popup.classList.remove("hidden")
    })
}




