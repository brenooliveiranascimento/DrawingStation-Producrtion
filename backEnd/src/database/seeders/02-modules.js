module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'modules',
      [
        {
          name: 'Pintura',
          description: 'Hora de por a mão na massa!',
          image: 'https://instagram.fgnm2-1.fna.fbcdn.net/v/t51.2885-15/273804194_477832993917681_7237425992266053249_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=instagram.fgnm2-1.fna.fbcdn.net&_nc_cat=109&_nc_ohc=eg_Ps-A_DdIAX8NUHvQ&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=Mjc3MjE0NzMzNDg4MjY4MTgyOQ%3D%3D.2-ccb7-5&oh=00_AfCxQPRRNZZpM05FCYcFAq4FPdtH6JIKh8XzXZsjdOhTQQ&oe=637674AC&_nc_sid=30a2ef',
          premium: true,
        },
        {
          name: 'Esboço',
          description: 'Fundamentos do esbolo',
          image: 'https://instagram.fgnm2-1.fna.fbcdn.net/v/t51.2885-15/257441848_642929700093004_1692940638952640586_n.jpg?stp=dst-jpg_e35&_nc_ht=instagram.fgnm2-1.fna.fbcdn.net&_nc_cat=104&_nc_ohc=HhRSlrTRBXEAX-wIkyY&tn=WiH0yv5WAAg9z9vt&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=MjcwNzA2ODUzOTM1MDk4MjIwMA%3D%3D.2-ccb7-5&oh=00_AfCCBMPChpuJL9NJfQNLMTi6nGixx158lAu5ZMFTlaOZfg&oe=6376E63F&_nc_sid=30a2ef',
          premium: true,
        },
        {
          name: 'Materiais',
          description: 'Detalhes e recomendação de materiais',
          image: 'https://instagram.fgnm2-1.fna.fbcdn.net/v/t51.2885-15/287127417_136585258982143_5696014221965920485_n.jpg?stp=dst-jpg_e35&_nc_ht=instagram.fgnm2-1.fna.fbcdn.net&_nc_cat=107&_nc_ohc=7EhMxcPb5M4AX9AFd07&tn=WiH0yv5WAAg9z9vt&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=Mjg1OTI1OTUwMjE3MDE2NjY1Mw%3D%3D.2-ccb7-5&oh=00_AfCv06DD684R5yV8zFhfcRyUlbnnN6QUPhOnf9xWl12Acg&oe=6375C35F&_nc_sid=30a2ef',
          premium: true,
        },
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('modules', null, {});
  },
};
