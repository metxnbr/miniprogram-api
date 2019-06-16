module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    // LOCAL application
    {
      name: "miniprogram-api-local",
      script: "./server.js",
      watch: true,
      ignore_watch: ["./upload", "./logs"],
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      },
      output: "./logs/out.log",
      error: "./logs/error.log",
      log_date_format: "DD-MM-YYYY"
    }
  ]
};
