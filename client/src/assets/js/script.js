/*$(document).ready(function () {
    var url = "https://api.covid19india.org/state_district_wise.json"; 
$(document).ready(function () {
    var url = "https://api.covid19india.org/state_district_wise.json";

    $.getJSON(url, function (data) {
        var stateData = data['Gujarat']
        var districtData = stateData['districtData']
        var districtList = Object.keys(districtData);
        console.log(districtList);

        var total_active = 0;
        var total_recovered = 0;
        var total_deaths = 0;
        var total_confirmed = 0;

        var districtwise = [];
        var confirmed = [];
        var recovered = [];
        var deaths = [];
        var active = [];

        districtList.forEach(function (district) {
            districtwise.push(district);
            var activeCount = districtData[district]['active'];
            var recoveredCount = districtData[district]['recovered'];
            var deathsCount = districtData[district]['deceased'];
            var confirmedCount = districtData[district]['confirmed'];
            confirmed.push(confirmedCount)
            recovered.push(recoveredCount)
            deaths.push(deathsCount)
            active.push(activeCount)

            total_active += activeCount
            total_confirmed += confirmedCount
            total_recovered += recoveredCount
            total_deaths += deathsCount

        });

        districtwise.shift();
        confirmed.shift();
        recovered.shift();
        deaths.shift();

        $("#active").append(total_active);
        $("#recovered").append(total_recovered);
        $("#deaths").append(total_deaths);
        $("#confirmed").append(total_confirmed);

        var ctx = document.getElementById("myChart").getContext('2d');

        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: districtwise,
                datasets: [
                    {
                        label: "Confirmed Cases",
                        data: confirmed,
                        backgroundColor: "#f1c40f",
                        minBarLength: 100
                    },
                    {
                        label: "Recovered Cases",
                        data: recovered,
                        backgroundColor: "#2ec771",
                        minBarLength: 100
                    },
                    {
                        label: "Deceased",
                        data: deaths,
                        backgroundColor: "#e74c3c",
                        minBarLength: 100
                    }
                ]
            },
            options: {}
        });

    })
})*/
$(document).ready(function () {

    var url = "https://api.covid19india.org/data.json";

    $.getJSON(url,function (data) {
        
        var dailyConfirmed = [];
        var dailyRecoverd = [] ;
        var dailyDeaths = [];
        var dateWise = [];
        var dailyActive = [];


        var trendDate = [];
        var trendConfirmed = [];
        var trendRecoverd = [];
        var trendDeaths = [];
        var trendActive = [];

       
     
        var dataWiseData = data['cases_time_series'];
        dataWiseData.forEach(function (casedates) {
            dateWise.push(casedates['date']);
            dailyConfirmed.push(casedates['totalconfirmed']);
            dailyRecoverd.push(casedates['totalrecovered']);
            dailyDeaths.push(casedates['totaldeceased']);
            var actv = casedates['totalconfirmed'] - casedates['totalrecovered'] - casedates['totaldeceased'];
            dailyActive.push(actv);
        })


        //datewiseData
        for (i = dateWise.length - 1; i > dateWise.length - 11 ; i--) {
            trendDate.push(dateWise[i]);
        }
        for (i = dailyConfirmed.length - 1; i > dailyConfirmed.length - 11; i--) {
            trendConfirmed.push(dailyConfirmed[i]);
        }
        for (i = dailyDeaths.length - 1; i > dailyDeaths.length - 11; i--) {
            trendDeaths.push(dailyDeaths[i]);
        }
        for (i = dailyRecoverd.length - 1; i > dailyRecoverd.length - 11; i--) {
            trendRecoverd.push(dailyRecoverd[i]);
        }
        for (i = dailyActive.length - 1; i > dailyActive.length - 11; i--) {
            trendActive.push(dailyActive[i]);
        }

        //charts
        var  ctx= document.getElementById("confirm").getContext('2d');
        var confirm = new Chart(ctx, {
            type: 'line',
            data: {
                labels: trendDate,
                datasets: [
                    {
                        label: "Confirmed Cases",
                        data: trendConfirmed,
                        backgroundColor: "#f1c40f",
                        minBarLength: 100,
                        fill:false
                       
                    }
                ]
            },
            options: {}
        }); 
        var ctx = document.getElementById("chart1").getContext('2d');
        var chart1 = new Chart(ctx, {
            type: 'line',
            data: {
                labels: trendDate,
                datasets: [
                    {
                        label: "Active Cases",
                        data: trendActive,
                        backgroundColor: "#0000FF",
                        minBarLength: 100,
                        fill: false

                    }
                ]
            },
            options: {}
        }); 

        var ctx = document.getElementById("chart2").getContext('2d');
        
        var chart2 = new Chart(ctx, {
            type: 'line',
            data: {
                labels: trendDate,
                datasets: [
                    {
                        label: "Recovered Cases",
                        data: trendRecoverd,
                        backgroundColor: "#008000",
                        minBarLength: 100,
                        fill: false
                    }
                ]
            },
            options: {}
        });


        var ctx = document.getElementById("deaths").getContext('2d');
        var deaths = new Chart(ctx, {
            type: 'line',
            data: {
                labels: trendDate,
                datasets: [
                    {
                        label: "Deaths",
                        data: trendDeaths,
                        backgroundColor: "#FF0000",
                        minBarLength: 100,
                        fill: false
                    }
                ]
            },
            options: {}
        });     
    })
});


   

