/**
 * Created by hammer on 30.10.2016.
 */


var a = -444410026;
console.log(a);
function numToChar2(number)
{
    var num = ""+Math.abs(number);
    var arr = [];
    for ( var i = 0 ; i < num.length ; i++ )
    {
        arr[i] = parseInt(num.charAt(i));
    }

    var alphabet = ['A','B','C','D','E','F','G','H','I','J',
        'K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

    var res = "";
    for ( var i = 0 ; i < arr.length ; i++ )
    {
        var c = ""+arr[i]+arr[i+1];
        if(parseInt(c) > 25)
        {
            res += alphabet[arr[i]] + alphabet[arr[i+1]];
            i++;
        }
        else if (parseInt(c) >= 2)
        {
            res += alphabet[parseInt(c)];
        }
        else if (parseInt(c) <= 1)
        {
            res += alphabet[parseInt(c)];
        }

    }
    return res;
}

console.log(numToChar2(a));

