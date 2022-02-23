import routes from './routes.js';

export default class RouteController {
  static validateRoute() {
    const urlParameters = new URLSearchParams(window.location.search);
    const actualRoute = urlParameters.get('route');

    if (actualRoute === null) {
      window.location.href = '?route=index';
      return;
    }

    const validatedRoute = routes[actualRoute];

    if (validatedRoute !== true) {
      window.location.href = '?route=404';
    }
  }
}
