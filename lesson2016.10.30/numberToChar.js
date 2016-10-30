/**
 * Created by hammer on 30.10.2016.
 */


var a = -444410026;
console.log(a);
function numToChar(number)
{
    var num = ""+Math.abs(number);
    var arr = [];
    // console.log(num);
    for ( var i = 0 ; i < num.length ; i++ )
    {
        arr[i] = parseInt(num.charAt(i));
    }

    // console.log(arr);

    var arrAlph = ['A','B','C','D','E','F','G','H','I','J',
        'K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

    var res = "";
    for ( var i = 0 ; i < arr.length ; i++ )
    {
        if (arr[i] == 0 )
        {
            res += arrAlph[arr[i]];
        }
        else if( arr[i] <= 2 && arr[i + 1])
        {
            var c = ""+arr[i]+arr[i+1];
            if( c >= 25 )
            {
                res += arrAlph[arr[i]] + arrAlph[arr[i+1]];
            }
            else
            {
                res += arrAlph[parseInt(c)];
            }
            i++;
        }
        else if( arr[i] > 2  && arr[i + 1])
        {
            res += arrAlph[arr[i]];
        }
        else if( arr[i] > 2  && !arr[i + 1])
        {
            res += arrAlph[arr[i]];
        }
        else if( arr[i] <= 1  && arr[i + 1])
        {
            res += arrAlph[arr[i]];
        }
        else if( (arr[i] == 1 || arr[i] == 2) && !arr[i + 1])
        {
            var c = ""+arr[i]+arr[i+1];
            if( c >= 26 )
            {
                res += arrAlph[arr[i]] + arrAlph[arr[i+1]];
            }
            else
            {
                res += arrAlph[parseInt(c)];
            }
            i++;
        }
        else if( arr[i] == 1 )
        {
            res += arrAlph[arr[i]];
        }
    }
    return res;
}

console.log(numToChar(a));

