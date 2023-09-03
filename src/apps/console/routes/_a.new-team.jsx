import { Button } from '~/components/atoms/button';
import { TextInput } from '~/components/atoms/input';
import useForm, { dummyEvent } from '~/root/lib/client/hooks/use-form';
import Yup from '~/root/lib/server/helpers/yup';
import { toast } from '~/components/molecule/toast';
import { useNavigate } from '@remix-run/react';
import { useAPIClient } from '~/root/lib/client/hooks/api-provider';
import { BrandLogo } from '~/components/branding/brand-logo';
import { ProgressTracker } from '~/components/organisms/progress-tracker';
import { ArrowRight } from '@jengaicons/react';
import { useDataFromMatches } from '~/root/lib/client/hooks/use-custom-matches';
import { handleError } from '~/root/lib/utils/common';
import RawWrapper from '../components/raw-wrapper';
import { IdSelector, idTypes } from '../components/id-selector';
import { getAccount } from '../server/r-urils/account';
import { getMetadata } from '../server/r-urils/common';

const NewAccount = () => {
  const api = useAPIClient();
  const navigate = useNavigate();
  const user = useDataFromMatches('user', {});
  const { values, handleSubmit, handleChange, errors, isLoading } = useForm({
    initialValues: {
      name: '',
      displayName: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      displayName: Yup.string().required(),
    }),
    onSubmit: async (v) => {
      try {
        const { errors: _errors } = await api.createAccount({
          account: getAccount({
            metadata: getMetadata({ name: v.name }),
            displayName: v.displayName,
            contactEmail: user.email,
          }),
        });
        if (_errors) {
          throw _errors[0];
        }
        toast.success('account created');
        navigate(`/onboarding/${v.name}/invite-team-members`);
      } catch (err) {
        handleError(err);
      }
    },
  });
  return (
    <RawWrapper
      leftChildren={
        <>
          <BrandLogo detailed={false} size={48} />
          <div className="flex flex-col gap-4xl">
            <div className="flex flex-col gap-3xl">
              <div className="text-text-default heading4xl">
                Setup your Team!
              </div>
              <div className="text-text-default bodyMd">
                Simplify Collaboration and Enhance Productivity with Kloudlite
                teams.
              </div>
            </div>
            <ProgressTracker
              items={[
                { label: 'Create Team', active: true, id: 1 },
                { label: 'Invite your Team Members', active: false, id: 2 },
                { label: 'Add your Cloud Provider', active: false, id: 3 },
                { label: 'Setup First Cluster', active: false, id: 4 },
                { label: 'Create your project', active: false, id: 5 },
              ]}
            />
          </div>
          <Button variant="outline" content="Skip" size="lg" />
        </>
      }
      rightChildren={
        <div className="flex flex-col justify-center h-[549px]">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col py-3xl gap-6xl"
          >
            <div className="flex flex-col gap-3xl">
              <div className="text-text-default headingXl">Team name</div>
              <TextInput
                size="lg"
                value={values.displayName}
                onChange={handleChange('displayName')}
                error={!!errors.displayName}
                message={errors.displayName}
                label="Name"
              />
              <IdSelector
                name={values.displayName}
                onChange={(v) => handleChange('name')(dummyEvent(v))}
                resType={idTypes.account}
              />
            </div>
            <div className="flex flex-row justify-end">
              <Button
                variant="primary"
                content="Continue"
                suffix={<ArrowRight />}
                size="lg"
                loading={isLoading}
                type="submit"
              />
            </div>
          </form>
        </div>
      }
    />
  );
};

export default NewAccount;