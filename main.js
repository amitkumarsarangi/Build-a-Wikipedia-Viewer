var req, timeStamp;

$(document).ready(function() {
  //create XMLHttpObject...
  if (window.XMLHttpRequest) {
    req = new XMLHttpRequest();
    console.log("HttpRequest object is created");
  } else if (window.ActiveXObject) {
    req = new ActiveXObject(Microsoft.XMLHTTP);
  }

  //When Search button is clicked...
  $("#searchBtn").on("click", searchAction);
  //Enter key is equal to clicking 'Search' button...
  $("#searchText").on("keypress", function(event) {
    if (event.keyCode == 13) $("#searchBtn").click();
  });

  function searchAction() {
    var URL = "";
    var searchString = "";
    $("#searchOutput").text("");
    URL = "https://en.wikipedia.org/w/api.php?";
    timeStamp = "";
    searchString = $("#searchText").val();
    URL =
      URL +
      "&action=opensearch&search=" +
      searchString +
      "&format=json" +
      "&callback=?";
    timeStamp = (/\?/.test(URL) ? "&" : "?") + new Date().getTime();
    URL += timeStamp;
    var jqXHR = $.ajax({
      type: "GET",
      url: URL,
      dataType: "json",
      success: function(data, status, jqXHR) {
        console.log("success!!!");
      }
    })
      .done(function(data) {
        for (var i = 1; i < 10; i++) {
          var title = data[1][i];
          var dfn = data[2][i];
          var link = data[3][i];
          if (title === undefined || title === "") {
            title = searchString;
            dfn = searchString + "no article found in wikipedia";
          }
          var content =
            "<h3><a href='" +
            link +
            "'target='_blank'>" +
            title +
            "</a></h3><div>" +
            dfn +
            "</div><h6>" +
            link +
            "</h6>";
          $("#searchOutput").append(content);
        }
      })
      .fail(function(error, status, jqXHR) {
        console.log(
          "Error: " + error + " Status: " + status + " jqXHR: " + jqXHR
        );
      });
  }
});