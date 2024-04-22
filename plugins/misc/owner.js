exports.run = {
   usage: ['owner'],
   category: 'miscs',
   async: async (m, {
      client,
      env,
      Func
   }) => {
      client.sendContact(m.chat, [{
         name: env.owner_name,
         number: env.owner,
         about: 'Owner & Creator'
      }], m, {
         org: 'Goret ID',
         website: 'https://gopret.com',
         email: 'contact@gopret.com'
      })
   },
   error: false,
   cache: true,
   restrict: true,
   location: __filename
}