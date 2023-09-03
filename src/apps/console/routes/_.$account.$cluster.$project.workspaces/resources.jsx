import {
  Archive,
  DotsThreeVerticalFill,
  Snowflake,
  Trash,
} from '@jengaicons/react';
import { useState } from 'react';
import { IconButton } from '~/components/atoms/button';
import OptionList from '~/components/atoms/option-list';
import { Thumbnail } from '~/components/atoms/thumbnail';
import { cn } from '~/components/utils';
import { parseDisplayname, parseName } from '~/console/server/r-urils/common';

const Resources = ({
  mode = '',
  item,
  onArchive = (_) => _,
  onFreeze = (_) => _,
  onDelete = (_) => _,
}) => {
  const { name, id, cluster, path, lastupdated } = {
    name: parseDisplayname(item),
    id: parseName(item),
    cluster: item.clusterName,
    path: `/projects/${parseName(item)}`,
    lastupdated: '',
  };

  const [openExtra, setOpenExtra] = useState(false);

  const ThumbnailComponent = () => (
    <Thumbnail
      size="sm"
      rounded
      src="https://images.unsplash.com/photo-1600716051809-e997e11a5d52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8c2FtcGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
    />
  );

  const TitleComponent = () => (
    <>
      <div className="flex flex-row gap-md items-center">
        <div className="headingMd text-text-default">{name}</div>
        <div className="w-lg h-lg bg-icon-primary rounded-full" />
      </div>
      <div className="bodyMd text-text-soft truncate">{id}</div>
    </>
  );

  const ClusterComponent = () => (
    <>
      <div className="bodyMd text-text-strong w-[230px]">{path}</div>
      <div className="bodyMd text-text-strong w-[80px]">{cluster}</div>
    </>
  );

  const AuthorComponent = () => (
    <div className="bodyMd text-text-soft">{lastupdated}</div>
  );

  const OptionMenu = () => (
    <ResourceItemExtraOptions
      open={openExtra}
      setOpen={setOpenExtra}
      onArchive={() => onArchive(item)}
      onFreeze={() => onFreeze(item)}
      onDelete={() => onDelete(item)}
    />
  );

  const gridView = () => {
    return (
      <div
        className={cn('flex flex-col gap-3xl w-full', {
          'md:hidden': mode === 'list',
        })}
      >
        <div className="flex flex-row items-center justify-between gap-lg w-full">
          <div className="flex flex-row items-center gap-xl w-[calc(100%-44px)] md:w-auto">
            <ThumbnailComponent />
            <div className="flex flex-col gap-sm w-[calc(100%-52px)] md:w-auto">
              {TitleComponent()}
            </div>
          </div>
          {OptionMenu()}
        </div>
        <div className="flex flex-col gap-md items-start">
          {ClusterComponent()}
        </div>
        <div className="flex flex-col items-start">{AuthorComponent()}</div>
      </div>
    );
  };

  const listView = () => (
    <>
      <div className="hidden md:flex flex-row items-center justify-between gap-3xl md:w-full">
        <div className="flex flex-1 flex-row items-center gap-xl">
          <ThumbnailComponent />
          <div className="flex flex-col gap-sm">{TitleComponent()}</div>
        </div>
        {ClusterComponent()}
        <div className="flex flex-col w-[200px]">{AuthorComponent()}</div>
        {OptionMenu()}
      </div>
      {gridView()}
    </>
  );

  if (mode === 'grid') return gridView();
  return listView();
};

const ResourceItemExtraOptions = ({
  open,
  setOpen,
  onArchive,
  onFreeze,
  onDelete,
}) => {
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
        <OptionList.Item onSelect={onArchive}>
          <Archive size={16} />
          <span>Archive</span>
        </OptionList.Item>
        <OptionList.Item onSelect={onFreeze}>
          <Snowflake size={16} />
          <span>Freezed</span>
        </OptionList.Item>
        <OptionList.Separator />
        <OptionList.Item className="!text-text-critical" onSelect={onDelete}>
          <Trash size={16} />
          <span>Delete</span>
        </OptionList.Item>
      </OptionList.Content>
    </OptionList.Root>
  );
};

export default Resources;