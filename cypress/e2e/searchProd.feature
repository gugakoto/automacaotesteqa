Feature: Search Product

    Scenario: Product Search

        Given I am on the website homepage
        When I type an existing product name in the search field
        Then I should see products with that name in the search results

    Scenario: Invalid Product Search

        Given I am on the website homepage
        When I type an non-existing product name in the search field
        Then I should see the message 'Product not found'
