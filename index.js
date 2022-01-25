// csv into website data
// filter through search sort
// search will cover the available resources in the .csv file and then API

var searchInput = document.getElementById("searchEp");
var card = document.getElementsByClassName("card");

searchInput.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
        //checks whether the pressed key is "Enter"
        let cards = document.getElementsByClassName("card");
        filter(searchInput.value.toLowerCase(), cards);
    }
});

function filter(val, array) {
    console.log(val);
    if (val.length > 0) {
        for (i = 0; i < array.length; i++) {
            cardText = array[i].innerHTML.toLowerCase();
            if (cardText.indexOf(val) > -1) {
                array[i].style.display = "";
            } else {
                array[i].style.display = "None";
            }
        }
    } else {
        for (i = 0; i < array.length; i++) {
            array[i].style.display = "";
        }
    }
}

setInterval(function () {
    const searchBarBool = document.activeElement.className === "searchEp";
    if (searchBarBool) {
        document.querySelector(".inner").classList.add("inner_2");
    } else {
        document.querySelector(".inner").classList.remove("inner_2");
    }
    
    for (var i = 0; i < card.length; i++) {
        if (card[i].matches(':hover')) {
            let img = card[i].getElementsByTagName('img');
            img[0].style.filter = "blur(10px)";

            let play = card[i].getElementsByClassName('fa-play-circle');
            play[0].style.opacity = 0;

            let div = card[i].getElementsByClassName('text-con');
            div[0].style.zIndex = 100;
        }
        else {
            let img = card[i].getElementsByTagName('img');
            img[0].style.filter = "";

            let play = card[i].getElementsByClassName('fa-play-circle');
            play[0].style.opacity = 1;

            let div = card[i].getElementsByClassName('text-con')
            div[0].style.zIndex = -1;
        }
    }
}, 30);

fetch("ln_sample.json")
    .then((response) => response.json())
    .then((json) => getData(json));

async function getData(jsonObj) {
    console.log(jsonObj);
    for (var item in jsonObj) {
        desc = (jsonObj[item].description.length < 60) ? jsonObj[item].description.split(" ").slice(0, 60).join(" ") + "." : jsonObj[item].description.split(" ").slice(0, 60).join(" ") + "..";
        injectionText = `<div class="card"><img src="${jsonObj[item].artwork_image}" alt=""><i class="fas fa-play-circle"></i>
        <div class="text-con"><a class='links' target="_blank" href="${jsonObj[item].website}">${desc}</a></div>
        </div>`;
        document.getElementById("inject").innerHTML += injectionText;
    }
}
