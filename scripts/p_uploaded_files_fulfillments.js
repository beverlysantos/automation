const Page = require('../lib/webdrivers'),
      Expect = require('../lib/chai-expect'),
      fs  = require("fs"),
      time = require('node-get-time');
      mkdirp = require('mkdirp');
var ks = require('node-key-sender');

var td = '/Uploaded Files (Fulfillments).csv';
var ts = '/Uploaded Files (Fulfillments).txt';

describe('Amzentrix tests for Store Settings > Uploaded Files (Fulfillments)', async function ()
{
	beforeEach(async () => 
	{
		page = new Page();
        expect = new Expect();

		await page.CreateLog(ts,'Uploaded Files (Fulfillments) \n');
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
		await page.Log(ts,' [SUCCESSFUL] Validation in Header title  \n');	
		
		await page.Log(ts,' Click Challenger USA \n');	
		await page.clickId('store_1');
		
		await page.clickId("fvpp-blackout");
		
		await page.Log(ts,' Click Settings \n');	
		await page.clickLink('Settings');
		
		await ks.sendKeys(['down','down','down']);
		
		await page.Log(ts,' Click View icon in Uploaded Files (Fulfillments) \n');	
		await page.Store_Settings('Uploaded Files (Fulfillments) CRM');
		
	});
	
	it('Should perform Search', async () =>
	{
		try
		{
			try
			{ 	
		    	await page.getClassText("page-header").then(function(text)
				{
		    		return expect.toHaveString(text, "UPLOADED FILES (FULFILLMENTS)");
				});
    			await page.Log(ts,' [SUCCESSFUL] Validation for Page Header \n');

				passed_p(3,td);
			} catch (error) {
				console.log(error);
				failed_p(3,td);
			}			
			// Search -------------------------------------------------------------------
			try
			{ 			
				await page.Log(ts,' Click Search button \n');
				await page.clickClassName('btn btn-primary');			
				
				// await page.Log(ts," Input '09/15/2019' in Date From field \n");
				// await page.writeByXpath('//*[@id="date_from"]', '09/15/2019');
				
				// await page.Log(ts," Input '09/15/2019' in Date To field \n");
				// await ks.sendKey('tab');
				// await page.writeByXpath('//*[@id="date_to"]', '09/15/2019');
				
				await page.Log(ts," Input '1566227731-FBA-ChallengerUS-08192019.txt' in Filename field \n");
				await page.writeById('filename', '1566227731-FBA-ChallengerUS-08192019.txt');

				await page.Log(ts,' Click Search button \n');
				await page.clickClassName('btn btn-primary searchbtn');						
				
				await page.Log(ts," [SUCCESSFUL] Validation in Filename \n");	
				await page.getCssText('#main-content div:nth-child(5) td:nth-child(2)').then(function(text)
				{				
					return expect.toHaveString(text, '1566227731-FBA-ChallengerUS-08192019.txt')
				});	
				passed_p(4,td);
			} catch (error) {
				console.log(error);
				failed_p(4,td);
			}
			// --------------------------------------------------------------------------
			
			await fs.appendFile( page.path, ' Store Settings Uploaded Files (Fulfillments) - Search SUCCESSFUL \n', function(err) {}) 			
		}
		catch(error)
		{
			await fs.appendFile( page.path, ' Store Settings Uploaded Files (Fulfillments) - Search FAILED \n', function(err) 
			{
                console.log('\t   ' + error );
            })  
		}	
	});
	afterEach(async () => page.quit());	
});