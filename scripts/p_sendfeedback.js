const Page = require('../lib/webdrivers'),
	  Expect = require('../lib/chai-expect'),
	  fs  = require("fs"),
      time = require('node-get-time');
      mkdirp = require('mkdirp');
	  var ks = require('node-key-sender');
	  
var td = '/TC_Send Feedback.csv';
var ts = '/TS_SendFeedback.txt';
var td_id = 'TD_028';

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
			} 
			catch(error)
			{
				console.log('\t   ' + error );
				failed_p(3,td);
			}
			
			// SEARCH -------------------------------------------------------------------
			try
			{ 			
				await page.Log(ts,' Click Search button button \n');
				await page.clickXpath("(//*[@id='main-content']//div[2]//a)[1]");
				
				await page.Log(ts," Select 'Est. Arrival Date [From]' = " + String(await page.getTD(td_id,3)) + " \n");
				await page.writeById("estimated_arrival_date_from", page.getTD(td_id,3));
				
				await page.Log(ts," Select 'Est. Arrival Date [To]' = " + String(await page.getTD(td_id,4)) + " \n");
				await page.writeById("estimated_arrival_date_to", page.getTD(td_id,4));
				
				await page.Log(ts," Select 'Shipment Date [From]' = " + String(await page.getTD(td_id,5)) + " \n");
				await page.writeById("shipment_date_from", page.getTD(td_id,5));
				
				await page.Log(ts," Select 'Shipment Date [To]' = " + String(await page.getTD(td_id,6)) + " \n");
				await page.writeById("shipment_date_to", page.getTD(td_id,6));
				
				await page.Log(ts," Select 'Created At [From]' = " + String(await page.getTD(td_id,7)) + " \n");
				await page.writeById("created_at_from", page.getTD(td_id,7));
				
				await page.Log(ts," Select 'Created At [To]' = " + String(await page.getTD(td_id,8)) + " \n");
				await page.writeById("created_at_to", page.getTD(td_id,8));
				
				await page.Log(ts," Select 'Updated At [From]' = " + String(await page.getTD(td_id,9)) + " \n");
				await page.writeById("updated_at_from", page.getTD(td_id,9));
				
				await page.Log(ts," Select 'Updated At [To]' = " + String(await page.getTD(td_id,10)) + " \n");
				await page.writeById("updated_at_to", page.getTD(td_id,10));
				
				await page.Log(ts," Select " + String(await page.getTD(td_id,11)) + " in Status dropdown \n");
				await page.selectDrpdwn('#status_id', String(await page.getTD(td_id,11)));
				
				await page.Log(ts,' Click Search button \n');
				await page.clickClassName("btn btn-primary search-btn");				
				
				await page.Log(ts," [Search Successful] Results displayed \n");	
				const val1 = await page.getXpathText('//*[@id="main-content"]/section/div[6]/div/div/p');
				expect.toHaveString(val1, "Only first 500 feedbacks will be processed");

				passed_p(4,td);
			} 
			catch(error)
			{
				console.log('\t   ' + error );
				failed_p(4,td);
			}
			// --------------------------------------------------------------------------

			await fs.appendFile( page.path, ' Admin Settings Send Feedback - Add, Edit and Delete SUCCESSFUL \n', function(err) {}) 			
		}
		catch(error)
		{
			await fs.appendFile( page.path, ' Admin Settings Send Feedback - Add, Edit and Delete FAILED \n', function(err) 
			{
                console.log('\t   ' + error );
            })  
		}	
	});
	afterEach(async () => page.quit());	
});
