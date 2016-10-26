/**
 * Created by hammer on 24.10.2016.
 */


function Rabbit(name, color, age, earLength) {
    this.name = name;
    this.color = color;
    this.age = age;
    this.earLenght = earLength;
}

Rabbit.prototype.say = function(say){
        console.log("А " + this.name + " кролик говорит " + say);
    }

var rabbitThin = new Rabbit("худой", "white", 27, 13);
var rabbitFat = new Rabbit("толстый", "gray", 16, 10);
var rabbitBig = new Rabbit("большой", "black", 22, 18);

console.log(rabbitBig);
console.log(rabbitFat);
console.log(rabbitThin);

rabbitBig.say("нука поглядим, кто здесь кто?!");
rabbitThin.say("вот это попадалово!!");
rabbitFat.say("ОДНОЗНАЧНО!!!");