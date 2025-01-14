import { Plus, SmileySad } from '~/console/components/icons';
import { useOutletContext } from '@remix-run/react';
import { useCallback, useState } from 'react';
import { Button } from '~/components/atoms/button';
import Profile from '~/components/molecule/profile';
import ExtendedFilledTab from '~/console/components/extended-filled-tab';
import SecondarySubHeader from '~/console/components/secondary-sub-header';
import Wrapper from '~/console/components/wrapper';
import { useConsoleApi } from '~/console/server/gql/api-provider';
import { useSearch } from '~/root/lib/client/helpers/search-filter';
import { ExtractArrayType, NonNullableString } from '~/root/lib/types/common';
import Pulsable from '~/console/components/pulsable';
import { EmptyState } from '~/console/components/empty-state';
import useCustomSwr from '~/root/lib/client/hooks/use-custom-swr';
import { motion } from 'framer-motion';
import { parseName } from '~/console/server/r-utils/common';
import { useSort } from '~/components/utils';
import { dayjs } from '~/components/molecule/dayjs';
import { IAccountContext } from '../../_layout';
import HandleUser from './handle-user';
import Tools from './tools';
import UserAccessResources from './user-access-resource';

interface ITeams {
  setShowUserInvite: React.Dispatch<React.SetStateAction<boolean>>;
  searchText: string;
  sortTeamMembers: {
    sortByProperty: string;
    sortByTime: string;
  };
}

const placeHolderUsers = Array(3)
  .fill(0)
  .map((_, i) => ({
    id: `${i}`,
    name: 'sample user',
    role: 'account_owner',
    email: 'sampleuser@gmail.com',
  }));

const Teams = ({ setShowUserInvite, searchText, sortTeamMembers }: ITeams) => {
  const { account } = useOutletContext<IAccountContext>();
  const api = useConsoleApi();
  const { data: teamMembers, isLoading } = useCustomSwr(
    `${parseName(account)}-teams`,
    async () => {
      return api.listMembershipsForAccount({
        accountName: parseName(account),
      });
    }
  );

  const searchResp = useSearch(
    {
      data:
        teamMembers?.map((i) => {
          return {
            ...i,
            searchField: i.user.name,
          };
        }) || [],
      searchText,
      keys: ['searchField'],
    },
    [searchText, teamMembers]
  );

  const sortFunction = useCallback(
    ({
      a,
      b,
    }: {
      a: ExtractArrayType<typeof teamMembers>;
      b: ExtractArrayType<typeof teamMembers>;
    }) => {
      const isAscending = sortTeamMembers.sortByTime === 'asc';

      const x = isAscending ? a : b;
      const y = isAscending ? b : a;

      if (sortTeamMembers.sortByProperty === 'name') {
        return x.user.name.localeCompare(y.user.name);
      }

      return dayjs(x.user.joined).unix() - dayjs(y.user.joined).unix();
    },
    [sortTeamMembers]
  );

  const sorted = useSort(searchResp || [], (a, b) => sortFunction({ a, b }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: 'anticipate', duration: 0.1 }}
    >
      <Wrapper
        empty={{
          is: teamMembers?.length === 0,
          title: 'Invite team members',
          image: <SmileySad size={48} />,
          content: <p>The Users for your teams will be listed here.</p>,
          action: {
            content: 'Invite users',
            prefix: <Plus />,
            onClick: () => {
              setShowUserInvite(true);
            },
          },
        }}
      >
        <Pulsable isLoading={isLoading}>
          {!isLoading && searchResp.length === 0 && (
            <EmptyState
              {...{
                image: <SmileySad size={48} />,
                heading: 'No users found',
              }}
            />
          )}

          {(isLoading || searchResp.length > 0) && (
            <UserAccessResources
              items={
                isLoading && searchResp.length === 0
                  ? placeHolderUsers
                  : sorted.map((i) => ({
                      id: i.user.email,
                      name: i.user.name,
                      role: i.role,
                      email: i.user.email,
                    }))
              }
              isPendingInvitation={false}
            />
          )}
        </Pulsable>
      </Wrapper>
    </motion.div>
  );
};

const Invitations = ({
  setShowUserInvite,
  searchText,
  sortTeamMembers,
}: ITeams) => {
  const { account } = useOutletContext<IAccountContext>();
  const api = useConsoleApi();

  const { data: invitations, isLoading } = useCustomSwr(
    `${parseName(account)}-invitations`,
    async () => {
      return api.listInvitationsForAccount({
        accountName: parseName(account),
      });
    }
  );

  const searchResp = useSearch(
    {
      data:
        invitations?.map((i) => {
          return {
            ...i,
            searchField: i.userEmail,
          };
        }) || [],
      searchText,
      keys: ['searchField'],
    },
    [searchText, invitations]
  );

  const sortFunction = useCallback(
    ({
      a,
      b,
    }: {
      a: ExtractArrayType<typeof invitations>;
      b: ExtractArrayType<typeof invitations>;
    }) => {
      const isAscending = sortTeamMembers.sortByTime === 'asc';

      const x = isAscending ? a : b;
      const y = isAscending ? b : a;

      // TODO: remove below if
      if (!x.userEmail || !y.userEmail) {
        return 0;
      }

      if (sortTeamMembers.sortByProperty === 'name') {
        return x.userEmail.localeCompare(y.userEmail);
      }

      return dayjs(x.creationTime).unix() - dayjs(y.creationTime).unix();
    },
    [sortTeamMembers]
  );

  const sorted = useSort(searchResp || [], (a, b) => sortFunction({ a, b }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: 'anticipate', duration: 0.1 }}
    >
      <Wrapper
        empty={{
          is: invitations?.filter((i) => !i.accepted)?.length === 0,
          title: 'Invite team members',
          image: <SmileySad size={48} />,
          content: (
            <p>The pending invitations for your teams will be listed here.</p>
          ),
          action: {
            content: 'Invite users',
            prefix: <Plus />,
            onClick: () => {
              setShowUserInvite(true);
            },
          },
        }}
      >
        <Pulsable isLoading={isLoading}>
          <UserAccessResources
            items={
              isLoading && sorted.length === 0
                ? placeHolderUsers
                : searchResp
                    ?.filter((i) => !i.accepted)
                    .map((i) => ({
                      role: i.userRole,
                      name: i.userEmail || '',
                      email: i.userEmail || '',
                      id: i.id || i.userEmail || '',
                    }))
            }
            isPendingInvitation
          />
        </Pulsable>
      </Wrapper>
    </motion.div>
  );
};

const SettingUserManagement = () => {
  const [active, setActive] = useState<
    'team' | 'invitations' | NonNullableString
  >('team');
  const [visible, setVisible] = useState(false);
  const { account } = useOutletContext<IAccountContext>();

  const [searchText, setSearchText] = useState('');

  const [sortByProperty, setSortbyProperty] = useState({
    sortByProperty: 'updated',
    sortByTime: 'des',
  });

  const api = useConsoleApi();

  const { data: teamMembers, isLoading } = useCustomSwr(
    `${parseName(account)}-owners`,
    async () => {
      return api.listMembershipsForAccount({
        accountName: parseName(account),
      });
    }
  );

  const owners = useCallback(
    () => teamMembers?.filter((i) => i.role === 'account_owner') || [],
    [teamMembers]
  )();

  return (
    <div className="flex flex-col gap-8xl">
      <div className="flex flex-col gap-6xl">
        <SecondarySubHeader
          title="User management"
          action={
            <Button
              content="Invite user"
              variant="primary"
              onClick={() => setVisible(true)}
            />
          }
        />

        <div className="flex flex-col p-3xl gap-3xl shadow-button border border-border-default rounded bg-surface-basic-default">
          <div className="headingLg text-text-strong">Account owners</div>

          <Pulsable isLoading={isLoading}>
            <div className="flex flex-col gap-3xl">
              {[
                ...(isLoading
                  ? [
                      {
                        user: {
                          email: 'sampleuser@gmail.com',
                          name: 'sample user',
                        },
                      },
                    ]
                  : owners),
              ].map((t) => {
                return (
                  <Profile
                    key={t.user.email}
                    name={t.user.name}
                    subtitle={t.user.email}
                  />
                );
              })}
            </div>
          </Pulsable>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row gap-lg items-center pb-3xl">
          <div className="flex-1">
            <ExtendedFilledTab
              value={active}
              onChange={setActive}
              items={[
                { label: 'Team member', to: 'team-member', value: 'team' },
                {
                  label: 'Pending invitation',
                  to: 'pending-invitation',
                  value: 'invitations',
                },
              ]}
            />
          </div>
          <Tools
            setSearchText={setSearchText}
            searchText={searchText}
            sortTeamMembers={setSortbyProperty}
          />
        </div>
        {active === 'team' ? (
          <Teams
            setShowUserInvite={setVisible}
            searchText={searchText}
            sortTeamMembers={sortByProperty}
          />
        ) : (
          <Invitations
            setShowUserInvite={setVisible}
            searchText={searchText}
            sortTeamMembers={sortByProperty}
          />
        )}
      </div>
      <HandleUser {...{ isUpdate: false, visible, setVisible }} />
    </div>
  );
};

export default SettingUserManagement;
