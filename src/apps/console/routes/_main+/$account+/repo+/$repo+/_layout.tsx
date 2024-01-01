import { Link, Outlet, useOutletContext, useParams } from '@remix-run/react';
import { ChevronRight } from '@jengaicons/react';
import Breadcrum from '~/console/components/breadcrum';
import SidebarLayout from '~/console/components/sidebar-layout';
import { useHandleFromMatches } from '~/root/lib/client/hooks/use-custom-matches';
import { CommonTabs } from '~/console/components/common-navbar-tabs';
import { IProjectContext } from '../../$cluster+/$project+/_layout';

const NetworkBreadcrum = () => {
  const { repo, account } = useParams();
  return (
    <div className="flex flex-row items-center">
      <Breadcrum.Button
        to={`/${account}/packages`}
        LinkComponent={Link}
        content={
          <div className="flex flex-row gap-md items-center">
            <ChevronRight size={14} /> Packages <ChevronRight size={14} />{' '}
          </div>
        }
      />
      <Breadcrum.Button
        to={`/${account}/repo/${repo}`}
        LinkComponent={Link}
        content={<span>{repo}</span>}
      />
    </div>
  );
};

const Tabs = () => {
  const { account } = useParams();
  return (
    <CommonTabs
      backButton={{
        to: `/${account}/container-registry/repos`,
        label: 'Repos',
      }}
    />
  );
};

export const handle = () => {
  return {
    navbar: <Tabs />,
    breadcrum: () => <NetworkBreadcrum />,
  };
};

const Repo = () => {
  const rootContext = useOutletContext<IProjectContext>();
  const { repo } = useParams();
  const noLayout = useHandleFromMatches('noLayout', null);

  if (noLayout) {
    return <Outlet context={rootContext} />;
  }
  return (
    <SidebarLayout
      navItems={[
        { label: 'Images', value: 'images' },
        { label: 'Builds', value: 'builds' },
        // { label: 'Build caches', value: 'buildcaches' },
      ]}
      parentPath={`/${repo}`}
      headerTitle={repo || ''}
    >
      <Outlet context={{ ...rootContext }} />
    </SidebarLayout>
    // <Wrapper
    //   header={{
    //     title: 'Images',
    //   }}
    // >
    //   <Outlet context={{ ...rootContext }} />
    // </Wrapper>
  );
};

export default Repo;
