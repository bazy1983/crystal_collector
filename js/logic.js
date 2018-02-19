$(document).ready(function(){

var gem = {
    image: ["./media/yellow.png", "./media/green.png","./media/orange.png","./media/blue.png","./media/teal.png","./media/red.png"],
    value: [0, 0, 0, 0, 0, 0]
},
    gemCollector = 0,
    win = 0,
    lose = 0,
    gemTotal, //total amount of gem units
    barPercent;

function parameters() {
    gemTotal = Math.floor(Math.random() * 100 + 19); //total amount of gem units
    $(".target .number").text(gemTotal);
    $(".progress").css ("width", "0%" ).css ("background", "rgb(37, 180, 102)").text(0);
    gemCollector = 0;
    barPercent = 0;

    $("img").each (function(){
        $(this).removeClass("disabled")
    });
};

parameters();


//console.log(gemTotal)

for (i = 0; i< gem.value.length; i++){
    gem.value[i] = Math.floor(Math.random()*12 + 1); // if changed here, it must be changed also at resetGem at the bottom
    var parantDiv = $(".button");

    //this will create the gems in the document
    var newImage = $("<img>");
    newImage.attr({
        src: gem.image[i],
        alt: "bg",
        value: gem.value[i]
    });
    newImage.addClass("gems");

parantDiv.append(newImage);
    
};


$("img").click(function (){

    var audio = new Audio('./media/chime.mp3');
        audio.play();

    // this will calculate the bar width percent
    barPercent += parseInt($(this).attr("value")) * 100 /gemTotal;

    //this will collect the actual value of the gems
    gemCollector += parseInt($(this).attr("value"));

    //pass gem value to the span progress
    $(".progress").css ("width", barPercent + "%" ).text(gemCollector);
    
    //console.log (gemCollector);

    if (gemCollector > gemTotal) {
        // When LOSING the game

        //disable button click function
        $("img").each (function(){
            $(this).addClass("disabled")
        });
        lose++
        var audio = new Audio('./media/breaking.mp3');
        audio.play();
        $(".lose .number").text(lose);
        $(".progress").css ("background", "#F00");
        setTimeout (function(){
         parameters();
        resetGem();   
        },2000);
        
    } else if (gemCollector === gemTotal) {
        //if collect matches target and WINNING the game

        //disable click event from button
        $("img").each (function(){
            $(this).addClass("disabled")
        });
        win++
        var audio = new Audio('./media/long_chime.mp3');
        audio.play();
        $(".win .number").text(win);
        $(".progress").css ("background", "#6196e4");
        setTimeout (function(){
            parameters();
           resetGem();   
           },2000);
    }; 
});

function resetGem(){
    for (i = 0; i<gem.value.length; i++){
        $("img:nth('" + i + "')").attr("value", Math.floor(Math.random()*12 + 1));
    };
};

});
