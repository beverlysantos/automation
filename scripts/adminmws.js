const Page = require('../lib/webdrivers'),
      Expect = require('../lib/chai-expect'),
      fs  = require("fs"),
      time = require('node-get-time');
      mkdirp = require('mkdirp');
var ks = require('node-key-sender');

var td = '/MWS Credentials.csv';
var ts = '/MWS Credentials.txt';

//mwscredentials
 describe('Amzentrix tests for MWS Credentials', async function () {
    beforeEach (async () =>  {
        page = new Page();
        expect = new Expect();
        driver = page.driver;

        await page.CreateLog(ts, "MWS Credentials \n");
        await page.Log(ts, 'Navigate to http://www.amzentrix.uat40/login \n');
        await page.visit("http://www.amzentrix.uat40/login");

        await page.Log(ts, 'input Email Adress: aybalane@gmail.com \n');
        await page.writeByName("email", "aybalane@gmail.com");

        await page.Log(ts, 'input password: password \n');
        await page.writeByName("password", "password");     

        await page.Log(ts, 'click submit button \n');
        await page.clickClassName("btn btn-primary btn-round btn-lg btn-block");

        await page.Log(ts, 'click navbarTopDropdownMenuItems \n');
        await page.clickXpath("//*[@id='navbarTopDropdownMenuItems']");
        
        await page.Log(ts, 'click navbarTogglerDemo03 \n');
        await page.clickXpath("//*[@id='navbarTogglerDemo03']/ul/li/div/a[5]");
        await page.clickId("fvpp-blackout");

        await ks.sendKeys(['down','down','down','down','down','down']);
        await page.Log(ts, 'click view MWS Credentials \n');
        await page.clickXpath("//*[@id='mws-credentials']");

        await page.Log(ts, 'SUCCESSFUL to validate \n');
        await page.getClassText("page-header").then(function(text) {
          return expect.toHaveString(text, "MWS CREDENTIALS SETTINGS");
        });
  });
  it("should add edit and delete", async() => {
    try{
    //add
        try {
          
          await page.getClassText("page-header").then(function(text)   {
            return expect.toHaveString(text, "MWS CREDENTIALS SETTINGS");
        });;  
          await page.Log(ts,' [SUCCESSFUL] Validation for Page Header \n');

         passed_a(0,td);

        } catch (error){
              console.log('\t   ' + error );
              failed_a(0,td);
      }
      try{
        await page.Log(ts, 'click add \n');
        await page.clickCss("#main-content > section > div:nth-child(1) > div > h3 > div > div > a");

        await page.Log(ts, 'write sampleAccess3 \n');
        await page.writeByXpath("//*[@id='access_key']", "sampleAccess3");

        await page.Log(ts, 'write urlSample3 \n');
        await page.writeByXpath("(//*[@id='base_url'])[1]", "urlSample3");

        await page.Log(ts, 'write sampleSecret3 \n');
        await page.writeByXpath("(//*[@id='base_url'])[2]", "sampleSecret3");

        await page.Log(ts, 'write sampleSeller3 \n');
        await page.writeByXpath("//*[@id='seller_id']","sampleSeller3");

        await page.Log(ts, 'click store_id \n');
        await page.clickXpath("//*[@id='store_id']");

        await page.Log(ts, 'write store_id option \n');
        await page.clickXpath("//*[@id='store_id']/option[3]");

        await page.Log(ts, 'click add button \n');
        await page.clickXpath("//*[@id='main-content']/section/div[4]//form/div[6]//button");

        await page.Log(ts, 'click enter \n');
        await ks.sendKey("enter");

        await page.getXpathText("//*[@id='main-content']/section/div[4]//table/tbody/tr[2]/td[2]").then(function(text) {
           return expect.toHaveString(text, "Challenger Europe");
         
         });
          
           passed_a(1,td);

        } catch (error){
              console.log('\t   ' + error );
              failed_a(1,td);
      }
      //edit
      try{
        await page.Log(ts, 'click edit button \n'); 
        await page.clickCss("table tbody tr:nth-last-child(1) a");

        await page.Log(ts, 'clear url \n');  
        await page.clearXpath("(//*[@id='base_url'])[1]");
        
        await page.Log(ts, 'write ak_success3 \n');  
        await page.writeByXpath("//*[@id='access_key']", "ak_success3");

        await page.Log(ts, 'write bu_success2 \n');
        await page.writeByXpath("(//*[@id='base_url'])[1]", "bu_success3");

        await page.Log(ts, 'write sk_sucsess2 \n');
        await page.writeByXpath("(//*[@id='base_url'])[2]", "sk_success3");
        
        await page.Log(ts, 'write si_sucess2 \n');  
        await page.writeByXpath("//*[@id='seller_id']","si_sucess3");

        await page.Log(ts, 'click update button \n');  
        await page.clickXpath("//*[@id='main-content']/section/div[4]//form/div[5]//button");

        await page.Log(ts, 'click enter \n');
        await ks.sendKey("enter");
          
            passed_a(2,td);

        } catch (error){
              console.log('\t   ' + error );
              failed_a(2,td);
      }
      //delete
      try{
        await page.Log(ts, 'click delete button \n'); 
        await page.clickCss("table tbody tr:nth-last-child(1) a:nth-child(2)");

        await page.Log(ts, 'click enter \n');
        await ks.sendKey("enter");

           passed_a(3,td);

        } catch (error){
              console.log('\t   ' + error );
              failed_a(3,td);
      }
       await fs.appendFile(page.path, ' MWS Credentials SUCCESSFUL \n', function(err) {

       })

  } catch (error) {
      await fs.appendFile(page.path, ' MWS Credentials FAILED \n', function(err) {
          console.log('\t   ' + error );
        })
      console.log(error)
      }
      page.quit();
    });
  });