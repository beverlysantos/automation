const Page = require('../lib/webdrivers'),
      Expect = require('../lib/chai-expect'),
      fs  = require("fs"),
      time = require('node-get-time');
      mkdirp = require('mkdirp');
var ks = require('node-key-sender');

var td = '/CRM Send Feedback.csv';
var ts = '/CRM Send Feedback.txt';

describe('Amzentrix tests for CRM > Send Feedback', async function ()
{
	beforeEach(async () => 
	{
		page = new Page();
        expect = new Expect();

		await page.CreateLog(ts,'Send Feedback \n');
		await page.Log(ts,' Navigate to http://www.amzentrix.uat40/login \n');
		await page.visit("http://www.amzentrix.uat40/login");
		
		await page.Log(ts,' Input Email Address field: jbeverly_qa@amzentrix.com \n');
		await page.writeByName("email", "jbeverly_qa@amzentrix.com");
		
		await page.Log(ts,' Input Password: ***** \n');
        await page.writeByName("password", "password");
		
		await page.Log(ts,' Click Submit button \n');
		await page.Login_Submit_Click();		
		
		await page.getXpathText("//*[@id='app']/div/div[1]/div/h1").then(function(text)
		{		
			return expect.toHaveString(text, "Dashboard")
		});		
		await page.Log(ts,' [Successful] Validation in Header title  \n');	
		
		await page.Log(ts,' Click Send Feedback \n');	
		await page.clickCss("#collapseNotes li:nth-child(8)  a");
		
	});
	
	it('Should perform Search', async () =>
	{
		try
		{
			try
			{ 	
				await page.clickId("fvpp-blackout");
		    	await page.getClassText("page-header").then(function(text)
				{
		    		return expect.toHaveString(text, "SEND FEEDBACK");
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
				await page.Log(ts,' Click Search button button \n');
				await page.clickXpath("(//*[@id='main-content']//div[2]//a)[1]");
				
				await page.Log(ts," Select 'Est. Arrival Date [From]' = 07/01/2019 \n");
				await page.writeById("estimated_arrival_date_from", "07/01/2019");
				
				await page.Log(ts," Select 'Est. Arrival Date [To]' = 09/01/2019 \n");
				await page.writeById("estimated_arrival_date_to", "09/01/2019");
				
				await page.Log(ts," Select 'Shipment Date [From]' = 07/01/2019 \n");
				await page.writeById("shipment_date_from", "07/01/2019");
				
				await page.Log(ts," Select 'Shipment Date [To]' = 09/01/2019 \n");
				await page.writeById("shipment_date_to", "09/01/2019");
				
				await page.Log(ts," Select 'Created At [From]' = 07/01/2019 \n");
				await page.writeById("created_at_from", "07/01/2019");
				
				await page.Log(ts," Select 'Created At [To]' = 09/01/2019 \n");
				await page.writeById("created_at_to", "09/01/2019");
				
				await page.Log(ts," Select 'Updated At [From]' = 07/01/2019 \n");
				await page.writeById("updated_at_from", "07/01/2019");
				
				await page.Log(ts," Select 'Updated At [To]' = 09/01/2019 \n");
				await page.writeById("updated_at_to", "09/01/2019");
				
				await page.Log(ts,' Click Status dropdown \n');
				await page.clickId("status_id");
				
				await page.Log(ts,' Select "For 1st Feedback E-Mail" \n');
				await page.clickXpath("//*[@id='status_id']/option[2]");
				
				await page.Log(ts,' Click Search button \n');
				await page.clickClassName("btn btn-primary search-btn");				
				
				await page.Log(ts," [Search Successful] Results displayed \n");	
				await page.getXpathText('//*[@id="main-content"]/section/div[6]/div/div/p').then(function(text)
				{				
					return expect.toHaveString(text,"Only first 500 feedbacks will be processed")
				});	
				passed_p(4,td);
			} catch (error) {
				console.log(error);
				failed_p(4,td);
			}
			// --------------------------------------------------------------------------

			await fs.appendFile(page.path , 'CRM Send Feedback SUCCESSFUL \n', function(err) {}) 			
		}
		catch(error)
		{
			await fs.appendFile(page.path , 'CRM Send Feedback FAILED \n', function(err) 
			{
                console.log('\t   ' + error );
            })  
		}	
	});
	afterEach(async () => page.quit());	
});