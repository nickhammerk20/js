/**
 * Created by hammer on 22.10.2016.
 */

var rabbit = {
    name: "жирненький",
    say: function (say) {
            console.log("А " + this.name + " кролик говорит " + say);
    }
}
var thinRabbit = {
    name: "худой",
    speak:speakin
}
var fatRabbit = {
    name: "жирненький",
    speak:speakin
}

function speakin (say){
    var ret = "А " + this.name + " кролик говорит " + say;
    return ret;
}

function Speak (say){
    var ret = "А " + rabbit.name + " кролик говорит " + say;
    return ret;
}

console.log(Speak("Я жирный"));

rabbit.say("Я не ЖИРНЫЙ!!!");

console.log(fatRabbit.speak("Я НЕ ЖИРНЫЙ!!!"));

console.log(thinRabbit.speak("ТЫ ЖИРНЫЙ!!!"));
