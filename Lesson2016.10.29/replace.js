
/**
 * Created by hammer on 29.10.2016.
 */

function replace() {
    var xxx = document.getElementById("mainVideo");
    console.log(xxx);
    var yyy = xxx.getElementsByTagName("iFrame");
    console.log(yyy);
    yyy[0].setAttribute("src", "https://www.youtube.com/embed/DyMcnGgRfq8?autoplay=1");
}
replace();

function replace() {
    var xxx = document.getElementById("mainVideo");
    console.log(xxx);
    var yyy = xxx.getElementsByTagName("iFrame");
    console.log(yyy);
    yyy[0].src = "https://www.youtube.com/embed/DyMcnGgRfq8?autoplay=1";
}
replace();


function replace() {
    var frame = document.getElementsByTagName("iFrame");
    frame[0].src = " https://www.youtube.com/embed/DyMcnGgRfq8?autoplay=1";
}
replace();

function replace() {

    var con = document.getElementById("mainVideo");
    var iframe = con.childNodes[1];
    iframe.src = "https://www.youtube.com/embed/yqQwH_Qj1x0?autoplay=1";
}
replace();