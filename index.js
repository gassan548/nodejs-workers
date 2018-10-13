const express = require('express')
const app = express()
const port = 3000
var cron = require('node-cron');
var users = require('./db/db.js');

//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/notificationsCron';
mongoose.connect(mongoDB);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var getMinutes = function(from,to){

    var diffMs = (to - from); 
    return Math.round(((diffMs % 86400000) % 3600000) / 60000);
}


db.once('open', function() {
    console.log("Mongo Connected");
  });


  var CronObj = null;

app.get('/', (req, res) => {


    var totalCronMinutesPassed = 0;


    if(CronObj!=null){
        CronObj.stop();
    }

    CronObj = cron.schedule('1 * * * * *', () => {

    totalCronMinutesPassed +=1;
    var today= new Date();
    users.find({
        // 'meta.lastActivity':{ "$gte": fourteenDaysOldDate}
        "meta.lastActivity":{$exists:true}
      }, function(err, us) {
        if (err) {
          onErr(err, callback);
        } else {
           console.log("got Result from mongo: "+us.length);



           for (const user of us) {
            let lastActiveTime = new Date(user.meta.lastActivity);

            if(lastActiveTime !== undefined){

            // console.log(user.meta.lastActivity);

            let minutesPassed = getMinutes(user.meta.lastActivity,today);
            // console.log(minutesPassed);
            if(minutesPassed > 19){
                users.findById(user._id, function(err, u) {
                    if (!u)
                      return next(new Error('Could not load Document'));
                    else {
                      // do your updates here
                      u.meta.lastActivity = new Date();
                      u.save(function(err) {
                        if (err)
                          console.log('error')
                        else
                          console.log('success updated the record')
                      });
                    }
                  });
            }else if(minutesPassed >= 14 && minutesPassed <= 19){
                    console.log("No Notification");
            }else if(minutesPassed == 14){
                console.log("14 minutes Notification =>",user.username,"Most of the people lose hope after the first week. Don't be one of them");
            }else if(minutesPassed >= 7 && minutesPassed < 14){
            console.log("7 minutes Notification =>",user.username,"ts time to show you skills, please come back");
            } else if( minutesPassed >= 3 && minutesPassed < 7){
            console.log("3 minutes Notification =>",user.username,"We miss you");
            } else if(minutesPassed >= 2 && minutesPassed < 3){
            console.log("2 minutes Notification =>",user.username , "Time to use the app");
            }else{
            //    console.log("Active");
            }
            }

           }

           console.log('totalCronMinutesPassed => ',totalCronMinutesPassed);

        }
      });



 
      
  console.log('running a task every minute');
});

CronObj.start();
console.log("Starting cron");
res.send("Cron is Running Successfully");
    
})




app.listen(port, () => console.log(`Example app listening on port ${port}!`))



