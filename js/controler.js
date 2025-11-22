import * as modle from "./modle.js";
import view from "./view.js";

const searchbtn = document.getElementById("searchbtn");
const cityInput = document.getElementById("cityInput");

modle.renderPrevious(cityInput.value);
searchbtn.addEventListener("click", function () {
    try {
        view._load();
        modle.API(cityInput.value);


        //previous cities
        modle.renderPrevious(cityInput.value);

        view._clear();
    } catch (error) {
        view._clear(true)

    }


});
