/**
 * Created by Suryakala on 24/05/16.
 */
/**
 * Configuration of the logger backend.
 * @type {{mongoDB: {serverr_url: string, database: {host: string, port: string}}, graylog: {server_url: string, graylog_server: {type: string, host: string, port: string, adapter: string, protocol: string}}}}
 */


var configuration = {
    mongoDB: {
        serverr_url: "mongodb://user:pass@example.com:1234",
        database: {
            host:   'localhost',
            port:   '27017',
        },
    },
    graylog: {
        server_url: "http://54.208.196.90:12201",
        graylog_server: {
            type: 'gelf',
            host: '54.208.196.90',
            port: '12201',
            adapter:'udp',
            protocol:'udp4'
        }
    }
};
module.exports = configuration;