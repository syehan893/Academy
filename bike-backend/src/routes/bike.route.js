import BikeService from '../services/bike.service';

const bikeService = new BikeService()

const bike = [{

    method: 'GET',
    path: '/bikes',
    handler: async (request, h) => {
        const findAllBike = await bikeService.findAll();
        return h.response(findAllBike);

    }
}, {
    method: 'GET',
    path: '/bike/{id?}',
    handler: async (request, h) => {
        const findOne = await bikeService.findOne(request.params.id);
        return h.response(findOne);
    }
}, {
    method: 'POST',
    path: '/bike',
    handler: async (request, h) => {
        const create = await bikeService.create(request.payload);
        return h.response(create);
    }
},{
    method : 'PUT',
    path : '/bike',
    handler : async (request, h) => {
        const update = await bikeService.update(request.payload);
        return h.response(update);
    }
},{
    method : 'DELETE',
    path : '/bike/{id?}',
    handler : async (request, h) => {
        const deleteById = await bikeService.delete(request.params.id);
        return h.response(deleteById);
    }
}]

export default bike;