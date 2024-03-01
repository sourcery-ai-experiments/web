import { Plus, PlusFill } from '@jengaicons/react';
import { defer } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { Button } from '~/components/atoms/button.jsx';
import { LoadingComp, pWrapper } from '~/console/components/loading-component';
import Wrapper from '~/console/components/wrapper';
import { GQLServerHandler } from '~/console/server/gql/saved-queries';
import { parseNodes } from '~/console/server/r-utils/common';
import {
  ensureAccountSet,
  ensureClusterSet,
} from '~/console/server/utils/auth-utils';
import { getPagination, getSearch } from '~/console/server/utils/common';
import { IRemixCtx } from '~/root/lib/types/common';
import { useState } from 'react';
import Tools from './tools';
import HandleRouter from './handle-router';
import RouterResources from './router-resources';
import fake from "~/root/fake-data-generator/fake";

export const loader = async (ctx: IRemixCtx) => {
  ensureAccountSet(ctx);
  ensureClusterSet(ctx);
  const { project, environment } = ctx.params;

  const promise = pWrapper(async () => {
    const { data, errors } = await GQLServerHandler(ctx.request).listRouters({
      envName: environment,
      projectName: project,
      pq: getPagination(ctx),
      search: getSearch(ctx),
    });
    if (errors) {
      throw errors[0];
    }
    return { routersData: data };
  });

  return defer({ promise });
};

const Routers = () => {
  const { promise } = useLoaderData<typeof loader>();
  const [visible, setVisible] = useState(false);

  return (
    <>
      <LoadingComp
          data={promise}
          skeletonData={{
            routersData: fake.ConsoleListRoutersQuery.core_listRouters as any,
          }}
      >
        {({ routersData }) => {
          const routers = parseNodes(routersData);
          if (!routers) {
            return null;
          }
          return (
            <Wrapper
              header={{
                title: 'Routers',
                action: routers.length > 0 && (
                  <Button
                    variant="primary"
                    content="Create Router"
                    prefix={<PlusFill />}
                    onClick={() => {
                      setVisible(true);
                    }}
                  />
                ),
              }}
              empty={{
                is: routers.length === 0,
                title: 'This is where you’ll manage your Routers.',
                content: (
                  <p>
                    You can create a new router and manage the listed router.
                  </p>
                ),
                action: {
                  content: 'Add new router',
                  prefix: <Plus />,
                  onClick: () => {
                    setVisible(true);
                  },
                },
              }}
              tools={<Tools />}
            >
              <RouterResources items={routers} />
            </Wrapper>
          );
        }}
      </LoadingComp>
      <HandleRouter {...{ visible, setVisible, isUpdate: false }} />
    </>
  );
};

export default Routers;