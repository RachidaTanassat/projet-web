import Abstract from './dashboard.js'

export default class extends Abstract {
	constructor() {
		super()	
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

    const parentHtml = await super.getHtml();
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
          <a href="#" class="btn btn-primary">Commenter</a>
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
          <a href="#" class="btn btn-primary">Commenter</a>
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
            <a href="#" class="btn btn-primary">Commenter</a>
          </div>
        </div>
        </div>
          ` : '';




        const cardsRow = `<div class="row  gx-4 py-3">${card1}${card2}${card3}</div>`;
        cards.push(cardsRow);
    
    }
   
   return  parentHtml +` 

      
       <div class="container px-0 py-3">
        
          ${cards.join('')}
        
      </div>

      
      `;

      
  }
}
