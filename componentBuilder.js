import AppComponent from './components/app.component.js';
import Components from './components.js';

export default class ComponentBuilder extends HTMLElement {
  constructor() {
    super();

    const expectedRoute = this.getExpectedRoute();
    const actualRoute = ComponentBuilder.getActualRoute();

    let showComponent;

    if (expectedRoute === undefined) {
      showComponent = true;
    } else if (expectedRoute !== undefined && actualRoute === undefined) {
      showComponent = false;
    } else if (expectedRoute !== undefined && actualRoute !== undefined) {
      if (expectedRoute === actualRoute) {
        showComponent = true;
      } else {
        showComponent = false;
      }
    }

    if (showComponent !== true) {
      return;
    }

    const Component = this.getComponentDetails();

    if (Component === undefined) {
      const name = this.getAttribute('name');
      throw new Error(`ComponentNotFound: ${name}`);
    } else {
      this.component = new Component();
      this.buildPage();
    }
  }

  static getActualRoute() {
    const urlParameters = new URLSearchParams(window.location.search);
    const actualRoute = urlParameters.get('route');

    if (actualRoute === null) {
      return undefined;
    }

    return actualRoute;
  }

  getExpectedRoute() {
    const expectedRoute = this.getAttribute('route');

    if (expectedRoute === null) {
      return undefined;
    }

    return expectedRoute;
  }

  getComponentDetails() {
    const name = this.getAttribute('name');

    if (name === null) {
      return AppComponent;
    }

    const component = Components[name];

    if (component === undefined) {
      return undefined;
    }

    return component;
  }

  buildPage() {
    const component = this.getComponentDetails();
    const { template } = component;

    fetch(template).then((result) => {
      result.text().then((text) => {
        this.innerHTML = text;

        this.updateProperties();
        this.updateForEach();
        this.updateEventListeners();
      });
    });
  }

  updateForEach() {
    const forEachElements = this.querySelectorAll('[forEach]');

    forEachElements.forEach((element) => {
      const parentElement = element.parentNode;

      const forEachName = element.getAttribute('forEach');
      const forEachArray = this.component[forEachName];

      if (forEachArray === undefined) {
        return;
      }

      forEachArray.forEach((arrayElement) => {
        const newElement = element.cloneNode(true);
        const hereElements = newElement.querySelectorAll('[forEachHere]');

        hereElements.forEach((hereElement) => {
          const forEachHereAttribute = hereElement.getAttribute('forEachHere');
          const copyOfHereElement = hereElement;

          if (forEachHereAttribute === '') {
            copyOfHereElement.innerText = arrayElement;
          } else {
            copyOfHereElement.innerText = arrayElement[forEachHereAttribute];
          }
        });

        parentElement.append(newElement);
      });

      element.remove();
    });
  }

  updateProperties() {
    const propertyElements = this.querySelectorAll('[property]');

    propertyElements.forEach((element) => {
      const propertyName = element.getAttribute('property');
      const propertyValue = this.component[propertyName];
      const elementCopy = element;

      elementCopy.innerHTML = propertyValue;
    });
  }

  updateEventListeners() {
    const clickElements = this.querySelectorAll(['[click]']);

    clickElements.forEach((element) => {
      const clickMethodName = element.getAttribute('click');

      element.addEventListener('click', () => {
        this.component[clickMethodName]();
        this.buildPage();
      });
    });

    const staticElements = this.querySelectorAll(['[static]']);
    const component = this.getComponentDetails();

    staticElements.forEach((element) => {
      const clickMethodName = element.getAttribute('static');

      element.addEventListener('click', () => {
        component[clickMethodName]();
        this.buildPage();
      });
    });
  }
}
