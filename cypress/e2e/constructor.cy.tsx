describe('Тесты е2е для главной страницы и модального окна', () => {
  const ingredientSelector = '[data-cy="ingredient"]';
  const ingredientModalSelector = '[data-cy="ingredient-modal"]';

  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );

    window.localStorage.setItem('refreshToken', 'testRefreshToken');
    cy.setCookie('accessToken', 'testAccessToken');

    cy.visit('http://localhost:4000');

    cy.wait('@getIngredients');
    cy.wait('@getUser');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('Добавление ингредиентов в конструктор', () => {
    cy.contains('Выберите булки').should('be.visible');
    cy.contains('Выберите начинку').should('be.visible');

    cy.get('[data-type="bun"]')
      .first()
      .within(() => {
        cy.get('button').contains('Добавить').click();
      });

    cy.contains('Выберите булки').should('not.exist');

    cy.get('[data-type="main"]')
      .first()
      .within(() => {
        cy.get('button').contains('Добавить').click();
      });

    cy.contains('Выберите начинку').should('not.exist');
  });

  it('Открытие модального окна ингредиента', () => {
    cy.get(ingredientSelector).first().as('firstIngredient');
    cy.get('@firstIngredient').click();

    cy.get(ingredientModalSelector).as('ingredientModal');
    cy.get('@ingredientModal').should('be.visible');
  });

  it('Закрытие модального окна ингредиента по иконке', () => {
    cy.get(ingredientSelector).first().as('firstIngredient');
    cy.get('@firstIngredient').click();

    cy.get(ingredientModalSelector).as('ingredientModal');
    cy.get('@ingredientModal').should('be.visible');

    cy.get('[data-cy="modal-close"]').click();
    cy.get('@ingredientModal').should('not.exist');
  });

  it('Закрытие модального окна ингредиента по оверлею', () => {
    cy.get(ingredientSelector).first().as('firstIngredient');
    cy.get('@firstIngredient').click();

    cy.get(ingredientModalSelector).as('ingredientModal');
    cy.get('@ingredientModal').should('be.visible');

    cy.get('[data-cy="modal-close-overlay"]').click({ force: true });
    cy.get('@ingredientModal').should('not.exist');
  });

  it('Добавление ингредиентов и успешное оформление заказа', () => {
    cy.get(`${ingredientSelector}[data-type='bun']`).first().as('firstBun');
    cy.get('@firstBun').within(() => {
      cy.get('button').contains('Добавить').click();
    });

    cy.get(`${ingredientSelector}[data-type='main']`).first().as('firstMain');
    cy.get('@firstMain').within(() => {
      cy.get('button').contains('Добавить').click();
    });

    cy.intercept('post', '/api/orders', { fixture: 'createOrder.json' }).as(
      'createOrder'
    );

    cy.get('[data-cy="submit-order"]').click();

    cy.wait('@createOrder');
    cy.get('[data-cy="order-modal"]').should('be.visible');
    cy.get('[data-cy="new-order-number"]').should('be.visible');

    cy.get('[data-cy="modal-close"]').click();
    cy.get('[data-cy="order-modal"]').should('not.exist');

    cy.get('[data-cy="constructor-bun"]').should('not.exist');
    cy.get('[data-cy="constructor-main"]').should('not.exist');
    cy.contains('Выберите булки').should('be.visible');
    cy.contains('Выберите начинку').should('be.visible');
  });
});
