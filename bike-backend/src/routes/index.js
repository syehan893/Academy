import landing from './landing';
import bike from './bike.route';
import rent from './rent.route';
import user from './user.route';
import stand from './stand.route';

const routes = [].concat(landing,bike,rent,user,stand);

export default routes;