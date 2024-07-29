/// <reference path="../global.d.ts" />

// @ts-ignore
Cypress.Commands.add("getByKey", (selector, ...args) => {
  return cy.get(`[data-test=${selector}]`, ...args);
});

// @ts-ignore
Cypress.Commands.add("getByKeyLike", (selector, ...args) => {
  return cy.get(`[data-test*=${selector}]`, ...args);
});

let LOCAL_STORAGE_MEMORY: { [key: string]: string } = {};

// @ts-ignore
Cypress.Commands.add("saveLocalStorage", () => {
  Object.keys(localStorage).forEach((key) => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key];
  });
});

// @ts-ignore
Cypress.Commands.add("restoreLocalStorage", () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach((key) => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
  });
});

// @ts-ignore
Cypress.Commands.add("login", () => {});

// @ts-ignore
Cypress.Commands.add("setUserInfo", () => {
  cy.get("input[id='check2']").click();
  cy.get("input[id='check1']").click();

  cy.get("input[id='res_name']").type(Cypress.env("USER_NAME"));
  cy.get("input[id='tel_2']").type(Cypress.env("USER_PHONE_MID"));
  cy.get("input[id='tel_3']").type(Cypress.env("USER_PHONE_END"));
  cy.get("select[id='res_add']").select(Cypress.env("USER_CITY"));
  cy.get("select[name='res_add_1']").select(Cypress.env("USER_DISTRICT"));
});

export {};
