const Page = require('../lib/webdrivers'),
      Expect = require('../lib/chai-expect'),
      fs  = require("fs"),
      time = require('node-get-time');
      mkdirp = require('mkdirp');
var ks = require('node-key-sender');

var td = '/Note Statuses.csv';
var ts = '/Note Statuses.txt'; 
  //fulfillmentcenter
    describe('Amzentrix tests for Note Statuses', async function () {
    beforeEach (async () =>  {
        page = new Page();
        expect = new Expect();
        driver = page.driver;

        await page.CreateLog(ts, "Note Statuses \n");
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

        await page.Log(ts, 'user scroll down \n');
        await ks.sendKeys(['down','down','down','down','down','down']);
        
        await page.Log(ts, 'click view Note Statuses \n');
        await page.clickXpath("//*[@id='note-statuses']");

        await page.Log(ts, 'SUCCESSFUL to validate \n');  
        await page.getClassText("page-header").then(function(text) {
            return expect.toHaveString(text, "NOTE STATUSES SETTINGS\nADD")
       });
   });
   it("should add edit and delete", async() => {
      try{
        try{
            await page.getClassText("page-header").then(function(text)   {
            return expect.toHaveString(text, "NOTE STATUSES SETTINGS\n");
        });;  
          await page.Log(ts,' [SUCCESSFUL] Validation for Page Header \n');

          passed_a(0,td);

        } catch (error){
              console.log('\t   ' + error );
              failed_a(0,td);
      }
        try{
        await page.Log(ts, 'click add button \n'); 
        await page.clickCss("#main-content > section > div:nth-child(1) > div > h3 > div > div > a");

        await page.Log(ts, 'write NStatus3 \n');  
        await page.writeByXpath("//*[@id='name']", "NStatus3");

        await page.Log(ts, 'click add button \n');  
        await page.clickXpath("//*[@id='main-content']/section/div[4]//form/div[2]//button");

        await page.Log(ts, 'click enter \n'); 
        await ks.sendKey("enter");

        await page.Log(ts, 'search NStatus3 \n'); 
        await page.writeByXpath("//*[@id=\"search\"]", "NStatus3");

        await page.Log(ts, 'click search button \n'); 
        await page.clickXpath("//*[@id='main-content']/section/div[1]/div/ol/form/button");

        await page.getXpathText("//*[@id='main-content']/section/div[4]/div/div/div/div/table/tbody/tr/td[2]").then(function(text) {
              return expect.toHaveString(text, "NStatus3");
        });

        passed_a(1,td);

        } catch (error){
              console.log('\t   ' + error );
              failed_a(1,td);                                                               
      }
        try{
        //edit
        await page.Log(ts, 'click edit button \n'); 
        await page.clickCss("table tbody tr:nth-last-child(1) a");

        await page.Log(ts, 'clear name \n'); 
        await page.clearXpath("//*[@id='name']");

        await page.Log(ts, 'write name TESTING_SUCCESS \n'); 
        await page.writeByXpath("//*[@id='name']", "TESTING_SUCCESS");

        await page.Log(ts, 'click update button \n'); 
        await page.clickXpath("//*[@id='main-content']/section/div[4]//div/form/div[2]//button");
        
        await page.Log(ts, 'click enter \n'); 
        await ks.sendKey("enter");


        await page.Log(ts, 'search TESTING_SUCCESS \n'); 
        await page.writeByXpath("//*[@id=\"search\"]", "TESTING_SUCCESS");

        await page.Log(ts, 'click search button \n'); 
        await page.clickXpath("//*[@id='main-content']/section/div[1]/div/ol/form/button");

            passed_a(2,td);

        } catch (error){
              console.log('\t   ' + error );
              failed_a(2,td);
       }
       try{
        await page.Log(ts, 'click delete button \n'); 
        await page.clickCss("table tbody tr:nth-last-child(1) a:nth-child(2)");

        await page.Log(ts, 'click delete \n'); 
        await page.clickXpath("//*[@id='main-content']/section/div[4]//form/div[2]/div/div/button");

        await page.Log(ts, 'clcik enter \n'); 
        await ks.sendKey("enter");
         passed_a(3,td);

        } catch (error){
              console.log('\t   ' + error );
              failed_a(3,td);
        }
         await fs.appendFile(page.path, 'Note Statuses  SUCCESSFUL \n', function(err) {
  
       })

    } catch (error) {
      await fs.appendFile(page.path, 'Note Statuses FAILED  \n', function(err) {
          console.log('\t   ' + error );
        })
      //console.log(error)
      }
      page.quit();
    });
  });

