module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'modules',
      [
        // {
        //   name: 'Pintura',
        //   description: 'Hora de por a mão na massa!',
        //   image: 'https://firebasestorage.googleapis.com/v0/b/drawingstationdesktop.appspot.com/o/Capas%20de%20modulos%2F258745446_107152645050601_4184968779638603160_n.jpg?alt=media&token=0dda8807-7230-488a-8fa0-6aa00c21c5c8',
        //   premium: true,
        // },
        // {
        //   name: 'Esboço',
        //   description: 'Fundamentos do esbolo',
        //   image: 'https://firebasestorage.googleapis.com/v0/b/drawingstationdesktop.appspot.com/o/Capas%20de%20modulos%2Fesbo%C3%A7o.jpg?alt=media&token=17dc235d-2ce1-4c4d-973f-1aeabf2be243',
        //   premium: true,
        // },
        // {
        //   name: 'Materiais',
        //   description: 'Detalhes e recomendação de materiais',
        //   image: 'https://firebasestorage.googleapis.com/v0/b/drawingstationdesktop.appspot.com/o/Capas%20de%20modulos%2FCaptura%20de%20tela%20de%202022-07-27%2010-44-45.png?alt=media&token=ea9d4c17-bd5c-4527-ae51-ef0db113dd31',
        //   premium: true,
        // },
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('modules', null, {});
  },
};
