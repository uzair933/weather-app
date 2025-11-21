import * as modle from "./modle.js";
import view from "./view.js";

const searchbtn = document.getElementById("searchbtn");
const cityInput = document.getElementById("cityInput").value;

modle.renderPrevious(cityInput);
searchbtn.addEventListener("click", function () {
    try {

        API(cityInput);

        //previous cities
        modle.renderPrevious(cityInput);

        view._clear();
    } catch (error) {
        view._clear(true)
    }


});
