import { Plus } from '@jengaicons/react';
import { defer } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useState } from 'react';
import { Button } from '~/components/atoms/button';
import { LoadingComp, pWrapper } from '~/console/components/loading-component';
import SubNavAction from '~/console/components/sub-nav-action';
import Wrapper from '~/console/components/wrapper';
import { GQLServerHandler } from '~/console/server/gql/saved-queries';
import { ensureAccountSet } from '~/console/server/utils/auth-utils';
import { getPagination, getSearch } from '~/console/server/utils/common';
import logger from '~/root/lib/client/helpers/log';
import { IRemixCtx } from '~/root/lib/types/common';
import fake from '~/root/fake-data-generator/fake';
import HandleRepo from './handle-repo';
import RepoResources from './repo-resources';
import Tools from './tools';

export const loader = async (ctx: IRemixCtx) => {
  const promise = pWrapper(async () => {
    ensureAccountSet(ctx);
    const { data, errors } = await GQLServerHandler(ctx.request).listRepo({
      pagination: getPagination(ctx),
      search: getSearch(ctx),
    });
    if (errors) {
      logger.error(errors[0]);
      throw errors[0];
    }

    return {
      repository: data || {},
    };
  });

  return defer({ promise });
};

const ContainerRegistryRepos = () => {
  const [visible, setVisible] = useState(false);
  const { promise } = useLoaderData<typeof loader>();
  return (
    <>
      <LoadingComp
        data={promise}
        skeletonData={{
          repository: fake.ConsoleListRepoQuery.cr_listRepos as any,
        }}
      >
        {({ repository }) => {
          const repos = repository.edges?.map(({ node }) => node);

          return (
            <>
              {repos.length > 0 && (
                <SubNavAction deps={[repos.length]}>
                  <Button
                    content="Create new repository"
                    variant="primary"
                    onClick={() => {
                      setVisible(true);
                    }}
                  />
                </SubNavAction>
              )}
              <Wrapper
                empty={{
                  is: repos?.length === 0,
                  title: 'This is where you’ll manage your repository.',
                  content: (
                    <p>
                      You can create a new repository and manage the listed
                      repository.
                    </p>
                  ),
                  action: {
                    content: 'Create repository',
                    prefix: <Plus />,
                    onClick: () => {
                      setVisible(true);
                    },
                  },
                }}
                tools={<Tools />}
              >
                <RepoResources items={repos} />
              </Wrapper>
            </>
          );
        }}
      </LoadingComp>
      <HandleRepo
        {...{
          isUpdate: false,
          visible,
          setVisible,
        }}
      />
    </>
  );
};

export default ContainerRegistryRepos;
