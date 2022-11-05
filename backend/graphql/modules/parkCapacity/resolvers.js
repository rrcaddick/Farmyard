const resolvers = {
  Query: {
    getCurrentCapcity: (_root, _args, { dataSources: { parkCapacitySource } }, _info) =>
      parkCapacitySource.getCurrentCapacity(),
  },
};

module.exports = {
  resolvers,
};
