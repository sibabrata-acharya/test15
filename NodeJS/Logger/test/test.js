var request = require("request"),
assert = require('assert'),
    logger = require("../logger.js"),
base_url = "http://localhost:3000/",
    log_info = "http://localhost:3000/graylog_info",
    log_debug = "http://localhost:3000/graylog_debug",
    log_error = "http://localhost:3000/graylog_error",
    log_warning = "http://localhost:3000/graylog_warning"


describe("Calling constructor", function(){

    describe("GET /", function() {
        it("returns status code 200", function (done) {
            request.get(base_url, function (error, response, body) {
                assert.equal(200, response.statusCode);

                done();

            });
        });
        it("returns connected successfully", function (done) {
            request.get(base_url, function (error, response, body) {
                //expect(body).toBe("connected successfully");
                assert.equal("connected successfully", body);

                done();
            });
        });

        it("mongo log test info", function (done) {
            request.get(log_info, function (error, response, body) {
                //assert.equal(body,body);
                done();
            });
        });

        it("mongo log test debug", function (done) {
            request.get(log_debug, function (error, response, body) {
                //assert.equal("Log saved on " + Date(),body);
                done();
            });
        });

        it("mongo log test  warning", function (done) {
            request.get(log_warning, function (error, response, body) {

                done();
            });
        });

        it("mongo log test  error", function (done) {
            request.get(log_error, function (error, response, body) {
               // assert.equal("Log saved on " + Date(),body);
                logger.closeServer();
                done();
            });
        });
    });


});