Feature: Validate Products in Cart

Scenario: Validate products in cart

Given I am on the cart page
When I view products in the cart
Then I should see correctly added products

Scenario: Validate edit product button

Given I am on the cart page
When I click the "Edit" button on a product
Then I should be directed to the product edit page

Scenario: Validate empty cart

Given I am on the cart page
When I have a empty cart
Then I should see the message "Your shopping cart is empty"

Scenario: Validate removed product

Given I am on the cart page
When I remove a product from the cart
Then I should not see the removed product in the cart.