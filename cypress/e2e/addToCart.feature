Feature: Add Product to Cart

Scenario: Add product to cart

Given I am on the product page
When I click the "Add to Cart" button
Then I should see the product in the cart

Scenario: Add product with insufficient stock

Given I am on the product page
When I select a quantity greater than the stock
And I click the "Add to Cart" button
Then I should see an alert message indicating insufficient stock