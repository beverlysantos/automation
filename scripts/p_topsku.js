const Page = require('../lib/webdrivers'),
      Expect = require('../lib/chai-expect'),
      fs  = require("fs"),
      time = require('node-get-time');
      mkdirp = require('mkdirp');
var ks = require('node-key-sender');

var td = '/Top SKU.csv';
var ts = '/Top SKU.txt';

describe('Amzentrix tests for Reports > Top SKU', async function ()
{
	beforeEach(async () => 
	{
		page = new Page();
        expect = new Expect();

		await page.CreateLog(ts,'TOP SKU \n');
		await page.Log(ts,' Navigate to http://www.amzentrix.uat40/login \n');
		await page.visit("http://www.amzentrix.uat40/login");
		
		await page.Log(ts,' Input Email Address field: jbeverly_qa@amzentrix.com \n');
		await page.writeByName("email", "jbeverly_qa@amzentrix.com");
		
		await page.Log(ts,' Input Password: **** \n');
        await page.writeByName("password", "password");
		
		await page.Login_Submit_Click();
		
		await page.getXpathText("//*[@id='app']/div/div[1]/div/h1").then(function(text){
			return expect.toHaveString(text, "Dashboard")
		});
		
		await page.Log(ts,' [SUCCESSFUL] Validation for header title \n');
		
		await page.Log(ts,' Clicking Challenger USA \n');
		await page.Store("Challenger USA");
		
		await page.getClassText("page-header").then(function(text)   {
            return expect.toEqual(text, "DASHBOARD CHALLENGER USA");
        });
		await page.Log(ts,' [SUCCESSFUL] Validation for Dashboard title \n');
		
		await page.Log(ts,' Clicking Reports in Dashboard Menu \n');
		//await page.Store_SideBar("Reports");
		await page.clickXpath("//*[@id='sidebar']//li[7]/a");
	
		
		await page.Log(ts,' Click Top SKU View icon \n');
		await page.Store_Reports_BIM("Top SKU");
	});
	
	it('Should perform Search', async () => {
		try
		{
			try
			{ 	
		    	await page.getClassText("page-header").then(function(text)
				{
		    		return expect.toHaveString(text, "TOP 5 SKU BY UNITS SOLD");
				});
    			await page.Log(ts,' [SUCCESSFUL] Validation for Page Header \n');

				passed_p(3,td);
			} catch (error) {
				console.log(error);
				failed_p(3,td);
			}	
            
			// SEARCH -------------------------------------------------------------------
			
			try
			{
				await page.Log(ts,' Clear Date From \n');
				await page.clearName("date_from");
				
				await page.Log(ts,' Input Date From = 08/01/2019 \n');
				await page.writeByName("date_from","08/01/2019");
				
				await page.Log(ts,' Clear Date To \n');
				await page.clearName("date_to");

				await page.Log(ts,' Input Date To = 08/31/2019 \n');
				await page.writeByName("date_to","08/31/2019");
				
				await page.Log(ts,' Select Top 2 \n');
				await page.writeByName("limit_textbox","2");
				
				await page.Log(ts,' Click Sales Channel dropdown \n');
				await page.clickId("sales_channel");
				
				await page.Log(ts,' Select Amazon.com \n');
				await page.clickXpath("//*[@id='sales_channel']/option[2]");

				await page.Log(ts,' Click Sales By dropdown \n');
				await page.clickId("search_by");
				
				await page.Log(ts,' Select Top Sales \n');
				await page.clickXpath("//*[@id='search_by']/option[3]");
				
				await page.Log(ts,' Click Submit button \n');
				await page.clickXpath("//*[@id='main-content']/section/div[2]/div/form/div[4]/div/button");
				
				await page.getXpathText("//*[@id='search_criteria'][1]").then(function(text){
					return expect.toHaveString(text,"August 01, 2019")
				});
				await page.Log(ts,' [SUCCESSFUL] Validation for Date From \n');
				
				await page.getXpathText("//*[@id='search_criteria'][2]").then(function(text){
					return expect.toHaveString(text,"August 31, 2019")
				});
				await page.Log(ts,' [SUCCESSFUL] Validation for Date To \n');
				
				await page.getXpathText("//*[@id='search_criteria'][3]").then(function(text){
					return expect.toHaveString(text,"2")
				});
				await page.Log(ts,' [SUCCESSFUL] Validation for Top \n');
				
				await page.getXpathText("//*[@id='search_criteria'][4]").then(function(text){
					return expect.toHaveString(text,"sales")
				});
				await page.Log(ts,' [SUCCESSFUL] Validation for Search By \n');
				
				await page.getXpathText("//*[@id='search_criteria'][5]").then(function(text){
					return expect.toHaveString(text,"Amazon.com")
				});
				await page.Log(ts,' [SUCCESSFUL] Validation for Sales Channel \n');
				
				passed_p(4,td);
			} catch (error) {
				console.log(error);
				failed_p(4,td);
			}
			//-----------------------------------------------------------------------------------------------
			
			await fs.appendFile( page.path, ' Reports Top SKU - Search SUCCESSFUL \n', function(err) {}) 			
		}
		catch(error)
		{
			await fs.appendFile( page.path, ' Reports Top SKU - Search FAILED \n', function(err) 
			{
                console.log('\t   ' + error );
            })  
		}	
	});
	afterEach(async () => page.quit());
});