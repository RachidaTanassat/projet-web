import Abstract from "./dashboard.js";

export default class extends Abstract {
	constructor() {
		super()
		
	}

  async getUsers() {
    

    const users = await $.ajax({
      url: 'http://localhost:3000/users',
      method: 'GET',
      dataType: 'json',
    });
    return users;
  }

  async getHtml() {
    const parentHtml = await super.parent();
    const users = await this.getUsers();

    let html = `

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.css">

      <div class="wrapper">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-12">
              <div class="page-header clearfix">
                <h2 class="pull-left">Liste des utilisateurs</h2>
               <a href="" class="btn btn-success pull-right">Ajouter un utilisateur</a>
              
              </div>
              
        

              <table class="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
    `;

    users.forEach((user, index) => {
      html += `
        <tr>
          <td>${index + 1}</td>
          <td>${user.nom}</td>
          <td>${user.email}</td>
          <td>${user.role}</td>
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

    return   parentHtml + html;
  }
}

