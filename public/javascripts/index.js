
import abstract from "./view/abstractview.js";

import Home from "./view/home.js";
import Articles from "./view/articles.js";

// import Users from "./view/admin/users.js";
// import admin_article from "./view/admin/articles.js";
// import admin_dashboard from "./view/admin/dashboard.js";

// import author_dashboard from "./view/author/dashboard.js";
// import author_articles from "./view/author/articles.js";
// import my_articles from "./view/author/my_articles.js";
// import show from "./view/author/show.js";
// import create_article from "./view/author/create_article.js";
// import edit_article from "./view/author/edit_article.js";


const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
};

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const router = async () => {
    const routes = [
        { path: "/", view: abstract },
        { path: "/dashboard", view: Home },
        { path: "/articles", view: Articles},
        // { path: "/users", view: Users},
        // { path: "/admin_articles", view: admin_article},
        // { path: "/admin_dashboad", view: admin_dashboard},
        // { path: "/author_dashboad", view: author_dashboard},
        // { path: "/author_articles", view: author_articles},
        // { path: "/my_articles", view: my_articles},
        // { path: "/show", view: show},
        // { path: "/create_article", view: create_article},
        // { path: "/edit_article", view: edit_article},


    ];

    // Test each route for potential match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

    if (!match) {
        match = {
            route: routes[0],
            result: [location.pathname]
        };
    }

    const view = new match.route.view(getParams(match));

    document.querySelector("#app").innerHTML = await view.getHtml();   
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);     
        }
    });

    router();
    
});


  
 $('#navbarDropdownMenuLink').click(async function(){
  $('#lis').empty();
  const categories = await $.ajax({
    url: `http://localhost:3000/categories`,
    method: 'GET',
    dataType: 'json',
  });
  let lis='';
  
  categories.forEach(category => {
    lis+= `
    <li>
    <a  href="/" class="dropdown-item" id="cat" data-category-id="${category.id}" 
    data-category-nom="${category.nom}" data-link>${category.nom}</a>
    </li> 
    
    `;
  });
  $(lis).appendTo("#lis");
 });



 $('#lis').on('click', '#cat', async function() {
  $('#h1').hide();
const categoryId = $(this).data('category-id');
const categoryNom = $(this).data('category-nom');

const articles = await $.ajax({
url: `http://localhost:3000/categories/article/${categoryId}`,
method: 'GET',
dataType: 'json',
});
const cards = [];
console.log(articles.articles.length);
for (let i = 0; i < articles.articles.length; i += 3) {
const article1 = articles.articles[i];
const article2 = articles.articles[i + 1];
const article3 = articles.articles[i + 2];
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
const html=`
<h1 style="text-align: center;">les articles du categorie ${categoryNom}</h1> 
 

 <div class="container px-0 py-3">

    ${cards.join('')}

</div>`;

$(html).appendTo('#app');

});
 









$('#login_button').click(function() {
    $.ajax({
      method: "POST",
      url: 'http://localhost:3000/login',
      headers: {
        'Content-Type': 'application/json'
      },
      crossDomain: true,
      data: JSON.stringify({
        email: $("#email1").val(),
        password: $("#password1").val()
      }),
      error: function(response) {
        $('#mssg').show();
        setTimeout(function() {
          $('#mssg').hide();
        }, 1000); // 30 seconds in milliseconds
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: "Something went wrong!",
          showConfirmButton: false,
          timer: 2000
          })
        
      },
      success: function(response) {
        // Save the JWT token in the browser's localStorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('userData', JSON.stringify(response.data));
        $('.home').removeClass('home');
        $('b').text(response.data.nom);;
        $('#nav-user').hide();
       
        if(response.data.role === 'ADMIN'){

         
          $('#nav-admin').removeAttr('hidden');
          $('#nav-author').hide();
          navigateTo("/articles");

        }
        {
         
          $('#nav-author').removeAttr('hidden');
          navigateTo("/articles");


        }
       
      }
    });
  });

  $('#logout_button').click(function() {
    // Supprimer le jeton d'authentification du localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    navigateTo("/");

  });
  

  // enregistrer un nouveau utilisateur
 $('#save_user').click(function() {
    $.ajax({
      method: "POST",
      url: 'http://localhost:3000/users',
      headers: {
        'Content-Type': 'application/json'
      },
      crossDomain: true,
      data: JSON.stringify({
        nom: $("#nom").val(),
        email: $("#email").val(),
        password: $("#password").val(),
        
      }),
      error: function(response) {
        console.log('erreur!!!');
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: "Something went wrong!",
          showConfirmButton: false,
          timer: 2000
        })

      },
      success: function(response) {
        console.log("bravo!!! ");
        console.log(response.data);
        alert("user saved")
      }
    });
  });


  // lister les utilisateur
    $('#liste-users').click(async function() {
      $('#tbody_user').empty();
       $('#wrapper_user').css('display', 'inline-block');
       $('#wrapper_articles').css('display', 'none');
       $('#h1').hide();
      const users = await $.ajax({
        url: 'http://localhost:3000/users',
        method: 'GET',
        dataType: 'json',
      });
    
      let trs = '';
    
      users.forEach((user, index) => {
        trs += `
          <tr>
            <td>${index + 1}</td>
            <td>${user.nom}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>
              <a id="edit_user" data-article-id="${user.id}" data-link>
              <span class="uil uil-edit-alt"></span>
              </a>
              <a id="delete_user" data-article-id="${user.id}" data-link>
              <span class="uil uil-trash"></span>
              </a>
            </td>
          </tr>`;
      });
    
      $(trs).appendTo('#tbody_user');
    });

// lister les articles
$('#liste-articles').click(async function(page=1) {
  $('#tbody_articles').empty();

  $('#wrapper_articles').css('display', 'inline-block');
  $('#wrapper_user').css('display', 'none');

  $('#h1').hide();

  const take = 12;
   const skip = (page - 1) * take;
   const articles = await $.ajax({
     url: `http://localhost:3000/articles?skip=${skip}&take=${take}`,
     method: 'GET',
     dataType: 'json',
   });

 let trs = '';

 

articles.forEach((article, index) => {
  trs += `
    <tr>
      <td>${index + 1}</td>
      <td>${article.titre}</td>
      <td>${article.contenu}</td>
      <td>${article.image}</td>
      <td>${article.utilisateurId}</td>
      <td>
          <a data-article-id="${article.id}" id="show-article"  data-link>
          <span class="uil uil-eye"></span>
          </a>
          <a id="edit_article" data-article-id="${article.id}" data-link>
          <span class="uil uil-edit-alt"></span>
          </a>
          <a id="delete_article" data-article-id="${article.id}" data-link>
          <span class="uil uil-trash"></span>
          </a>
       </td>
    </tr>`;
 });

 $(trs).appendTo('#tbody_articles');
});




// lister les articles
 $('#myArticles').click(async function() {
   const userData = JSON.parse(localStorage.getItem('userData'));
   $('#tbody_article').empty();
   $('#wrapper_article').css('display', 'inline-block');
  
  $('#h1').hide();
  const articles = await $.ajax({
    url: `http://localhost:3000/articles/user/${userData.id}`,
    method: 'GET',
    dataType: 'json',
  });

 let trs = '';

articles.forEach((article, index) => {
  trs += `
    <tr>
      <td>${index + 1}</td>
      <td>${article.titre}</td>
      <td>${article.contenu}</td>
      <td>${article.image}</td>
      <td>${article.utilisateurId}</td>
      <td>
            <a data-article-id="${article.id}" id="show-article"  data-link>
              <span class="uil uil-eye"></span>
            </a>
            <a  id="edit_article" data-article-id="${article.id}" data-link>
              <span class="uil uil-edit-alt"></span>
            </a>
            <a id="delete_article" data-article-id="${article.id}" data-link>
              <span class="uil uil-trash"></span>
            </a>
      </td>
    </tr>`;
 });

 $(trs).appendTo('#tbody_article');
});
// show article Author
$('#tbody_article').on('click', '#show-article', async function() {
   
  const id = $(this).data('article-id');

  $('#wrapper_article').css('display', 'none');

    const article = await $.ajax({
      url: `http://localhost:3000/articles/${id}`,
      method: 'GET',
      dataType: 'json',
    }); 
  
    const commentaires = await $.ajax({
      url: `http://localhost:3000/articles/commentaires/${id}`,
      method: 'GET',
      dataType: 'json',
    });
  
    console.log(commentaires.commentaires);
    let commentHtml = '';
  
    const articleHtml = `
      <div class="card col-6"> 
        <img src="${article.image}" class="card-img-top" style="height:200px" alt="...">
        <div class="card-body">
          <h5 class="card-title">${article.titre}</h5>
          <p class="card-text">${article.contenu}</p>
          
          <div class="form-group">
            <label>Add Comment</label>
            <textarea class="form-control" id="commentaire"></textarea>
          </div>
          <br>
          <div class="modal-footer">
            <a data-link id="add_comment" data-article-id="${article.id}"><input type="submit" class="btn btn-success" value="Add"></a>
          </div>
        </div>
      </div>
      <div class="card col-6">`;
  
    commentaires.commentaires.forEach((comment) => {
      commentHtml += `
        <div class="card-body p-4">
          <div class="d-flex flex-start">
            <div>
              <h6 class="fw-bold mb-1">${comment.email}</h6>
              <p class="mb-0">
                ${comment.contenu}
              </p>
            </div>
          </div>
        </div>
        <hr class="my-0" style="height: 1px;" />
      `;
    });
  
    const finalHtml = `
      <div class="container-fluid px-2 py-3">
        <div class="row">
          ${articleHtml}
          ${commentHtml}
         </div>
        </div>
      </div>
    `;
  
   $(finalHtml).appendTo('#app');
});

// show article Admin
$('#tbody_articles').on('click', '#show-article', async function() {
   
  const id = $(this).data('article-id');

  $('#wrapper_articles').css('display', 'none');

  const article = await $.ajax({
    url: `http://localhost:3000/articles/${id}`,
    method: 'GET',
    dataType: 'json',
  });

  const articleHtml = `
  <div class="container-fluid px-0 py-3 " style="width: 40rem;">
    <div class="card "> 
      <img src="${article.image}" class="card-img-top" style="height:200px" alt="...">
      <div class="card-body ">
        <h5 class="card-title">${article.titre}</h5>
        <p class="card-text">${article.contenu}</p>
        <a href="#" class="btn btn-primary">Details</a>
      </div>
    </div> 
  </div>`;

   $(articleHtml).appendTo('#app');
});

// edit article Author
$('#tbody_article').on('click', '#edit_article', async function() {
  const id = $(this).data('article-id');
  
  $('#wrapper_article').css('display', 'none');
  $('#edit-form').css('display', 'inline-block');
  
  const article = await $.ajax({
    method: 'PATCH',
    url: `http://localhost:3000/articles/${id}`,
    dataType: 'json'
  });
  
  $('h4 b').text(article.titre);
  $('#id1').val(article.id);
  $('#titre1').val(article.titre);
  $('#image1').val(article.image);
  $('#contenu1').text(article.contenu);
});

// edit article Admin
$('#tbody_articles').on('click', '#edit_article', async function() {
  const id = $(this).data('article-id');
  
  $('#wrapper_articles').css('display', 'none');
  $('#edit-form').css('display', 'inline-block');
  
  const article = await $.ajax({
    method: 'PATCH',
    url: `http://localhost:3000/articles/${id}`,
    dataType: 'json'
  });
  
  $('h4 b').text(article.titre);
  $('#id1').val(article.id);
  $('#titre1').val(article.titre);
  $('#image1').val(article.image);
  $('#contenu1').text(article.contenu);
});

// delete article Author
$('#tbody_article').on('click', '#delete_article', async function() {
  const id = $(this).data('article-id');
  $.ajax({
    method: "DELETE",
    url: `http://localhost:3000/articles/${id}`,
    headers: {
      'Content-Type': 'application/json'
    },
    error: function(response) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: "Something went wrong!",
        showConfirmButton: false,
        timer: 2000
          })
      
    },
    success: function(response) {
      alert('article deleted!!!');
      navigateTo('/articles');
      }
});
});
// delete article Admin
$('#tbody_articles').on('click', '#delete_article', async function() {
  const id = $(this).data('article-id');
  $.ajax({
    method: "DELETE",
    url: `http://localhost:3000/articles/${id}`,
    headers: {
      'Content-Type': 'application/json'
    },
    error: function(response) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: "Something went wrong!",
        showConfirmButton: false,
        timer: 2000
          })
      
    },
    success: function(response) {
      alert('article deleted!!!');
      navigateTo('/articles');
      }
});
});
// delete user Admin
$('#tbody_user').on('click', '#delete_user', async function() {
  const id = $(this).data('article-id');
  $.ajax({
    method: "DELETE",
    url: `http://localhost:3000/users/${id}`,
    headers: {
      'Content-Type': 'application/json'
    },
    error: function(response) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: "Something went wrong!",
        showConfirmButton: false,
        timer: 2000
          })
      
    },
    success: function(response) {
      alert('user deleted!!!');
      navigateTo('/articles');
      }
});
});

  
  $('#save_article').click(function() {
    const userData = JSON.parse(localStorage.getItem('userData'));
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
        utilisateurId: userData.id
      
      }),
      error: function(response) {
        console.log("erreur!!!");
      },
      success: function(response) {
        alert("article saved");
        navigateTo('/articles');
      }
    });
  });
  




  $('#edit-article').click(function() {
    const id= $('#id1').val();
    
    const userData = JSON.parse(localStorage.getItem('userData'));
    $.ajax({
      method: "PATCH",
      url: `http://localhost:3000/articles/${id}`,
      headers: {
        'Content-Type': 'application/json'
      },
      crossDomain: true,
      data: JSON.stringify({
        titre: $("#titre1").val(),
        contenu: $("#contenu1").val(),
        image: $("#image1").val(),
        utilisateurId: userData.id
      }),
      error: function(response) {
        console.log("erreur!!!");
      },
      success: function(response) {
        console.log("nice!!");
        alert("changes saved");
        navigateTo('/articles');
      }
    });
  });


  $('#cancel').click(function(event) {
    const userData = JSON.parse(localStorage.getItem('userData'));
    $('#edit-form').css('display', 'none');
    if(userData.role ==='ADMIN'){
      $('#wrapper_articles').css('display', 'inline-block');
    }esle
    $('#wrapper_article').css('display', 'inline-block');
  });
  

  $('#app').on('click', '#details', async function() {
    const id = $(this).data('article-id');
    const article = await $.ajax({
      url: `http://localhost:3000/articles/${id}`,
      method: 'GET',
      dataType: 'json',
    }); 
  
    const commentaires = await $.ajax({
      url: `http://localhost:3000/articles/commentaires/${id}`,
      method: 'GET',
      dataType: 'json',
    });
  
    console.log(commentaires.commentaires);
    let commentHtml = '';
  
    const articleHtml = `
      <div class="card col-6"> 
        <img src="${article.image}" class="card-img-top" style="height:200px" alt="...">
        <div class="card-body">
          <h5 class="card-title">${article.titre}</h5>
          <p class="card-text">${article.contenu}</p>
          
          <div class="form-group">
            <label>Add Comment</label>
            <textarea class="form-control" id="commentaire" val=''></textarea>
          </div>
          <br>
          <div class="modal-footer">
            <a data-link id="add_comment" data-article-id="${article.id}"><input type="submit" class="btn btn-success" value="Add"></a>
          </div>
        </div>
      </div>
      <div class="card col-6">`;
  
    commentaires.commentaires.forEach((comment) => {
      commentHtml += `
        <div class="p-4">
          <div class="d-flex flex-start">
            <div>
              <h6 class="fw-bold mb-1">${comment.email}</h6>
              <p class="mb-0">
                ${comment.contenu}
              </p>
            </div>
          </div>
        </div>
        <hr class="my-0" style="height: 1px;" />
      `;
    });
  
    const finalHtml = `
      <div class="container-fluid px-2 py-3">
        <div class="row">
          ${articleHtml}
          ${commentHtml}
         </div>
        </div>
      </div>
    `;
  
    $(finalHtml).appendTo('#app');
  });
  

  $('#app').on('click', '#add_comment', async function() {
    let email = '';
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData && userData.email) {
      email = userData.email;
    } else {
      email = faker.internet.email();
    }
  
    const id_article = $(this).data('article-id');
  
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/commentaires',
      headers: {
        'Content-Type': 'application/json',
      },
      crossDomain: true,
      data: JSON.stringify({
        email: email,
        contenu: $('#commentaire').val(),
        articleId: id_article,
      }),
      error: function(response) {
        console.log(response);
      },
      success: function(response) {
        console.log('Bravo!');
        console.log(response.data);
        alert('Commentaire saved');
      },
    });
  });
  













