
function range(min, max, step)
        {
            var arr = [];
            var i = 0;
            var j = min;
            while( j <= max )
                {
                    arr[i] = min;
                    min++;
                    i++;
                    j++;
                }
            return arr;
        }

function sum(Array)
{
    var sum;
    for(var i = 0 ; i < Array.length ; i++ )
        {
            sum+=Array[i];
        }
    return sum;
}

//console.log(range(1, 55));
console.log(sum(range(1, 55)));