Feature: Collection

 @automation @smoke1
 Scenario: As a librarian,I can view Collection page
   Given I launch the SCSB application
    When I login with valid credentials
	 And I navigate to Collection page
    Then I should see collection page with following elements:
	|elements					  |
	|search box                   |
	|Display records button       |
	|Note text                    |
	|Clear Serach				  |
	When I click display records
	Then I should see the "No results found." message

@automation @smoke1
 Scenario: As a librarian,I can clear inputs in collection page
   Given I launch the SCSB application
    When I login with valid credentials
	 And I navigate to Collection page
	 And I enter valid barcode "CU25556304" in collection search box
	 And I click clear search
	Then I should see the entered barcode cleared in collection search box
   
 @automation @smoke1
 Scenario: As a librarian,I can search with valid barcode in Collection page
  Given I launch the SCSB application
    When I login with valid credentials
	 And I navigate to Collection page
	 And I enter valid barcode "32101081191627,CU25533304" in collection search box
	 When I click display records
	Then I should see search results in collection page
	
  @automation @smoke1
 Scenario: As a librarian,I can search with invalid barcode in Collection page
   Given I launch the SCSB application
    When I login with valid credentials
	 And I navigate to Collection page
	 And I enter invalid barcode "12345678" in collection search box
	When I click display records
	Then I should see the "Barcode(s) not found" message
	
 @automation @smoke1
 Scenario: As a librarian,I can view search results elements when I search with valid barcode
   Given I launch the SCSB application
    When I login with valid credentials
	 And I navigate to Collection page
	 And I enter valid barcode "32101081191627,CU25533304" in collection search box
	When I click display records
	Then I should see search results with following elements:
	|elements							|
	|CGD - Collection Group Designation |
	|Title   						    |
	|CGD                                |
	|In ReCAP                           |
	|OUT                                |
	|Barcode                            |

 @automation @smoke1
 Scenario: As a librarian,I can click title to navigate item detail page of the barcode
	Given I launch the SCSB application
     When I login with valid credentials
	  And I obtain available barcode for "PUL"
	  And I navigate to Collection page
	 When I enter valid Barcode in collection search box
	 When I click display records
	 Then I should see search results in collection page
	 When I click on the barcode title 
	 Then I should see item detail page with following elements
	|elements                	 						|
	|Edit CGD    			 	 						|
	|Deaccession  			 	 						|
	|New CGD                 	 						|
	|CGD Change Notes        	 						|
	|Save                      	 						|
	|MARC Content			  	 						|
	|Item Details			  	 						|
	|Remaining Characters : 2000 						|
	|Fields marked with asterisk(*) are mandatory.		|

@automation @smoke1
Scenario: As a librarian,I cann't update CGD status without CGD change notes information
   Given I launch the SCSB application
    When I login with valid credentials
	 And I obtain "Shared" barcode for "CUL"
	 And I navigate to Collection page
	 And I enter valid Barcode in collection search box
	 And I click display records
	Then I should see search results in collection page
	When I click on the barcode title 
	Then I should see item detail page 
	When I click Save
	Then I should see the following error details
	|error			  				|
	|Choose a new CGD.				|
	|Please enter CGD change notes. |

	
 @automation @smoke1
 Scenario Outline: As a librarian,I can edit CGD in item detail page for the "<instituation>"
   Given I launch the SCSB application
    When I login with valid credentials
	 And I obtain available barcode for "<instituation>"
	 And I navigate to Collection page
	 And I enter valid Barcode in collection search box
	 And I click display records
	Then I should see search results in collection page
	When I click on the barcode title 
	Then I should see item detail page 
	And  I can see Edit CGD selected by default
	 And I select New CGD
	 And I enter CGD change notes 
	 And I click Save
	Then I should see "The CGD has been successfully updated."
	When I search with same barcode in collection page
 	Then I should see updated CGD value in search result
	Examples:
	|instituation|
	|PUL         |
	|CUL         |
	|NYPL        |

 @automation @smoke1
 Scenario: As a librarian,I can view deaccession fields in item detail page
   Given I launch the SCSB application
    When I login with valid credentials
	 And I obtain available barcode for "PUL"
	 And I navigate to Collection page
	 And I enter valid Barcode in collection search box
	 And I click display records
	Then I should see search results in collection page
	When I click on the barcode title 
	Then I should see item detail page 
	When I choose deaccession
	Then I should see item detail page with following elements
	|elements          |
	|Deaccession Type  |
	|Delivery Location |
	|Deaccession Notes |
	|Deaccession Item  |

@automation @smoke1
Scenario: As a librarian,I can see mandatory fields error message for deaccession
   Given I launch the SCSB application
    When I login with valid credentials
	 And I obtain available barcode for "PUL"
	 And I navigate to Collection page
	 And I enter valid Barcode in collection search box
	 And I click display records
	Then I should see search results in collection page
	When I click on the barcode title 
	Then I should see item detail page 
	When I choose deaccession
	When I click deaccession item button
	Then I should see the following error details
	|error			  				|
	|This is a mandatory field.  	|
	|Please enter deaccession notes.|
	
 @automation @smoke1
 Scenario Outline: As a librarian,I can PWD deaccession type of barcode through item detail page for "<instituations>"
   Given I launch the SCSB application
    When I login with valid credentials
	 And I obtain available barcode for "<instituations>"
	 And I navigate to Collection page
	 And I enter valid Barcode in collection search box
	 And I click display records
	Then I should see search results in collection page
	When I click on the barcode title 
	Then I should see item detail page 
	When I choose deaccession
	 And I select delivery Location
	 And I enter deaccession notes
	When I click deaccession item button
	Then I should see "The item has been successfully deaccessioned."
	When I search with same barcode in collection page
	Then I should see the "Barcode(s) not found" message
	Examples:
	|instituations|
	|CUL          |
	|NYPL         |
	|PUL          |

@automation @smoke1
 Scenario Outline: As a librarian,I can PWI deaccession type of barcode through item detail page for "<instituations>"
   Given I launch the SCSB application
    When I login with valid credentials
	 And I obtain Notavailable barcode for "<instituations>"
	 And I navigate to Collection page
	 And I enter valid Barcode in collection search box
	 And I click display records
	Then I should see search results in collection page
	When I click on the barcode title 
	Then I should see item detail page 
	When I choose deaccession
	 And I enter deaccession notes
	When I click deaccession item button
	Then I should see "The item has been successfully deaccessioned."
	When I search with same barcode in collection page
	#Then I should see the "Barcode(s) not found" message
	Examples:
	|instituations|
	|CUL          |
	|NYPL         |
	|PUL          |