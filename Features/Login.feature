Feature: Recap Login Page

 @automation @smoke1
 Scenario: As a Recap user,I can view error message without enter username, password & Institution
   Given I launch the SCSB application
    When I click login button
    Then I should see following error messages as "This Field is required"

 @automation @smoke1
 Scenario: As a Recap user,I can view error message when I enter invalid credentials
   Given I launch the SCSB application
    When I enter invalid credentials
     And I click submit button
	  Then I should see the error message "Invalid credentials."

  @automation @smoke1
 Scenario: As a Recap user,I can login with valid credentials
   Given I launch the SCSB application
    When I login with valid credentials
     And I click submit button
	  Then I should navigate to search page

  @automation @smoke1
 Scenario: As a Recap user,I can logout with successful login
   Given I launch the SCSB application
    When I login with valid credentials
     And I click submit button
	  Then I should navigate to search page 
	  When I click logout 
	  Then I should navigate login page

  @automation @smoke1
 Scenario: As a user,I can view Recap tweet timeline in login page
   Given I launch the SCSB application
    Then I should see Recap tweet timeline in login page

 @automation @smoke1
 Scenario Outline: As a user,I can view Institutions symbols on login page and navigate to corresponding Institution webpages
   Given I launch the SCSB application
	Then I should navigate login page
	 And I click Institutions "<symbols>" on login page:
	Then I should navigate to logo url "<Institution_webpage>"

	Examples:
     |symbols|Institution_webpage           |
     |CUL    |https://www.columbia.edu/     |
     |PUL    |https://www.princeton.edu/    |
     |NYPL   |https://www.nypl.org/         |

@automation @smoke1
  Scenario Outline: As a user,I can navigate when I clicking Recap links on login page
   Given I launch the SCSB application
	  Then I should navigate login page
	   And I click Recap "<links>" on login page:
	  Then I should navigate to corresponding "<webpage>"

	Examples:
    |links                       |webpage                                             |
    |Home                        |https://recap.princeton.edu/                        |
    |Facility & Storage          |https://recap.princeton.edu/facility-storage        |
    |Operations & Statistics     |https://recap.princeton.edu/operations-statistics   |
    |Collections & Services      |https://recap.princeton.edu/collections-services    |
    |Information & Publications  |https://recap.princeton.edu/information-publications| 