import Abstract from './abstractview.js'

export default class extends Abstract {
	constructor() {
		super()
		this.setTitle('Articles')
	}
	async getArticles(page = 1) {
		const take = 12
		const skip = (page - 1) * take
		const articles = await $.ajax({
			url: `http://localhost:3000/articles?skip=${skip}&take=${take}`,
			method: 'GET',
			dataType: 'json',
		})
		return articles
	}


async getHtml(page = 1) {
  $('#h1').hide();
  $('.wrapper').css('display', 'none');
    const articlesCount = 100;
    const take = 12;
    const skip = (page - 1) * take;
    const articles = await this.getArticles(page);
    const cards = [];
    
    for (let i = 0; i < articles.length; i += 3) {
      const article1 = articles[i];
      const article2 = articles[i + 1];
      const article3 = articles[i + 2]; 
      const card1 = `
  
      <div class="col-lg-4">
      <div class="card  d-flex  flex-md-row flex-lg-column"> 
        <div class="flex-fill">
        <img src="${article1.image}" class="card-img-top" style="height:200px" alt="...">
        </div>
        <div class="card-body flex-fill ">
          <h5 class="card-title">${article1.titre}</h5>
          <p class="card-text">${article1.contenu}</p>
          <a href="/" id="details" data-link class="btn btn-primary" data-article-id="${article1.id}">Details</a>
        </div>
      </div>
      </div>
        `;
  
      const card2 = article2 ? `
      
      <div class="col-lg-4">
      <div class="card  d-flex  flex-md-row flex-lg-column"> 
        <div class="flex-fill">
        <img src="${article2.image}" class="card-img-top" style="height:200px" alt="...">
        </div>
        <div class="card-body flex-fill ">
          <h5 class="card-title">${article2.titre}</h5>
          <p class="card-text"> ${article2.contenu}</p>
          <a href="/" id="details" data-link class="btn btn-primary" data-article-id="${article2.id}">Details</a>
        </div>
      </div>
      </div>
        ` : '';
        const card3 = article3 ? `
      
        <div class="col-lg-4">
        <div class="card  d-flex  flex-md-row flex-lg-column"> 
          <div class="flex-fill">
          <img src="${article3.image}" class="card-img-top" style="height:200px" alt="...">
          </div>
          <div class="card-body flex-fill ">
            <h5 class="card-title">${article3.titre}</h5>
            <p class="card-text">${article3.contenu}</p>
            <a href="/" id="details" data-link class="btn btn-primary" data-article-id="${article3.id}">Details</a>
          </div>
        </div>
        </div>
          ` : '';
        const cardsRow = `<div class="row  gx-4 py-3">${card1}${card2}${card3}</div>`;
        cards.push(cardsRow);
    
    }
   
   return `

   <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css">

      <h1 style="text-align: center;">New Articles</h1> 
      
       <div class="container px-0 py-3">
        
          ${cards.join('')}
        
      </div>

      
      `;

      
  }





}