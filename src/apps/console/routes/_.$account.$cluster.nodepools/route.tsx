import { Plus, PlusFill } from '@jengaicons/react';
import { defer } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { useState } from 'react';
import { Button } from '~/components/atoms/button.jsx';
import { LoadingComp, pWrapper } from '~/console/components/loading-component';
import Wrapper from '~/console/components/wrapper';
import { GQLServerHandler } from '~/console/server/gql/saved-queries';
import {
  ensureAccountSet,
  ensureClusterSet,
} from '~/console/server/utils/auth-utils';
import { IRemixCtx } from '~/root/lib/types/common';
import fake from '~/root/fake-data-generator/fake';
import HandleNodePool from './handle-nodepool';
import Tools from './tools';
import NodepoolResources from './nodepool-resources';

export const loader = async (ctx: IRemixCtx) => {
  ensureAccountSet(ctx);
  ensureClusterSet(ctx);
  const { cluster } = ctx.params;

  const promise = pWrapper(async () => {
    const { data, errors } = await GQLServerHandler(ctx.request).listNodePools({
      clusterName: cluster,
      // pagination: getPagination(ctx),
      // search: getSearch(ctx),
    });
    if (errors) {
      throw errors[0];
    }
    return { nodePoolData: data };
  });

  return defer({ promise });
};

const ClusterDetail = () => {
  const [visible, setVisible] = useState(false);

  const { promise } = useLoaderData<typeof loader>();

  return (
    <>
      <LoadingComp
        data={promise}
        skeletonData={{
          nodePoolData: fake.ConsoleListNodePoolsQuery
            .infra_listNodePools as any,
        }}
      >
        {({ nodePoolData }) => {
          const nodepools = nodePoolData?.edges?.map(({ node }) => node);
          if (!nodepools) {
            return null;
          }
          const { pageInfo, totalCount } = nodePoolData;
          return (
            <Wrapper
              header={{
                title: 'Nodepools',
                action: nodepools.length > 0 && (
                  <Button
                    variant="primary"
                    content="Create new nodepool"
                    prefix={<PlusFill />}
                    onClick={() => {
                      setVisible(true);
                    }}
                  />
                ),
              }}
              empty={{
                is: nodepools.length === 0,
                title: 'This is where you’ll manage your nodepools',
                content: (
                  <p>
                    You can create a new nodepool and manage the listed
                    nodepools.
                  </p>
                ),
                action: {
                  content: 'Create new nodepool',
                  prefix: <Plus />,
                  LinkComponent: Link,
                  onClick: () => {
                    setVisible(true);
                  },
                },
              }}
              pagination={{
                pageInfo,
                totalCount,
              }}
              tools={<Tools />}
            >
              <NodepoolResources items={nodepools} />
            </Wrapper>
          );
        }}
      </LoadingComp>
      <HandleNodePool
        {...{
          visible,
          setVisible,
          isUpdate: false,
        }}
      />
    </>
  );
};

export default ClusterDetail;