import gql from 'graphql-tag';
import { IExecutor } from '~/root/lib/server/helpers/execute-query-with-context';

export const routerQueries = (executor: IExecutor) => ({
  listRouters: executor(
    gql`
      query Core_listRouters(
        $project: ProjectId!
        $scope: WorkspaceOrEnvId!
        $search: SearchRouters
        $pq: CursorPaginationIn
      ) {
        core_listRouters(
          project: $project
          scope: $scope
          search: $search
          pq: $pq
        ) {
          edges {
            node {
              metadata {
                name
                namespace
                annotations
                labels
              }
              spec {
                routes {
                  app
                  lambda
                  path
                }
              }
            }
          }
        }
      }
    `,
    {
      transformer(data) {},
      vars(variables) {},
    }
  ),
});