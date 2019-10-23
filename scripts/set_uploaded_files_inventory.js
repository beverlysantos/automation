const Page = require('../lib/webdrivers'),
      Expect = require('../lib/chai-expect'),
      fs  = require("fs"),
      time = require('node-get-time');
      mkdirp = require('mkdirp');
      var ks = require('node-key-sender');

var td = '/Uploaded Files (Inventory Reports).csv';
var ts = '/Uploaded Files (Inventory Reports).txt';


describe('Amzentrix tests for Uploaded Files (Inventory Reports) ', async function() {
    beforeEach(async() => {
        page = new Page();
        expect = new Expect();
        driver = page.driver;
        
        await page.CreateLog(ts, "Uploaded Files (Inventory Reports) ");
        await page.Log(ts, 'Navigate to http://www.amzentrix.uat40/login \n');
        await page.visit("http://www.amzentrix.uat40/login");

        await page.Log(ts, 'input Email Adress: aybalane@gmail.com \n');
        await page.writeByName("email", "aybalane@gmail.com");

        await page.Log(ts, 'input password: password \n');  
        await page.writeByName("password", "password");     

        await page.Log(ts, 'click submit button \n');
        await page.clickClassName("btn btn-primary btn-round btn-lg btn-block");

        await page.Log(ts, "click Challenger USA \n");
        await page.clickId("store_1");
        await page.clickId("fvpp-blackout");
        
        await page.Log(ts, " SUCCESSFULL validation \n");
        await page.getClassText("page-header").then(function(text)   {
            return expect.toEqual(text, "DASHBOARD CHALLENGER USA");
        });

        await page.Log(ts, "click Settings \n");
        await page.clickXpath("//*[@id='sidebar']/ul/li[8]/a/span");

      try{
		    await page.Store_Settings('Uploaded Files (Inventory Reports) BIM');
        
             
             passed_a(0,td);
      } 
      catch(error)
      {
        console.log('\t   ' + error );
        failed_a(0,td);
      }
    });
  it(" should search Inventory-08-17-2019 Challenger US.txt", async() => { 
      try{
          try{
              await page.Log(ts, "click search button \n");
              await page.clickXpath("//*[@id='main-content']/section/div[1]/div/h3//a");

              await page.Log(ts, "clear dateFrom \n");
              await page.clearXpath("//*[@id='dateFrom']");

              await page.Log(ts, "clear dateTo \n");
              await page.clearXpath("//*[@id='dateTo']");
              
              await page.Log(ts, "write dateFrom \n");
              await page.writeByXpath("//*[@id='dateFrom']", "08/18/2019");

              await page.Log(ts, "write dateTo \n");
              await page.writeByXpath("//*[@id='dateTo']", "08/18/2019");              

              await page.Log(ts, "write filename \n");
              await page.writeByXpath("//*[@id='inventory_report_files']//form/div[3]/input", "Inventory-08-17-2019 Challenger US.txt");            

              await page.Log(ts, "click search button \n");
              await page.clickXpath("//*[@id='inventory_report_files']//form/div[4]/button");

              await page.Log(ts, "[SUCCESSFUL] validation \n");
              await page.getXpathText("//*[@id='main-content']/section/div[5]//table/tbody/tr[1]/td[2]").then (function(text) { 
                  return expect.toHaveString(text, "Inventory-08-17-2019 Challenger US.txt");
              });
               passed_a(4,td);
        }catch(error) {
          console.log('\t   ' + error );
          failed_a(4,td);
      }
       await fs.appendFile( page.path , 'Uploaded Files (Inventory Reports)  SUCCESSFUL \n', function(err) {
    
         })

    } catch (error) {
      await fs.appendFile( page.path , 'Uploaded Files (Inventory Reports) FAILED  \n', function(err) {
          console.log('\t   ' + error );
        })
      }
      page.quit();
  });
});