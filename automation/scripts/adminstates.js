const Page = require('../lib/webdrivers'),
      Expect = require('../lib/chai-expect'),
      fs  = require("fs"),
      time = require('node-get-time');
      mkdirp = require('mkdirp');
      var ks = require('node-key-sender');

var td = '/States.csv';
var ts = '/States.txt';  



//STATES
describe('Amzentrix tests for Admin Settings States', async() => {
   beforeEach (async () =>  {
        page = new Page();
        expect = new Expect();
        driver = page.driver;

        await page.CreateLog(ts, "STATES \n");
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
        await page.scrollByXpath("//*[@id='states']");
        
        await page.Log(ts,'click view State');
        await page.clickXpath("//*[@id='states']");

        await page.Log(ts, "[SUCCESSFUL] validation for STATES Settings \n");
        await page.getClassText("page-header").then(function(text) {
            return expect.toHaveString(text,"STATES SETTINGS\nADD")
  });
});
  it('should perform add edit and delete', async() => {
    try{ 
      try {
          await page.getClassText("page-header").then(function(text)   {
            return expect.toHaveString(text, "STATES SETTINGS\n");
        });;  
          await page.Log(ts,' [SUCCESSFUL] Validation for Page Header \n');
                passed_a(0,td);
        } 
        catch(error)
        {
            console.log('\t   ' + error );
            failed_a(0,td);
        }
      try{
        await page.Log(ts, "click add button");
        await page.clickXpath("//*[@id='main-content']/section/div[1]/div/h3/div/div/a");

        await page.Log(ts, "write state_test \n");
        await page.writeByXpath("//*[@id='name']", "state_test");

        await page.Log(ts, "write code \n");
        await page.writeByXpath("//*[@id='code']", "a1");

        await page.Log(ts, "select region \n");
        await page.clickXpath("//*[@id='region']");

        await page.Log(ts, "select region options \n");
        await page.clickXpath("//*[@id='region']/option[2]");

        await page.Log(ts, "click add button \n");
        await page.clickXpath("//*[@id='main-content']/section/div[4]//form/div[4]//button");

        await page.Log(ts, "click enter");
        await ks.sendKey("enter");

        await page.Log(ts, "write state_test \n");  
        await page.writeByXpath("//*[@id='query']", "state_test");

        await page.Log(ts, "click search button");
        await page.clickXpath("//*[@id='stateSearch']/input");

        await page.Log(ts, "[SUCCESSFUL] validation");
        await page.getXpathText("//*[@id='main-content']/section/div[5]/div/div/div/div/table/tbody/tr/td[2]").then(function(text) { 
          return expect.toHaveString(text, "state_test");
          
          }); 
        passed_a(1,td);
        } 
        catch(error)
        {
            console.log('\t   ' + error );
            failed_a(1,td);
        }
      //EDIT 
      try{

        await page.Log(ts, "click edit button \n");
        await page.clickCss("table tbody tr:nth-last-child(1) a");

        await page.Log(ts, "clear name \n");
        await page.clearXpath("//*[@id='name']");

        await page.Log(ts, "state_done \n");
        await page.writeByXpath("//*[@id='name']", "state_done");

        await page.Log(ts, "click update button \n");
        await page.clickXpath("//*[@id='main-content']/section/div[4]//div/form/div[4]//button");

        await page.Log(ts, "click enter \n");
        await ks.sendKey("enter"); 

            passed_a(2,td);
        } 
        catch(error)
        {
            console.log('\t   ' + error );
            failed_a(2,td);
        }
        await page.Log(ts, "write state_done \n");
        await page.writeByXpath("//*[@id='query']", "state_done");

        await page.Log(ts, "click search button \n");
        await page.clickXpath("//*[@id='stateSearch']/input");
        
      try{
        await page.Log(ts, "click delete button \n");
        await page.clickCss("table tbody tr:nth-last-child(1) a:nth-child(2)");


        await page.Log(ts, "click delete button \n");
        await page.clickXpath("//*[@id='main-content']/section/div[4]//div/form/div[4]//button");

        await page.Log(ts, "click enter \n");
        await ks.sendKey("enter");

            passed_a(3,td);
        } 
        catch(error)
        {
            console.log('\t   ' + error );
            failed_a(3,td);
        }
         await fs.appendFile( page.path , 'States  SUCCESSFUL \n', function(err) {
  
       })

    } catch (error) {
      await fs.appendFile( page.path , 'States FAILED  \n', function(err) {
          console.log('\t   ' + error );
        })
      }
      page.quit();
    });
  });
