Feature: Login to an e-commerce website

	Scenario: Verify users can login to portal with valid credentials
		Given User visits e-commerce website-1
		When User enters "<username>" and "<password>"-1
		Then User can logged in successfully

        Examples:
            |username|password|
            |testuser412@grr.la|2t8zmqzL|

	Scenario: Verify users can not login to portal with invalid credentials
		Given User visits e-commerce website-2
		When User enters "<username>" and "<password>"-2
		Then User gets error message

        Examples:
            |username|password|
            |testuser100@grr.la|abcd1234|