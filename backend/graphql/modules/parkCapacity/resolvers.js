const resolvers = {
  Query: {
    getCurrentCapcity: (_root, { date }, { dataSources: { parkCapacitySource } }, _info) =>
      parkCapacitySource.getCurrentCapacity(date),
  },
};

module.exports = {
  resolvers,
};
