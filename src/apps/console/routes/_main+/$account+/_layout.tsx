import {
  ArrowsCounterClockwise,
  Buildings,
  Check,
  ChevronUpDown,
  Copy,
  GearSix,
  Plus,
  QrCode,
  Search,
  WireGuardlogo,
} from '~/console/components/icons';
import { redirect } from '@remix-run/node';
import {
  Link,
  Outlet,
  ShouldRevalidateFunction,
  useLoaderData,
  useNavigate,
  useOutletContext,
  useParams,
} from '@remix-run/react';
import { ReactNode, useEffect, useRef, useState } from 'react';
import Popup from '~/components/molecule/popup';
import { useDataFromMatches } from '~/root/lib/client/hooks/use-custom-matches';
import { useUnsavedChanges } from '~/root/lib/client/hooks/use-unsaved-changes';
import { IRemixCtx, LoaderResult } from '~/root/lib/types/common';

import {
  IAccount,
  IAccounts,
} from '~/console/server/gql/queries/account-queries';
import { parseName } from '~/console/server/r-utils/common';

import {
  ensureAccountClientSide,
  ensureAccountSet,
} from '~/console/server/utils/auth-utils';
import { GQLServerHandler } from '~/console/server/gql/saved-queries';
import MenuSelect, { SelectItem } from '~/console/components/menu-select';
import {
  BreadcrumButtonContent,
  BreadcrumSlash,
} from '~/console/utils/commons';
import OptionList from '~/components/atoms/option-list';
import { IConsoleDevicesForUser } from '~/console/server/gql/queries/console-vpn-queries';
import { Button, IconButton } from '~/components/atoms/button';
import HandleConsoleDevices, {
  ShowWireguardConfig,
  decodeConfig,
  switchEnvironment,
} from '~/console/page-components/handle-console-devices';
import useClipboard from '~/root/lib/client/hooks/use-clipboard';
import { useConsoleApi } from '~/console/server/gql/api-provider';
import { handleError } from '~/root/lib/utils/common';
import { toast } from '~/components/molecule/toast';
import { useReload } from '~/root/lib/client/helpers/reloader';
import { cn } from '~/components/utils';
import useCustomSwr from '~/root/lib/client/hooks/use-custom-swr';
import { useSearch } from '~/root/lib/client/helpers/search-filter';
import { IConsoleRootContext } from '../_layout/_layout';

const _ProfileIcon = ({ size = 16 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 42 49"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.0002 21.0714C26.5756 21.0714 31.0953 16.4664 31.0953 10.7857C31.0953 5.10507 26.5756 0.5 21.0002 0.5C15.4248 0.5 10.9051 5.10507 10.9051 10.7857C10.9051 16.4664 15.4248 21.0714 21.0002 21.0714ZM21.0002 48.5C29.4828 48.5 37.0619 44.4813 42 38.2145C37.062 31.9475 29.4826 27.9286 20.9998 27.9286C12.5172 27.9286 4.93805 31.9473 0 38.214C4.93804 44.4811 12.5174 48.5 21.0002 48.5Z"
      />
    </svg>
  );
};

const _AccountMenu = ({ account }: { account: IAccount }) => {
  const accounts = useDataFromMatches<IAccounts>('accounts', {});
  const { account: accountName } = useParams();
  const navigate = useNavigate();
  const [acc, setAcc] = useState<
    { label: string; value: string; render?: () => ReactNode }[]
  >([]);

  useEffect(() => {
    setAcc([
      ...accounts.map((acc) => ({
        label: acc.displayName,
        value: parseName(acc),
      })),
      {
        label: 'create new team',
        value: 'newteam',
        render: () => (
          <SelectItem
            className="!flex-row items-center !text-text-primary border-t border-border-default"
            value="newteam"
          >
            <div className="flex flex-row items-center gap-xl">
              <Plus size={16} /> create new team
            </div>{' '}
          </SelectItem>
        ),
      },
    ]);
  }, [accounts]);

  return (
    <MenuSelect
      value={accountName}
      items={acc}
      onChange={(value) => {
        if (value === 'newteam') {
          navigate('/new-team');
          return;
        }
        navigate(`/${value}/projects`);
      }}
      trigger={
        <span className="flex flex-row items-center gap-md bodyMd text-text-default px-md py-sm">
          <BreadcrumButtonContent content={account.displayName} />
          <span className="text-icon-disabled">
            <ChevronUpDown color="currentColor" size={11} />
          </span>
        </span>
      }
    />
  );
};

const Account = () => {
  const { account, devicesForUser } = useLoaderData();
  const rootContext = useOutletContext<IConsoleRootContext>();
  const { unloadState, reset, proceed } = useUnsavedChanges();

  const params = useParams();
  useEffect(() => {
    ensureAccountClientSide(params);
  }, []);
  return (
    <>
      <Outlet context={{ ...rootContext, account, devicesForUser }} />
      <Popup.Root
        show={unloadState === 'blocked'}
        onOpenChange={() => {
          reset?.();
        }}
      >
        <Popup.Header>Unsaved changes</Popup.Header>
        <Popup.Content>Are you sure you discard the changes?</Popup.Content>
        <Popup.Footer>
          <Popup.Button
            content="Cancel"
            variant="basic"
            onClick={() => reset?.()}
          />
          <Popup.Button
            content="Discard"
            variant="warning"
            onClick={() => proceed?.()}
          />
        </Popup.Footer>
      </Popup.Root>
    </>
  );
};

const DevicesMenu = ({ devices }: { devices: IConsoleDevicesForUser }) => {
  const [visible, setVisible] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const { copy } = useClipboard({
    onSuccess: () => {
      toast.success('WG config copied successfully');
    },
  });
  const api = useConsoleApi();
  const reload = useReload();

  const { environment, project } = useParams();

  if (!devices || devices?.length === 0) {
    return (
      <div>
        <Button
          content="Create new device"
          variant="basic"
          suffix={<Plus />}
          onClick={() => {
            setVisible(true);
          }}
        />
        <HandleConsoleDevices
          {...{
            isUpdate: false,
            visible,
            setVisible: () => setVisible(false),
          }}
        />
      </div>
    );
  }

  const device = devices[0];

  const getConfig = async () => {
    try {
      const { errors, data: out } = await api.getConsoleVpnDevice({
        name: parseName(device),
      });
      if (errors) {
        throw errors[0];
      }
      if (out.wireguardConfig) copy(decodeConfig(out.wireguardConfig));
    } catch (error) {
      handleError(error);
    }
  };
  return (
    devices?.length > 0 && (
      <>
        <OptionList.Root>
          <OptionList.Trigger>
            <IconButton variant="outline" icon={<WireGuardlogo />} />
          </OptionList.Trigger>
          <OptionList.Content>
            {device.environmentName && device.projectName && (
              <>
                <OptionList.Item>
                  <div className="flex flex-row items-center gap-lg">
                    <div className="flex flex-col">
                      <span className="bodyMd-medium text-text-default">
                        {device.displayName}
                      </span>
                      <span className="bodySm text-text-soft">
                        ({parseName(device)})
                      </span>
                    </div>
                  </div>
                </OptionList.Item>
                <OptionList.Separator />
                <OptionList.Item>
                  <div className="flex flex-col">
                    <span className="bodyMd-medium text-text-default">
                      Connected
                    </span>
                    <span className="bodySm text-text-soft">
                      {device.projectName}/{device.environmentName}
                    </span>
                  </div>
                </OptionList.Item>
                <OptionList.Item
                  onClick={() => {
                    setShowQR(true);
                  }}
                >
                  <div className="flex flex-row items-center gap-lg">
                    <div>
                      <QrCode size={16} />
                    </div>
                    <div>Show QR Code</div>
                  </div>
                </OptionList.Item>
                <OptionList.Item
                  onClick={() => {
                    getConfig();
                  }}
                >
                  <div className="flex flex-row items-center gap-lg">
                    <div>
                      <Copy size={16} />
                    </div>
                    <div>Copy WG Config</div>
                  </div>
                  <OptionList.Separator />
                </OptionList.Item>
                {environment &&
                  project &&
                  environment !== device.environmentName && (
                    <OptionList.Item
                      onClick={async () => {
                        await switchEnvironment({
                          api,
                          device,
                          environment,
                          project,
                        });
                        reload();
                      }}
                    >
                      <div className="flex flex-row items-center gap-lg">
                        <div>
                          <ArrowsCounterClockwise size={16} />
                        </div>
                        <div>Switch to {environment}</div>
                      </div>
                    </OptionList.Item>
                  )}
              </>
            )}
            <OptionList.Separator />
            <OptionList.Item
              onClick={() => {
                setIsUpdate(true);
              }}
            >
              <div className="flex flex-row items-center gap-lg">
                <div>
                  <GearSix size={16} />
                </div>
                <div>Settings</div>
              </div>
            </OptionList.Item>
          </OptionList.Content>
        </OptionList.Root>
        <HandleConsoleDevices
          {...{
            isUpdate: true,
            data: device,
            visible: isUpdate,
            setVisible: () => setIsUpdate(false),
          }}
        />
        <ShowWireguardConfig
          {...{
            visible: showQR,
            setVisible: () => setShowQR(false),
            data: { device: parseName(device) },
            mode: 'qr',
          }}
        />
      </>
    )
  );
};

const CurrentBreadcrum = ({ account }: { account: IAccount }) => {
  const api = useConsoleApi();

  const { data: accounts } = useCustomSwr(
    () => '/accounts',
    async () => api.listAccounts({})
  );

  const [searchText, setSearchText] = useState('');

  const searchResp = useSearch(
    {
      data:
        accounts?.map((i) => {
          return {
            ...i,
            searchField: i.displayName,
          };
        }) || [],
      searchText,
      keys: ['searchField'],
    },
    [searchText, accounts]
  );

  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false);

  useEffect(() => {
    setSearchText('');
  }, [open]);

  return (
    <>
      <BreadcrumSlash />
      <span className="mx-md" />
      <Button
        prefix={
          <span className="p-md flex items-center justify-center rounded-full border border-border-default text-text-soft">
            <Buildings size={16} />
          </span>
        }
        content={account.displayName}
        size="sm"
        variant="plain"
        LinkComponent={Link}
        to={`/${account.metadata?.name}/projects`}
      />
      <OptionList.Root open={open} onOpenChange={setOpen} modal={false}>
        <OptionList.Trigger>
          <button
            ref={buttonRef}
            aria-label="accounts"
            className={cn(
              'outline-none rounded py-lg px-md mx-md bg-surface-basic-hovered',
              open || isMouseOver ? 'bg-surface-basic-pressed' : ''
            )}
            onMouseOver={() => {
              setIsMouseOver(true);
            }}
            onMouseOut={() => {
              setIsMouseOver(false);
            }}
            onFocus={() => {
              //
            }}
            onBlur={() => {
              //
            }}
          >
            <div className="flex flex-row items-center gap-md">
              <ChevronUpDown size={16} />
            </div>
          </button>
        </OptionList.Trigger>
        <OptionList.Content className="!pt-0 !pb-md" align="end">
          <div className="p-[3px] pb-0">
            <OptionList.TextInput
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              prefixIcon={<Search />}
              focusRing={false}
              placeholder="Search teams"
              compact
              className="border-0 rounded-none"
            />
          </div>
          <OptionList.Separator />

          {/* <div className="bodySm-medium text-text-soft py-md px-xl">Teams</div> */}

          {/* <OptionList.Separator /> */}

          {searchResp?.map((item) => {
            return (
              <OptionList.Link
                key={parseName(item)}
                LinkComponent={Link}
                to={`/${parseName(item)}/projects`}
                className={cn(
                  'flex flex-row items-center justify-between',
                  parseName(item) === parseName(account)
                    ? 'bg-surface-basic-pressed hover:!bg-surface-basic-pressed'
                    : ''
                )}
              >
                <span>{item.displayName}</span>
                {parseName(item) === parseName(account) && (
                  <span>
                    <Check size={16} />
                  </span>
                )}
              </OptionList.Link>
            );
          })}

          <OptionList.Separator />
          <OptionList.Link
            LinkComponent={Link}
            to="/new-team"
            className="text-text-primary"
          >
            <Plus size={16} /> <span>Create team</span>
          </OptionList.Link>
        </OptionList.Content>
      </OptionList.Root>
    </>
  );
};

export const handle = ({ account, devicesForUser }: any) => {
  return {
    breadcrum: () => <CurrentBreadcrum account={account} />,
    devicesMenu: () => <DevicesMenu devices={devicesForUser} />,
  };
};

export const loader = async (ctx: IRemixCtx) => {
  const { account } = ctx.params;
  let acccountData: IAccount;

  try {
    ensureAccountSet(ctx);
    const { data, errors } = await GQLServerHandler(ctx.request).getAccount({
      accountName: account,
    });
    if (errors) {
      throw errors[0];
    }

    const { data: devicesForUser, errors: vpnError } = await GQLServerHandler(
      ctx.request
    ).listConsoleVpnDevicesForUser({});
    if (vpnError) {
      throw vpnError[0];
    }

    acccountData = data;
    return {
      account: data,
      devicesForUser,
    };
  } catch (err) {
    const k = redirect('/teams') as any;
    return k as {
      account: typeof acccountData;
    };
  }
};

export interface IAccountContext extends IConsoleRootContext {
  account: LoaderResult<typeof loader>['account'];
  devicesForUser: IConsoleDevicesForUser;
}

export const shouldRevalidate: ShouldRevalidateFunction = ({
  currentUrl,
  nextUrl,
  defaultShouldRevalidate,
}) => {
  if (!defaultShouldRevalidate) {
    return false;
  }
  if (currentUrl.search !== nextUrl.search) {
    return false;
  }
  return true;
};

export default Account;
