import UserService from '../services/user.service';

const userService = new UserService();

const user = [{
    method : 'GET',
    path : '/users',
    handler : async (request, h) => {
        const findAll = await userService.findAll();
        return h.response(findAll);
    }
},{
    method : 'GET',
    path : '/user/{id?}',
    handler : async (request, h) => {
        const findOne = await userService.findOne(request.params.id);
        return h.response(findOne);
    }
},{
    method : 'POST',
    path : '/user',
    handler : async (request, h) => {
        const create = await userService.create(request.payload);
        return h.response(create);
    }
},{
    method : 'PUT',
    path : '/user',
    handler : async (request, h) => {
        const update = await userService.update(request.payload);
        return h.response(update);
    }
},{
    method : 'DELETE',
    path : '/user/{id?}',
    handler : async (request, h ) => {
        const deleteById = await userService.delete(request.params.id);
        h.response(deleteById);
    }
}
]

export default user;