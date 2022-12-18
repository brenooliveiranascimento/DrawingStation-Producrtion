module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'classrooms',
      [
        {
          name: 'degrade',
          image: 'https://firebasestorage.googleapis.com/v0/b/drawning-station.appspot.com/o/capas%2Fdegrade.jpg?alt=media&token=fadab5e1-d5a9-45fb-8d4c-50d7eec214ed',
          premium: false,
          conclude: true,
          subModuleId:1
        },
        {
          name: 'circulo',
          premium: false,
          conclude: true,
          image: 'https://firebasestorage.googleapis.com/v0/b/drawning-station.appspot.com/o/capas%2FcapaBolinha.png?alt=media&token=c7687d41-3ebf-42f2-bd47-230a199ea2ec',
          subModuleId:1
        },
        {
          name: 'Rosa',
          image: 'https://firebasestorage.googleapis.com/v0/b/drawning-station.appspot.com/o/capas%2FcapaRosa.jpg?alt=media&token=bba4de36-afe5-4e6a-bbd7-9785fa1a3cb2',
          premium: false,
          conclude: true,
          subModuleId:1,
        },
        {
          name: 'Maçã',
          image: 'https://firebasestorage.googleapis.com/v0/b/drawning-station.appspot.com/o/capas%2FCaptura%20de%20Tela%20(15).png?alt=media&token=a651f5b8-b2fb-427b-9db5-168864877c96',
          premium: false,
          conclude: false,
          subModuleId:1,
        },
        {
          name: 'Rosa Azul',
          image: 'https://firebasestorage.googleapis.com/v0/b/drawning-station.appspot.com/o/capas%2FIMG_20220206_141259_821.jpg?alt=media&token=6830b5c9-8a25-44e8-aa5f-d38024599423',
          premium: false,
          conclude: false,
          subModuleId:1,
        },
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('sub_modules', null, {});
  },
};
