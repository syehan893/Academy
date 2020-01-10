import RentService from '../services/rent.service';

const rentService =  new RentService();

const rent = [{
   method : 'GET',
   path : '/rents',
   handler : async (request, h) => {
       const findAll = await rentService.findAll();
       return h.response(findAll);
   }
},{
    method : 'GET',
    path : '/rent/{id?}',
    handler : async (request, h) => {
        const findOne = await rentService.findOne(request.params.id);
        return h.response(findOne);
    }
},{
    method : 'POST',
    path : '/rent',
    handler : async (request, h) => {
        const create = await rentService.create(request.payload);
        return h.response(create);
    }
},{
    method : 'PUT',
    path : '/rent',
    handler : async (request, h) => {
        const update = await rentService.update(request.payload);
        return h.response(update);
    }
},{
    method : 'DELETE',
    path : '/rent/{id?}',
    handler : async (request, h) => {
        const deleteById = await rentService.delete(request.params.id);
        return h.response(deleteById);
    }
}]

export default rent;