module.exports = {
  apps: [
    {
      name: 'ethaddr',
      script: 'index.js',
      interpreter: 'node',
      instances: 16, // adjust to your vCPU to maximize performance
      exec_mode: 'cluster',
      env: {
        APP_ENV: 'development'
      },
      env_production: {
        APP_ENV: 'production'
      }
    }
  ]
}
