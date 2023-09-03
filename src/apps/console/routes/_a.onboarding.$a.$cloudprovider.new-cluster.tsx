import logger from '~/root/lib/client/helpers/log';
import { redirect } from 'react-router-dom';
import { IRemixCtx } from '~/root/lib/types/common';
import { GQLServerHandler } from '../server/gql/saved-queries';
import { ensureAccountSet } from '../server/utils/auth-utils';
import { NewCluster } from '../page-components/new-cluster';

export const loader = async (ctx: IRemixCtx) => {
  ensureAccountSet(ctx);
  const { cloudprovider: cp } = ctx.params;
  const { data, errors } = await GQLServerHandler(
    ctx.request
  ).getProviderSecret({
    name: cp,
  });

  if (errors) {
    logger.error(errors);
    return redirect('/teams');
  }

  return {
    cloudProvider: data,
  };
};

const _NewCluster = () => {
  return <NewCluster loader={loader} />;
};

export default _NewCluster;