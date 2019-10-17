const Page = require('../lib/webdrivers'),
    Expect = require('../lib/chai-expect'),
    fs  = require("fs"),
      time = require('node-get-time');
      mkdirp = require('mkdirp');
    var ks = require('node-key-sender');

var td = '/Sales Information.csv';
var ts = '/Sales Information.txt';

describe('Amzentrix tests for Reports Sales Information', async function(){
    beforeEach(async() => {
        page = new Page();
        expect = new Expect();
        driver = page.driver;
        
        await page.CreateLog(ts, "Sales Information \n");
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

        await page.Log(ts, "click Reports \n");
        await page.clickXpath("//*[@id='sidebar']/ul/li[7]/a/span");

        await page.Log(ts, "user scroll down \n");
        await ks.sendKeys(['down', 'down', 'down', 'down', 'down', 'down']);
        await ks.sendKeys(['down', 'down', 'down', 'down', 'down', 'down']);

        try{
        await page.Log(ts, "click Sales Information \n");
        await page.clickXpath("//*[@id=\"main-content\"]/section/div[4]/div/div/div/table/tbody/tr[15]/td[1]/div/a[1]/span");
              passed_a(0,td)

        } catch (error){
            console.log('\t   ' + error );
              
              failed_a(0,td)
        }
    }); 

    it("Should search Monthly May 2019 to September 2019", async () => {
        try{

            try{

            await page.Log(ts, "click periodicity \n");
            await page.clickId("periodicity");

            await page.Log(ts, "click periodicity option \n");
            await page.clickXpath("(//*[@id='periodicity']/option[2])")
            
            await page.Log(ts, "click start year \n");
            await page.clickXpath("//*[@id='app']/div/div/div[2]/div/form/div[2]/select[1]");
            
            await page.Log(ts, "start year selected \n");
            await page.clickXpath("(//*[@id='app']//div[2]//div[2]/select[1]/option[2])");
            
            await page.Log(ts, "click start month \n");
            await page.clickXpath("(//*[@id='app']//div[2]//div[2]/select[2])");
            
            await page.Log(ts, "Start month selected \n");
            await page.clickXpath("(//*[@id='app']//div[2]//div[2]/select[2]/option[6])");
            
            await page.Log(ts, "click end year \n");
            await page.clickXpath("(//*[@id='app']//div[2]//div[2]/select[3])");
            
            await page.Log(ts, "end year selected \n");
            await page.clickXpath("(//*[@id='app']//div[2]//div[2]/select[3]/option[2])");
            
            await page.Log(ts, "click end month \n");
            await page.clickXpath("(//*[@id='app']//div[2]//div[2]/select[4])");
            
            await page.Log(ts, "end month selected \n");
            await page.clickXpath("(//*[@id='app']//div[2]//div[2]/select[4]/option[10])");
            
            await page.Log(ts, "click sales_channel \n");
            await page.clickId("sales_channel");
            
            await page.Log(ts, "sales_channel selected \n");
            await page.clickXpath("(//*[@id='sales_channel']/option[3])");
            
            await page.Log(ts, "write K552 \n");
            await page.writeByXpath("//*[@id='app']//div[2]//div[4]/div[2]/div[2]//input", "K552");    
            
            await page.Log(ts, "click search button \n");
            await page.clickXpath("//*[@id='app']//div[2]//div[5]/button");
            
            await page.Log(ts, "user scroll down \n");
            await ks.sendKeys(['down', 'down']);
            
            await page.Log(ts, "[SUCCESSFUL] validation \n");
            await page.getXpathText("//*[@id='app']//div[3]//div[3]//tr[1]/td[2]").then(function(text){
                    return expect.toHaveString(text, "K552");
            });
            passed_a(4,td)

        } catch (error){
            console.log('\t   ' + error );
              
              failed_a(4,td)
        }
              await fs.appendFile( page.path, 'Reports Sales Information SUCCESSFUL \n', function(err) {
            
                 })

        } catch (error) {
              await fs.appendFile( page.path, 'Reports Sales Information FAILED  \n', function(err) {
                  console.log('\t   ' + error );
            })
          }
       page.quit();
   });
 });//arian
