module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'classrooms',
      [
        {
          name: 'degrade',
          image: 'link da imagem',
          premium: false,
          subModuleId:1
        },
        {
          name: 'circulo',
          premium: false,
          image: 'link da imagem',
          subModuleId:1
        },
        {
          name: 'rosa',
          image: 'link da imagem',
          premium: false,
          subModuleId:1,
        },
        {
          name: 'Maçã',
          image: 'link da imagem',
          premium: false,
          subModuleId:1,
        },
        {
          name: 'Rosa Azul',
          image: 'link da imagem',
          premium: false,
          subModuleId:1,
        },
        {
          name: 'Principais cores de pele',
          image: 'link da imagem',
          premium: true,
          subModuleId:2,
        },
        {
          name: 'Principais tipos de textura e maçetes',
          image: 'link da imagem',
          premium: true,
          subModuleId:2,
        },
        {
          name: 'Olho 1',
          image: 'link da imagem',
          premium: true,
          subModuleId:2,
        },
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('sub_modules', null, {});
  },
};
