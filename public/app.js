// Grab the articles as a json
$.getJSON("/articles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the information on the page. Apologies for how unclean this looks
      $("#articles").append("<div class='card'> <div class='card-body'> <p id='ptag"+ data[i]._id +"' data-id='" + data[i]._id + "'class='h4'>" + data[i].title + "<br /><a href=" + data[i].link + ">Link to Article</a></p> <p id='comment"+ data[i]._id +"' data-id='" + data[i]._id + "'class='h4'>Comments: <br> </p> <button type='button' data-id='" + data[i]._id + "' class='btn btn-info article-btn'>Comment</button></div></div>");
    }
  });
  
  
  // Whenever someone clicks a p tag
  $(document).on("click", ".article-btn", function() {
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");
    var pTag = $("#ptag"+thisId+"")
  
    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      // With that done, add the comment information to the page
      .then(function(data) {
        console.log(data);
        // The title of the article
        $(pTag).append("<h2>" + data.title + "</h2>");
        // An input to enter a new title
        $(pTag).append("<input id='titleinput' name='title' ><br>");
        // A textarea to add a new comment body
        $(pTag).append("<textarea id='bodyinput' name='body'></textarea>");
        // A button to submit a new comment, with the id of the article saved to it
        $(pTag).append("<button data-id='" + data._id + "' id='savecomment'>Save Comment</button>");
  

      });
  });
  
  // When you click the savecomment button
  $(document).on("click", "#savecomment", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
    var commentTag = $("#comment"+thisId+"")
    var titleInput = $('#titleinput').val();
    var commentInput = $('#bodyinput').val();
    // Run a POST request to change the comment, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from title input
        title: $("#titleinput").val(),
        // Value taken from comment textarea
        body: $("#bodyinput").val()
      }
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
        $(commentTag).append("<br>"+ titleInput + "<br>")
        $(commentTag).append("<br>"+ commentInput + "<br>")
      });
  
    // Also, remove the values entered in the input and textarea for comment entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });
  