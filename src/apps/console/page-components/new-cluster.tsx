import { useNavigate, useOutletContext, useParams } from '@remix-run/react';
import { useMemo, useState } from 'react';
import Select from '~/components/atoms/select';
import { toast } from '~/components/molecule/toast';
import { mapper, useMapper } from '~/components/utils';
import useForm, { dummyEvent } from '~/root/lib/client/hooks/use-form';
import Yup from '~/root/lib/server/helpers/yup';
import { handleError } from '~/root/lib/utils/common';
import { TextInput } from '~/components/atoms/input';
import { constDatas, awsRegions } from '../dummy/consts';
import { useConsoleApi } from '../server/gql/api-provider';
import {
  IProviderSecret,
  IProviderSecrets,
} from '../server/gql/queries/provider-secret-queries';
import {
  ExtractNodeType,
  parseName,
  parseNodes,
  validateAvailabilityMode,
  validateClusterCloudProvider,
} from '../server/r-utils/common';
import { ensureAccountClientSide } from '../server/utils/auth-utils';
import { NameIdView } from '../components/name-id-view';
import MultiStepProgress, {
  useMultiStepProgress,
} from '../components/multi-step-progress';
import MultiStepProgressWrapper from '../components/multi-step-progress-wrapper';
import { TitleBox } from '../components/raw-wrapper';
import { BottomNavigation, ReviewComponent } from '../components/commons';
import FillerCluster from '../assets/filler-cluster';
import { IAccountContext } from '../routes/_main+/$account+/_layout';
import FillerClusterReview from '../assets/filler-cluster-review';

type props =
  | {
      providerSecrets: IProviderSecrets;
      cloudProvider?: IProviderSecret;
    }
  | {
      providerSecrets?: IProviderSecrets;
      cloudProvider: IProviderSecret;
    };

export const NewCluster = ({ providerSecrets, cloudProvider }: props) => {
  const { cloudprovider: cp } = useParams();
  const isOnboarding = !!cp;

  const api = useConsoleApi();

  const cloudProviders = useMemo(
    () => parseNodes(providerSecrets!),
    [providerSecrets]
  );

  const { account } = useOutletContext<IAccountContext>();

  const options = useMapper(cloudProviders, (provider) => ({
    value: parseName(provider),
    label: provider.displayName,
    provider,
    render: () => (
      <div className="flex flex-col">
        <div>{provider.displayName}</div>
        <div className="bodySm text-text-soft">{parseName(provider)}</div>
      </div>
    ),
  }));

  const { a: accountName } = useParams();
  const rootUrl = `/${accountName}/infra/clusters`;

  const { currentStep, jumpStep, nextStep } = useMultiStepProgress({
    defaultStep: isOnboarding ? 4 : 1,
    totalSteps: isOnboarding ? 4 : 2,
  });

  const navigate = useNavigate();

  const [selectedProvider, setSelectedProvider] = useState<
    | {
        label: string;
        value: string;
        provider: ExtractNodeType<IProviderSecrets>;
        render: () => JSX.Element;
      }
    | undefined
  >(options.length === 1 ? options[0] : undefined);

  const [selectedRegion, setSelectedRegion] = useState<
    (typeof awsRegions)[number]
  >(awsRegions[0]);

  const { values, errors, handleSubmit, handleChange, isLoading } = useForm({
    initialValues: {
      name: '',
      region: 'ap-south-1' || selectedRegion?.Name,
      cloudProvider: cloudProvider
        ? cloudProvider.cloudProviderName
        : selectedProvider?.provider?.cloudProviderName || '',
      credentialsRef: cp || parseName(selectedProvider?.provider) || '',
      availabilityMode: '',
      displayName: '',
      isNameError: false,
      selectedGcpRegion: '',
    },
    validationSchema: Yup.object({
      region: Yup.string().trim().required('Region is required'),
      cloudProvider: Yup.string().trim().required('Cloud provider is required'),
      name: Yup.string().trim().required('Name is required'),
      displayName: Yup.string().trim().required('Name is required'),
      credentialsRef: Yup.string().required(),
      availabilityMode: Yup.string()
        .trim()
        .oneOf(['HA', 'dev'])
        .required('Availability mode is required'),
    }).required(),
    onSubmit: async (val) => {
      const submit = async () => {
        if (!accountName || !val.availabilityMode) {
          return;
        }
        try {
          switch (val.cloudProvider) {
            case 'aws':
              ensureAccountClientSide({ account: accountName });
              const { errors: e } = await api.createCluster({
                cluster: {
                  displayName: val.displayName,
                  spec: {
                    cloudProvider: validateClusterCloudProvider(
                      val.cloudProvider
                    ),
                    aws: {
                      credentials: {
                        authMechanism: 'secret_keys',
                        secretRef: {
                          name: val.credentialsRef,
                          namespace: account.targetNamespace,
                        },
                      },
                      region: selectedRegion.Name,
                      k3sMasters: {
                        nvidiaGpuEnabled: true,
                        instanceType: 'c6a.large',
                      },
                    },
                    availabilityMode: validateAvailabilityMode(
                      val.availabilityMode
                    ),
                  },
                  metadata: {
                    name: val.name,
                  },
                },
              });
              if (e) {
                throw e[0];
              }
              break;
            case 'gcp':
              console.log('gcp', val.cloudProvider);
              ensureAccountClientSide({ account: accountName });
              const { errors: err } = await api.createCluster({
                cluster: {
                  displayName: val.displayName,
                  spec: {
                    cloudProvider: validateClusterCloudProvider(
                      val.cloudProvider
                    ),
                    gcp: {
                      credentialsRef: {
                        name: val.credentialsRef,
                        namespace: account.targetNamespace,
                      },
                      region: val.selectedGcpRegion,
                    },
                    availabilityMode: validateAvailabilityMode(
                      val.availabilityMode
                    ),
                  },
                  metadata: {
                    name: val.name,
                  },
                },
              });
              if (err) {
                throw err[0];
              }
              break;
            default:
              throw new Error('Invalid cloud provider');
          }
          toast.success('Cluster created successfully');
          navigate(rootUrl);
        } catch (err) {
          handleError(err);
        }
      };

      switch (currentStep) {
        case 1:
          nextStep();
          break;
        case 2:
        case 4:
          await submit();
          break;
        default:
          break;
      }
    },
  });

  const getView = () => {
    return (
      <div className="flex flex-col gap-3xl">
        <TitleBox
          subtitle="A cluster is a group of interconnected elements working together as a
          single unit."
        />
        <div className="flex flex-col">
          <div className="flex flex-col gap-3xl pb-xl">
            <NameIdView
              nameErrorLabel="isNameError"
              resType="cluster"
              displayName={values.displayName}
              name={values.name}
              label="Cluster name"
              placeholder="Enter cluster name"
              errors={errors.name}
              handleChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-3xl pt-lg">
            {!isOnboarding && (
              <Select
                label="Cloud Provider"
                size="lg"
                placeholder="Select cloud provider"
                value={values.credentialsRef}
                options={async () => options}
                onChange={(value, v) => {
                  handleChange('credentialsRef')(dummyEvent(v));
                  handleChange('cloudProvider')(
                    dummyEvent(value.provider?.cloudProviderName || '')
                  );
                  setSelectedProvider(value);
                }}
              />
            )}
            {values.cloudProvider === 'aws' && (
              <Select
                label="Region"
                size="lg"
                placeholder="Select region"
                value={selectedRegion?.Name}
                options={async () =>
                  mapper(awsRegions, (v) => {
                    return {
                      value: v.Name,
                      label: v.Name,
                      region: v,
                    };
                  })
                }
                onChange={(region) => {
                  handleChange('region')(dummyEvent(region.value));
                  setSelectedRegion(region.region);
                }}
              />
            )}

            {values.cloudProvider === 'gcp' && (
              <TextInput
                placeholder="Enter region name"
                label="Region"
                value={values.selectedGcpRegion}
                size="lg"
                onChange={handleChange('selectedGcpRegion')}
              />
            )}

            <Select
              label="Availabity"
              size="lg"
              placeholder="Select availability mode"
              value={values.availabilityMode}
              error={!!errors.availabilityMode}
              message={
                errors.availabilityMode ? 'Availability mode is required' : null
              }
              options={async () => constDatas.availabilityModes}
              onChange={(_, v) => {
                handleChange('availabilityMode')(dummyEvent(v));
              }}
            />
          </div>
        </div>
        <BottomNavigation
          primaryButton={{
            loading: isLoading,
            variant: 'primary',
            content: isOnboarding ? 'Create' : 'Next',
            type: 'submit',
          }}
        />
      </div>
    );
  };
  return (
    <form
      onSubmit={(e) => {
        if (!values.isNameError) {
          handleSubmit(e);
        } else {
          e.preventDefault();
        }
      }}
    >
      <MultiStepProgressWrapper
        fillerImage={
          currentStep === 1 ? <FillerCluster /> : <FillerClusterReview />
        }
        title={
          isOnboarding ? 'Setup your account!' : 'Let’s create new cluster.'
        }
        subTitle="Simplify Collaboration and Enhance Productivity with Kloudlite teams"
        {...(isOnboarding
          ? {}
          : {
              backButton: {
                content: 'Back to clusters',
                to: rootUrl,
              },
            })}
      >
        <MultiStepProgress.Root
          noJump={(step) => isOnboarding || !(step < currentStep)}
          currentStep={currentStep}
          jumpStep={jumpStep}
          editable={!isOnboarding}
        >
          {!isOnboarding ? (
            <>
              <MultiStepProgress.Step label="Configure cluster" step={1}>
                {getView()}
              </MultiStepProgress.Step>
              <MultiStepProgress.Step label="Review" step={2}>
                <ReviewComponent
                  title="Basic details"
                  onEdit={() => {
                    jumpStep(1);
                  }}
                >
                  <div className="flex flex-col rounded border border-border-default">
                    <div className="flex flex-col p-xl gap-md">
                      <div className="bodyMd-semibold text-text-default">
                        Cluster name
                      </div>
                      <div className="bodySm text-text-soft">{values.name}</div>
                    </div>
                  </div>

                  <span className="text-text-soft bodyMd">
                    Provider details
                  </span>

                  <div className="flex flex-col p-xl gap-lg rounded border border-border-default flex-1 overflow-hidden">
                    <div className="flex flex-row justify-between pb-lg  border-b border-border-default">
                      <div className="bodyMd-medium text-text-default">
                        Cloud provider
                      </div>
                      <div className="bodySm text-text-soft">
                        {values.cloudProvider}
                      </div>
                    </div>
                    {values.cloudProvider === 'aws' && (
                      <div className="flex flex-row justify-between pb-lg border-b border-border-default">
                        <div className="bodyMd-medium text-text-default">
                          Region
                        </div>
                        <div className="bodySm text-text-soft">
                          {values.region}
                        </div>
                      </div>
                    )}
                    {values.cloudProvider === 'gcp' && (
                      <div className="flex flex-row justify-between pb-lg border-b border-border-default">
                        <div className="bodyMd-medium text-text-default">
                          Region
                        </div>
                        <div className="bodySm text-text-soft">
                          {values.selectedGcpRegion}
                        </div>
                      </div>
                    )}
                    <div className="flex flex-row justify-between ">
                      <div className="bodyMd-medium text-text-default">
                        Availability Mode
                      </div>
                      <div className="bodySm text-text-soft">
                        {values.availabilityMode === 'HA'
                          ? 'High Availability'
                          : 'Development'}
                      </div>
                    </div>
                  </div>
                </ReviewComponent>
                <BottomNavigation
                  primaryButton={{
                    loading: isLoading,
                    variant: 'primary',
                    content: 'Create',
                    type: 'submit',
                  }}
                />
              </MultiStepProgress.Step>
            </>
          ) : (
            <>
              <MultiStepProgress.Step step={1} label="Create team" />
              <MultiStepProgress.Step
                step={2}
                label="Add your cloud provider"
              />
              <MultiStepProgress.Step
                step={3}
                label="Validate cloud provider"
              />
              <MultiStepProgress.Step step={4} label="Setup first cluster">
                {getView()}
              </MultiStepProgress.Step>
            </>
          )}
        </MultiStepProgress.Root>
      </MultiStepProgressWrapper>
    </form>
  );
};
