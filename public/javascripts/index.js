import Home from "./view/home.js";
import Articles from "./view/articles.js";

import Users from "./view/admin/users.js";
import admin_article from "./view/admin/articles.js";
import admin_dashboard from "./view/admin/dashboard.js";

import author_dashboard from "./view/author/dashboard.js";
import author_articles from "./view/author/articles.js";
import my_articles from "./view/author/my_articles.js";
import show from "./view/author/show.js";
import create_article from "./view/author/create_article.js";
import edit_article from "./view/author/edit_article.js";


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
        { path: "/", view: Home },
        { path: "/articles", view: Articles},
        { path: "/users", view: Users},
        { path: "/admin_articles", view: admin_article},
        { path: "/admin_dashboad", view: admin_dashboard},
        { path: "/author_dashboad", view: author_dashboard},
        { path: "/author_articles", view: author_articles},
        { path: "/my_articles", view: my_articles},
        { path: "/show", view: show},
        { path: "/create_article", view: create_article},
        { path: "/edit_article", view: edit_article},


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
            $('.home').removeClass('home');
            $('.header').hide();
            
            
        }
    });

    router();
    
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
        
      },
      success: function(response) {
        // Save the JWT token in the browser's localStorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('userData', JSON.stringify(response.data));
        // Navigate to the /users route
        $('.home').removeClass('home');
        $(".header").hide();
        $(".form_container").hide();
        if(response.data.role === 'ADMIN'){
        
          navigateTo("/admin_dashboad");
        }
        else navigateTo("/author_articles"); 
      }
    });
  });

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




  
  $('#save_article').click(function() {
    console.log('hi');
    console.log($("#titre").val())
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
        utilisateurId: 895
      }),
      error: function(response) {
        console.log("erreur!!!");
      },
      success: function(response) {
        console.log("nice!!");
        alert("article saved");
        navigateTo("/my_articles");
      }
    });
  });
  

  $('#edit_article').click(function() {
    var id = document.getElementById('titre').value;
    $.ajax({
      method: "POST",
      url: 'http://localhost:3000/articles/${id}',
      headers: {
        'Content-Type': 'application/json'
      },
      crossDomain: true,
      data: JSON.stringify({
        titre: $("#titre").val(),
        contenu: $("#contenu").val(),
        image: $("#image").val(),
        utilisateurId: 895
      }),
      error: function(response) {
        console.log("erreur!!!");
      },
      success: function(response) {
        console.log("nice!!");
        alert("article saved");
        navigateTo("/my_articles");
      }
    });
  });


//   //ajout des artcles pour un user courant
// document.getElementById('save_article').addEventListener('click', function (event) {
//   event.preventDefault(); 
//   var title = document.getElementById('titre').value;
//   var content = document.getElementById('contenu').value;
//   // var category = document.getElementById('category').value;
//   var image = document.getElementById('image').value;
//   // var id = parseInt(document.getElementById('ArticleCreator').value); 
//   // console.log(typeof(id))
//   console.log(title, content, image);

//   var data = {
//     utilisateurId: 895,
//     titre: title,
//     contenu: content,
//     image: image
//   };

//   $.ajax({
//     url: 'http://localhost:3000/articles',
//     method: 'POST',
//     data: data,
//     success: function (response) {
//       console.log('Article créé avec succès');
//       alert('Article créé avec succès');
//       document.getElementById('title').value = '';
//       document.getElementById('content').value = '';
//       document.getElementById('image').value = '';
//     },
//     error: function (error) {
//       console.error('Erreur lors de la création de l\'article', error);
//       alert('Erreur lors de la création de l\'article');
//     }
//   });
// });