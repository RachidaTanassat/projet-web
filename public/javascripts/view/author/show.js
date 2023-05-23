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
    
    return  parentHtml + `<div class="container-fluid px-0 py-3 " style="width: 40rem;">
      
      <div class="card "> 
        
        <img src="${article.image}" class="card-img-top" style="height:200px" alt="...">
       
        <div class="card-body ">
          <h5 class="card-title">${article.titre}</h5>
          <p class="card-text">${article.contenu}</p>
          <a href="#" class="btn btn-primary">Details</a>
        </div>
    
    </div> 
    </div>`;
   
    }
   
 

}
