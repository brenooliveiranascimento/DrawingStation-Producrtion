module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'comments',
      [
        {
          id: 1,
          content: 'Brabo demais!!!',
          createBy: 1,
          classroomId: 1,
          creationDate: new Date(),
        },
        {
          id: 2,
          content: 'Maravilha!!',
          createBy: 1,
          classroomId: 1,
          creationDate: new Date(),
        },
        {
          id: 3,
          content: 'Vambora!!!',
          createBy: 2,
          classroomId: 2,
          creationDate: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('comments', null, {});
  },
};
