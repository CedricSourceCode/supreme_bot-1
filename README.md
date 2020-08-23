# supreme_bot

supreme auto check out bot written in javascript by @menascii

run:
   			
	run script on browser and go to https://www.supremenewyork.com/shop/all
      
        tools like greasemonkey make it simple to run scripts on the browser

      	execute script by clicking anywhere on the screen to initiate the search prompt.
      
      	enter a supreme item to search for
	
input:

	hardcoded shipping and billing information required for checkout
	update these values yourself in the script

output:

	if the search item is found it will open the product 
  	in a new tab add to cart and fill out the form
          
  	if the search item is not found it will reload the page 
  	and search again (this is to mimic refresh for new drops)
          
  note:
  			
	there is no cancellation or return functionality once an 
        item is searched for so you can build it and make it more user friendly
        
	if multiple products contain the user search term it will try to add 
        each item to the cart which is functionality that can also be changed by you
   
	this script is based on current html and css being scraped so it must 
        be adjusted if supreme updates the site

        google dom manipulation in javascript to learn more and make this program better
