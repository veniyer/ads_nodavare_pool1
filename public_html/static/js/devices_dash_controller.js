//Developed by NodaVare for ADS RFQ
var homeApp = angular.module('homeApp',[]);
homeApp.controller('homeController',['$scope','$http',function($scope,$http){
    //The current c3 chart object being displayed.
    $scope.currentChart;
    //Holds the list of drugs in order as generated in the bar chart for reference when action is performed on a drug
    $scope.drugslist=[];
    //The current drug being analyzed
    $scope.drugclicked=[];
    //The current view state
    $scope.viewState='home';
    //Some values that are obtained asynchronously from openFDA and populated in the charts
    $scope.enforcementBarChartValues=[];
    $scope.enforcementBarChartLabels=[];
    $scope.doesdrughaverecalls=false;
    $scope.seriousrecalls=true;
    $scope.seriousreports=true;
    
    $scope.setViewState = function(state) {
        $scope.viewState = state;
        if(state==='home')
        {
            $scope.isHome=true;
        }
    };
    
       
    //Processes openFDA API JSON response to draw bar chart
    $scope.processDevicesAdverseEventsResponse = function(data) {
        var barChartValues=[];
        var barChartLabels=[];
        barChartValues.push('# of matching records');
        angular.forEach(data.results, function(result) {
          var term_ = result.term;
          if (term_ === "") {
              term_ = "null/no value";
          }
          else
          {
            term_ = term_.toLowerCase();
          }
          barChartLabels.push(term_);
          $scope.drugslist.push(term_);
          barChartValues.push(result.count);
        });
        generateBarChart('#theChart',barChartValues,barChartLabels);
    };
    
    $scope.getHomeChart = function () {
    //Change the view state for repainting the screen
    
    $scope.setViewState('start');
    $scope.isHome=false;
    $scope.drugclicked=[];
    $scope.currentChart;
    $scope.enforcementBarChartValues=[];
    $scope.enforcementBarChartLabels=[];
    $scope.doesdrughaverecalls=false;
    $scope.seriousrecalls=true;
    $scope.seriousreports=true;
    //Action to be performed on page load, generated the bar chart on the landing page to drive this use case
    $http.get('https://api.fda.gov/device/event.json?search=date_received:[20040101+TO+20150101]&count=device.brand_name.exact&limit=10').success($scope.processDevicesAdverseEventsResponse);
 
    };
    
    //$scope.getHomeChart();
    
    //Generates the bar chart with the adverse events for drugs since 2004
    function generateBarChart(selectedChart,dataValuesForChart, dataLabelsForChart) {
      chartHeight = 300;
      $scope.currentChart = c3.generate({
          bindto: selectedChart,
          data: {
            columns: [
              dataValuesForChart
            ],
            type : 'bar',
            onclick: barChartClickAction
          },
          color: {
            pattern: ['#00539b'] // FDA blue, kinda dark
          },
          bar: {
            width: {
              ratio: 0.35
            }
          },
          axis: {
            rotated: true,
            x: {
              type: 'categorized',
              categories: dataLabelsForChart
            },
            y: {
              show: false,
              ticks: {
                culling: {
                  max: 1
                }
              }
            }
          },
          labels: true,
          size: {
            height: chartHeight
          },
          legend: {
            show: true
          }
        });    
    }
    
    //Generates the bar chart with the adverse events for drugs since 2004
    function generateBarChartOperator(selectedChart,dataValuesForChart, dataLabelsForChart) {
      chartHeight = 300;
      $scope.currentChart = c3.generate({
          bindto: selectedChart,
          data: {
            columns: [
              dataValuesForChart
            ],
            type : 'bar'
           // onclick: barChartOperatorClickAction
          },
          color: {
            pattern: ['#00539b'] // FDA blue, kinda dark
          },
          bar: {
            width: {
              ratio: 0.35
            }
          },
          axis: {
            rotated: true,
            x: {
              type: 'categorized',
              categories: dataLabelsForChart
            },
            y: {
              show: false,
              ticks: {
                culling: {
                  max: 1
                }
              }
            }
          },
          labels: true,
          size: {
            height: chartHeight
          },
          legend: {
            show: true
          }
        });    
    }
    
    //Action to be performed when a drug on the bar chart is clicked    
    var barChartClickAction = function (d,element) { 
          $scope.drugclicked = $scope.drugslist[d.index];
          var deviceclicked = $scope.drugclicked;
          deviceclicked = deviceclicked.toUpperCase();
          var darr = deviceclicked.split(" ");
          var deviceclickeddelim="";
          for(i=0;i<darr.length;i++)
          {
            if(i>0)  
            {
                deviceclickeddelim = deviceclickeddelim + '+' + darr[i];
            }
            else
            {
                deviceclickeddelim=darr[i];
            }
          }
          var geturl = 'https://api.fda.gov/device/event.json?search=date_received:[20040101+TO+20150101]+AND+device.brand_name.exact:"'+deviceclickeddelim+'"&count=device.device_operator.exact';
         // alert(geturl);
          $http.get(geturl).success(processAdverseDeviceOperatorResponse);
          
    };
    
    //Action to be performed when a drug on the bar chart is clicked    
    var barChartOperatorClickAction = function (d,element) { 
    
         $scope.drugclicked = $scope.drugslist[d.index];
       //  alert($scope.drugclicked);
          var deviceclicked = $scope.drugclicked;
          deviceclicked = deviceclicked.toUpperCase();
          var darr = deviceclicked.split(" ");
          var operatorclickeddelim="";
          for(i=0;i<darr.length;i++)
          {
            if(i>0)  
            {
                operatorclickeddelim = operatorclickeddelim + '+' + darr[i];
            }
            else
            {
                operatorclickeddelim=darr[i];
            }
          }
          var geturl = 'https://api.fda.gov/device/event.json?search=date_received:[20040101+TO+20150101]+AND+device.device_operator.exact:"'+operatorclickeddelim+'"&count=device.brand_name.exact';
       //   alert(geturl);
         // $http.get(geturl).success(processDevicesAdverseEventsResponse);
    };
    
    var processAdverseDeviceOperatorResponse = function(data) {
        var barChartValues=[];
        var barChartLabels=[];
        barChartValues.push('# of matching records');
        angular.forEach(data.results, function(result) {
          var term_ = result.term;
          if (term_ === "") {
              term_ = "null/no value";
          }
          if (term_ === "0") {
              term_ = "null/no value";
          }
          else
          {
            term_ = term_.toLowerCase();
          }
          barChartLabels.push(term_);
          $scope.drugslist.push(term_);
          barChartValues.push(result.count);
        });
        generateBarChartOperator('#theChart',barChartValues,barChartLabels);
        $scope.setViewState('adversereports');
    };
    
    var errorEnforcementReportsForDrugResponse = function(data) {
        $scope.doesdrughaverecalls=false;
        $scope.seriousrecalls=false;
    };
    
    var processEnforcementReportsForDrugResponse = function(data) {
        //var enforcementBarChartValues=[];
        //var enforcementBarChartLabels=[];
        //alert('here');
        $scope.enforcementBarChartValues.push('Recalls');
        $scope.enforcementBarChartLabels.push('When');
        rollupDatesAndValues(data.results, $scope.enforcementBarChartValues, $scope.enforcementBarChartLabels);
  

        /*if(data.results!==null)
        {
            angular.forEach(data.results, function(result) {
              var time_ = result.time;

              $scope.enforcementBarChartLabels.push(time_);
              $scope.enforcementBarChartValues.push(result.count);
            });
            var text='';
            var index=0;
            for (index=0;index<$scope.enforcementBarChartLabels.length;index++)
            {
                text = text + $scope.enforcementBarChartLabels[index];
            }
            alert(text);
            text='';
            for (index=0;index<$scope.enforcementBarChartValues.length;index++)
            {
                text = text + $scope.enforcementBarChartValues[index];
            }
            alert(text);
        }
        else
        {
            alert('No recalls for product');
        }*/
        //generateBarChart('#theChart',$scope.enforcementBarChartValues,$scope.enforcementBarChartLabels);

    };
    
    function testLineChart() {
        $scope.currentChart = c3.generate({
            bindto: '#theChart',
    data: {
        x: 'date',
              //x_format: '%Y%m',
        columns: [
            //['data1', 30, 200, 100, 400, 150, 250],
            //['data2', 50, 20, 10, 40, 15, 25]
            ['x', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06'],
                 ['Reports', 30, 200, 100, 400, 150, 250]
        ]
    }
});
    }

    /*function generateLineChart(selectedChart, dataValuesForChart, dataLabelsForChart) {
      chartHeight = 300;
      var chart = c3.generate({
          bindto: selectedChart,
          data: {
            x: 'Date',
            x_format: '%Y%m%d',
            columns: [
              dataLabelsForChart,
              dataValuesForChart
              // ['Date', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06'],
               //['Date', '20130101', '20130102', '20130103', '20130104', '20130105', '20130106'],
             //  ['Reports', 30, 200, 100, 400, 150, 250]
            ]
          },
          point: {
            show: true
          },
          color: {
            pattern: ['#00539b'] // FDA blue, kinda dark
          },
          axis: {
            x: {
              type: 'timeseries',
              tick: {
                format: '%Y-%m-%d',
                culling: {
                  max: 1
                }
              }
            },
            y: {
              tick: {
                culling: {
                  max: 1
                }
              }
            }
          },
          legend: {
            show: true
          },
          size: {
            height: chartHeight
          }
        });
    }*/
    
    function generateLineChart(selectedChart,dataValuesForChart, dataLabelsForChart) {
      $scope.currentChart = c3.generate({
          bindto: selectedChart,
          data: {
            x: 'Date',
            x_format: '%Y%m',
            columns: [
              dataLabelsForChart,
              dataValuesForChart
              // ['x', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06'],
              // ['Reports', 30, 200, 100, 400, 150, 250]
            ]
          },
          point: {
            show: false
          },
          color: {
            pattern: ['#00539b'] // FDA blue, kinda dark
          },
          axis: {
            x: {
              type: 'timeseries',
              tick: {
                format: '%Y-%m',
                culling: {
                  max: 6
                }
              }
            },
            y: {
              tick: {
                culling: {
                  max: 4
                }
              }
            }
          },
          legend: {
            show: true
          },
          size: {
            height: chartHeight
          }
        });
    }
    
        function generateLine2Chart(selectedChart,dataValuesForChart, dataLabelsForChart) {
      $scope.currentChart = c3.generate({
          bindto: selectedChart,
          data: {
            xs: {
                'Reports': 'Date',
                'Recalls': 'When'
            },
            //x: 'Date',
            x_format: '%Y%m',
            columns: [
              dataLabelsForChart,
              dataValuesForChart,
              ['When', '2005-11', '2009-07', '2011-05'],
              ['Recalls', 30, 200, 100]
              // ['x', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06'],
              // ['Reports', 30, 200, 100, 400, 150, 250]
            ],
            axes: {
        Recalls: 'y2' 
      }
          },
          point: {
            show: false
          },
          color: {
            //pattern: ['#00539b'] // FDA blue, kinda dark
          },
          axis: {
            x: {
              type: 'timeseries',
              tick: {
                format: '%Y-%m',
                culling: {
                  max: 6
                }
              }
            },
            x2: {
              type: 'timeseries',
              show: true ,// ADD
              tick: {
                format: '%Y-%m',
                culling: {
                  max: 6
                }
              }
            },
            y: {
              tick: {
                culling: {
                  max: 4
                }
              }
            },
            y2: {
            show: true // ADD
            }
          },
          legend: {
            show: true
          },
          size: {
            height: chartHeight
          }
        });
    }
    
    function generateDrugReportAndRecallChart(selectedChart,reportValues,reportLabels,recallValues,recallLabels) {
 
    $scope.currentChart = c3.generate({
        bindto: selectedChart,
        data: {
            xs: {
                'Reports': 'Date',
                'Recalls': 'When',
                'Serious': 'Date',
                'SeriousRecalls': 'When'
            },
            x_format: '%Y%m',
            columns: [
                reportValues,
                reportLabels,
                recallValues,
                recallLabels
               // ['x1', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04'],
               // ['x2','2013-01-02', '2013-01-03', '2013-01-04'],
                // ['x1', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04'],
               // ['x2','2013-01-02', '2013-01-03', '2013-01-04'],
                // ['Date', '201302', '201303', '201304', '201305'],
               // ['When','201303', '201304', '201305'],
               // ['Reports', 30, 200, 100, 400],
              //  ['Recalls', 20, 180, 240]
            ],
            axes: {
                Recalls: 'y2', // ADD
                SeriousRealls: 'y2'
            }
        },
        axis: {
            x: {
                type: 'timeseries',
                tick: {
                    format: '%Y-%m'
                }
            },
            y2: {
                show: true,
                tick: {
                    fit: true
                }
            }
        }
    });
    }
    
    $scope.loadRecallData = function(){
        /*chart.load({
        bindto: '#theChart',
        columns: [
          ['When','201303', '201304', '201305'],
          ['Recalls', 20, 180, 240]
        ]
        });*/
        $scope.currentChart.load({
        bindto: '#theChart',
        columns: [
          //['When','201303', '201304', '201305'],
          //['Recalls', 20, 180, 240]
          $scope.enforcementBarChartLabels,
          $scope.enforcementBarChartValues
                  
        ]
        });
       // $scope.setViewState('recallreports');;
    };
    
    //Action to be performed when a drug on the bar chart is clicked    
    $scope.loadSeriousAction = function () {
        $http.get('https://api.fda.gov/drug/event.json?search=receivedate:[20040101+TO+20150101]+AND+patient.drug.medicinalproduct:'+$scope.drugclicked+'+AND+serious:1&count=receivedate').success(processSeriousReportsForDrugResponse).error(errorSeriousReportsForDrugResponse);          
    };
    
    var processSeriousReportsForDrugResponse = function(data) {
        $scope.seriousreports=true;
        var lineChartValues=[];
        var lineChartLabels=[];
        lineChartValues.push('Serious'); // c3 needs this first in the array
        lineChartLabels.push('Date'); // c3 needs this first in the array
   
        rollupDatesAndValues(data.results, lineChartValues, lineChartLabels);

        $scope.currentChart.load({
        bindto: '#theChart',
        columns: [
          //['When','201303', '201304', '201305'],
          //['Recalls', 20, 180, 240]
          lineChartLabels,
          lineChartValues
                  
        ]
        });
    };
    
    var errorSeriousReportsForDrugResponse = function(data) {
       alert('No serious reports');
       $scope.seriousreports=false;
    };
    
    //Action to be performed when a drug on the bar chart is clicked    
    $scope.loadSeriousRecallAction = function () {
        var geturl = 'https://api.fda.gov/drug/enforcement.json?search=product_description:'+$scope.drugclicked+'+AND+classification:Class+I&count=report_date';
        
        $http.get(geturl).success(processSeriousRecallReportsForDrugResponse).error(errorSeriousRecallsForDrugResponse);          
    };
    
    var processSeriousRecallReportsForDrugResponse = function(data) {
        $scope.seriousrecalls=true;
        $scope.enforcementBarChartValues=[];
        $scope.enforcementBarChartLabels=[];
        $scope.enforcementBarChartValues.push('SeriousRecalls');
        $scope.enforcementBarChartLabels.push('When');
        rollupDatesAndValues(data.results, $scope.enforcementBarChartValues, $scope.enforcementBarChartLabels);
  

        $scope.currentChart.load({
        bindto: '#theChart',
        columns: [
          //['When','201303', '201304', '201305'],
          //['Recalls', 20, 180, 240]
          $scope.enforcementBarChartLabels,
          $scope.enforcementBarChartValues
                  
        ]
        });
    };
    
    var errorSeriousRecallsForDrugResponse = function(data) {
       $scope.seriousrecalls=false;
    };

    function rollupDatesAndValues(data, valuesArray, datesArray) {
    var nestedData = d3.nest()
          .key(function(d) {
            return d.time.slice(0,6);
          })
          .rollup(function(d) {
            return d3.sum(d, function(g) {
              return g.count;
            });
          })
          .entries(data);

    nestedData.map(function(item) {
      datesArray.push(item.key);
      valuesArray.push(item.values);
    });
    }
   
}]);