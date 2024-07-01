const accessControl = {
    user: {
      add: {
        api_path: "/",
        permission: "create:user",
        description: "Create New User"
      },
      edit: {
        api_path: "/:id",
        permission: "edit:user",
        description: "Edit User"
      },
      delete: {
        api_path: "/:id",
        permission: "delete:user",
        description: "Delete User"
      },
      get_all: {
        api_path: "/",
        permission: "get:all:user",
        description: "Get All Users"
      },
      get: {
        api_path: "/:id",
        permission: "get:user",
        description: "Get User by Id"
      },
    },
    role: {
      add: {
        api_path: "/",
        permission: "create:role",
        description: "Create New Role"
      },
      edit: {
        api_path: "/:id",
        permission: "edit:role",
        description: "Edit Role"
      },
      delete: {
        api_path: "/:id",
        permission: "delete:role",
        description: "Delete Role"
      },
      get_all: {
        api_path: "/",
        permission: "get:all:role",
        description: "Get All Roles"
      },
      get: {
        api_path: "/:id",
        permission: "get:role",
        description: "Get Role by Id"
      },
    },
  };
  
  export default accessControl