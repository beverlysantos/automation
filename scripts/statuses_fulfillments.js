const Page = require('../lib/webdrivers'),
	  Expect = require('../lib/chai-expect'),
	  fs  = require("fs"),
      time = require('node-get-time');
      mkdirp = require('mkdirp');
	  var ks = require('node-key-sender');
	  
var td = '/TC_Statuses(Fulfillments).csv';
var ts = '/TS_Statuses(Fulfillments).txt';
var td_id = 'TD_018';

describe('Amzentrix tests for Admin Settings > Statuses (Fulfillments)', async function () {
	beforeEach(async () => 
	{
		page = new Page();
        expect = new Expect();

		await page.CreateLog(ts,'Statuses(Fulfillments) \n');
		await page.Log(ts,' Navigate to http://www.amzentrix.uat40/login \n');
		await page.visit("http://www.amzentrix.uat40/login");
		
		await page.Log(ts,' Input Email Address field: jbeverly_qa@amzentrix.com \n');
		await page.writeByName("email", "jbeverly_qa@amzentrix.com");
		
		await page.Log(ts,' Input Password: **** \n');
        await page.writeByName("password", "password");
		
		await page.Log(ts,' Click Submit button \n');
		await page.Login_Submit_Click();		
		
		await page.Log(ts,' [Successful] Validation in Header title  \n');	
		await page.getXpathText("//*[@id='app']/div/div[1]/div/h1").then(function(text){
			return expect.toHaveString(text, "Dashboard")
		});
		
		await page.Log(ts,' Select Settings in dropdown menu \n');
		await page.Home_DropdownMenu('Settings');
		
		await page.getClassText("page-header").then(function(text)   {
            return expect.toHaveString(text, "SETTINGS");
        });
		
		await page.Log(ts,' Click View icon in Statuses (Fulfillments) \n');	
		await page.AdminSettings("Statuses (Fulfillments)");
	});		
	it('Should perform Add, Edit and Delete', async () =>
	{
		try
		{
			try
			{ 			
		    	await page.getClassText("page-header").then(function(text)	 {
		    		return expect.toHaveString(text, "STATUSES (FULFILLMENTS)");
				});;	
    			await page.Log(ts,' [SUCCESSFUL] Validation for Page Header \n');
				passed_p(3,td);
			} 
			catch(error)
			{
				console.log('\t   ' + error );
				failed_p(3,td);
			}
			
			// ADD -------------------------------------------------------------------
			try
			{
				await page.Log(ts,' Click Add button \n');
				await page.Addbtn_Click();
				
				await page.Log(ts," Input " + String(await page.getTD(td_id,3)) + " in Name field \n");
				await page.writeById("name", page.getTD(td_id,3));
				
				await page.Log(ts,' Click Add button \n');
				await page.clickClassName("btn btn-info addbtn");	

				await page.Log(ts,' Click OK \n');
				await ks.sendKey("enter");
				
				await page.Log(ts," Input " + String(await page.getTD(td_id,3)) + " in Search field \n");
				await page.writeById("search", page.getTD(td_id,3));
				
				await page.Log(ts,' Click Search button \n');
				await page.clickClassName("btn btn-success");
				
				await page.Log(ts," [Add Successful] \n");	
				
				const val1 = await page.getCssText("tbody tr:nth-last-child(1) td:nth-child(2)");
				expect.toHaveString(val1, String(await page.getTD(td_id,3)));
		
				passed_p(2,td);
			} 
			catch(error)
			{
				console.log('\t   ' + error );
				failed_p(2,td);
			}
			// EDIT -------------------------------------------------------------------
			try
			{
				await page.Log(ts,' Click Edit icon \n');
				await page.clickCss("table tbody  tr:nth-last-child(1) a");
				
				await page.Log(ts,' Clear Name field \n');
				await page.clearId("name");
				
				await page.Log(ts," Input " + String(await page.getTD(td_id,4)) + " in Name field \n");
				await page.writeById("name", page.getTD(td_id,4));
				
				await page.Log(ts,' Click Update button \n');
				await page.clickClassName("btn btn-success editbtn");
				
				await page.Log(ts,' Click OK \n');
				await ks.sendKey("enter");
				
				await page.Log(ts," Input " + String(await page.getTD(td_id,4)) + " in Search field \n");
				await page.writeById("search", page.getTD(td_id,4));
				
				await page.Log(ts,' Click Search button \n');
				await page.clickClassName("btn btn-success");
				
				await page.Log(ts," [Edit Successful] \n");	
				
				const val1 = await page.getCssText("tbody tr:nth-last-child(1) td:nth-child(2)");
				expect.toHaveString(val1, String(await page.getTD(td_id,4)));

				passed_p(1,td);
			} 
			catch(error)
			{
				console.log('\t   ' + error );
				failed_p(1,td);
			}
			// --------------------------------------------------------------------------
			
			// Delete -------------------------------------------------------------------
			try
			{
				await page.Log(ts, " [For Deletion] \n");
				const val1 = await page.getCssText("tbody tr:nth-last-child(1) td:nth-child(2)");
				expect.toHaveString(val1, String(await page.getTD(td_id,4)));
				
				await page.Log(ts,' Click Delete icon \n');
				await page.clickCss("table tbody  tr:nth-last-child(1) a:nth-child(2)"); 
				
				await page.Log(ts,' Click Delete button \n');
				await page.clickClassName("btn btn-danger deletebtn");
				
				await page.Log(ts,' Click OK \n');
				await ks.sendKey("enter");
				
				await page.Log(ts," Input " + String(await page.getTD(td_id,4)) + " in Search field \n");
				await page.writeById("search", page.getTD(td_id,4));
				
				await page.Log(ts,' Click Search button \n');
				await page.clickClassName("btn btn-success");
				
				await page.Log(ts, " [Delete Successful] No data yet. \n");
				
				const val2 = await page.getCssText("#main-content div:nth-child(4) td");
				expect.toHaveString(val2, "No data yet.");

				passed_p(0,td);
			} 
			catch(error)
			{
				console.log('\t   ' + error );
				failed_p(0,td);
			}
			// --------------------------------------------------------------------------

			await fs.appendFile( page.path, ' Admin Settings Statuses (Fulfillments) - Add, Edit and Delete SUCCESSFUL \n', function(err) {}) 			
		}
		catch(error)
		{
			await fs.appendFile( page.path, ' Admin Settings Statuses (Fulfillments) - Add, Edit and Delete FAILED \n', function(err) {
                console.log('\t   ' + error );
            })  
		}	
	});
	afterEach(async () => page.quit());	
});
