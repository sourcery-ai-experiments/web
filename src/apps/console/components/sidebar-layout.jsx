import { Link } from '@remix-run/react';
import { SubHeader } from '~/components/organisms/sub-header';
import ActionList from '~/components/atoms/action-list';
import { useActivePath } from '~/root/lib/client/hooks/use-active-path';

const SidebarLayout = ({
  navItems = [],
  parentPath,
  headerTitle,
  headerActions = null,
  children = null,
}) => {
  const { activePath } = useActivePath({ parent: parentPath });
  return (
    <>
      <SubHeader title={headerTitle} actions={headerActions} />
      <div className="flex flex-row gap-10xl">
        <div className="w-[180px]">
          <ActionList.Root value={activePath || ''} LinkComponent={Link}>
            {navItems.map((item) => (
              <ActionList.Item
                key={item.value}
                value={`/${item.value}`}
                to={item.value}
              >
                {item.label}
              </ActionList.Item>
            ))}
          </ActionList.Root>
        </div>
        <div className="flex-1 flex flex-col gap-6xl">{children}</div>
      </div>
    </>
  );
};

export default SidebarLayout;