module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'modules',
      [
        {
          name: 'Pintura',
          description: 'Hora de por a mão na massa!',
          image: 'link da imagem',
          premium: true,
        },
        {
          name: 'Esboço',
          description: 'Fundamentos do esbolo',
          image: 'link da imagem',
          premium: true,
        },
        {
          name: 'Materiais',
          description: 'Detalhes e recomendação de materiais',
          image: 'link da imagem',
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
