import AbstractView from "../public/javascripts/view/AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Articles");
    }

   

     getArticles() {
            $.ajax({
                url: "http://localhost:3000/articles",
                method: 'GET',
                dataType: 'json',
              })
              return articles
          }

//           async getHtml(){

//             $.ajax({
//                 url: "http://localhost:3000/articles",
//                 method: 'GET',
//                 dataType: 'json',
//             success: function(articles){ 
//             var html = " ";
            
//             articles.forEach(function(article) {
           
//             html+='<div class="container">'
//                +'<div class="row">'
//                + '<div class="col-md-4 offset-md-4">'
//                +  ' <div class="card">'
//                +     '<img class="card-img" src="'+ article.image + '" alt="Bologna">'
//                 +'  <div class="card-img-overlay">'
//                 +      '<a href="#" class="btn btn-light btn-sm">'+ article.titre+'</a>'
//                 +  '  </div>'
//                  +   '<div class="card-body">'
//                  +    ' <h4 class="card-title">'+ article.titre+'</h4>'
//                  +     '<small class="text-muted cat">'
//                 +        '<i class="far fa-clock text-info"></i> 30 minutes'
//                 +       ' <i class="fas fa-users text-info"></i> 4 portions'
//                 +     ' </small>'
//                 +      '<p class="card-text">' + article.contenu+' </p>'
//                 +      '<a href="#" class="btn btn-info">Read Recipe</a>'
//                 +    '</div>'
//                 +    '<div class="card-footer text-muted d-flex justify-content-between bg-transparent border-top-0">'
//                 +     ' <div class="views">Oct 20, 12:45PM'
//                 +     ' </div>'
//                 +     ' <div class="stats">'
//                 +          ' <i class="far fa-eye"></i> 1347'
//                 +       ' <i class="far fa-comment"></i> 12'
//                 +     ' </div>'
//                 +       
//                 +    '</div>'
//                 +  '</div>'
//              +  ' </div>'
//             + ' </div>'
//            + '</div> ' 









                
//                 //  html += ' <div class="card  d-flex  flex-md-row flex-lg-column">'
//                 //  + '<div class="flex-fill">'
//                 //  + '<img class="card-img-top" style="height:200px" src="'+ article.image +'" alt="Card image cap"></img> </div>'
//                 //  + ' <div class="card-body flex-fill ">'
//                 //  + ' <h5 class="card-title">'+ article.titre + '</h5>';
//                 //  + '<p class="card-text">'+ article.contenu +'</p>';
//                 //  + '<a href="#" class="btn btn-primary">Go somewhere</a>';
//                 //  + '</div> </div></div>'
//                 $("#app").html(html);
//             });
           
            
//             // <div class="container px-0 py-3">
//             // <div class="row  gx-4">   style="width: 18rem;
//             //   <div class="col-lg-4">
//             // <div class="card  d-flex  flex-md-row flex-lg-column"> 
//             //   <div class="flex-fill">
//             //   <img src="https://picsum.photos/800/300/?126" class="card-img-top" style="height:200px" alt="...">
//             //   </div>
//             //   <div class="card-body flex-fill ">
//             //     <h5 class="card-title">Card title</h5>
//             //     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//             //     <a href="#" class="btn btn-primary">Go somewhere</a>
//             //   </div>
//             // </div>
//             // </div>
//         },
//     });
     
// }

   
    
async getHtml() {
    // const articlesCount = 100
    // const pagesCount = articlesCount / 10
    const articles = await this.getArticles()
    const cards = articles.map((article) => {
        // const contentPreview = article.content.substring(0, 30) + '...'
        // const publishedAt = new Date(article.updatedAt)
        // const date = `${publishedAt.getDate()}/${
        //     publishedAt.getMonth() + 1
        // }/${publishedAt.getFullYear()}`
        return `<div class="container">
                    <div class="row">
                        <div class="col-md-4 offset-md-4">
                            <div class="blog-card">
                                <img src="${article.image}" alt="" class="blog-thumbnail">
                                <div class="blog-container">
                                    <a href="/category/${article.titre}" class="nav__link blog-category text-uppercase dark-link" data-link>${article.id}</a>
                                    <h4 class="mt-2 font-weight-bold"><a href="/articles/${article.id}" class="nav__link dark-link" data-link>${article.title}</a></h4>
                                    <p class="blog-desc"></p>
                                    <div class="blog-footer">
                                        <div>
                                            <a href="/user/${article.id}" class="nav__link" data-link>${article.id}</a>
                                        </div>
                                        <small></small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
    })
    return `<h1>Articles</h1> `.concat(cards.join(''))
}
}