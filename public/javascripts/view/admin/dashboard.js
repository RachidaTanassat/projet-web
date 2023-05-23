export default class {
  constructor(params) {
      this.params = params;
      document.title = "admin";
      
  }




  async parent() {
    const userData = JSON.parse(localStorage.getItem('userData'));
      return `
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">


     
 <!-- Navbar -->
 <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #e3f2fd;">
   <!-- Container wrapper -->
   <div class="container-fluid">
     <!-- Toggle button -->
     <button
       class="navbar-toggler"
       type="button"
       data-mdb-toggle="collapse"
       data-mdb-target="#navbarSupportedContent"
       aria-controls="navbarSupportedContent"
       aria-expanded="false"
       aria-label="Toggle navigation"
     >
       <i class="fas fa-bars"></i>
     </button>
 
     <!-- Collapsible wrapper -->
     <div class="collapse navbar-collapse" id="navbarSupportedContent">
       <!-- Left links -->
       <ul class="navbar-nav me-auto mb-2 mb-lg-0">
         <li class="nav-item">
           <a class="nav-link" href="/admin_dashboad" data-link>Dashboard</a>
         </li>
         <li class="nav-item">
           <a class="nav-link" href="/users" data-link>Users</a>
         </li>
         <li class="nav-item">
           <a class="nav-link" href="/admin_articles" data-link>Articles</a>
         </li>
       </ul>
       <!-- Left links -->
     </div>
     <!-- Collapsible wrapper -->

       <!-- Avatar -->
       <div class="dropdown">
         <a
           class="dropdown-toggle d-flex align-items-center hidden-arrow"
           href="#"
           id="navbarDropdownMenuAvatar"
           role="button"
           data-mdb-toggle="dropdown"
           aria-expanded="false"
         >
           <img
             src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
             class="rounded-circle"
             height="25"
             alt="Black and White Portrait of a Man"
             loading="lazy"
           />
          
         </a>
         <h4>${userData.nom}</h4>
         <ul
           class="dropdown-menu dropdown-menu-end"
           aria-labelledby="navbarDropdownMenuAvatar"
         >
           <li>
             <a class="dropdown-item" href="#">My profile</a>
           </li>
           <li>
             <a class="dropdown-item" href="#">Settings</a>
           </li>
           <li>
             <a class="dropdown-item" href="#">Logout</a>
           </li>
         </ul>
       </div>
     </div>
     <!-- Right elements -->
   </div>
   <!-- Container wrapper -->
 </nav>
 <!-- Navbar -->
 
   
<!-- MDB -->

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>


<script type="module" src="../../index.js"></script>


      ` ;
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

   const parent = await this.parent();
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
          <a href="#" class="btn btn-primary">Go somewhere</a>
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
          <a href="#" class="btn btn-primary">Go somewhere</a>
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
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
        </div>
          ` : '';




        const cardsRow = `<div class="row  gx-4 py-3">${card1}${card2}${card3}</div>`;
        cards.push(cardsRow);
    
    }
   
   return  parent + ` 

      
       <div class="container px-0 py-3">
        
          ${cards.join('')}
        
      </div>

      
      `;

      
  }
}

