import Abstract from './dashboard.js'

export default class extends Abstract {
	constructor() {
		super()	
	}
    async getArticles() {
        const userData = JSON.parse(localStorage.getItem('userData'));

		const articles = await $.ajax({
			url: `http://localhost:3000/articles/user/${userData.id}`,
			method: 'GET',
			dataType: 'json',
		})
		return articles
	}
    
    async getHtml(){
        const parentHtml = await super.getHtml();


        const articles = await this.getArticles();


        


        
    let html = `

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.css">

      <div class="wrapper">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-12">
              <div class="page-header clearfix">
                <h2 class="pull-left">Mes articles</h2>
                <a href="/create_article" class="btn btn-success pull-right" data-link>Ajouter un article</a>              
                </div>
              
        

              <table class="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>titre</th>
                    <th>contenu</th>
                    <th>image</th>
                    <th>id_user</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
    `;

    articles.forEach((article, index) => {
      html += `
        <tr>
          <td>${index + 1}</td>
          <td>${article.titre}</td>
          <td>${article.contenu}</td>
          <td>${article.image}</td>
          <td>${article.utilisateurId}</td>
          <td>
            <a href="/show?id=${article.id}" title="View Record" data-toggle="tooltip" class="glyphicon glyphicon-eye-open" data-link>
              
            </a>
            <a class="glyphicon glyphicon-pencil" href="/edit_article?id=${article.id}" title="Update Record" data-toggle="tooltip" data-link>
           
            </a>
            <a  class="glyphicon glyphicon-trash" href="" title="Delete Record" data-toggle="tooltip" data-link>
          
            </a>
          </td>
        </tr>
      `;
    });

    html += `
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.js"></script>
      

    `;

    return parentHtml + html;




         

    }


}