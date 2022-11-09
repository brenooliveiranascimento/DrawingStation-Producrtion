module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'sub_modules',
      [
        {
          name: 'Fundamentos',
          description: 'Hora de por a mão na massa!',
          image: 'link da imagem',
          premium: false,
          module_id:1
        },
        {
          name: 'Rosto',
          description: 'Fundamentos do esbolo',
          premium: true,
          image: 'link da imagem',
          module_id:1,
        },
        {
          name: 'Metais',
          description: 'Detalhes e recomendação de materiais',
          image: 'link da imagem',
          premium: true,
          module_id:1,
        },
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('sub_modules', null, {});
  },
};
