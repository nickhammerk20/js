/**
 * Created by hammer on 22.10.2016.
 */


//literal

var rabbit = {
    name:"жирный",
    age:27,
    type:"white"
};



//function

function fRabbit(name, age, type) {
    this.name = name;
    this.age = age;
    this.type = type;
}

var fatRabbit = new fRabbit("жирный", 27, "белый");

console.log(fatRabbit);
console.log(rabbit);
