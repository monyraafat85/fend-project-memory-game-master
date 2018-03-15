/*
 * Create a list that holds all of your cards
 */
var shapes = ['fa fa-diamond','fa fa-paper-plane-o','fa fa-anchor','fa fa-bolt',
                'fa fa-cube','fa fa-anchor','fa fa-leaf','fa fa-bicycle',
                'fa fa-diamond','fa fa-bomb','fa fa-leaf','fa fa-bomb','fa fa-bolt',
                'fa fa-bicycle','fa fa-paper-plane-o','fa fa-cube'

];
var opened = [];
var move = 0;
var minute = 0;
var second = 0;
var hour=0;
var starCounter = 3;
$('.moves').html(move);
$moves=$('.moves');
$refresh= $('.restart');
$ratingStars = $('i');

 var cards_game = shapes.length ;
 var big_rate = cards_game + 2;
 var  middle_rate = cards_game + 8;
 var small_rate = cards_game + 12;
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


/* start game timer=0, count=0,and remove all classes show and open and add card in list
 and check if two card match diaplay result and if not close card in time =500 and loop */
function startGame() {
    opened = [];
    move = 0;
    minute = 0;
    second = 0;
    hour=0;
    shape = shuffle(shapes);

    /*when start add font awesome (fa-star),and remove (fa-star-o)*/
     $ratingStars.removeClass('fa-star-o').addClass('fa-star');
     $ratingStars.css({
        'color': '#000000'
    });
/* count move*/
    $('.moves').html(move);
 /*reset deck*/
    $('.deck').empty();
/*reset timer when play again*/
     $('#hours').html(hour+ "hour");
    $("#minutes").html(minute+"min");
    $("#seconds").html(second+ "sec");
/*add card in deck without any class*/
    for (let i = 0; i < shape.length; i++) {
        $('.deck').append($('<li class="card"><i class="fa fa-' + shape[i] + '"></i></li>'))
    }
/* function to check if card matched or not*/
    $('.card').each(function(e) {
        this.onclick= function() {
            if ($(this).hasClass('match') == false && $(this).hasClass('open show') == false) {
                /* count movement of cards*/
                move++;
                $moves.html(move);
                /*rate star*/
                countStars();
                /* function to offer card in grid*/
                $(this).addClass('open show');
                 opened.push($(this));
                 /*check if list open contain 2 card and two cards matched show it */
                if (opened.length > 1) {
                     /*if two cards have the same class*/
                   if (opened[0].children("i").attr("class") === opened[1].children("i").attr("class")) {
                       /* when two card matched*/
                        opened.forEach(function(e) {
                           e.removeClass('open show animated');
                            e.addClass('match animated');
                           });
                            opened = [];
                            /* number of card==16 you won */
                             if ($('.match').length == 16) {
                                   finalScore();
                                }
                    } else {
                        /* dismatch card*/
                         opened.forEach(function(e) {
                         e.addClass('dismatch animated');
                        /* when cards dismatch it take time to close*/
                        setTimeout(function() {e.removeClass('open show dismatch animated');  }, 500);   });
                         opened = [];
                    }
                }
            }
        }; 
    });
}
startGame();

/* end startGame*/

/* rating stars*/
function countStars() {
    'use strict';
    if(move > big_rate && move < middle_rate) {
    	/* star 3 will be fa-star-o*/
        $ratingStars.eq(3).removeClass('fa-star').addClass('fa-star-o');
        starCounter = 3;
    } else if (move > middle_rate && move < small_rate) {
    	/* star 2 will be fa-star-o*/
        $ratingStars.eq(2).removeClass('fa-star').addClass('fa-star-o');
        starCounter = 2;
    } else if (move > small_rate) {
    	/* star 1 will be fa-star-o*/
        $ratingStars.eq(1).removeClass('fa-star').addClass('fa-star-o');
        starCounter = 1;
    }
 
}
/* end rating stars*/

/* function to count time in hour and  minute and second*/
setInterval(function startTimer(){
    second++;
    if( second== 60){
        minute++;
        second = 0;
        $('#minutes').html(minute+ "min");
        $('#seconds').html(second+ "sec");
    }
   else if(minute==60){
    hour++;
    minute=0;
       $('#hours').html(hour+ "hour");
      $('#minutes').html(minute+ "min");
      $('#seconds').html(second+ "sec");
   }
    else{
        $('#seconds').html(second + "sec");
    }
},700);
/* end timer*/

/* button restart*/
$refresh.on("click",function(e) {
   
    startGame();
});
/* end*/
/* second page when win contain Congratulations, and moves and rating stars and time and button play again*/
function finalScore() {

    'use strict';
    /* time in var timer*/
    var timer =hour+"\thour\t" +minute+"\tmin\t"+ second+ "\tsec";
    /* hide container after winning*/
    $('.container').hide();
    /* add new container*/
    var final= $('<div class="finalcon" align="center" style="margin-top:150px;"></div>');
    $('body').append(final);
    /* add icon check */
    $('.finalcon').append('<i class="fa fa-check-circle-o  fa-3x"  aria-hidden="true" style="color:green";></i>');
    /* add header */
    $('.finalcon').append('<h2 style="color:red;">Congratulations! You have won!</h2>');
    /* add moves, rating star, and timer*/
    $('.finalcon').append(`with ${move} moves <br> and ${starCounter} stars in <br> ${timer}.</br>`);
    /* add header woow*/
    $('.finalcon').append('<h2 style="color:red;">WOOOOW</h2>');
    /* add button play again*/
    $('.finalcon').append('<input type="button" id="try-again" value="Play again!" style="padding:7px; background-color:red;">');
    /* when click button remove new container and return the old container*/
    $('#try-again').click(function(e) {
        $('.finalcon').remove();
        $('.container').show();
        startGame();
    });
}
/*end of function*/