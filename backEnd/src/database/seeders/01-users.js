module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Breno Nascimento',
          email: 'Brneo@gmail.com',
          password: 'djwi8u290ue9i8wj893qwjr093qjr',
          active: true,
          premium: true,
          loginType: 'credential',
          birthday: '2002-02-23',
          phoneNumber: '77988439270'
        },
        {
          name: 'Eren',
          email: 'Eren@gmail.com',
          password: 'jawpjdiwa0idopawjcdfwaf',
          active: true,
          loginType: 'credential',
          premium: true,
          birthday: '2002-02-23',
          phoneNumber: '8492384932409234'
        },
        {
          name: 'Erwin',
          email: 'Ewin@gmail.com',
          password: 'djwi8u290ue9i8wj893qwjr093qjr',
          active: true,
          loginType: 'credential',
          premium: true,
          birthday: '2002-02-23',
          phoneNumber: '77988439270'
        },
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
