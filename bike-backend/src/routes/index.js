import landing from './landing';
import bike from './bike.route';
import rent from './rent.route';
import user from './user.route';
import stand from './stand.route';
import google from './google.route';
import merge from './merge.route';
import pdf from './pdf.route';
import drive from './gdrive.route';

const routes = [].concat(drive,landing,bike,rent,user,stand,google,merge,pdf);

export default routes;