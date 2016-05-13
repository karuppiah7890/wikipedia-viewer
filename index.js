$(document).ready(function(){

    $("#search_input").keyup(function(event){
        if(event.keyCode==13)
        searchWiki($("#search_input").val());
    });

    $("#search_go").on("click",function(){
      searchWiki($("#search_input").val());
    });
});

function searchWiki(query) {
  $.ajax({
    method : "GET",
    url : "http://en.wikipedia.org/w/api.php?action=query&format=json&origin=http%3A%2F%2Fkaruppiah7890.github.io&list=search&formatversion=2&srsearch=" + query + "&srprop=snippet&srlimit=10",
    dataType : "json",
    success : showResults,
    error : function(val) {
      console.log(val);
    }
  });
}

function showResults(response) {

    console.log(response);

    var allResults = response.query.search;

    $(".MyContent").css("padding","30px 200px 50px 200px")
    $(".card").remove();

    allResults.forEach(function(result){
      var html = "<div class=\"card animated fadeInUp\"><div class=\"card-block\">";
      var link = result.title.replace(/ /g,"_");

      html+="<a class=\"result\" href=\"https://wikipedia.org/wiki/" + link + "\" target=\"_blank\">";
      html+="<h4 class=\"card-title\">" + result.title + "</h4>";
      html+="<p class=\"card-text\">" + result.snippet + "</p>";

      html+="</a></div></div>"

      $("#search_results").append(html);
    });
}
