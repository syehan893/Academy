import landing from './landing';
import bike from './bike.route';
import rent from './rent.route';
import user from './user.route';
import stand from './stand.route';
import doc from './doc.route';
import merge from './doc.merge.route';
import pdf from './pdf.route';
import drive from './gdrive.route';

const routes = [].concat(drive,landing,bike,rent,user,stand,doc,merge,pdf);

export default routes;