export const isMobile = () => {
  return (
    Cypress.config("viewportWidth") < Cypress.env("VIEWPORT_WIDTH_BP_MOBILE")
  );
};
