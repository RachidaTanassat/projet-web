export default class {
    constructor(params) {
        this.params = params;
        document.title = "author";
        
    }
  
  
  
  
    async getHtml() {
  
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
             <a class="nav-link" href="/author_articles" data-link>Dashboard</a>
           </li>
           <li class="nav-item">
             <a class="nav-link" href="/my_articles" data-link> Mes Articles</a>
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
  
  
        `;
    }
    
  }