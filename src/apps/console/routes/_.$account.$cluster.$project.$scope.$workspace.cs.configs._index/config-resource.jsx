import { DotsThreeVerticalFill, Trash } from '@jengaicons/react';
import { IconButton } from '~/components/atoms/button';
import List from '~/console/components/list';
import { dayjs } from '~/components/molecule/dayjs';
import OptionList from '~/components/atoms/option-list';
import { useState } from 'react';
import { useParams } from '@remix-run/react';
import {
  parseFromAnn,
  parseName,
  parseUpdationTime,
} from '~/console/server/r-urils/common';
import { keyconstants } from '~/console/server/r-urils/key-constants';

const ResourceItemExtraOptions = ({ onDelete }) => {
  const [open, setOpen] = useState(false);

  return (
    <OptionList.Root open={open} onOpenChange={setOpen}>
      <OptionList.Trigger>
        <IconButton
          variant="plain"
          icon={<DotsThreeVerticalFill />}
          selected={open}
          onClick={(e) => {
            e.stopPropagation();
          }}
          onMouseDown={(e) => {
            e.stopPropagation();
          }}
          onPointerDown={(e) => {
            e.stopPropagation();
          }}
        />
      </OptionList.Trigger>
      <OptionList.Content>
        <OptionList.Item className="!text-text-critical" onSelect={onDelete}>
          <Trash size={16} />
          <span>Delete</span>
        </OptionList.Item>
      </OptionList.Content>
    </OptionList.Root>
  );
};

const ConfigResource = ({
  items = [],
  onDelete,
  hasActions = true,
  onClick = (_) => _,
  linkComponent = null,
}) => {
  const { account, cluster, project, scope, workspace } = useParams();
  const [selected, setSelected] = useState('');
  let props = {};
  if (linkComponent) {
    props = { linkComponent };
  }

  return (
    <List.Root {...props}>
      {items.map((item) => {
        const { name, entries, lastupdated } = {
          name: parseName(item),
          entries: [`${Object.keys(item?.data).length || 0} Entries`],
          lastupdated: (
            <span
              title={
                parseFromAnn(item, keyconstants.author)
                  ? `Updated By ${parseFromAnn(
                      item,
                      keyconstants.author
                    )}\nOn ${dayjs(parseUpdationTime(item)).format('LLL')}`
                  : undefined
              }
            >
              {dayjs(parseUpdationTime(item)).fromNow()}
            </span>
          ),
        };

        return (
          <List.Item
            onClick={() => {
              onClick(item);
              setSelected(name);
            }}
            pressed={selected === name}
            key={name}
            className="!p-3xl"
            to={`/${account}/${cluster}/${project}/${scope}/${workspace}/config/${name}`}
            items={[
              {
                key: 1,
                className: 'flex-1',
                render: () => (
                  <div className="flex flex-col gap-sm">
                    <div className="bodyMd-semibold text-text-default">
                      {name}
                    </div>
                    <div className="bodySm text-text-soft">{lastupdated}</div>
                  </div>
                ),
              },
              {
                key: 2,
                render: () => (
                  <div className="text-text-soft bodyMd w-[140px] text-right">
                    {entries}
                  </div>
                ),
              },
              ...[
                ...(hasActions
                  ? [
                      {
                        key: 3,
                        render: () => (
                          <ResourceItemExtraOptions onDelete={onDelete} />
                        ),
                      },
                    ]
                  : []),
              ],
            ]}
          />
        );
      })}
    </List.Root>
  );
};

export default ConfigResource;