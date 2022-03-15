/* 
 * @auther Shivam Pandey  run this - NODE_ENV = <env> node server.js

 NODE_ENV = dev node server.js for LOCAL
 NODE_ENV = prod node server.js for PRODUCTION

 */

var config = {
      dev: {
            //mysql connection settings for local/Dev Env
            db: {
                  connectionLimit: 400,
                  host: '127.0.0.1',
                  user: 'root',
                  password: 'password',
                  database: 'okr_backend',
                  timezone: 'Z'
            },
            redis: {
                  host: '127.0.0.1',
                  port: '6379',
                  password: '',
                  db: '2',
                  poolsize: '128'

            },
            apiurl: {
                  SERVERSIDE_BASE_URL: 'http://localhost:9001/',
            },
      },
      prod: {
            //mysql connection settings for prod Env
            db: {
                  connectionLimit: 400,
                  host: '127.0.0.1',
                  user: 'root',
                  password: '',
                  database: 'OKR',
                  timezone: 'Z'
            },
            redis: {
                  host: '127.0.0.1',
                  port: '6379',
                  password: '',
                  db: '2',
                  poolsize: '128'

            },
            apiurl: {
                  SERVERSIDE_BASE_URL: 'http://localhost:9001/',
            }
      }
};
module.exports = config;