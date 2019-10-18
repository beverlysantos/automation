const Page = require('../lib/webdrivers'),
      Expect = require('../lib/chai-expect'),
      fs  = require("fs"),
      time = require('node-get-time');
      mkdirp = require('mkdirp');
var ks = require('node-key-sender');

var td = '/FBM Fields.csv';
var ts = '/FBM Fields.txt';

describe('Amzentrix tests for FBM Fields', async function () {
    beforeEach(async () => {	
    	page = new Page();
    	expect = new Expect();
    	driver = page.driver;
    	
    	await page.CreateLog(ts,'FBM Fields \n');
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
    	await page.Log(ts,' Select FBA Fields \n');
    	await page.clickId("fbm-fields");

    	
    });
    it("should add, edit, delete", async () => {
    	try{	
	    	//tcm 44
	    	try {
		    	await page.getClassText("page-header").then(function(text)	 {
		    		return expect.toHaveString(text, "FBM FIELDS");
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
				await page.writeByXpath("(//*[@id='name'])[1]", "bev_test_1d");

    			await page.Log(ts,' Input data in code field \n');
				await page.writeByXpath("(//*[@id='name'])[2]", "[[bev_test_1d]]");

				await page.clickClassName("btn btn-info addbtn");
				await ks.sendKey('enter');
				await page.Log(ts,' [Add Successful] \n');

				passed(1,td);
			} catch (error) {
				console.log(error);
				failed(1,td);
			}
			await page.scrollByCss("table tbody tr:nth-last-child(1) td:nth-child(2)");
				//tcm 45
			await page.getCssText("table tbody tr:nth-last-child(1) td:nth-child(2)").then(function(text){
				return expect.toEqual(text, "bev_test_1d");
			});
			
			//tcm 45
			try{
				await page.Log(ts,' Click Edit Button \n');
				await page.clickCss("table tbody tr:nth-last-child(1) a");

				await page.clearXpath("(//*[@id='name'])[1]");
				await page.clearXpath("(//*[@id='name'])[2]");
				await page.clearName("code");

    			await page.Log(ts,' Input data in name field \n');
				await page.writeByXpath("(//*[@id='name'])[1]", "bev_test_2d");

    			await page.Log(ts,' Input data in code field \n');
				await page.writeByXpath("(//*[@id='name'])[2]", "[[bev_test_2d]]");
				await page.clickClassName("btn btn-success editbtn");
				await ks.sendKey('enter');
				await page.Log(ts,' [Edit Successful] \n');

				await page.scrollByCss("table tbody tr:nth-last-child(1) td:nth-child(2)");
				await page.getCssText("table  tbody tr:nth-last-child(1) td:nth-child(2)").then(function(text){
					return expect.toEqual(text, "bev_test_2d");
				});
				passed(2,td);
			} catch (error) {
				console.log(error);
				failed(2,td);
			}
			//tcm 30
			try{
				await page.Log(ts,' Click Delete Button \n');
				await page.clickCss("table tbody tr:nth-last-child(1) a:nth-child(2)");
				await page.clickClassName("btn btn-danger deletebtn");
				await ks.sendKey('enter');
				await page.Log(ts,' [Delete Successful] \n');

				passed(3,td);
			} catch (error) {
				console.log(error);
				failed(3,td);
			}
			await fs.appendFile(page.path, 'Admin Settings - FBM Fields SUCCESSFUL\n', function(err) {

			})
			}catch (error){
			await fs.appendFile(page.path, 'Admin Settings - FBM Fields FAILED\n', function(err) {
				console.log('\t'+error);
			})
			console.log(error)
		}	
		page.quit();	
    });
});