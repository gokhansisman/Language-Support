const options = {
    MONGO_ATLAS_PW: "7112129",
}

options.MONGO_CONN_STR = 'mongodb://sisman:' + options.MONGO_ATLAS_PW +
    '@restful-api-node-shard-00-00-22grx.mongodb.net:27017,restful-api-node-shard-00-01-22grx.mongodb.net:27017,restful-api-node-shard-00-02-22grx.mongodb.net:27017/test?ssl=true&replicaSet=restful-api-node-shard-0&authSource=admin&retryWrites=true'


module.exports = options