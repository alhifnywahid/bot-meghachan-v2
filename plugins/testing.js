exports.run = {
   usage: ['test'],
   async: async (m, {
      client,
      text,
      command,
      ctx,
      Func,
      Scraper
   }) => {
      client.listening = "RENDERING"
      console.log(client.listening)
   },
   error: false,
   owner: true,
   cache: true,
   restrict: true,
   location: __filename
}