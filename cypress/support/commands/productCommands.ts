import { productSelectors } from '../../selectors/productSelectors';
import type {AddProductToCartArgs, Product} from "../commandTypes";


const findProductCard = ({name}: Pick<Product, 'name'>) => cy.get(productSelectors.productCard).contains(name).closest(productSelectors.productCard);
const addToCartAlias = 'addToCartButton';

Cypress.Commands.add('addProductToCart', ({product: {name}, amount}: AddProductToCartArgs) => {
  findProductCard({name}).find(productSelectors.addToCartButtons).as(addToCartAlias);

  Cypress._.times(amount, () => {
    cy.get(`@${addToCartAlias}`).click()
  })

  return cy.get(`@${addToCartAlias}`);
});

Cypress.Commands.add('openProductDetails', (index: number) => {
  return cy.contains('button', 'View Details').eq(index).click();
});

Cypress.Commands.add('addProductComment', (comment: string) => {
  cy.get(productSelectors.commentInput).clear().type(comment);

  return cy.contains('button', 'Save Comment').click();
});
