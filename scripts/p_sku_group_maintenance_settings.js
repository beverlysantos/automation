const Page = require('../lib/webdrivers'),
	  Expect = require('../lib/chai-expect'),
	  fs  = require("fs"),
      time = require('node-get-time');
      mkdirp = require('mkdirp');
	  var ks = require('node-key-sender');
	  
var td = '/TC_Sku_Group_Maintenance_Settings.csv';
var ts = '/TS_Sku_Group_Maintenance_Settings.txt';
var td_id = 'TD_061';

describe('Amzentrix tests for Store Settings > Sku Group Maintenance Settings', async function ()
{
	beforeEach(async () => 
	{
		page = new Page();
        expect = new Expect();

		await page.CreateLog(ts,'Sku Group Maintenance Settings \n');
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
		
		await page.Log(ts,' Click View icon in Sku Group Maintenance Settings \n');	
		await page.Store_Settings('Sku Group Maintenance Settings CRM');
	});
	
	it('Should perform Add, Edit and Delete', async () =>
	{
		try
		{
			try
			{ 					
				const text = await page.getClassText("page-header");			
				expect.toHaveString(text, "SKU GROUP MAINTENANCE");			
				
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
				await page.clickCss('#main-content > section > div:nth-child(1) > div > h3 > div > div > a.btn.btn-info');
				
				await page.Log(ts," Input " + String(await page.getTD(td_id,3)) + " in Add New Skus field \n");
				await page.writeByCss('#main-content  div:nth-child(2) > textarea', page.getTD(td_id,3));
				
				await page.Log(ts,' Click Add button \n');
				await page.clickClassName('btn btn-info addbtn');		
				
				await page.Log(ts,' Click OK \n');
				await ks.sendKey("enter");
				
				await page.Log(ts," Input " + String(await page.getTD(td_id,3)) + " in SKU Search field \n");
				await page.writeByCss('#app div:nth-child(2) input', page.getTD(td_id,3));
				
				await page.Log(ts,' Click Search button \n');
				await page.clickCss('#app > span > button');			
				
				await page.Log(ts," [Add Successful] data found \n");					
				const val1 = await page.getCssText('#main-content tr > td:nth-child(2)');
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
				
				await page.Log(ts,' Clear Skus field \n');
				await page.clearCss("#main-content div:nth-child(4) div:nth-child(5) > textarea");
				
				await page.Log(ts," Input " + String(await page.getTD(td_id,4)) + " in Sku field \n");
				await page.writeByCss('#main-content div:nth-child(4) div:nth-child(5) > textarea', page.getTD(td_id,4));
				
				await page.Log(ts,' Click Update button \n');
				await page.clickClassName('btn btn-success editbtn');		
				
				await page.Log(ts,' Click OK \n');
				await ks.sendKey("enter");
				
				await page.Log(ts," Input " + String(await page.getTD(td_id,4)) + " in SKU Search field \n");
				await page.writeByCss('#app div:nth-child(2) input', page.getTD(td_id,4));
				
				await page.Log(ts,' Click Search button \n');
				await page.clickCss('#app > span > button');	
				
				await page.Log(ts," [Update Successful] data found \n");					
				const val1 = await page.getCssText('#main-content tr > td:nth-child(2)');
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
				await page.Log(ts, " [For Deletion] data found \n");	
				const val1 = await page.getCssText('tbody tr:nth-last-child(1) td:nth-child(2)');
				expect.toHaveString(val1, String(await page.getTD(td_id,4)));
				
				await page.Log(ts,' Click Delete icon \n');
				await page.clickCss("table tbody  tr:nth-last-child(1) a:nth-child(2)"); 
				
				await page.Log(ts,' Click Delete button \n');
				await page.clickClassName("btn btn-danger deletebtn");
				
				await page.Log(ts,' Click OK \n');
				await ks.sendKey("enter");
				
				await page.Log(ts," Input " + String(await page.getTD(td_id,4)) + " in SKU Search field \n");
				await page.writeByCss('#app div:nth-child(2) input', page.getTD(td_id,4));
				
				await page.Log(ts,' Click Search button \n');
				await page.clickCss('#app > span > button');
				
				const val2 = await page.getCssText('section div:nth-child(5) td');
				expect.toHaveString(val2, 'No Results Found!');				
				await page.Log(ts, " [Delete Successful] No Results Found! \n");
				
				passed_p(0,td);
			} 
			catch(error)
			{
				console.log('\t   ' + error );
				failed_p(0,td);
			}
			// --------------------------------------------------------------------------
			
			await fs.appendFile( page.path, ' Store Settings Sku Group Maintenance Settings - Add, Edit and Delete SUCCESSFUL \n', function(err) {}) 			
		}
		catch(error)
		{
			await fs.appendFile( page.path, ' Store Settings Sku Group Maintenance Settings - Add, Edit and Delete FAILED \n', function(err) 
			{
                console.log('\t   ' + error );
            })  
		}	
	});
	afterEach(async () => page.quit());	
});
