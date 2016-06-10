/**
 * Created by Suryakala on 24/05/16.
 */

var express = require('express');
var app = express();
var mongolog = require('./connectors/mongoconnector');
var graylogobj = require('./connectors/graylogconnector');
var self;
var exports = module.exports = {};

/** Constructor
 *
 * @param appName       name of the Database
 * @param userName
 * @param logStore
 */

function logger(appName, userName, logStore){
    init(appName, userName, logStore);
}

function init(appName, userName, logStore){
switch(logStore){
    case 'mongoDB':
        logToMongoDB(appName);
        break;
    case 'greylog':
        logToGraylog();
        break;
    case 'splunk':
        logToSplunk();
        break;
    case 'default':
        logToMongoDB();
        break;
}
}

/**
 *  Method used to log different log levels to MongoDB
 * @param appname
 */
function logToMongoDB(appname) {
    var priority;
    var type;
    mongolog = mongolog.mongoLog(appname);
    self = {
        log: function (level, message) {
            console.log("Log saved on " + Date());
            priority = 'normal';
            type = level;
            new mongolog({datetime: Date(), priority: priority, logtype: type, msg: message}).save();
        },
        info: function (message, dataObject) {
            var priority = 'normal';
            var type = 'information';
            new mongolog({datetime: Date(), priority: priority, logtype: type, msg: message, extra: dataObject}).save(function(err){
                if(err) {
                    console.log('error: ' + err);
                }
                else{
                    console.log("Log saved as info " + Date());
                }
            });
        },
        debug: function (message) {
            var priority = 'normal';
            var type = 'debug';
            new mongolog({datetime: Date(), priority: priority, logtype: type, msg: message}).save(function(err){
                if(err) {
                    console.log('error: ' + err);
                }
                else{
                    console.log("Log saved as debug " + Date());
                }
            });
        },
        warning: function (message) {
        var priority = 'normal';
        var type = 'warning';
        new mongolog({datetime: Date(), priority: priority, logtype: type, msg: message}).save(function(err){
            if(err) {
                console.log('error: ' + err);
            }
            else{
                console.log("Log saved as warning " + Date());
            }
        });
    },
        error: function (message) {
            var priority = 'normal';
            var type = 'error';
            new mongolog({datetime: Date(), priority: priority, logtype: type, msg: message}).save(function(err){
                if(err) {
                    console.log('error: ' + err);
                }
                else{
                    console.log("Log saved on " + Date());
                }
            });
        }

    };
}

/**
 *   Method used to log different log levels to Graylog server
 */
function logToGraylog(){
  var graylog = graylogobj.logger;
  //  console.log('GRAY LOG OBJ: '+JSON.stringify(graylog));
    self = {
        info: function (message, extra) {
            graylog.info(message, extra);
            console.log('logged to graylog as info');
        },
        debug: function (message) {
           graylog.debug(message);
            console.log('logged to graylog as debug');
        },
        warning: function (message) {
            graylog.warning(message);
            console.log('logged to graylog as warning');
        },
        error: function (errMsg) {
            graylog.error(new Error(errMsg));
            console.log('logged to graylog as error');
        }

    };
}

exports.self = self;

function logToSplunk(){
  // Splunck implementation go here
}

/*
    Testing using routes, Ideally test by calling the methods by using logger object.
 */
app.get('/', function(req, res){
    console.log('/ route hitted');
    logger('testingapp','suryakala','mongoDB');
    res.end('connected successfully');
});

app.get('/graylog_info', function(req, res){
    self.info("create testing graylog info " + Date());
    res.end("create testing graylog info " + Date());
})

app.get('/graylog_debug', function(req, res){
    self.debug("Log saved as debug" + Date());
    res.end("Log saved as debug" + Date());
})

app.get('/graylog_error', function(req, res){
    self.error("Log saved as error " + Date());
    res.end("Log saved as error " + Date());
})

app.get('/graylog_warning', function(req, res){
    self.warning("Log saved as error " + Date());
    res.end("Log saved as error " + Date());
})

// =======================
// start the server ======
// =======================
var server = app.listen(3000, function(){
    console.log('Server running at http://localhost:3000');
});

exports.closeServer = function(){
    server.close(function () { console.log('Server closed!'); });

};




