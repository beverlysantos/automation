const Page = require('../lib/webdrivers'),
      Expect = require('../lib/chai-expect'),
      fs  = require("fs"),
      time = require('node-get-time');
      mkdirp = require('mkdirp');
var ks = require('node-key-sender');

var td = '/Business Report Fields (per ASIN).csv';
var ts = '/Business Report Fields (per ASIN).txt';

describe('Amzentrix tests for Business Report Fields (per ASIN)', async function () {
    beforeEach(async () => {	
    	page = new Page();
    	expect = new Expect();
    	driver = page.driver;
    	
    	await page.CreateLog(ts,'Business Report Fields (per ASIN) \n');
    	await page.visit("http://www.amzentrix.uat40/login");

    	await page.Log(ts,' Input Email Address field: jbeverly_qa@amzentrix.com \n');
    	await page.writeByName("email", "jbeverly_qa@amzentrix.com");

    	await page.Log(ts,' Input Password: ***** \n');
    	await page.writeByName("password", "password");    	

    	await page.Log(ts,' Click Submit button \n');
    	await page.clickClassName("btn btn-primary btn-round btn-lg btn-block");

    	await page.Log(ts,' Click Navigation dropdown \n');
    	await page.clickId("navbarTopDropdownMenuItems");

    	await page.Log(ts,' Select Settings \n');
    	await page.clickLink("Settings");
    	await page.clickId("fvpp-blackout");
    	await page.Log(ts,' Select Business Report Fields (per ASIN) \n');
    	await page.clickId("business-report-fields-per-asin");

    	
    });
    it("should add, edit, delete", async () => {
	    try{	
	    	//tcm 44
	    	try {
    			
		    	await page.getClassText("page-header").then(function(text)	 {
		    		return expect.toHaveString(text, "BUSINESS REPORT FIELDS");
				});;	
    			await page.Log(ts,' [SUCCESSFUL] Validation for Page Header \n');

				passed(0,td);
			} catch (error) {
				console.log(error);
				failed(0,td);
			}
	    	//tcm 57
	    	try {
    			await page.Log(ts,' Click Add Button \n');
				await page.clickXpath("//*[@id='main-content']//div[1]/div/a");

    			await page.Log(ts,' Input data in name field \n');
				await page.writeByXpath("(//*[@id='name'])[1]", "bev test 1.1k");

    			await page.Log(ts,' Input data in code field \n');
				await page.writeByXpath("(//*[@id='name'])[2]", "[[bev_test 1.1k]");

    			await page.Log(ts,' Click Submit button \n');
				await page.clickClassName("btn btn-info addbtn");
				await ks.sendKey('enter');
				await page.Log(ts,' [Add Successful] \n');
				passed(1,td);
			} catch (error) {
				console.log(error);
				failed(1,td);
			}
			
			await page.scrollByCss("table tbody tr:nth-last-child(1) td:nth-child(2)");
			await page.getCssText("table tbody tr:nth-last-child(1) td:nth-child(2)").then(function(text){
				return expect.toEqual(text, "bev test 1.1k");
			});
			await page.Log(ts,' [SUCCESSFUL] Validation for table data \n');
			
			//tcm 45
		
			try{
				await page.Log(ts,' Click Edit button \n');
				await page.clickCss("table tbody tr:nth-last-child(1) a");

				await page.clearXpath("(//*[@id='name'])[1]");
				await page.clearXpath("(//*[@id='name'])[2]");

				await page.Log(ts,' Input data in name field \n');
				await page.writeByXpath("(//*[@id='name'])[1]", "bev test1.2k");

				await page.Log(ts,' Input data in name field \n');
				await page.writeByXpath("(//*[@id='name'])[2]", "[[bev_test1.2k]]");

				await page.Log(ts,' Click save button \n');
				await page.clickClassName("btn btn-success editbtn");
				await ks.sendKey('enter');

				await page.scrollByCss("table tbody tr:nth-last-child(1) td:nth-child(2)");
				await page.getCssText("table tbody tr:nth-last-child(1) td:nth-child(2)").then(function(text){
					return expect.toEqual(text, "bev test1.2k");
				});
				await page.Log(ts,' [SUCCESSFUL] Validation for table data \n');

				passed(2,td);
			} catch (error) {
				console.log(error);
				failed(2,td);
			}
			//tcm 30
			try{
				await page.Log(ts,' Click delete button \n');
				await page.clickCss("table tbody tr:nth-last-child(1) a:nth-child(2)");
				await page.clickClassName("btn btn-danger deletebtn");

				await page.Log(ts,' Confirm for deletion. \n');
				await ks.sendKey('enter');
				await page.Log(ts,' [Delete Successful] \n');

				passed(3,td);
			} catch (error) {
				console.log(error);
				failed(3,td);
			}
				
			await fs.appendFile(page.path, 'Business Report Fields (per ASIN) SUCCESSFUL\n', function(err) {

			})
		}catch (error){
			await fs.appendFile(page.path, 'Business Report Fields (per ASIN) FAILED\n', function(err) {
				console.log('\t'+error);
			})
			console.log(error)
		}	
		page.quit();	
    });
});