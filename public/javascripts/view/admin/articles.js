import Abstract from './dashboard.js'

export default class extends Abstract {
	constructor() {
		super()
		
	}
	async getArticles(page = 1) {
		const take = 10
		const skip = (page - 1) * take
		const articles = await $.ajax({
			url: `http://localhost:3000/articles?skip=${skip}&take=${take}`,
			method: 'GET',
			dataType: 'json',
		})
		return articles
	}
	async getHtml(page = 1) {

    const parentHtml = await super.parent();
    
		const articlesCount = 100
		const pagesCount = articlesCount / 10
		const articles = await this.getArticles(page)


        
    let html = `

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.css">
   
      <div class="wrapper">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-12">
              <div class="page-header clearfix">
                <h2 class="pull-left">Liste des articles</h2>              
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
            <a href="#" title="View Record" data-toggle="tooltip">
              <span class="glyphicon glyphicon-eye-open"></span>
            </a>
            <a href="#" title="Update Record" data-toggle="tooltip">
              <span class="glyphicon glyphicon-pencil"></span>
            </a>
            <a href="#" title="Delete Record" data-toggle="tooltip">
              <span class="glyphicon glyphicon-trash"></span>
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