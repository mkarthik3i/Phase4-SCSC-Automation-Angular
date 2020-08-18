

Feature: Bulk Request

  @automation @smoke1
  Scenario: As a librarian, I can see mandatory fields error message for Bulk Request
    Given I launch the SCSB application
     When I login with valid credentials
      And I navigate to bulkrequest page
      And I click create button
     Then I should see mandatory fields error messages:
      |mandatory fields error_msg         |
      |Bulk Request Name is required.     |
      |Patron barcode is required.        |
      |Requesting institution is required.|
      |CSV file is required               |
      |Delivery location is required.     |

  @automation @smoke1
  Scenario: As a librarian, I can clear entered details in Bulk Request
    Given I launch the SCSB application
     When I login with valid credentials
      And I navigate to bulkrequest page
      And I enter "PUL" details
      And I click clear button
     Then I should see all fields are empty

 @automation @smoke1
  Scenario Outline: As a librarian, I can create a bulk request for the "<institutions>"
    Given I launch the SCSB application
     When I login with valid credentials
      And I navigate to bulkrequest page
      And I enter "<institutions>" details
      And I click CreateRequest button
     Then I should see the following success message:
      |success_message                                                                                                        |
      |Your bulk request was received successfully and will be processed.To track the bulk request's status, please click here|
      |create another bulk request for the same patron, please click here                                                     |
      |create another bulk request for a different patron, please click here                                                  |
     Then I should see the bulkrequest status in bulkrequest details page
      And I should see the bulkrequest status as "PROCESSED"
    Examples:
     |institutions|
     |PUL         |



 