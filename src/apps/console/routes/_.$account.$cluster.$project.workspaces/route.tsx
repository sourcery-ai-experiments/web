import { Plus, PlusFill } from '@jengaicons/react';
import { defer } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useState } from 'react';
import { Button } from '~/components/atoms/button.jsx';
import { LoadingComp, pWrapper } from '~/console/components/loading-component';
import { IShowDialog } from '~/console/components/types.d';
import Wrapper from '~/console/components/wrapper';
import HandleScope, { SCOPE } from '~/console/page-components/new-scope';
import { IWorkspace } from '~/console/server/gql/queries/workspace-queries';
import { parseNodes } from '~/console/server/r-utils/common';
import { getPagination, getSearch } from '~/console/server/utils/common';
import { IRemixCtx } from '~/root/lib/types/common';
import fake from '~/root/fake-data-generator/fake';
import { GQLServerHandler } from '../../server/gql/saved-queries';
import {
  ensureAccountSet,
  ensureClusterSet,
} from '../../server/utils/auth-utils';
import Resources from './resources';
import Tools from './tools';

export const loader = async (ctx: IRemixCtx) => {
  ensureAccountSet(ctx);
  ensureClusterSet(ctx);
  const { project } = ctx.params;
  const promise = pWrapper(async () => {
    const { data, errors } = await GQLServerHandler(ctx.request).listWorkspaces(
      {
        project: {
          type: 'name',
          value: project,
        },
        pagination: getPagination(ctx),
        search: getSearch(ctx),
      }
    );
    if (errors) {
      throw errors[0];
    }

    return {
      workspacesData: data || {},
    };
  });

  return defer({ promise });
};

const Workspaces = () => {
  const [showAddWS, setShowAddWS] =
    useState<IShowDialog<IWorkspace | null>>(null);
  const { promise } = useLoaderData<typeof loader>();

  return (
    <>
      <LoadingComp
        data={promise}
        skeletonData={{
          workspacesData: fake.ConsoleListWorkspacesQuery.core_listWorkspaces,
        }}
      >
        {({ workspacesData }) => {
          const workspaces = parseNodes(workspacesData);

          if (!workspaces) {
            return null;
          }

          return (
            <Wrapper
              header={{
                title: 'Workspaces',
                action: workspaces.length > 0 && (
                  <Button
                    variant="primary"
                    content="Create Workspace"
                    prefix={<PlusFill />}
                    onClick={() => {
                      setShowAddWS({ type: 'add', data: null });
                    }}
                  />
                ),
              }}
              empty={{
                is: workspaces.length === 0,
                title: 'This is where you’ll manage your workspaces.',
                content: (
                  <p>
                    You can create a new workspace and manage the listed
                    workspaces.
                  </p>
                ),
                action: {
                  content: 'Create new workspace',
                  prefix: <Plus />,
                  onClick: () => {
                    setShowAddWS({ type: 'add', data: null });
                  },
                },
              }}
              tools={<Tools />}
            >
              <Resources items={workspaces} />
            </Wrapper>
          );
        }}
      </LoadingComp>
      <HandleScope
        show={showAddWS}
        setShow={setShowAddWS}
        scope={SCOPE.WORKSPACE}
      />
    </>
  );
};

export default Workspaces;
