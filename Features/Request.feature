

Feature: Request

  @automation @smoke1
  Scenario: As a librarian, I can see mandatory fields error message for Retrival Request in request page
    Given I launch the SCSB application
     When I login with valid credentials
      And I navigate to request page
      And I select "RETRIVEVAL" as a request type
      And I click create button
     Then I should see mandatory fields error messages:
      |mandatory fields error_msg         |
      |Item barcode is required.          |
      |Patron barcode is required.        |
      |Requesting institution is required.|
      |Delivery location is required.     |

  @automation @smoke1
  Scenario: As a librarian, I can see mandatory fields error message for EDD Request in request page
    Given I launch the SCSB application
     When I login with valid credentials
      And I navigate to request page
      And I select "EDD" as a request type
      And I click create button
     Then I should see mandatory fields error messages:
      |mandatory fields error_msg          |
      |Item barcode is required.           |
      |Patron barcode is required.         |
      |Requesting institution is required. |
      |Patron Email Address is required.   |
      |Start page is required.             |
      |End page is required.               |
      |Article / Chapter title is required.|

  @automation @smoke1
  Scenario Outline: As a librarian, I can create owning institution RETRIEVAL request for "<Owning_instituation>" to "<Requesting_Instituation>"
    Given I launch the SCSB application
     When I login with valid credentials
      And I obtaining "<Owning_instituation>" available barcode in LAS
      And I navigate to request page
      And I enter own institution "<Owning_instituation>" to "<Requesting_Instituation>" mandaory information for "RETRIEVAL" request
      And I click CreateRequest button
     Then I should see the following success message:
      |success_message                                                                                 |
      |Your request was received and will be processed.To track the request's status, please click here|
      |To create another request for the same patron, please click here                                |
      |To create another request for a different patron, please click here                             |
     Then I should see the barcode status in request details page
      And I should see the barcode status is not available in search results
  Examples:
          |Owning_instituation|Requesting_Instituation|
          |PUL                |PUL                    |
          |CUL                |CUL                    |
          |NYPL               |NYPL                   |
  
  @automation @smoke1
  Scenario Outline: As a librarian, I can create cross institution RETRIEVAL request for "<Owning_instituation>" to "<Requesting_Instituation>"
    Given I launch the SCSB application
     When I login with valid credentials
      And I obtaining "<Owning_instituation>" available barcode in LAS
      And I navigate to request page
      And I enter own institution "<Owning_instituation>" to "<Requesting_Instituation>" mandaory information for "RETRIEVAL" request
      And I click CreateRequest button
     Then I should see the following success message:
      |success_message                                                                                 |
      |Your request was received and will be processed.To track the request's status, please click here|
      |To create another request for the same patron, please click here                                |
      |To create another request for a different patron, please click here                             |
     Then I should see the barcode status in request details page
      And I should see the barcode status is not available in search results
  Examples:
          |Owning_instituation|Requesting_Instituation|
          |PUL                |CUL                    |
          |PUL                |NYPL                   |
          |CUL                |PUL                    |
          |CUL                |NYPL                   |
          |NYPL               |PUL                    |
          |NYPL               |CUL                    |
 
 @automation @smoke1
  Scenario Outline: As a librarian, I can create owning institution EDD request for "<Owning_instituation>" to "<Requesting_Instituation>"
    Given I launch the SCSB application
     When I login with valid credentials
      And I obtaining "<Owning_instituation>" available barcode in LAS
      And I navigate to request page
      And I enter own institution "<Owning_instituation>" to "<Requesting_Instituation>" mandaory information for "EDD" request
      And I click CreateRequest button
     Then I should see the following success message:
      |success_message                                                                                 |
      |Your request was received and will be processed.To track the request's status, please click here|
      |To create another request for the same patron, please click here                                |
      |To create another request for a different patron, please click here                             |
     Then I should see the barcode status in request details page
      And I should see the barcode status as "EDD ORDER PLACED"
  Examples:
          |Owning_instituation|Requesting_Instituation|
          |PUL                |PUL                    |
          |CUL                |CUL                    |
          |NYPL               |NYPL                   |

@automation @smoke1
  Scenario Outline: As a librarian, I can create cross institution EDD request for "<Owning_instituation>" to "<Requesting_Instituation>"
    Given I launch the SCSB application
     When I login with valid credentials
      And I obtaining "<Owning_instituation>" available barcode in LAS
      And I navigate to request page
      And I enter own institution "<Owning_instituation>" to "<Requesting_Instituation>" mandaory information for "EDD" request
      And I click CreateRequest button
     Then I should see the following success message:
      |success_message                                                                                 |
      |Your request was received and will be processed.To track the request's status, please click here|
      |To create another request for the same patron, please click here                                |
      |To create another request for a different patron, please click here                             |
     Then I should see the barcode status in request details page
      And I should see the barcode status as "EDD ORDER PLACED"
  Examples:
          |Owning_instituation|Requesting_Instituation|
          |PUL                |CUL                    |
          |PUL                |NYPL                   |
          |CUL                |PUL                    |
          |CUL                |NYPL                   |
          |NYPL               |PUL                    |
          |NYPL               |CUL                    |
 
  @automation @smoke1
  Scenario Outline: As a librarian, I can cancel RETREVAL request for "<institutions>"
    Given I launch the SCSB application
     When I login with valid credentials
      And I navigate to request page
      And I search with "<institutions>" and request status as "RETRIEVAL ORDER PLACED" barcode
      And I click cancel button
     Then I should see "Request canceled successfully" message
     When I refile the same barcode in RestAPI with "Successfully Refiled" message
      And I should see cancelled item barcode in available in SCSB search page
      Examples:
      |institutions| 
      |PUL         |
      |CUL         |
      |NYPL        |

  @automation @smoke1
  Scenario Outline: As a librarian, I can cancel EDD request for "<institutions>"
    Given I launch the SCSB application
     When I login with valid credentials
      And I navigate to request page
      And I search with "<institutions>" and request status as "EDD ORDER PLACED" barcode
      And I click cancel button
     Then I should see "Request canceled successfully" message
      Examples:
      |institutions| 
      |PUL         |
      |CUL         |
      |NYPL        |

 @automation @smoke1
  Scenario Outline: As a librarian, I can cancel RECALL request for "<institutions>"
    Given I launch the SCSB application
     When I login with valid credentials
      And I navigate to request page
      And I search with "<institutions>" and request status as "RECALL ORDER PLACED" barcode
      And I click cancel button
     Then I should see "Request canceled successfully" message
      Examples:
      |institutions| 
      |PUL         |
      |CUL         |
      |NYPL        |

@automation @smoke1
  Scenario Outline: As a librarian, I can create owning institution RECALL request for "<Owning_instituation>" to "<Requesting_Instituation>"
    Given I launch the SCSB application
     When I login with valid credentials
      And I obtaining based on "<Owning_instituation>" and "<Requesting_Instituation>" available barcode in SCSB request
      And I checkout the barcode in RestAPI with "Checkout Successful." message
      And I navigate to request page
      And I enter own institution "<Owning_instituation>" to "<Requesting_Instituation>" mandaory information for "RECALL" request
      And I click CreateRequest button
     Then I should see the following success message:
      |success_message                                                                                 |
      |Your request was received and will be processed.To track the request's status, please click here|
      |To create another request for the same patron, please click here                                |
      |To create another request for a different patron, please click here                             |
     Then I should see the barcode status in request details page
      And I should see the barcode status as "RECALL ORDER PLACED"
  Examples:
          |Owning_instituation|Requesting_Instituation|
          |PUL                |PUL                    |
          |CUL                |CUL                    |
          |NYPL               |NYPL                   |

@automation @smoke1
  Scenario Outline: As a librarian, I can create cross institution RECALL request for "<Owning_instituation>" to "<Requesting_Instituation>"
    Given I launch the SCSB application
     When I login with valid credentials
      And I obtaining based on "<Owning_instituation>" and "<Requesting_Instituation>" available barcode in SCSB request
      And I checkout the barcode in RestAPI with "Checkout Successful." message
      And I navigate to request page
      And I enter own institution "<Owning_instituation>" to "<Requesting_Instituation>" mandaory information for "RECALL" request
      And I click CreateRequest button
     Then I should see the following success message:
      |success_message                                                                                 |
      |Your request was received and will be processed.To track the request's status, please click here|
      |To create another request for the same patron, please click here                                |
      |To create another request for a different patron, please click here                             |
     Then I should see the barcode status in request details page
      And I should see the barcode status as "RECALL ORDER PLACED"
  Examples:
          |Owning_instituation|Requesting_Instituation|
          |PUL                |CUL                    |
          |PUL                |NYPL                   |
          |CUL                |PUL                    |
          |CUL                |NYPL                   |
          |NYPL               |PUL                    |
          |NYPL               |CUL                    |

 @automation @smoke1
 Scenario Outline: As a librarian, I can see appropriate error message for RETRIEVAL request. If item does havn't have same bibliographic, customer code when I selected records in search page
   Given I launch the SCSB application
    When I login with valid credentials
     And I search with "<Owning_instituation>" items in search box
     And I select items randomly in "<page>" page 
     And I select Request Selected Records button
     And I enter required details in request page
     And I click create button
    Then I should see message "<error_msg>"

    Examples:   
    |Owning_instituation|page           |error_msg                                                                                                           |
    |PUL                |Search         |All items must be attached to the same bibliographic record, have the same customer code, and the same availability.|
    |CUL                |Request-EDD    |Recall for existing EDD request is not allowed|
    |PUL                |Request-RECALL |Recall for this item already exists.|

@automation @smoke1
 Scenario Outline: As a librarian, I can place a request RETRIEVAL,RECALL and EDD from search page
   Given I launch the SCSB application
    When I login with valid credentials
     And I search with "<Owning_instituation>" items in search box
     And I select an items randomly in search page for "<Request Type>" request
     And I select Request Selected Records button
     And I enter required details in request page
     And I click CreateRequest button
    Then I should see the following success message:
      |success_message                                                                                 |
      |Your request was received and will be processed.To track the request's status, please click here|
      |To create another request for the same patron, please click here                                |
      |To create another request for a different patron, please click here                             |
 Examples:
      |Owning_instituation|Request Type|
      |PUL                |RETRIEVAL   |
      |PUL                |EDD         |
      |PUL                |RECALL      |

@automation @smoke1
Scenario: As a librarian, I can clear text using clear button
  Given I launch the SCSB application
   When I login with valid credentials
    And I navigate to request page
    And I enter mandaory information for "EDD" request
    And I click clear button
   Then I should see all entered details are cleared

@automation @smoke1
Scenario: As a librarian, I can verify GOBack button functionality
  Given I launch the SCSB application
   When I login with valid credentials
    And I navigate to request page
    And I navgate to search request page
   When I click Go Back link
   Then I should see request page

@automation @smoke1
Scenario Outline: As a librarian, I can verify if navigate appropriate page when I click link element in successfully requeast message
  Given I launch the SCSB application
   When I login with valid credentials
    And I obtaining "PUL" available barcode in LAS
    And I navigate to request page
    And I enter own institution "PUL" to "PUL" mandaory information for "RETRIEVAL" request
    And I click CreateRequest button
   Then I should see Successfully request created message
   When I click the Click here link on Successful "<message>"
    And I should naviagte "<page>" with required details
    Examples:
      |message                                                                                          |page          |
      |Your request was received and will be processed.To track the request's status, please click here |Search_Request|
      |To create another request for the same patron, please click here                                 |Request       |
      |To create another request for a different patron, please click here                              |Request1      |
     