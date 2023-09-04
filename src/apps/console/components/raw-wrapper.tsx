import { Folders } from '@jengaicons/react';
import { ReactNode } from 'react';
import { Button } from '~/components/atoms/button';
import Tooltip from '~/components/atoms/tooltip';
import { BrandLogo } from '~/components/branding/brand-logo';
import ProgressTracker from '~/components/organisms/progress-tracker';
import { cn } from '~/components/utils';

interface IRawWrapper {
  title: string;
  subtitle: string;
  badgeTitle?: string;
  badgeId?: string;
  progressItems?: any;
  onProgressClick?: (value: any) => void;
  onCancel?: () => void;
  rightChildren: ReactNode;
}

const RawWrapper = ({
  title,
  subtitle,
  progressItems,
  onProgressClick,
  onCancel,
  badgeTitle,
  badgeId,
  rightChildren,
}: IRawWrapper) => {
  return (
    <Tooltip.Provider>
      <div className="min-h-full flex flex-row">
        <div className="min-h-full flex flex-col bg-surface-basic-subdued px-11xl pt-11xl pb-10xl">
          <div className="flex flex-col items-start gap-6xl w-[379px]">
            <BrandLogo detailed={false} size={48} />
            <div
              className={cn('flex flex-col', {
                'gap-8xl': !!badgeTitle || !!badgeId,
                'gap-4xl': !badgeTitle && !badgeId,
              })}
            >
              <div className="flex flex-col gap-3xl">
                <div className="text-text-default heading4xl">{title}</div>
                <div className="text-text-default bodyLg">{subtitle}</div>
                {(!!badgeTitle || !!badgeId) && (
                  <div className="flex flex-row gap-lg p-lg rounded border border-border-default bg-surface-basic-active w-fit">
                    <div className="p-md text-icon-default">
                      <Folders size={20} />
                    </div>
                    <div className="flex flex-col">
                      <div className="bodySm-semibold text-text-default">
                        {badgeTitle}
                      </div>
                      <div className="bodySm text-text-soft">{badgeId}</div>
                    </div>
                  </div>
                )}
              </div>
              {progressItems && (
                <ProgressTracker.Root onClick={onProgressClick}>
                  {progressItems.map((pi: any) => (
                    <ProgressTracker.Item
                      key={pi.id}
                      active={pi.active}
                      completed={pi.completed}
                      item={pi.id}
                    >
                      {pi.label}
                    </ProgressTracker.Item>
                  ))}
                </ProgressTracker.Root>
              )}
            </div>

            {!!onCancel && (
              <Button
                variant="outline"
                content="Cancel"
                size="lg"
                onClick={onCancel}
              />
            )}
          </div>
        </div>
        <div className="pt-11xl pb-12xl px-11xl flex flex-1 bg-surface-basic-default">
          <div className="w-[628px] flex items-center">
            <div className="flex flex-col gap-6xl w-full">{rightChildren}</div>
          </div>
        </div>
      </div>
    </Tooltip.Provider>
  );
};

export default RawWrapper;
