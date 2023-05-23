import Abstract from './dashboard.js'

export default class extends Abstract {
	constructor() {
		super()	
	}

    async getArticle(id) {
        
		
		const article = await $.ajax({
			url: `http://localhost:3000/articles/${id}`,
			method: 'GET',
			dataType: 'json',
		})
		return article;
	}


async getHtml() {

    const parentHtml = await super.getHtml();
   
   
	 const urlParams = new URLSearchParams(window.location.search);
     const articleId = urlParams.get('id');
      console.log(articleId);

		const article = await this.getArticle(articleId);
    
    
    console.log(article);

	$('#edit_article').click(function() {
		var id = document.getElementById('titre').value;
		$.ajax({
		  method: "POST",
		  url: 'http://localhost:3000/articles/${article.id}',
		  headers: {
			'Content-Type': 'application/json'
		  },
		  crossDomain: true,
		  data: JSON.stringify({
			titre: $("#titre").val(),
			image: $("#image").val(),
			contenu: $("#contenu").val(),
			utilisateurId: 895
		  }),
		  error: function(response) {
			console.log("erreur!!!");
		  },
		  success: function(response) {
			console.log("nice!!");
			alert("article saved");
		  }
		});
	  });
    
    return  parentHtml + `
    <div id="addEmployeeModal">
	<div class="modal-dialog">
		<div class="modal-content">
			<form>
				<div class="modal-header">						
					<h4 class="modal-title">Les détails de l'article <b>${article.titre} </b></h4>
				</div>
				<div class="modal-body">					
					<div class="form-group">
						<label>titre</label>
                        <input type="text" id="id" class="form-control" value="${article.id}" hidden>
						<input type="text" id="titre" class="form-control" value="${article.titre}">
					</div>
					<div class="form-group">
						<label>image</label>
						<input type="text" id="image" class="form-control" value="${article.image}">
					</div>
					<div class="form-group">
						<label>contenu</label>
						<textarea class="form-control" id="contenu" value="${article.contenu}">${article.contenu}</textarea>
					</div>
									
				</div>
				<div class="modal-footer">
        <button class="btn btn-success" id="edit_article">Signup Now</button>
        <a href="" data-link>	<input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel"></a> 
        <a href="" data-link id=""><input type="submit" class="btn btn-success" value="Add" ></a>
        </div>
			</form>
		</div>
	</div>
</div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
<script type="module" src="../../index.js"></script>


`;
   
    }
   
 

}
