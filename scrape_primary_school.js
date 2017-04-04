const osmosis = require('osmosis');
const Promise = require('bluebird');
const axios = require('axios');
var NodeGeocoder = require('node-geocoder');

var SchoolDAO = require('./model/school');
const schoolDAO = new SchoolDAO();
const config = require('./config');

//
const options = {
  provider: 'google',

  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: config.geocodekey, // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};


const geocoder = NodeGeocoder(options);
// 1 page only
const theBaseList = 'https://bettereducation.com.au/school/Primary/vic/melbourne_top_government_primary_schools.aspx';
const theListLength = 1;
let listArr = [];
let schoolArr = [];

function genEachPage(theBaseList, theListLength) {
  const theReturn = [theBaseList];
  return theReturn;
}


listArr = genEachPage(theBaseList, theListLength);


function buildArr() {
  return Promise.each(listArr, (list) => {
    return new Promise((resolve, reject) => {

      osmosis
        .get(list)
        .set({
          // It seems very smart, it is able to grab the text
          'row': ['table#ctl00_ContentPlaceHolder1_GridView1 > tbody > tr'],
        })
        .data((mydata) => {
          //console.log('--- one ---');
          //console.log(mydata);

          let tmpArr = mydata.row;
          for(let i=0; i<tmpArr.length; i++) {
            let row = tmpArr[i];
            let regex = /^(.*)\D+(\d+)\D+(\d+)\D+(\d+)$/;
            let match = regex.exec(row);

            let schooName = match[1];
            let postCode = match[2];
            let score = match[3];
            let enrolNum = match[4];

            /*
            console.log(schooName);
            console.log(postCode);
            console.log(score);
            console.log(enrolNum);
            */
          }

          resolve();
        })
        .error((err) => {
          console.error(err);
          reject();
        });

    });
  });
}


function buildActualLocation() {
  return Promise.each(schoolArr, (school) => {
    return new Promise((resolve, reject) => {

      //console.log('-- test --');
      //console.log(school.schoolName);

      if(school.schoolName !== undefined) {
        geocoder.geocode(school.schoolName + ' Victoria Australia')
          .then(function(res) {
            //console.log(res);
            if(res[0]) {
              let formattedAddress = res[0].formattedAddress;
              let lat = res[0].latitude;
              let lng = res[0].longitude;

              school.location = formattedAddress;
              school.latLng = { lat: lat, lng: lng };

              schoolDAO
                .save(school)
                .then(() => {
                  resolve();
                });

            }
            else {
              console.error('no such addr');
              console.log(school.schoolName + ' Victoria Australia');
              resolve();
            }

          })
          .catch(function(err) {
            console.log(err);
            reject();
          });
        }
        else {
          resolve();
        }
    });
  });

}

// Run
buildArr().then(() => {
  console.log('-- all done --');
  process.exit(0);
});
