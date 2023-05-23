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
    const articlesCount = 100;
    const take = 12;
    const skip = (page - 1) * take;
    const articles = await this.getArticles(page);
    const cards = [];
    
    for (let i = 0; i < articles.length; i += 3) {
      const article1 = articles[i];
      const article2 = articles[i + 1];
      const article3 = articles[i + 2];

      // const contentPreview1 = article1.contenu.substring(0, 30) + '...';
      // const contentPreview2 = article2 ? article2.contenu.substring(0, 30) + '...' : '';
      // const contentPreview3 = article3 ? article3.contenu.substring(0, 30) + '...' : '';
      // const publishedAt1 = new Date(article1.updatedAt);
      // const date1 = `${publishedAt1.getDate()}/${publishedAt1.getMonth() + 1}/${publishedAt1.getFullYear()}`;
  
      // const publishedAt2 = article2 ? new Date(article2.updatedAt) : null;
      // const date2 = article2 ? `${publishedAt2.getDate()}/${publishedAt2.getMonth() + 1}/${publishedAt2.getFullYear()}` : '';

      // const publishedAt3 = article3 ? new Date(article3.updatedAt) : null;
      // const date3 = article3 ? `${publishedAt3.getDate()}/${publishedAt3.getMonth() + 1}/${publishedAt3.getFullYear()}` : '';
      
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




// async getHtml(page = 1) {
//   const articlesCount = 100;
//   const take = 10;
//   const skip = (page - 1) * take;
//   const articles = await this.getArticles(page);
//   const cards = [];

//   for (let i = 0; i < articles.length; i += 2) {
//     const article1 = articles[i];
//     const article2 = articles[i + 1];

//     const contentPreview1 = article1.contenu.substring(0, 30) + '...';
//     const contentPreview2 = article2 ? article2.contenu.substring(0, 30) + '...' : '';

//     const publishedAt1 = new Date(article1.updatedAt);
//     const date1 = `${publishedAt1.getDate()}/${publishedAt1.getMonth() + 1}/${publishedAt1.getFullYear()}`;

//     const publishedAt2 = article2 ? new Date(article2.updatedAt) : null;
//     const date2 = article2 ? `${publishedAt2.getDate()}/${publishedAt2.getMonth() + 1}/${publishedAt2.getFullYear()}` : '';

//     const card1 = `
//     <div class="col-md-6 mb-4">
//     <div class="blog-card">
//       <img src="${article1.image}" alt="" class="blog-thumbnail">
//       <div class="blog-container">
//         <a href="/category/${article1.id}" class="nav__link blog-category text-uppercase dark-link" data-link>${article1.id}</a>
//         <h4 class="mt-2 font-weight-bold"><a href="/articles/${article1.id}" class="nav__link dark-link" data-link>${article1.titre}</a></h4>
//         <p class="blog-desc">${contentPreview1}</p>
//         <div class="blog-footer">
//           <div>
//             <a href="/user/${article1.id}" class="nav__link" data-link>${article1.id}</a>
//           </div>
//           <small>${date1}</small>
//         </div>
//       </div>
//     </div>
//   </div>
//   `;

// const card2 = article2 ? `

//   <div class="col-md-6 ">
//     <div class="blog-card">
//       <img src="${article2.image}" alt="" class="blog-thumbnail">
//       <div class="blog-container">
//         <a href="/category/${article2.id}" class="nav__link blog-category text-uppercase dark-link" data-link>${article2.id}</a>
//         <h4 class="mt-2 font-weight-bold"><a href="/articles/${article2.id}" class="nav__link dark-link" data-link>${article2.titre}</a></h4>
//         <p class="blog-desc">${contentPreview2}</p>
//         <div class="blog-footer">
//           <div>
//             <a href="/user/${article2.id}" class="nav__link" data-link>${article2.id}</a>
//           </div>
//           <small>${date2}</small>
//         </div>
//       </div>
//     </div>
//   </div>
//   ` : '';

//     cards.push(card1 + card2);
//   }

//   return `
//     <h1>Articles</h1> 
//     <div class="container">
//       <div class="row">
//         ${cards.join('')}
//       </div>
//     </div>
//     <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">
//     <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>
//   `;
// }

}