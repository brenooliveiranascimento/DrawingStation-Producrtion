module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'classrooms',
      [
        {
          name: 'degrade',
          description: 'Hora de por a mão na massa!',
          video: 'link do video',
          image: 'link da imagem',
          drawing:'link da referencia',
          premium: true,
          sub_module_id:1
        },
        {
          name: 'circulo',
          description: 'Fundamentos do esbolo',
          premium: true,
          image: 'link da imagem',
          drawing:'link da referencia',
          video: 'link do video',
          sub_module_id:1
        },
        {
          name: 'maçã',
          description: 'Detalhes e recomendação de materiais',
          drawing:'link da referencia',
          image: 'link da imagem',
          video: 'link do video',
          premium: true,
          sub_module_id:1,
        },
        {
          name: 'rosa',
          description: 'Detalhes e recomendação de materiais',
          drawing:'link da referencia',
          image: 'link da imagem',
          video: 'link do video',
          premium: true,
          sub_module_id:1,
        },
        {
          name: 'Maçã',
          description: 'Detalhes e recomendação de materiais',
          image: 'link da imagem',
          drawing:'link da referencia',
          video: 'link do video',
          premium: true,
          sub_module_id:1,
        },
        {
          name: 'Rosa Azul',
          description: 'Detalhes e recomendação de materiais',
          image: 'link da imagem',
          drawing:'link da referencia',
          video: 'link do video',
          premium: true,
          sub_module_id:1,
        },
        {
          name: 'Principais cores de pele',
          description: 'Detalhes e recomendação de materiais',
          drawing:'link da referencia',
          image: 'link da imagem',
          video: 'link do video',
          premium: true,
          sub_module_id:2,
        },
        {
          name: 'Principais tipos de textura e maçetes',
          description: 'Detalhes e recomendação de materiais',
          image: 'link da imagem',
          drawing:'link da referencia',
          video: 'link do video',
          premium: true,
          sub_module_id:2,
        },
        {
          name: 'Olho 1',
          description: 'Detalhes e recomendação de materiais',
          image: 'link da imagem',
          drawing:'link da referencia',
          video: 'link do video',
          premium: true,
          sub_module_id:2,
        },
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('sub_modules', null, {});
  },
};
