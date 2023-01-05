module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'sub_modules',
      [
        // {
        //   name: 'Fundamentos',
        //   description: 'Hora de por a mão na massa!',
        //   image: 'https://instagram.fgnm2-1.fna.fbcdn.net/v/t51.2885-15/273804194_477832993917681_7237425992266053249_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=instagram.fgnm2-1.fna.fbcdn.net&_nc_cat=109&_nc_ohc=eg_Ps-A_DdIAX8NUHvQ&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=Mjc3MjE0NzMzNDg4MjY4MTgyOQ%3D%3D.2-ccb7-5&oh=00_AfCxQPRRNZZpM05FCYcFAq4FPdtH6JIKh8XzXZsjdOhTQQ&oe=637674AC&_nc_sid=30a2ef',
        //   premium: false,
        //   module_id:1
        // },
        // {
        //   name: 'Rosto',
        //   description: 'Fundamentos do esbolo',
        //   premium: true,
        //   image: 'https://instagram.fgnm2-1.fna.fbcdn.net/v/t51.2885-15/273804194_477832993917681_7237425992266053249_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=instagram.fgnm2-1.fna.fbcdn.net&_nc_cat=109&_nc_ohc=eg_Ps-A_DdIAX8NUHvQ&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=Mjc3MjE0NzMzNDg4MjY4MTgyOQ%3D%3D.2-ccb7-5&oh=00_AfCxQPRRNZZpM05FCYcFAq4FPdtH6JIKh8XzXZsjdOhTQQ&oe=637674AC&_nc_sid=30a2ef',
        //   module_id:1,
        // },
        // {
        //   name: 'Metais',
        //   description: 'Detalhes e recomendação de materiais',
        //   image: 'https://instagram.fgnm2-1.fna.fbcdn.net/v/t51.2885-15/273804194_477832993917681_7237425992266053249_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=instagram.fgnm2-1.fna.fbcdn.net&_nc_cat=109&_nc_ohc=eg_Ps-A_DdIAX8NUHvQ&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=Mjc3MjE0NzMzNDg4MjY4MTgyOQ%3D%3D.2-ccb7-5&oh=00_AfCxQPRRNZZpM05FCYcFAq4FPdtH6JIKh8XzXZsjdOhTQQ&oe=637674AC&_nc_sid=30a2ef',
        //   premium: true,
        //   module_id:1,
        // },
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('sub_modules', null, {});
  },
};
