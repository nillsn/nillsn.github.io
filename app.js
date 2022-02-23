import RouteController from './routeController.js';
import ComponentBuilder from './componentBuilder.js';

RouteController.validateRoute();

customElements.define('app-component', ComponentBuilder);
