import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('home');
  this.route('cargar-receta');
  this.route('comidas');
  this.route('entradas');
  this.route('favoritos');
  this.route('postres');
});

export default Router;
