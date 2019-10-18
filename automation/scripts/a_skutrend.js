const Page = require('../lib/webdrivers'),
      Expect = require('../lib/chai-expect'),
      fs  = require("fs"),
      time = require('node-get-time');
      mkdirp = require('mkdirp');
var ks = require('node-key-sender');

var td = '/SKU Trend Monitoring.csv';
var ts = '/SKU Trend Monitoring.txt';


describe('Amzentrix tests for Reports SKU Trend Monitoring', async function(){
    beforeEach(async() => {
        page = new Page();
        expect = new Expect();
        
        await page.CreateLog(ts, "SKU Trend Monitoring ");
        await page.Log(ts, 'Navigate to http://www.amzentrix.uat40/login \n');
        await page.visit("http://www.amzentrix.uat40/login");

        await page.Log(ts, 'input Email Adress: aybalane@gmail.com \n');
        await page.writeByName("email", "aybalane@gmail.com");

        await page.Log(ts, 'input password: password \n');  
        await page.writeByName("password", "password");     

        await page.Log(ts, 'click submit button \n');
        await page.clickClassName("btn btn-primary btn-round btn-lg btn-block");

       await page.Log(ts,' Click Challenger USA \n'); 
    await page.Store('Challenger USA');
        
        await page.Log(ts, " SUCCESSFULL validation \n");
        await page.getClassText("page-header").then(function(text)   {
            return expect.toEqual(text, "DASHBOARD CHALLENGER USA");
        });

       await page.Log(ts,' Click Reports \n'); 
       await page.Store_SideBar('Reports');
   

        try{
        await page.Log(ts, "click SKU Trend Monitoring \n");
         await page.Store_Reports_BIM('Sku Trend Monitoring');
              passed_a(0,td);

        } catch (error){
              console.log('\t   ' + error );
              failed_a(0,td);
        }
    }); 
    it('Should search August 01, 2019 to August 31 2019', async() => {
        try{
            try{
            
            await page.Log(ts, "select date_from \n");
            await page.clickId("date_from");
            await page.clickXpath("//*[@id='app']//div[2]//div[1]/div/div[2]//span[contains(@class, 'prev')][1]");
            await page.clickXpath("//*[@id='app']//div[2]//div[1]/div/div[2]//span[16]");
           
            await page.Log(ts, "select date_to \n");
            await page.clickId("date_to");  
             await page.clickXpath("//*[@id='app']//div[2]//div[2]/div/div[2]//span[16]");
           
            await page.Log(ts, "click sales_channel  \n");
            await page.clickId("sales_channel");
            
            await page.Log(ts, "sales_channel selected \n");
            await page.clickXpath("//*[@id='sales_channel']/option[3]");
            
            await page.Log(ts, "write SKU \n");
            await page.writeByXpath("//*[@id='app']//div[2]//div[4]/div[2]/div[2]/div/div/input", "K552");
            
            await page.Log(ts, "click button \n");
            await page.clickXpath("//*[@id='app']/div/div/div[2]/div/form/div[5]/button");
            
            await page.Log(ts, "user scroll down \n");
            await ks.sendKeys(['down', 'down', 'down']);
            
            await page.Log(ts, "[SUCCESSFUL] validation \n");
            await page.getXpathText("//*[@id='app']/div/div/div[3]/div/div/div[2]/table/tbody/tr[1]/td[2]").then(function(text){
                return expect.toHaveString(text, "K552");
        });
           passed_a(4,td);

        } catch (error){
            console.log('\t   ' + error );
              
              failed_a(4,td);
        
            }
             await fs.appendFile( page.path, 'SKU Trend Monitoring  SUCCESSFUL \n', function(err) {
    
         })

    } catch (error) {
      await fs.appendFile( page.path, 'SKU Trend Monitoring FAILED  \n', function(err) {
          console.log('\t   ' + error );
        })
      }
      page.quit();
   });
});