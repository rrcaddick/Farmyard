const { createApplication } = require("graphql-modules");
const { parkCapacityModule } = require("./modules/parkCapacity/module");
const ParkCapacity = require("./modules/parkCapacity/dataSource");

const graphqlApplication = createApplication({
  modules: [parkCapacityModule],
});

const dataSources = () => ({
  parkCapacitySource: new ParkCapacity(),
});

const formatError = (err) => {
  return {
    message: err.message,
    path: err?.path,
    code: err?.extensions?.code,
    data: err?.extensions?.data,
  };
};

module.exports = {
  graphqlApplication,
  executor: graphqlApplication.createApolloExecutor(),
  schema: graphqlApplication.schema,
  execute: graphqlApplication.createExecution(),
  dataSources,
  formatError,
};
