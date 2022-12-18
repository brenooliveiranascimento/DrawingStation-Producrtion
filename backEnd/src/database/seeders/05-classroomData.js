module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'classrooms_datas',
      [
        {
          description: 'Hora de aprender os fundamentos',
          video: 'DXqcoe8bSKM',
          image: 'link da imagem',
          drawing:'link da referencia',
          isPremium: false,
          multiExemple: true,
          conclude: true,
          colors: JSON.stringify({
            red: [{cor: 'Preto'}, {cor: 'Cinza escuro'}, {cor: 'Vermelho escuro'}, {cor: 'Vermelho'}, {cor:'Rosa claro'},{cor:'branco'}],
            green: [{cor: 'Preto'}, {cor: 'Cinza escuro'}, {cor: 'Verde'}, {cor: 'Verde claro'},{cor:'branco'},],
            blue: [{cor: 'Preto'}, {cor: 'Cinza escuro'}, {cor: 'azul turquesa'}, {cor: 'azul real'}, {cor:'azul'},{cor:'branco'}],
          }),
          classroomId:1
        },
        {
          description: 'Hora de aprender profundidade!',
          drawing:'https://firebasestorage.googleapis.com/v0/b/drawning-station.appspot.com/o/capas%2FcapaBolinha.png?alt=media&token=c7687d41-3ebf-42f2-bd47-230a199ea2ec',
          image: 'https://firebasestorage.googleapis.com/v0/b/drawning-station.appspot.com/o/capas%2FcapaBolinha.png?alt=media&token=c7687d41-3ebf-42f2-bd47-230a199ea2ec',
          video: 'SMXCMsgJo6Y',
          isPremium: false,
          multiExemple: false,
          conclude: true,
          colors: JSON.stringify([{cor: 'Preto'}, {cor: 'Marrom'}, {cor: 'Cinza escuro'}, {cor: 'Vermelho escuro'}, {cor: 'Vermelho'}, {cor:'Rosa claro'},{cor:'branco'}],),
          classroomId:2,
        },
        {
          description: 'Hora de um desenho um pouco mais complexo!',
          drawing:'yZ7qqDUzMFc',
          image: 'https://firebasestorage.googleapis.com/v0/b/drawning-station.appspot.com/o/capas%2FcapaPetalas.jpg?alt=media&token=24064f35-3bdc-41c1-b93c-a22b10bfbcad',
          video: 'MhDWTg7vdkI',
          isPremium: false,
          multiExemple: false,
          conclude: true,
          colors: JSON.stringify([{cor: 'Preto'}, {cor: 'Cinza escuro'}, {cor: 'Vermelho escuro'}, {cor: 'Vermelho'}, {cor:'Carmim'}, {cor:'Rosa claro'},{cor:'branco'}],),
          classroomId:3,
        },
        {
          description: 'Hora de aprender um pouco de textura!',
          drawing:'link da referencia',
          image: 'link da imagem',
          video: 'link do video',
          isPremium: false,
          multiExemple: false,
          conclude: false,
          colors: null,
          classroomId:4,
        },
        {
          description: 'Hora do Nosso Tcc de fundamentos!',
          drawing:'link da referencia',
          image: 'link da imagem',
          video: 'link do video',
          isPremium: false,
          multiExemple: true,
          conclude: false,
          colors: null,
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
