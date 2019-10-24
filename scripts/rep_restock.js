const Page = require('../lib/webdrivers'),
	  Expect = require('../lib/chai-expect'),
	  fs  = require("fs"),
      time = require('node-get-time');
      mkdirp = require('mkdirp');
	  var ks = require('node-key-sender');
	  
var td = '/Restock Inventory Report.csv';
var ts = '/Restock_Inventory_Report.txt';

describe('Amzentrix tests for Restock Inventory Report', async function ()
{
	beforeEach(async () => 
	{ 
		page = new Page();
        expect = new Expect();
        driver = page.driver;
		
		await page.CreateLog(ts,'Restock Inventory Report \n');
		await page.Log(ts,' Navigate to http://www.amzentrix.uat40/login \n');
		await page.visit("http://www.amzentrix.uat40/login");
		
		await page.Log(ts,' Input Email Address field: jbeverly_qa@amzentrix.com \n');
		await page.writeByName("email", "jbeverly_qa@amzentrix.com");
		
		await page.Log(ts,' Input Password: **** \n');
        await page.writeByName("password", "password");
		
		await page.Log(ts,' Click Submit button \n');
		await page.Login_Submit_Click();
		
		await page.getXpathText("//*[@id='app']/div/div[1]/div/h1").then(function(text){
			return expect.toHaveString(text, "Dashboard")
		});	
		await page.Log(ts,' [SUCCESSFUL] Validation for header title \n');
		
		await page.Log(ts,' Clicking Challenger USA \n');
		await page.Store('Challenger USA');
		
		await page.getClassText("page-header").then(function(text)   {
            return expect.toEqual(text, "DASHBOARD CHALLENGER USA"); 
        });		
		await page.Log(ts,' [SUCCESSFUL] Validation for Dashboard title \n');
		
		await page.Log(ts,' Clicking Reports in Dashboard Menu \n');
		await page.Store_SideBar('Reports');
		
		await page.getClassText("page-header").then(function(text)   {
            return expect.toHaveString(text, "REPORTS");
        });
		
		await page.Log(ts,' Click Restock Inventory Report View icon \n');
		await page.Store_Reports_BIM('Restock Inventory Report');
	});
	
	it('Should perform Search', async () => {
		try
		{
			try
			{ 	
		    	await page.getCssText("#app div:nth-child(1) small").then(function(text)
				{
		    		return expect.toHaveString(text, "Restock Inventory Report");
				});
    			await page.Log(ts,' [SUCCESSFUL] Validation for Page Header \n');
				passed_p(3,td);
			} 
			catch(error)
			{
				console.log('\t   ' + error );
				failed_p(3,td);
			}	
            
			// SEARCH -------------------------------------------------------------------
			
			try
			{
				await page.Log(ts,' Clear Date From \n');
				await page.clickId("date_from");
				
				await page.Log(ts,' Select 01 Jul 2019 \n');
				await page.clickXpath("(//*[@id='app']//span[2])[1]");                        // select month
				await page.clickXpath("(//*[@id='app']//header/span[2])[2]");                 // select year
				await page.clickXpath("//*[@id='app']//div[2]//div[1]/div/div[4]/span[10]");  // select 2019
				await page.clickXpath("//*[@id='app']//div[2]//div[1]/div/div[3]/span[7]");   // select july
				await page.clickXpath("//*[@id='app']/div/div/div[2]/div/form/div[1]/div/div[2]/div/span[not(contains(@class,'cell day-header')) and not(contains(@class, 'cell day blank'))][1]"); // select day (1)
				
				await page.Log(ts,' Select 04 Jul 2019 \n');
				await page.clickId("date_to");
				await page.clickXpath("(//*[@id='app']//span[2])[7]");                        // select month
				await page.clickXpath("(//*[@id='app']//header/span[2])[5]");                 // select year
				await page.clickXpath("//*[@id='app']//div[2]//div[2]/div/div[4]/span[10]");  // select 2019
				await page.clickXpath("//*[@id='app']//div[2]//div[2]/div/div[3]/span[7]");   // select july
				await page.clickXpath("//*[@id='app']/div/div/div[2]/div/form/div[2]/div/div[2]/div/span[not(contains(@class,'cell day-header')) and not(contains(@class, 'cell day blank'))][4]"); // select day (4)
				
				await page.Log(ts,' Click Sales Channel dropdown \n');
				await page.clickId("sales_channel");
				
				await page.Log(ts,' Select Amazon.com \n');
				await page.clickXpath("//*[@id='sales_channel']/option[3]");
				
				await page.Log(ts," Input 'K552' in SKU field \n");
				await page.writeByXpath("//*[@id='app']/div/div/div[2]/div/form/div[4]/div[2]/div[2]/div/div/input", "K552");
				
				await page.Log(ts,' Clear Page Limit field \n');
				await page.clearId("limit");
				
				await page.Log(ts," Input '12' in Page Limit field \n");
				await page.writeById("limit","12");
				
				await page.Log(ts,' Click Search button \n');
				await page.clickXpath("//*[@id='app']//div[2]//div[6]/button");
				
				await ks.sendKeys(['down','down']);
				
				await page.getXpathText("//*[@id='app']//div[3]//tr[1]/td[1]").then(function(text){
					return expect.toHaveString(text,"K552")
				});
				await page.Log(ts,' [SUCCESSFUL] Validation for SKU \n');
				passed_p(4,td);
			} 
			catch(error)
			{
				console.log('\t   ' + error );
				failed_p(4,td);
			}
			//-----------------------------------------------------------------------------------------------
						
			await fs.appendFile( page.path, 'Restock Inventory Report SUCCESSFUL \n', function(err) {}) 			
		}
		catch(error)
		{
			await fs.appendFile( page.path, 'Restock Inventory Report FAILED \n', function(err) 
			{
                console.log('\t   ' + error );
            })  
		}	
	});
	afterEach(async () => page.quit());
});