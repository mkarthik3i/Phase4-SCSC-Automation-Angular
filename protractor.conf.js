// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts


const rimraf = require('rimraf');
rimraf('./reports/*', function () { console.log('done'); });
rimraf('C:/Windows/Temp*', function () { console.log('%Temp% Cleaned - done'); });
rimraf('C:/Users/mkart/AppData/Local/Temp*', function () { console.log('Temp Cleaned - done'); });
rimraf('Recycle Bin/*', function () { console.log('Recycle Bin Cleaned - done'); });
//const failFast =require('protractor-fail-fast');
var end_date;
var d = new Date,
    start_date =[d.getMonth()+1, d.getDate(), d.getFullYear()].join('/')+' '+
                  [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');

exports.config = {
  allScriptsTimeout: 600000 ,
  getPageTimeout: 600000 ,
  SELENIUM_PROMISE_MANAGER: false,  
  specs: [
    'features/*.feature',
    //'features/Collection.feature',
   // 'features/Request.feature'
  ],

onComplete: () => {
  return end_date =[d.getMonth()+1, d.getDate(), d.getFullYear()].join('/')+' '+
                  [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');
                  console.log(end_date);
    /* var reporter = require('cucumber-html-reporter');
    var options = {
      //theme Available: ['bootstrap', 'hierarchy', 'foundation', 'simple']
      theme: 'bootstrap',
      jsonFile: 'cucumber_report/json',
      output: 'cucumber_report/Recap_cucumber_report.html',
      reportSuiteAsScenarios: true,
      launchReport: true,
      metadata: {
          "Project":"Recap",
          "Test Environment": "Test",
          "Browser": "Chrome  84",
          "Platform": "Windows 10",
          "Parallel": "Scenarios",
          "Executed": "Remote"
      }
    };
    reporter.generate(options);
 */  },  
  restartBrowserBetweenTest: true,
  capabilities: {
    'browserName': 'chrome',
      chromeOptions: {
      args: [ "--headless", "--disable-gpu", "no-sandbox", "--disable-dev-shm-usage"]
    }
   },

  directConnect: true,
  baseUrl: 'https://angularjs.org',
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),

  cucumberOpts: {
    require: ['StepDefinitions/*.ts','Support/*.ts','Pages/*.ts','config/testdata.json'],
    tags: ['@smoke2'],
    strict: true,
    format:"json:reports/results.json",
    jasmineNodeOpts: { showColors: true,},
    dryRun: true,
    compiler: []
},

plugins:[{
  
  package: "protractor-simple-cucumber-html-reporter-plugin",
  //var d = new Date,
    
  options: {

    // read the options part for more options
    automaticallyGenerateReport: true,
    removeExistingJsonReportFile: true,
    openReportInBrowser:true,
    customData: {
      title: 'Run info',
      data: [
          {label: 'Project', value: 'RECAP'},
          {label: 'Release', value: 'Testing'},
          {label: 'Cycle', value: '1'},
          {label: 'Execution Start Time', value: start_date},
          {label: 'Execution End Time', value: end_date}
            ]
                }
            }
},
],  

onPrepare: () =>{    
   browser.manage().window().maximize();
  //browser.driver.manage().window().setSize(320, 2000);
  browser.wait(()=> {
     //Page is non-Angular
  browser.ignoreSynchronization = true;
  browser.waitForAngularEnabled(false);
  }),
  require('ts-node').register({
    // project: 'e2e/tsconfig.e2e.json'
  });    
  },
// params: {
//   Url: 'https://angularjs.org'
// }

/* afterLaunch: function() {
failFast.clean(); // Removes the fail file once all test runners have completed.
}, */

};
