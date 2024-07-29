describe("페이지 테스트", () => {
  const { _ } = Cypress;

  beforeEach(() => {
    cy.visit("");
    if (Cypress.env("NEXT_MONTH")) {
      const nextMonthButton = cy.get("form[name='form_next'] > button");
      nextMonthButton.click();
    }
  });

  it.only("room_A_102 go", () => {
    cy.get("button[class*='sbtn_2']").click();
    cy.get(`label[for='change_stay${Cypress.env("STAY")}']`).click();
    cy.get("td[class='open']").each(($td) => {
      if ($td.text().includes(Cypress.env("DAY"))) {
        cy.wrap($td).find("button[class='facility_btn']").click();
      }
    });

    cy.get("tr").each(($tr) => {
      if ($tr.text().includes("단체실102")) {
        cy.wrap($tr).find("button[class='res_btn']").click();
      }
    });

    cy.setUserInfo();
    cy.get("input[id='cus_gbn_2']").click();
  });

  it("room_P_202 go", () => {
    cy.get("button[class*='sbtn_2']").click();
    cy.get(`label[for='change_stay${Cypress.env("STAY")}']`).click();
    cy.get("td[class='open']").each(($td) => {
      if ($td.text().includes(Cypress.env("DAY"))) {
        cy.wrap($td).find("button[class='facility_btn']").click();
      }
    });

    cy.get("tr").each(($tr) => {
      if ($tr.text().includes("일반실202")) {
        cy.wrap($tr).find("button[class='res_btn']").click();
      }
    });

    cy.setUserInfo();
    cy.get("input[id='cus_gbn_2']").click();
  });

  it("deck32 go", () => {
    cy.get("button[class*='sbtn_1']").click();
    cy.get(`label[for='change_stay${Cypress.env("STAY")}']`).click();
    cy.get("td[class='open']").each(($td) => {
      if ($td.text().includes(Cypress.env("DAY"))) {
        cy.wrap($td).find("button[class='facility_btn']").click();
      }
    });

    cy.get("tr").each(($tr) => {
      if ($tr.text().includes("데크32")) {
        cy.wrap($tr).find("button[class='res_btn']").click();
      }
    });

    cy.setUserInfo();
  });
});
