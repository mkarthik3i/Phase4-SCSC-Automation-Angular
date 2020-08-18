Feature: RestApi

 @automation @smoke1
 Scenario Outline: As a Recap user,I can "<Rest_service>" through RestApi
   Given I launch the SCSB application
    When I send request for "<Rest_service>"
    Then I should receive "Success" status with details
    Examples:
    |Rest_service          |
    |purgeExceptionRequests|
    |purgeEmailAddress     |

 @automation @smoke1
 Scenario Outline: As a Recap user,I can "<Rest_service>" for "<Owning_instituation>" through RestApi
   Given I launch the SCSB application
    When I login with valid credentials
     And I obtaining "<Owning_instituation>" available barcode in LAS
     And I obtain picklocation for item
    When I send request for "<Rest_service>"
    Then I should receive successful responce from API
    Examples:
    |Owning_instituation|Rest_service |
    |CUL                |holdItem     |
    |PUL                |holdItem     |
    |NYPL               |holdItem     |

@automation @smoke1
 Scenario Outline: As a Recap user,I can "<Rest_service>" for "<Owning_instituation>" through RestApi
   Given I launch the SCSB application
    When I login with valid credentials
     And I obtaining based on "<Owning_instituation>" and "<Requesting_Instituation>" available barcode in SCSB request
     And I obtain required details for item
    When I send request for "<Rest_service>"
    Then I should receive successful responce from API
    Examples:
    |Owning_instituation|Requesting_Instituation|Rest_service   |
    |CUL                |CUL                    |cancelHoldItem |
    |PUL                |PUL                    |cancelHoldItem |
    |NYPL               |NYPL                   |cancelHoldItem |
