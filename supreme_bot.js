/* supreme auto check out bot written in javascript by @menascii
	 
   run:
   	run script on browser and go to https://www.supremenewyork.com/shop/all
      
      	execute script by clicking anywhere on the screen to initiate the search prompt.
      
      	enter a supreme item to search for
      
  	if the search item is found it will open the product in a new tab add to cart and fill out the form
          
        if the search item is not found it will reload the page and search again (this is to mimic refresh for new drops)
          
  note:
	there is no cancellation or return functionality once an item is searched for so you can build it and make it more user friendly.
        
	if multiple products contain the user search term it will try to add each item to the cart which is functionality that can also be changed by you.
   
   	this script is based on current html and css being scraped so it must be adjusted if supreme updates the site. 

        google dom manipulation in javascript to learn more and make this program better
*/

// starts bot
document.addEventListener('mousedown',startBotOnClick,false);

// global functions
document.onreadystatechange = () => 
{
  if (document.readyState === 'complete') 
  {
    console.log(window.location.href + ' has loaded');  
    if (window.location.href.indexOf('shop/all') > -1 || window.location.href.indexOf('shop/new') > -1) 
  	{
    	console.log('********** supreme home page **********');      
      if (window.localStorage.getItem('reloadFlag') == 'null' && window.localStorage.getItem('searchItemFlag') != 'null')
      {
        console.log('...scraping every two seconds until the item appears...');
        findSupremeItem(window.localStorage.getItem('searchItemFlag'));
      }
  	}
    
    if (window.location.href.indexOf('jackets') > -1      || 
        window.location.href.indexOf('shirts') > -1       || 
        window.location.href.indexOf('sweatshirts') > -1  ||
        window.location.href.indexOf('pants') > -1        ||
        window.location.href.indexOf('shorts') > -1       ||
        window.location.href.indexOf('hats') > -1         ||
        window.location.href.indexOf('bags') > -1         ||
        window.location.href.indexOf('accessories') > -1  ||
				window.location.href.indexOf('shoes') > -1        ||
        window.location.href.indexOf('skate') > -1        ||
        window.location.href.indexOf('tops-sweaters') > -1)
    {
      addToCart();
    }
    
    if (window.location.href.indexOf('checkout') > -1)
    {
    	fillForm();
  	}
  }
};


// step 1
function startBotOnClick(e) 
{
  if (window.location.href.indexOf("shop/all") > -1 || window.location.href.indexOf("shop/new") > -1)  
  {
    console.log('********** supreme bot **********'); 
   	console.log('starting supreme checkout bot by @menascii');
    
    window.localStorage.setItem('startFlag', 'null');
    window.localStorage.setItem('searchItemFlag', 'null');
    window.localStorage.setItem('reloadFlag', 'null');
    
    startTime = performance.now();
    
    promptUserInput();
  }
}

// step 2
function promptUserInput()
{
  if (window.localStorage.getItem('startFlag') == 'null')
  {
    console.log('********** user prompt is launching **********');
    
    var searchItem = null;
    searchItem = prompt('enter an item to search for');

    if(searchItem != null && searchItem != '')
    {
      window.localStorage.setItem('searchItemFlag', searchItem);
      findSupremeItem(searchItem);
    }
    else
    {
      console.log('please enter an item to search for');
      promptUserInput();
    }
  }
}

// step 3
function findSupremeItem(searchItem)
{
  console.log('********** scraping supreme **********');
  
  var imgs = document.getElementsByTagName('img');
  for(i=0;i<imgs.length;i++)
  {
    if (window.localStorage.getItem('reloadFlag') ==  'null')
  	{	
    	if (imgs[i].parentNode.childElementCount == 1)
      {
        checkItemPage(imgs[i], searchItem);
      }
    }
  }
}

// step 4
function checkItemPage(theUrl, searchItem)
{  
  if (window.localStorage.getItem('reloadFlag') ==  'null')
  {	
    const Http = new XMLHttpRequest();
    Http.open("GET", theUrl.parentNode.href);
    Http.onreadystatechange = (e) => 
    {
      if (Http.status == 200 && Http.readyState == 4)
      {
        var parser = new DOMParser();
        var doc = parser.parseFromString(Http.responseText, 'text/html');
        var itemDescription = doc.getElementById('details').childNodes[0];
        var itemColor = doc.getElementById('details').childNodes[1];
        var tokens = searchItem.split(' ');
        var length = tokens.length;

        var userSearchDescription = searchItem.split(' ', length-1);

        if(itemDescription.innerHTML.toLowerCase().includes(userSearchDescription.toString().replace(',',' ').toLowerCase()) &&
           itemColor.innerHTML.toLowerCase().includes(tokens[length-1].toString().toLowerCase()))
        {
          window.localStorage.setItem('reloadFlag', 'true');        
          showItemsFound(theUrl.parentNode.href, searchItem);
        }
        else
        {
          itemNotFound();        
        }

      }
    }
    Http.send();
  }
}

// step 5
// A
function showItemsFound(theUrl, searchItem)
{
  console.log('found in > ' + theUrl + ' <'); 
  
  window.open(theUrl, '_blank');
}

// B
function itemNotFound()
{
  if (window.localStorage.getItem('reloadFlag') ==  'null')
  {
    console.log('********** reloading every 2 seconds :) **********');
    setTimeout(function()
                { 
                  location.reload(); 
                }, 1500);
  }
}

// step 6
function addToCart()
{
  console.log('********** add to cart **********');
  var checkExist = setInterval(
  function() 
  {
    var checkSoldOut = document.getElementsByClassName('button sold-out')[0];      
    var buttonAddToCart = document.getElementsByName('commit')[0];

    if (null != buttonAddToCart || null != checkSoldOut) 
    {	
      clearInterval(checkExist);        
       
      var itemDetails = document.getElementById("details").childNodes;
      
      if (null != buttonAddToCart)
      {
        addToCartClick(buttonAddToCart, itemDetails);
      }   
    }
  }, 1500); 
}

// step 7
function addToCartClick(buttonAddToCart, itemDetails)
{
  console.log('adding to cart: ' + itemDetails[0].innerText);
  document.getElementById('s').selectedIndex = 2;
  buttonAddToCart.click();
  checkOut();
}

// step 8
function checkOut()
{
  console.log('********** checking out **********');
  var checkExist = setInterval(
    function() 
    {
      var buttonCheckOutNow = document.getElementsByClassName('button checkout')[0];
      if (null != buttonCheckOutNow)
      {
        console.log('redirecting to supreme checkout page');
        clearInterval(checkExist);
        buttonCheckOutNow.click();
      }
    }, 1000);
}

// step 9
function fillForm()
{
  console.log('********** entering customer data **********');
  
	document.getElementById('order_billing_name').value = 'FirstName LastName';
  document.getElementById('order_email').value = 'user@email.com';
  document.getElementById('order_tel').value = '555-555-5555';
  document.getElementById('bo').value = '123 home address';
  document.getElementById('oba3').value = '#2';
  document.getElementById('order_billing_zip').value = '99000';
  document.getElementById('order_billing_city').value = 'Whittier';
  document.getElementById('order_billing_state').value = 'CA';
  document.getElementById('order_billing_country').value = 'USA';
  document.getElementById('rnsnckrn').value = 12312312312312323;
  document.getElementById('credit_card_month').selectedIndex = 0;
  document.getElementById('credit_card_year').selectedIndex = 5;
  document.getElementById('orcer').value = 111;
}
