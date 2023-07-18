const { Redis } = require('ioredis')


const redis = new Redis({
    port: 10388, // Redis port
    host: "redisredis-10388.c12.us-east-1-4.ec2.cloud.redislabs.com", // Redis host
    password: "hS4mjNiBxjxvZfFX42qZ7JOXFAXPbs9a",
  });

module.exports = redis
