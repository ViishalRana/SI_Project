var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var request = require('request');
const cors = require("cors");



//Middleware



var app = express();
app.use(bodyParser.json());
app.use(cors());
var mongourl = 'mongodb+srv://admin:admin@CovidTracker.adcjs.mongodb.net/CovidTracker?retryWrites=true&w=majority'

mongoose.connect(mongourl, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', function () {
    console.log("Mongooose connected");

})

var countrySchema = new mongoose.Schema({
    day: String,
    data: Object
})

var stateSchema = new mongoose.Schema({
    day: String,
    data: Object
})

var districtschema = new mongoose.Schema({
    day: String,
    data: Object
});

var month = ['january', 'feburary', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

var d = new Date();
var today = d.getDate() + '-' + month[d.getMonth()] + '-' + d.getUTCFullYear();


var data = {
    confirmed: 0,
    active: 0,
    recovered: 0,
    death: 0
}


var country = mongoose.model('Countries', countrySchema);

// country.countDocuments(function (err, count) {

//     if (!err && count == 0) {
//         var countryobj = new country({
//             date: "23-may-2020",

//             data: {
//                 India: {
//                     name: "India",
//                     data: data
//                 },
//                 Austrilia:
//                 {
//                     name: "Austrialia",
//                     data: data
//                 }
//             }

//         })
//         countryobj.save();
//     }
//     else
//         console.log(err);
// });



var state = mongoose.model('State', stateSchema);
// state.countDocuments(function (err, count) {
//     if (count == 0 && !err) {
//         request("https://api.covid19india.org/data.json", { json: true }, function (err, res, body) {
//             if (err)
//                 console.log(err);
//             else {
//                 var stateobj = new state({
//                     day: "23-may-2020",
//                     state: body.statewise
//                 });
//                 stateobj.save();
//             }
//         });

//     }
//     else if (err) {
//         console.log(err);
//     }

// })


var district = mongoose.model('district', districtschema);

// district.countDocuments(function (err, count) {
//     if (err)
//         console.log(err);
//     else if (count == 1 && !err) {

//         request("https://api.covid19india.org/state_district_wise.json", { json: true }, function (err, res, body) {
//             if (err)
//                 console.log(err);
//             else {

//                 body["Andhra Pradesh"]['districtData']["SPSNellore"] = body["Andhra Pradesh"]['districtData']["S.P.S. Nellore"];
//                 delete body["Andhra Pradesh"]['districtData']["S.P.S. Nellore"];

//                 body["Andhra Pradesh"]['districtData']["YSRKadapa"] = body["Andhra Pradesh"]['districtData']["Y.S.R.Kadapa"];
//                 delete body["Andhra Pradesh"]['districtData']["Y.S.R.Kadapa"];

//                 body["Punjab"]['districtData']["SASNagar"] = body["Punjab"]['districtData']["S.A.S. Nagar"];
//                 delete body["Punjab"]['districtData']["S.A.S. Nagar"];

//                 body["Andhra Pradesh"]['districtData']["YSRKadapa"] = body["Andhra Pradesh"]['districtData']["Y.S.R. Kadapa"];
//                 delete body["Andhra Pradesh"]['districtData']["Y.S.R. Kadapa"];

//                 var disobj = new district({
//                     day: "23-may-2020",
//                     data: body
//                 });

//                 disobj.save();
//             }
//         });

//     }
// })

findDateDB(today)

function findDateDB(today) {
    // console.log(typeof today);

    district.findOne({ day: today }, function (err, obj) {
        if (err) {
            console.log(err);
        }
        else if (!obj) {

            // console.log(typeof obj);

            console.log("No record Found, inserting record");

            // no country data as of now, need to find api for the same
            // doing for district and state

            // countriesdata

            // request("https://api.covid19api.com/all", { json: true }, function (err, res, body) {
            //     if (err)
            //         console.log(err);
            //     else {
            //         console.log(res.statusCode + ' ' + body);
            //     }

            //     //     var countryobj = new country({
            //     //         day: today,
            //     //         data: body
            //     //     });
            //     //     countryobj.save().then(console.log("data saved"));

            //     // }
            // })


            // statedata
            request("https://api.covid19india.org/data.json", { json: true }, function (err, res, body) {
                if (err)
                    console.log(err);
                else {
                    var stateobj = new state({
                        day: today,
                        data: body.statewise
                    });
                    stateobj.save();
                }
            })

            // district data
            request("https://api.covid19india.org/state_district_wise.json", { json: true }, function (err, res, body) {
                if (err)
                    console.log(err);
                else {

                    body["Andhra Pradesh"]['districtData']["SPSNellore"] = body["Andhra Pradesh"]['districtData']["S.P.S. Nellore"];
                    delete body["Andhra Pradesh"]['districtData']["S.P.S. Nellore"];

                    body["Andhra Pradesh"]['districtData']["YSRKadapa"] = body["Andhra Pradesh"]['districtData']["Y.S.R.Kadapa"];
                    delete body["Andhra Pradesh"]['districtData']["Y.S.R.Kadapa"];

                    body["Punjab"]['districtData']["SASNagar"] = body["Punjab"]['districtData']["S.A.S. Nagar"];
                    delete body["Punjab"]['districtData']["S.A.S. Nagar"];

                    body["Andhra Pradesh"]['districtData']["YSRKadapa"] = body["Andhra Pradesh"]['districtData']["Y.S.R. Kadapa"];
                    delete body["Andhra Pradesh"]['districtData']["Y.S.R. Kadapa"];

                    var disobj = new district({
                        day: today,
                        data: body
                    });

                    disobj.save();
                }
            });

        }

        else {
            console.log('Record Exits');
        }
    });
}

app.listen(3000, function () {
    
    console.log('Node.js listening ...');
});


const states_total=require('./routes/api/states_total');
app.use('/api/states',states_total);


/*const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app= express();

//Middleware

app.use(bodyParser.json());
app.use(cors());

const states_total=require('./routes/api/states_total');
app.use('/api/states_total',states_total);


const port=process.env.PORT || 5000;

app.listen(port,()=>console.log(`Server running on port ${port}`));*/