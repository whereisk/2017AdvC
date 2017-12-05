
var btn = document.getElementById("btn");
btn.addEventListener("click", process);

var day = 2;
var answer1 = 0;
var answer2 = 0;

function process(){
    var contents = document.getElementById("strings").value.trim();
    var lines = contents.split(/\n/);
    var line_numbers = [];
    var largest = 0;
    var smallest = 0;
    var sum = 0;

    //Puzzle 1
    lines.filter(function(line, lines){
        line_numbers = line.split(/\t/).map(Number);
        largest = 0;
        smallest = line_numbers[0]; 
        line_numbers.filter(function(number, line_numbers){
            if (number < smallest) smallest = number;
            if (number > largest) largest = number;
        });
        sum += (largest - smallest);
    });
    answer1 = sum;

    //Puzzle 2
    sum = 0;
    var number1 = 0;
    var number2 = 0;
    var loop_start = 0;
    var line_numbers2 = [];

    //Each line
    lines.filter(function(line, lines){
        line_numbers = line.split(/\t/).map(Number);
        line_numbers2 = line_numbers; // What is this bullshit? Why can't I reference the same variable inside the filter scope?
        loop_start = 0;
        
        //Each number
        line_numbers.filter(function(number1, line_numbers){
            index = 0;
            //Check with every other number but not previously checked
            for (index = loop_start; index < line_numbers2.length; index++) {
                number2 = line_numbers2[index];
                if (number1 == number2) continue;
                if (number1 % number2 == 0) sum += (number1 / number2);
                if (number2 % number1 == 0) sum += (number2 / number1);
            }
            loop_start++;
        });
    });
    answer2 = sum;

    tellTheWorld(day, answer1, answer2);

}

function tellTheWorld(day, answer1, answer2)
{
    document.getElementById("answer").innerHTML = 
        ("Day " + day + ".1: " + answer1 + " | Day " + day + ".2: " + answer2);
}

// Adding a Trim function to String because textarea adds carriage return
// if closing tag on new line
// Might as well remove all spaces before and after as well.
//It turns out my regex was eating all the crlfs... adjustments were made
String.prototype.trim = function() {
    return this.replace(new RegExp(/^\s+|\s+$/g), "");
}