import gql from 'graphql-tag';
import { IExecutor } from '~/root/lib/server/helpers/execute-query-with-context';

export const nodepoolQueries = (executor: IExecutor) => ({
  createNodePool: executor(
    gql`
      mutation Infra_createNodePool($clusterName: String!, $pool: NodePoolIn!) {
        infra_createNodePool(clusterName: $clusterName, pool: $pool) {
          id
        }
      }
    `,
    {
      transformer(data) {},
      vars(variables) {},
    }
  ),
  listNodePools: executor(
    gql`
      query listNodePools(
        $clusterName: String!
        $pagination: CursorPaginationIn
        $search: SearchNodepool
      ) {
        infra_listNodePools(
          clusterName: $clusterName
          pagination: $pagination
          search: $search
        ) {
          edges {
            node {
              updateTime
              spec {
                targetCount
                minCount
                maxCount
                awsNodeConfig {
                  vpc
                  spotSpecs {
                    memMin
                    memMax
                    cpuMin
                    cpuMax
                  }
                  region
                  provisionMode
                  onDemandSpecs {
                    instanceType
                  }
                  isGpu
                  imageId
                }
              }
              metadata {
                name
                annotations
              }
              clusterName
              status {
                isReady
                message {
                  RawMessage
                }
                checks
              }
            }
          }
          pageInfo {
            startCursor
            hasPreviousPage
            hasNextPage
            endCursor
          }
          totalCount
        }
      }
    `,
    {
      transformer(data) {},
      vars(variables) {},
    }
  ),
});