var currentQuote = {};
var color = 0;
var colors = ["#0011ff", "#020a7a", "#000654", "#4b50a3", "#26283a", "#8e8e91", "#363638", "#1a1c33", "#000000", "#244768", "#277cce", "#0979e2", "#07457f", "#213e59", "#1e2021", "#0a0f14", "#051f38", "#4c6470", "#404247", "#1e2bdb", "#0c1599", "#1d1d26", "#484954", "#131414", "#181926", "#080a30", "#02030f", "#606068", "#0e1df2", "#1848db", "#2e01a0", "#29145e", "#150147", "#3e3c44", "#2c2147", "#3f2582", "#4304e2", "#564484", "#170d30", "#534e60", "#100b1c"]; //40colors

//Get new quote and update HTML
function getQuote(){
 
  $.ajax({
      type: 'GET',
      dataType: 'json',
      cache: false, //Make sure to get new quote each time
      url: 'https://talaikis.com/api/quotes/random',
      success: function (result) { 
        currentQuote = result;
        $("#quote").html(currentQuote.quote).addClass("animated fadeInLeft");
        $("#author").html("- " + currentQuote.author).addClass("animated fadeInLeft");
       
        $("#tweet").attr("href", "https://twitter.com/intent/tweet?hashtags=RandomQuoteTime&text=" + encodeURIComponent('"' + currentQuote.quote + '" -  ' + currentQuote.author));
        $("#facebook").attr("href", "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent('"' + currentQuote.quote + '" -  ' + currentQuote.author));
        $("#tumblr").attr('href', 'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=RandomQuotes&caption='+encodeURIComponent(currentQuote.author)+'&content=' + encodeURIComponent(currentQuote.quote)+'&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button');
        $("#reddit").attr("href", "https://www.reddit.com/r/quotes/submit?&title=" + encodeURIComponent('"' + currentQuote.quote + '" -  ' + currentQuote.author));
        
        //Change colors and make sure it's not same color again.
        var random = randomNumber();
        if (color != random) {
          color = random;
        } else {
          color ++;
        }
        $(".color-change").animate({
          color: colors[color]
        }, {duration: 1000, queue: false});
         $(".bg-color-change").animate({
          backgroundColor: colors[color]
        }, {duration: 1000, queue: false});
       
      },
     });
   $("#quote").removeClass("animated fadeInLeft");
   $("#author").removeClass("animated fadeInLeft");
} // End of function getQuote 

//Generate random number between 0 and 39 for colors
function randomNumber() {
  return Math.floor(Math.random() * 39);
}


$(document).ready(function() {
  
  $("body").addClass("bg-color-change");
  getQuote(); // Get quote for first page load
  $("#getQuote").on("click", getQuote); // Get quote for each click
  //$("body").addClass("animated fadeIn");
    
}); //End of Document Ready