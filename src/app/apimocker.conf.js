module.exports = {
  mockDirectory:'apps/bank-budget/mock-api-response',
  basepath:'/:contect/:webserver/:serviceId/api',
  allowHeaders:['x-provided-format','x-expected-format','fsreqid','content-type'],
  corsCredentials:'true',
  webServices:{
    'content/:path:/:page':{
      mockFile:'content/mock.json',
      verbs:['get'],
      switch:['path','page']
  }
}
