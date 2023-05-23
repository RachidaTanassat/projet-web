import Abstract from './dashboard.js'

export default class extends Abstract {
	constructor() {
		super()	
	}

  async getHtml() {
    const parentHtml = await super.getHtml();
  function createArticle(){
    console.log("hello");
    alert('hi');
    // $.ajax({
    //   method: "POST",
    //   url: 'http://localhost:3000/articles',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   crossDomain: true,
    //   data: JSON.stringify({
    //     titre: $("#titre").val(),
    //     contenu: $("#contenu").val(),
    //     image: $("#image").val(),
    //     utilisateurId: 895
    //   }),
    //   error: function(response) {
    //     console.log("erreur!!!");
    //   },
    //   success: function(response) {
    //     console.log("nice!!");
    //     alert("article saved");
    //     // navigateTo("/my_articles");
    //   }
    // });
  }

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
    $('#save_article').click(function() {

      console.log("hello");
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
          // navigateTo("/my_articles");
        }
      });
    });

  
    return parentHtml + `
   

 
			<form method="POST" id="rach">
				<div class="modal-header">						
					<h4 class="modal-title">Ajouter un article</h4>
				</div>
				<div class="modal-body">					
					<div class="form-group">
						<label>titre</label>
						<input type="text" id="titre" class="form-control" required>
					</div>
					<div class="form-group">
						<label>image</label>
						<input type="url" id="image" class="form-control" required>
					</div>
					<div class="form-group">
						<label>contenu</label>
						<textarea class="form-control" required id="contenu"></textarea>
					</div>
									
				</div>
				<div class="modal-footer">
        <button class="btn btn-success" id="save_article">Signup Now</button>
        <a href="/my_articles" data-link>	<input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel"></a> 
       <input type="submit" class="btn btn-success" value="Add"  >
        </div>
			</form>
	



    
    `;
    

  }
}