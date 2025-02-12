import { DotsThreeVerticalFill } from '~/console/components/icons';
import { Avatar } from '~/components/atoms/avatar';
import { IconButton } from '~/components/atoms/button';
import List from '~/console/components/list';

const Resource = ({
  items = [],
}: {
  items: {
    id: string;
    name: string;
    lastLogin: string;
    role: string;
  }[];
}) => {
  return (
    <List.Root>
      {items.map((item) => (
        <List.Row
          key={item.id}
          className="!p-3xl"
          columns={[
            {
              key: 1,
              className: 'flex-1',
              render: () => (
                <div className="flex flex-row items-center gap-xl">
                  <Avatar size="sm" />
                  <div className="flex flex-col gap-sm">
                    <div className="bodyMd-semibold text-text-default">
                      {item.name}
                    </div>
                    <div className="bodySm text-text-soft">
                      {item.lastLogin}
                    </div>
                  </div>
                </div>
              ),
            },
            {
              key: 2,
              render: () => (
                <div className="text-text-soft bodyMd w-[140px] text-right">
                  {item.role}
                </div>
              ),
            },
            {
              key: 3,
              render: () => (
                <IconButton
                  icon={<DotsThreeVerticalFill />}
                  variant="plain"
                  onClick={(e) => e.stopPropagation()}
                />
              ),
            },
          ]}
        />
      ))}
    </List.Root>
  );
};

export default Resource;
