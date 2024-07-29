/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    window(options?: Partial<Loggable & Timeoutable>): Chainable<CustomWindow>;

    getByKey(dataTestAttribute: string, args?: any): Chainable<Element>;
    getByKeyLike(
      dataTestPrefixAttribute: string,
      args?: any
    ): Chainable<Element>;

    login(): Chainable<any>;
    setUserInfo(): void;
  }
}
