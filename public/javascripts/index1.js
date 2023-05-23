


$('#rach').submit(function() {
    console.log('hi');
    console.log($("#titre").val())
    $.ajax({
      method: "POST",
      url: 'http://localhost:3000/articles',
      headers: {
        'Content-Type': 'application/json'
      },
      crossDomain: true,
      data: JSON.stringify({
        titre: $("#titre").val(),
        contenu: $("#contenu").val(),
        image: $("#image").val(),
        utilisateurId: 895
      }),
      error: function(response) {
        console.log("erreur!!!");
      },
      success: function(response) {
        console.log("nice!!");
        alert("article saved");
        navigateTo("/my_articles");
      }
    });
  });
  