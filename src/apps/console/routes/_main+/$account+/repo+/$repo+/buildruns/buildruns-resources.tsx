import { useState } from 'react';
import { toast } from '~/components/molecule/toast';
import { cn, generateKey, titleCase } from '~/components/utils';
import {
  ListBody,
  ListTitle,
} from '~/console/components/console-list-components';
import DeleteDialog from '~/console/components/delete-dialog';
import Grid from '~/console/components/grid';
import List from '~/console/components/list';
import ListGridView from '~/console/components/list-grid-view';
import ResourceExtraAction from '~/console/components/resource-extra-action';
import { useConsoleApi } from '~/console/server/gql/api-provider';
import {
  ExtractNodeType,
  parseName,
  parseUpdateOrCreatedOn,
} from '~/console/server/r-utils/common';
import { useReload } from '~/root/lib/client/helpers/reloader';
import { handleError } from '~/root/lib/utils/common';
import { useOutletContext, useParams } from '@remix-run/react';
import { IBuildRuns } from '~/console/server/gql/queries/build-run-queries';
import AnimateHide from '~/components/atoms/animate-hide';
import LogComp from '~/console/components/logger';
import { Button } from '~/components/atoms/button';
import {
  CheckCircleFill,
  GitBranch,
  PlayCircleFill,
  Tag,
  XCircleFill,
} from '@jengaicons/react';
import dayjs from 'dayjs';
import { Badge } from '~/components/atoms/badge';
import { IAccountContext } from '../../../_layout';

const RESOURCE_NAME = 'build run';
type BaseType = ExtractNodeType<IBuildRuns>;

const parseItem = (item: BaseType) => {
  return {
    name: parseName(item),
    id: parseName(item),
    updateInfo: {
      time: parseUpdateOrCreatedOn(item),
    },
  };
};

interface IExtraButton {
  onDelete: () => void;
}
const ExtraButton = ({ onDelete }: IExtraButton) => {
  return (
    <ResourceExtraAction
      options={
        [
          // {
          //   label: 'Delete',
          //   icon: <Trash size={16} />,
          //   type: 'item',
          //   onClick: onDelete,
          //   key: 'delete',
          //   className: '!text-text-critical',
          // },
        ]
      }
    />
  );
};

interface IResource {
  items: BaseType[];
  onDelete: (item: BaseType) => void;
}

const GridView = ({ items, onDelete }: IResource) => {
  return (
    <Grid.Root className="!grid-cols-1 md:!grid-cols-3">
      {items.map((item, index) => {
        const { name, id, updateInfo } = parseItem(item);
        const keyPrefix = `${RESOURCE_NAME}-${id}-${index}`;
        return (
          <Grid.Column
            key={id}
            rows={[
              {
                key: generateKey(keyPrefix, name + id),
                render: () => (
                  <ListTitle
                    title={name}
                    subtitle={id}
                    // action={
                    //   <ExtraButton
                    //     onDelete={() => {
                    //       onDelete(item);
                    //     }}
                    //   />
                    // }
                  />
                ),
              },
              {
                key: generateKey(keyPrefix, 'time'),
                render: () => (
                  <ListBody data={`Last Updated ${updateInfo.time}`} />
                ),
              },
            ]}
          />
        );
      })}
    </Grid.Root>
  );
};

const ListItem = ({ item }: { item: BaseType }) => {
  const [open, setOpen] = useState<boolean>(false);
  const { account } = useOutletContext<IAccountContext>();
  const commitHash = item.metadata?.annotations['github.com/commit'];

  // eslint-disable-next-line no-nested-ternary
  const state: 'running' | 'done' | 'error' = item.status?.isReady
    ? 'done'
    : item.status?.message?.RawMessage
    ? 'error'
    : 'running';

  const isLatest = dayjs(item.updateTime).isAfter(dayjs().subtract(3, 'hour'));

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-row justify-between items-center gap-6xl">
        <div className="flex justify-between items-center flex-1">
          <div className="flex gap-xl items-center justify-start flex-1">
            <div>
              <span
                className={cn({
                  'text-text-success': state === 'done',
                  'text-text-critical': state === 'error',
                  'text-text-warning': state === 'running',
                })}
                title={
                  // eslint-disable-next-line no-nested-ternary
                  state === 'done'
                    ? 'Build completed successfully'
                    : state === 'error'
                    ? 'Build failed'
                    : 'Build in progress'
                }
              >
                {state === 'done' && (
                  <CheckCircleFill size={16} color="currentColor" />
                )}

                {state === 'error' && (
                  <XCircleFill size={16} color="currentColor" />
                )}

                {state === 'running' && (
                  <PlayCircleFill size={16} color="currentColor" />
                )}
              </span>
            </div>
            <ListTitle
              title={
                <div className="flex items-center gap-xl">
                  {item.metadata?.annotations['github.com/repository']}{' '}
                </div>
              }
              subtitle={
                <div className="flex items-center gap-md">
                  {`#${commitHash.substring(
                    commitHash.length - 7,
                    commitHash.length
                  )}`}
                  <GitBranch size={12} />
                  {item.metadata?.annotations['github.com/branch']}{' '}
                </div>
              }
            />
          </div>

          <div className="flex-1 flex items-center justify-center">
            <div className="flex flex-row items-center gap-lg mb-md">
              {item.spec?.registry.repo.tags.map((tag) => (
                <button
                  key={tag}
                  className="rounded-full outline-none ring-offset-1 focus-visible:ring-2 focus-visible:ring-border-focus hover:underline text-text-primary"
                >
                  <Badge type="info" icon={<Tag />}>
                    {tag}
                  </Badge>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bodyMd text-text-soft truncate">
          {parseUpdateOrCreatedOn(item)}
        </div>

        {/* <pre>{JSON.stringify(item, null, 2)}</pre> */}
        {isLatest && (
          <Button
            size="sm"
            variant="basic"
            content={open ? 'Hide Logs' : 'Show Logs'}
            onClick={() => setOpen((s) => !s)}
          />
        )}
      </div>

      <AnimateHide show={open} className="w-full pt-4xl">
        <LogComp
          {...{
            dark: true,
            width: '100%',
            height: '40rem',
            title: 'Logs',
            hideLines: true,
            websocket: {
              account: parseName(account),
              cluster: item.clusterName,
              trackingId: item.id,
            },
          }}
        />
      </AnimateHide>
    </div>
  );
};
const ListView = ({ items, onDelete }: IResource) => {
  return (
    <List.Root>
      {items.map((item, index) => {
        const { name, id } = parseItem(item);
        const keyPrefix = `${RESOURCE_NAME}-${id}-${index}`;
        return (
          <List.Row
            key={id}
            className="!p-3xl"
            columns={[
              {
                key: generateKey(keyPrefix, name + id),
                className: 'w-full',
                render: () => <ListItem item={item} />,
              },
            ]}
          />
        );
      })}
    </List.Root>
  );
};

const BuildRunResources = ({ items = [] }: { items: BaseType[] }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState<BaseType | null>(
    null
  );

  const api = useConsoleApi();
  const reloadPage = useReload();

  const props: IResource = {
    items,
    onDelete: (item) => {
      setShowDeleteDialog(item);
    },
  };

  const params = useParams();
  return (
    <>
      <ListGridView
        listView={<ListView {...props} />}
        gridView={<GridView {...props} />}
      />
      <DeleteDialog
        resourceName={parseName(showDeleteDialog)}
        resourceType={RESOURCE_NAME}
        show={showDeleteDialog}
        setShow={setShowDeleteDialog}
        onSubmit={async () => {
          try {
            const { errors } = await api.deleteVpnDevice({
              deviceName: parseName(showDeleteDialog),
              clusterName: params.cluster || '',
            });

            if (errors) {
              throw errors[0];
            }
            reloadPage();
            toast.success(`${titleCase(RESOURCE_NAME)} deleted successfully`);
            setShowDeleteDialog(null);
          } catch (err) {
            handleError(err);
          }
        }}
      />
    </>
  );
};

export default BuildRunResources;
