Feature: Search Product on API

Scenario: Product Search via API

Given The product exists in the database
When I search for the product by code or description
Then I should receive a response with the found product
