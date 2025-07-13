Feature: Add Member with Admin Role

    Scenario: Successfully add a member with admin role
        Given I am logged in as an authorized user
        And I am on the user management add user page
        When I select the admin user role
        And I enter the employee name "a"
        And I select the first employee from the list
        And I select the status "Enabled"
        And I set a valid username and password
        Then I save the new user and I should see a success message