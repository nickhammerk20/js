/**
 * Created by hammer on 22.10.2016.
 */


var carToyota = {
    name: "camry",
    year: 1998,
    engine: 3000
}
var carFord = {
    name: "mustang",
    year: 1962,
    engine: 6200,
    owner: {
        name: "vasya",
        age: 31
    }
}


function countProperty(car) {
    var count = 0;
    for (var key in car) {
        if (!car.hasOwnProperty(key))
        {
            continue;
        }
        count++;

    }
    var ret = "Кол-во значений: " + count;
    return ret;
}

console.log(countProperty(carFord));

function printProperty(car) {
    for (var key in car) {
        if (!car.hasOwnProperty(key))
        {
            continue;
        }
        console.log("Свойство: "+key + ", Значение: " + car[key]);

    }
}
printProperty(carFord);

