$(document).ready(function(){

    $("#search_input").autocomplete({
      source : function(request,dataCallback) {
                  if($.trim(request.term)!=="") {
                        $.ajax({
                            method : "GET",
                            url : "http://en.wikipedia.org//w/api.php?action=opensearch&format=json&search=" + request.term + "&limit=10&formatversion=2",
                            dataType : "jsonp",
                            success : function(response) {
                              dataCallback(response[1]);
                            },
                            error : function(){
                                dataCallback([]);
                            }
                        });
                   }
              },

      select : function(event,ui) {
                  if(event.keyCode!=13)
                  {
                    $("#search_input").autocomplete("close");
                    //console.log("autocomplete event fired!");
                    searchWiki(ui.item.value);
                  }
              }
    });

    $("#search_input").keyup(function(event){
        if(event.keyCode==13)
        {
          //console.log("enter select fired");
          $("#search_input").autocomplete("close");
          searchWiki($("#search_input").val());
        }
    });

    $("#search_go").on("click",function(){
      $("#search_input").autocomplete("close");
      //console.log("button event fired");
      searchWiki($("#search_input").val());
    });
});

function searchWiki(query) {

  if($.trim(query)!=="") {
      $.ajax({
        method : "GET",
        url : "http://en.wikipedia.org/w/api.php?action=query&format=json&list=search&formatversion=2&srsearch=" + query + "&srprop=snippet&srlimit=10",
        dataType : "jsonp",
        success : showResults,
        error : function(val) {
          console.log("Error occurred while fetching results for the query");
          $(".alert").remove();
          var html = "<div class=\"alert alert-danger\" role=\"alert\">Oops! Something went wrong! Check your internet connection and try again!</div>";
          $("#search_results").append(html);
        }
      });
  }
}

function showResults(response) {

    //console.log(response);
    $("#search_input").autocomplete("close");
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
