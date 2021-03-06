terraform {
  required_providers {
    onelogin = {
      source = "onelogin/onelogin"
      version = "0.1.6"
    }
  }
}

resource onelogin_oidc_apps my_app {
	connector_id = 108419
	configuration = {
		login_url = "http://localhost/login_pkce"
		oidc_application_type = "0"
		redirect_uri = "http://localhost/login_pkce\nhttp://localhost\nhttp://localhost:8000\nhttp://127.0.0.1:8000"
		token_endpoint_auth_method = "2"
	}
	name = "My App"
}

resource onelogin_users username {
	email = "user.name@email.com"
	lastname = "name"
	firstname = "user"
	username = "user.name"
}

resource onelogin_roles oidc_app_role {
  name = "oidc_app_role"
  apps = [onelogin_oidc_apps.my_app.id]
	depends_on = [onelogin_oidc_apps.my_app, onelogin_users.username]
  users = [onelogin_users.username.id]
  admins= [onelogin_users.username.id]
}
