const Page = require('../lib/webdrivers'),
	  Expect = require('../lib/chai-expect'),
	  fs  = require("fs"),
      time = require('node-get-time');
      mkdirp = require('mkdirp');
	  var ks = require('node-key-sender');
	  
var td = '/Feedback_Templates.csv';
var ts = '/Feedback_Templates.txt';
var td_id = 'TD_059';

describe('Amzentrix tests for Store Settings > Feedback Templates', async function ()
{
	beforeEach(async () => 
	{
		page = new Page();
        expect = new Expect();

		await page.CreateLog(ts,'Feedback Templates \n');
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
		
		await page.Log(ts,' Click Challenger USA \n');	
		await page.Store('Challenger USA');
		
		await page.getClassText("page-header").then(function(text)   {
            return expect.toEqual(text, "DASHBOARD CHALLENGER USA"); 
        });
		
		await page.Log(ts,' Click Settings \n');	
		await page.Store_SideBar('Settings');
		
		await page.getClassText("page-header").then(function(text)   {
            return expect.toHaveString(text, "SETTINGS");
        });
		
		await page.Log(ts,' Click View icon in Feedback Templates \n');	
		await page.Store_Settings('Feedback Templates CRM');
	});
	
	it('Should perform Add, Edit and Delete', async () =>
	{
		try
		{
			try
			{ 	
		    	await page.getClassText("page-header").then(function(text)
				{
		    		return expect.toHaveString(text, "FEEDBACK TEMPLATES");
				});
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
				await page.Log(ts,' Click Add Asin button \n');
				await page.clickCss('#main-content  div:nth-child(1) > div > h3 > div > div > a');
				
				await page.Log(ts," Input " + String(await page.getTD(td_id,3)) + " in Name field \n");
				await page.writeById('title', page.getTD(td_id,3));
				
				await page.Log(ts," Input " + String(await page.getTD(td_id,4)) + " in From field \n");
				await page.writeById('from', page.getTD(td_id,4));
				
				await page.Log(ts," Input " + String(await page.getTD(td_id,5)) + " in From[Label] field \n");
				await page.clearId('from_label');
				await page.writeById('from_label', page.getTD(td_id,5));
				
				await page.Log(ts," Input " + String(await page.getTD(td_id,6)) + " in Subject field \n");
				await page.writeById('subject', page.getTD(td_id,6));
				
				await page.Log(ts," Input " + String(await page.getTD(td_id,7)) + " in Body textarea \n");
				await page.clickId('cke_33');				
				await page.writeByCss('#cke_1_contents > textarea', page.getTD(td_id,7));
				
				//await page.Log(ts," Input " + String(await page.getTD(td_id,7)) + " in Body textarea \n");				
				//await page.writeById('editor_body', page.getTD(td_id,7));
							
				await ks.sendKey(['tab']);
				
				await page.Log(ts," Select " + String(await page.getTD(td_id,8)) + " in Status dropdown \n");
				await page.selectDrpdwn('#status_id', String(await page.getTD(td_id,8)));
							
				await page.Log(ts," Select " + String(await page.getTD(td_id,9)) + " \n");
				await page.selectCheckbox('#emailTemplateForm li', 'input', String(await page.getTD(td_id,9)));
				
				await page.Log(ts,' Click Submit button \n');
				await page.clickClassName('btn btn-info addbtn');

				await page.Log(ts,' Click OK \n');
				await ks.sendKey("enter");	
				
				await ks.sendKeys(['Down','Down','Down','Down','Down','Down','Down']);	
				
				await page.Log(ts," [Add Successful] data found in row 5 \n");
				const val1 = await page.getCssText('tbody tr:nth-last-child(1) td:nth-child(2)');
				expect.toHaveString(val1, String(await page.getTD(td_id,3)));

				passed_p(2,td);
			} 
			catch(error)
			{
				console.log('\t   ' + error );
				failed_p(2,td);
			}
			// --------------------------------------------------------------------------
			
			// EDIT ----------------------------------------------------------------------
			try
			{
				await page.Log(ts,' Click Edit icon \n');
				await page.clickCss("table tbody  tr:nth-last-child(1) a");
				
				await page.Log(ts,' Clear Name field \n');
				await page.clearId('title');
				
				await page.Log(ts," Input " + String(await page.getTD(td_id,10)) + " in Name field \n");
				await page.writeById('title', page.getTD(td_id,10));
				
				await page.Log(ts,' Clear From field \n');
				await page.clearId('from');
				
				await page.Log(ts," Input " + String(await page.getTD(td_id,11)) + " in From field \n");
				await page.writeById('from', page.getTD(td_id,11));
				
				await page.Log(ts,' Clear From [Label] field \n');
				await page.clearId('from_label');
				
				await page.Log(ts," Input " + String(await page.getTD(td_id,12)) + " in From[Label] field \n");
				await page.writeById('from_label', page.getTD(td_id,12));
			
				await page.Log(ts,' Clear Subject field \n');
				await page.clearId('subject');
				
				await page.Log(ts," Input " + String(await page.getTD(td_id,13)) + " in Subject field \n");
				await page.writeById('subject', page.getTD(td_id,13));			
				
				await page.clickId('cke_33');
				
				await page.Log(ts,' Clear Body field \n');
				await page.clearCss('#cke_1_contents > textarea');
				
				await page.Log(ts," Input " + String(await page.getTD(td_id,14)) + " in Body textarea \n");				
				await page.writeByCss('#cke_1_contents > textarea', page.getTD(td_id,14));
				
				await ks.sendKey(['tab']);
				
				await page.Log(ts,' Click Update button \n');
				await page.clickClassName('btn btn-success editbtn');

				await page.Log(ts,' Click OK \n');
				await ks.sendKey("enter");	
				
				await ks.sendKeys(['Down','Down','Down','Down','Down','Down','Down']);	
				
				await page.Log(ts," [Update Successful] data found in row 5 \n");
				const val1 = await page.getCssText('tbody tr:nth-last-child(1) td:nth-child(2)');
				expect.toHaveString(val1, String(await page.getTD(td_id,10)));
			
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
				await ks.sendKeys(['Down','Down','Down','Down','Down','Down','Down']);	
				await page.Log(ts, " [For Deletion] \n");
				const val1 = await page.getCssText('tbody tr:nth-last-child(1) td:nth-child(2)');
				expect.toHaveString(val1, String(await page.getTD(td_id,10)));				
				
				await page.Log(ts,' Click Delete icon \n');
				await page.clickCss("table tbody  tr:nth-last-child(1) a:nth-child(2)");

				await ks.sendKeys(['down','down','down','down','down']);
				
				await page.Log(ts,' Click Delete button \n');
				await page.clickClassName("btn btn-danger deletebtn");
				
				await page.Log(ts,' Click OK \n');
				await ks.sendKey("enter");
				
				await page.Log(ts, " [Delete Successful] \n");
				await page.validateDeletedRow(ts,"#main-content tr td:nth-child(2)", String(await page.getTD(td_id,10)));
				passed_p(0,td);
			} 
			catch(error)
			{
				console.log('\t   ' + error );
				failed_p(0,td);
			}
			// --------------------------------------------------------------------------
			
			await fs.appendFile( page.path, 'Feedback Templates SUCCESSFUL \n', function(err) {}) 			
		}
		catch(error)
		{
			await fs.appendFile( page.path, 'Feedback Templates FAILED \n', function(err) 
			{
                console.log('\t   ' + error );
            })  
		}	
	});
	afterEach(async () => page.quit());	
});