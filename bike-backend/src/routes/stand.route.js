import StandService from '../services/stand.service';

const standService = new StandService();

const stand = [{
    method : 'GET',
    path : '/stands',
    handler : async (request, h) => {
        const findAll = await standService.findAll();
        return h.response(findAll);
    }
},{
    method : 'GET',
    path : '/stand/{id?}',
    handler : async (request, h) => {
        const findOne = await standService.findOne(request.params.id);
        return h.response(findOne);
    }
},{
    method : 'POST',
    path : '/stand',
    handler : async (request, h) => {
        const create = await standService.create(request.payload);
        return h.response(create);
    }
},{
    method : 'PUT',
    path : '/stand',
    handler : async (request, h) => {
        const update = await standService.update(request.payload);
        return h.response(update);
    }
},{
    method : 'DELETE',
    path : '/stand/{id?}',
    handler : async (request, h) => {
        const deleteById = await standService.delete(request.params.id);
        return h.response(deleteById);
    }
}
]

export default stand;