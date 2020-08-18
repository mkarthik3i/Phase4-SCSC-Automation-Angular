# Author: HTC
# Story: Search Result
# Date Signed Off:
# Scenario Count :28
# Notes

Feature: Search page

 @automation @smoke1
 Scenario: As a librarian,I can view search page
   Given I launch the SCSB application
    When I login with valid credentials
    Then I should see search page with following elements:

    |elements					  |
    |search             |
    |OWNING INSTITUTION |
    |Collection group   |
    |Availability       |
    |material type      |
    |All fields         |
    |Submit             |
    |Use Restriction    |
    |ResetSearch        |

 @automation @smoke1
 Scenario: As a librarian, I can see "<All fields>" details in search page
   Given I launch the SCSB application
    When I login with valid credentials
     And I select All fields drop down
    Then I could see the following elements in all fields dropdown box:

   |All fields              |
   |Author_search           |
   |Title_search            |
   |TitleStartsWith         |
   |Publisher               |
   |PublicationPlace        |
   |PublicationDate         |
   |Subject                 |
   |ISBN                    |
   |ISSN                    |
   |OCLCNumber              |
   |Notes                   |
   |CallNumber_search       |
   |Barcode                 |

@automation @smoke1
 Scenario Outline: As a librarian, I can search with "<search_filter>" filter with "<keyword>" in the search box
   Given I launch the SCSB application
    When I login with valid credentials
     And I select "<search_filter>" in All fields dropdown box
     And I enter "<keyword>" in search box
     And I click search button
    Then I should see the search results based on the keyword
 
  Examples:
          |search_filter     |keyword                                    |
          |Author_search     |Fries, Willy                               |
          |Title_search      |Architekt Wilhelm Waser, Zürich, 1811-1866.|
          |TitleStartsWith   |Russko                                     |
          |Publisher         |Donker                                     |
          |PublicationPlace  |Washington                                 |
          |PublicationDate   |1982                                       |
          |Subject           |value                                      |
          |ISBN              |0718305191                                 |
          |ISSN              |00260665                                   |
          |OCLCNumber        |8954073                                    |
          |Notes             |Cover title                                |
          |CallNumber_search |PJ7832.U82Z93                              |
          |Barcode           |1000858110                                 |
          |Barcode           |32101097266769,33433080101177,CU55063039   |
          |ALL Fields        |blank                                      |
    
 @automation @smoke1
 Scenario Outline: As a librarian, I can view "<buttons>" button in search results
   Given I launch the SCSB application
    When I login with valid credentials
     And I enter "Bihrangī, Ṣamad." in search box
     And I select "Author_search" in All fields dropdown box
     And I click search button
    Then I should see the search results based on the keyword
     And I click the "<buttons>" button
    Then I should navigate to corrosping "<actions>"

 Examples:
   |buttons                  |actions      |
   |Request Selected Records |Request_Page |
   |Export Selected Records  |Downloade_fie|

 @automation @smoke1
 Scenario: As a librarian, I can clear content in the text field and checkboxes
   Given I launch the SCSB application
    When I login with valid credentials
     And I click ResetSearch button
    Then I should see content cleared and visible placeolder text "Type Text Here....." in search box
     And I should see all checkboxe filters are checked by default

 @automation @smoke1
 Scenario: As a librarian, I search with invalid keyword or junk keyword
   Given I launch the SCSB application
    When I login with valid credentials
     And I search with invalid keyword "sdfdfdfadfsad" in search box
     And I click search button
    Then I should see error message as "No search results found. Please refine search conditions."

 @automation @smoke1
 Scenario: As a librarian , I can uncheck the Select or Unselect All Facets Option
   Given I launch the SCSB application
    When I login with valid credentials
    And  I uncheck all Facets Option
     And I click search button
    Then I should see error message as "Check facets. At least one Bib Facet and one Item Facet must be checked to get results."

 @automation @smoke1
 Scenario: As a librarian, I can view bib(Marc record detail page
   Given I launch the SCSB application
    When I login with valid credentials
     And I click search button
    Then I should see the search results
    When I select tital of bib record randomly
    Then I should navigate bib record detail page

 @automation @smoke1
 Scenario Outline: As user I can validate.If app displayed appropriate error message, when uncheck "<facts>" in search page
   Given I launch the SCSB application
    When I login with valid credentials
     And I uncheck "<facts>" Check boxes
     And I click search button
    Then I should see error message as "Check facets. At least one Bib Facet and one Item Facet must be checked to get results."
    Examples:
        |facts             |
        |Bib Facets        |
        |Item Facets       | 
        |Bib & Item Facts  |

 @automation @smoke1
 Scenario: As a librarian , I can see search results when I click on next, last, previous and first button
   Given I launch the SCSB application
    When I login with valid credentials
     And I click search button
    Then I should see the search results
     And I should see search results when click the followig link button:
    |link_button    |
    |Next           |
    |Last           |
    |Previous       |
    |First          |

 @automation @smoke1
 Scenario:As a librarian, I can see 10, 25, 50 and 100 Search Results when change show entries in search page
   Given I launch the SCSB application
    When I login with valid credentials
     And I click search button
    Then I should see the search results
     And I should see the search results as per following show entries:
    |show entries|
    |25          |
    |10          |
    |50          |
    |100         |
#------------------------------Manual Scenarios--------------------------------------------
 @automation @smoke1
 Scenario:As a librarian, If I click on hide facets icon then Bib and Item Facets should not display
   Given I launch the SCSB application
    When I login with valid credentials
     And I click on hideFacetsIcon
    Then Bib and Item Facets should not display
   
 @manual
 Scenario: As a librarian, I can export selected records in search page
   Given I launch the SCSB application
    When I login with valid credentials
     And I search with valid keyword in search box
    Then I Should see search results in application
    When I select "Export Selected Records"
    Then The selected records are exported as a CSV file in the same format as the grid

    @automation @smoke
 Scenario: As a librarian, I can verify total of the bib records in search results
   Given I launch the SCSB application
    When I login with valid credentials
     And I click search button
    Then I should see cocunt of the bib records
    When I select each institution records count
    Then I should match with total count of bib records

 @manual
 Scenario: As a librarian, I can verify title sorting functionality
   Given I launch the SCSB application
    When I login with valid credentials
     And I click search button
    Then I should see the search results
    When I click title sorting arrow
    Then I should see title sorted based on the alphabets

     @manual
 Scenario: As a librarian, I can verify author sorting functionality
   Given I launch the SCSB application
    When I login with valid credentials
     And I click search button
    Then I should see the search results
    When I click author sorting arrow
    Then I should see author sorted based on the alphabets

    
 @automation @manual
 Scenario: As a librarian , I can check the search results when all check boxes are defaultly checked
   Given I launch the SCSB application
    When I login with valid credentials
    And  I Select or Unselect All Facets Option is Checked
     And I click search button
    Then I should be able to see search results
