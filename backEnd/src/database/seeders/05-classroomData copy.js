module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'classrooms_datas',
      [
        {
          description: 'Hora de aprender os fundamentos',
          video: 'link do video',
          image: 'link da imagem',
          drawing:'link da referencia',
          isPremium: false,
          classroomId:1
        },
        {
          description: 'Hora de aprender profundidade!',
          drawing:'link da referencia',
          image: 'link da imagem',
          video: 'link do video',
          isPremium: false,
          classroomId:2,
        },
        {
          description: 'Hora de um desenho um pouco mais complexo!',
          drawing:'link da referencia',
          image: 'link da imagem',
          video: 'link do video',
          isPremium: false,
          classroomId:3,
        },
        {
          description: 'Hora de aprender um pouco de textura!',
          drawing:'link da referencia',
          image: 'link da imagem',
          video: 'link do video',
          isPremium: false,
          classroomId:4,
        },
        {
          description: 'Hora do Nosso Tcc de fundamentos!',
          drawing:'link da referencia',
          image: 'link da imagem',
          video: 'link do video',
          isPremium: false,
          classroomId:5,
        },
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('sub_modules', null, {});
  },
};
