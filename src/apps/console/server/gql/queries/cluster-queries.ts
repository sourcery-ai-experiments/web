import gql from 'graphql-tag';
import { IExecutor } from '~/root/lib/server/helpers/execute-query-with-context';
import { NN } from '~/root/lib/types/common';
import {
  ConsoleClustersCountQuery,
  ConsoleClustersCountQueryVariables,
  ConsoleCreateClusterMutation,
  ConsoleCreateClusterMutationVariables,
  ConsoleDeleteClusterMutation,
  ConsoleDeleteClusterMutationVariables,
  ConsoleGetClusterQuery,
  ConsoleGetClusterQueryVariables,
  ConsoleGetKubeConfigQuery,
  ConsoleListClustersQuery,
  ConsoleListClustersQueryVariables,
  ConsoleListDnsHostsQuery,
  ConsoleUpdateClusterMutation,
  ConsoleUpdateClusterMutationVariables,
  ConsoleListDnsHostsQueryVariables,
} from '~/root/src/generated/gql/server';

export type ICluster = NN<ConsoleGetClusterQuery['infra_getCluster']>;
export type IClusters = NN<ConsoleListClustersQuery['infra_listClusters']>;

export type IDnsHosts = NN<ConsoleListDnsHostsQuery>['infra_listClusters'];

export const clusterQueries = (executor: IExecutor) => ({
  listDnsHosts: executor(
    gql`
      query Spec {
        infra_listClusters {
          edges {
            node {
              metadata {
                name
                namespace
              }
              spec {
                publicDNSHost
              }
            }
          }
        }
      }
    `,
    {
      transformer: (data: ConsoleListDnsHostsQuery) => {
        return data.infra_listClusters;
      },
      vars(_: ConsoleListDnsHostsQueryVariables) {},
    }
  ),

  createCluster: executor(
    gql`
      mutation CreateCluster($cluster: ClusterIn!) {
        infra_createCluster(cluster: $cluster) {
          id
        }
      }
    `,
    {
      transformer: (data: ConsoleCreateClusterMutation) =>
        data.infra_createCluster,
      vars(_: ConsoleCreateClusterMutationVariables) {},
    }
  ),
  deleteCluster: executor(
    gql`
      mutation Infra_deleteCluster($name: String!) {
        infra_deleteCluster(name: $name)
      }
    `,
    {
      transformer: (data: ConsoleDeleteClusterMutation) =>
        data.infra_deleteCluster,
      vars(_: ConsoleDeleteClusterMutationVariables) {},
    }
  ),
  clustersCount: executor(
    gql`
      query Infra_clustersCount {
        infra_listClusters {
          totalCount
        }
      }
    `,
    {
      transformer: (data: ConsoleClustersCountQuery) => data.infra_listClusters,
      vars(_: ConsoleClustersCountQueryVariables) {},
    }
  ),

  listClusters: executor(
    gql`
      query Infra_listClusterss(
        $search: SearchCluster
        $pagination: CursorPaginationIn
      ) {
        infra_listClusters(search: $search, pagination: $pagination) {
          totalCount
          pageInfo {
            startCursor
            hasPreviousPage
            hasNextPage
            endCursor
          }
          edges {
            cursor
            node {
              id
              displayName
              markedForDeletion
              metadata {
                name
                annotations
                generation
              }
              creationTime
              lastUpdatedBy {
                userId
                userName
                userEmail
              }
              createdBy {
                userEmail
                userId
                userName
              }
              updateTime
              status {
                checks
                checkList {
                  description
                  debug
                  name
                  title
                }
                isReady
                lastReadyGeneration
                lastReconcileTime
                message {
                  RawMessage
                }
                resources {
                  apiVersion
                  kind
                  name
                  namespace
                }
              }
              syncStatus {
                action
                error
                lastSyncedAt
                recordVersion
                state
                syncScheduledAt
              }
              recordVersion
              spec {
                messageQueueTopicName
                kloudliteRelease

                clusterTokenRef {
                  key
                  name
                  namespace
                }
                accountId
                accountName
                availabilityMode
                aws {
                  k3sMasters {
                    iamInstanceProfileRole
                    instanceType
                    nodes
                    nvidiaGpuEnabled
                    rootVolumeSize
                    rootVolumeType
                  }
                  nodePools
                  region
                  spotNodePools
                }
                gcp {
                  credentialsRef {
                    name
                    namespace
                  }
                  gcpProjectID
                  region
                }
                cloudProvider
                backupToS3Enabled
                cloudflareEnabled
                clusterInternalDnsHost
                output {
                  keyK3sAgentJoinToken
                  keyK3sServerJoinToken
                  keyKubeconfig
                  secretName
                }
                publicDNSHost
                taintMasterNodes
              }
            }
          }
        }
      }
    `,
    {
      transformer: (data: ConsoleListClustersQuery) => data.infra_listClusters,
      vars(_: ConsoleListClustersQueryVariables) {},
    }
  ),
  getCluster: executor(
    gql`
      query Infra_getCluster($name: String!) {
        infra_getCluster(name: $name) {
          accountName
          apiVersion
          createdBy {
            userEmail
            userId
            userName
          }
          creationTime
          displayName
          id
          kind
          lastUpdatedBy {
            userEmail
            userId
            userName
          }
          markedForDeletion
          metadata {
            annotations
            creationTimestamp
            deletionTimestamp
            generation
            labels
            name
            namespace
          }
          recordVersion
          spec {
            accountId
            accountName
            availabilityMode
            aws {
              k3sMasters {
                iamInstanceProfileRole
                instanceType
                nodes
                nvidiaGpuEnabled
                rootVolumeSize
                rootVolumeType
              }
              nodePools
              region
              spotNodePools
            }
            backupToS3Enabled
            cloudflareEnabled
            cloudProvider
            clusterInternalDnsHost
            clusterTokenRef {
              key
              name
              namespace
            }

            kloudliteRelease
            messageQueueTopicName
            output {
              keyK3sAgentJoinToken
              keyK3sServerJoinToken
              keyKubeconfig
              secretName
            }
            publicDNSHost
            taintMasterNodes
          }
          status {
            checks
            checkList {
              description
              debug
              name
              title
            }
            isReady
            lastReadyGeneration
            lastReconcileTime
            message {
              RawMessage
            }
            resources {
              apiVersion
              kind
              name
              namespace
            }
          }
          syncStatus {
            error
            lastSyncedAt
            recordVersion
            syncScheduledAt
          }
          updateTime
        }
      }
    `,
    {
      transformer: (data: ConsoleGetClusterQuery) => data.infra_getCluster,
      vars(_: ConsoleGetClusterQueryVariables) {},
    }
  ),
  getKubeConfig: executor(
    gql`
      query Infra_getCluster($name: String!) {
        infra_getCluster(name: $name) {
          adminKubeconfig {
            encoding
            value
          }
        }
      }
    `,
    {
      transformer: (data: ConsoleGetKubeConfigQuery) => data.infra_getCluster,
      vars(_: ConsoleGetClusterQueryVariables) {},
    }
  ),
  updateCluster: executor(
    gql`
      mutation Infra_updateCluster($cluster: ClusterIn!) {
        infra_updateCluster(cluster: $cluster) {
          id
        }
      }
    `,
    {
      transformer: (data: ConsoleUpdateClusterMutation) =>
        data.infra_updateCluster,
      vars(_: ConsoleUpdateClusterMutationVariables) {},
    }
  ),
});
