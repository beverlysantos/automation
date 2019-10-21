const Page = require('../lib/webdrivers'),
      Expect = require('../lib/chai-expect'),
      fs  = require("fs"),
      time = require('node-get-time');
      mkdirp = require('mkdirp');
var ks = require('node-key-sender');

var td = '/Product Keywords.csv';
var ts = '/Product Keywords.txt';


describe('Amzentrix tests for Store Settings > Product Keywords', async function ()
{
	beforeEach(async () => 
	{
		page = new Page();
        expect = new Expect();

		await page.CreateLog(ts,'Producet Keywords \n');
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
		await page.clickId('store_1');
		
		await page.clickId("fvpp-blackout");
		
		await page.Log(ts,' Click Settings \n');	
		await page.clickLink('Settings');
		
		await page.Log(ts,' Click View icon in Producet Keywords \n');	
		await page.Store_Settings('Product Keywords BIM');
	});
	
	it('Should perform Add, Edit and Delete', async () =>
	{
		try
		{
			try
			{ 	
		    	await page.getClassText("page-header").then(function(text)
				{
		    		return expect.toHaveString(text, "PRODUCT");
				});
    			await page.Log(ts,' [SUCCESSFUL] Validation for Page Header \n');

				passed_p(3,td);
			} catch (error) {
				console.log(error);
				failed_p(3,td);
			}			
			// ADD -------------------------------------------------------------------
			try
			{ 			
				await page.Log(ts,' Click Add button \n');
				await page.clickXpath("//*[@id='main-content']//div[1]//div/div/a[2]");
				
				await page.Log(ts," Input 'testz' in Name field \n");
				await page.writeById('name', 'testz');
				
				await page.Log(ts,' Click Submit button \n');
				await page.clickClassName('btn btn-info addbtn');		
				
				await page.Log(ts,' Click OK \n');
				await ks.sendKey("enter");
				
				await page.Log(ts,' Click Search dropdown \n');
				await page.clickXpath("//*[@id='main-content']//div[1]//div/div/a[1]");				
				
				await page.Log(ts," Input 'testz' in Search field \n");
				await page.writeById('name', 'testz');
				
				await page.Log(ts,' Click Search button \n');
				await page.clickClassName('btn btn-primary searchbtn');				
				
				await page.Log(ts," [Add Successful] data found \n");	
				await page.getCssText('#main-content > section > div:nth-child(5) tr > td:nth-child(2)').then(function(text)
				{				
					return expect.toHaveString(text, 'testz')
				});	
				passed_p(2,td);
			} catch (error) {
				console.log(error);
				failed_p(2,td);
			}
			// --------------------------------------------------------------------------
			
			// EDIT ----------------------------------------------------------------------
			try
			{
				await page.Log(ts,' Click Edit icon \n');
				await page.clickCss("table tbody  tr:nth-last-child(1) a");
				
				await page.Log(ts,' Clear Name field \n');
				await page.clearId("name");
				
				await page.Log(ts," Input 'testa' in Name field \n");
				await page.writeById('name', 'testa');
				
				await page.Log(ts,' Click Update button \n');
				await page.clickClassName('btn btn-primary editbtn');		
				
				await page.Log(ts,' Click OK \n');
				await ks.sendKey("enter");
				
				await page.Log(ts,' Click Search dropdown \n');
				await page.clickXpath("//*[@id='main-content']//div[1]//div/div/a[1]");				
				
				await page.Log(ts," Input 'testa' in Search field \n");
				await page.writeById('name', 'testa');
				
				await page.Log(ts,' Click Search button \n');
				await page.clickClassName('btn btn-primary searchbtn');		
				
				await page.Log(ts," [Update Successful] data found \n");	
				await page.getCssText('#main-content > section > div:nth-child(5) tr > td:nth-child(2)').then(function(text)
				{				
					return expect.toHaveString(text, 'testa')
				});
				
				passed_p(1,td);
			} catch (error) {
				console.log(error);
				failed_p(1,td);
			}
			// --------------------------------------------------------------------------
			
			// Delete -------------------------------------------------------------------
			try
			{
				await page.Log(ts, " [For Deletion] data found \n");	
				await page.getCssText("tbody tr:nth-last-child(1) td:nth-child(2)").then(function(text){
					return expect.toHaveString(text,"testa")
				});
				
				await page.Log(ts,' Click Delete icon \n');
				await page.clickCss("table tbody  tr:nth-last-child(1) a:nth-child(2)"); 
				
				await page.Log(ts,' Click Delete button \n');
				await page.clickClassName("btn btn-danger deletebtn");
				
				await page.Log(ts,' Click OK \n');
				await ks.sendKey("enter");
				
				await page.Log(ts, " [Delete Successful] \n");
				passed_p(0,td);
			} catch (error) {
				console.log(error);
				failed_p(0,td);
			}
			// --------------------------------------------------------------------------
			
			await fs.appendFile(page.path , ' Store Settings Producet Keywords SUCCESSFUL \n', function(err) {}) 			
		}
		catch(error)
		{
			await fs.appendFile(page.path , ' Store Settings Producet Keywords FAILED \n', function(err) 
			{
                console.log('\t   ' + error );
            })  
		}	
	});
	afterEach(async () => page.quit());	
});