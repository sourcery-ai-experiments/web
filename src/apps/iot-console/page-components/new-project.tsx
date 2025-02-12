/* eslint-disable no-nested-ternary */
import { useNavigate, useParams } from '@remix-run/react';
import { toast } from '~/components/molecule/toast';
import useForm from '~/root/lib/client/hooks/use-form';
import Yup from '~/root/lib/server/helpers/yup';
import { handleError } from '~/root/lib/utils/common';
import { ensureAccountClientSide } from '../server/utils/auth-utils';
import { useIotConsoleApi } from '../server/gql/api-provider';
import { NameIdView } from '../components/name-id-view';
import MultiStepProgress, {
  useMultiStepProgress,
} from '../components/multi-step-progress';
import MultiStepProgressWrapper from '../components/multi-step-progress-wrapper';
import { TitleBox } from '../components/raw-wrapper';
import { BottomNavigation, ReviewComponent } from '../components/commons';
import FillerProject from '../assets/filler-project';

const NewProject = () => {
  const api = useIotConsoleApi();
  const navigate = useNavigate();

  const params = useParams();
  const { a: accountName } = params;
  const rootUrl = `/${accountName}/projects`;

  const { currentStep, jumpStep, nextStep } = useMultiStepProgress({
    defaultStep: 1,
    totalSteps: 2,
  });

  const { values, errors, handleSubmit, handleChange, isLoading } = useForm({
    initialValues: {
      name: '',
      displayName: '',
      clusterName: '',
      nodeType: '',
      isNameError: false,
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      displayName: Yup.string().required(),
      // clusterName: Yup.string().required(),
    }),
    onSubmit: async (val) => {
      const submit = async () => {
        try {
          ensureAccountClientSide({ account: accountName });
          const { errors: e } = await api.createIotProject({
            project: {
              name: val.name,
              displayName: val.displayName,
            },
          });

          if (e) {
            throw e[0];
          }
          toast.success('project created successfully');
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
          await submit();
          break;
        default:
          break;
      }
    },
  });

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
        fillerImage={<FillerProject />}
        title="Let’s create new project."
        subTitle="Simplify Collaboration and Enhance Productivity with Kloudlite teams"
        backButton={{
          content: 'Back to projects',
          to: rootUrl,
        }}
      >
        <MultiStepProgress.Root currentStep={currentStep} jumpStep={jumpStep}>
          <MultiStepProgress.Step step={1} label="Configure project">
            <div className="flex flex-col gap-3xl">
              <TitleBox subtitle="Create your project under production effortlessly." />
              <NameIdView
                label="Project name"
                resType="project"
                name={values.name}
                displayName={values.displayName}
                errors={errors.name}
                prefix={accountName}
                handleChange={handleChange}
                nameErrorLabel="isNameError"
              />
              {/* <Select
                label="Cluster"
                placeholder="Select a cluster"
                value={values.clusterName}
                options={async () => [
                  ...clusters
                    .filter((clster) => status({ item: clster }) !== 'deleting')
                    .map((clster) => ({
                      label: clster.displayName,
                      value: parseName(clster),
                      cluster: clster,
                      render: () => (
                        <div>
                          {true ? (
                            <div className="flex flex-col">
                              <div>{clster.displayName}</div>
                              <div className="bodySm text-text-soft">
                                {parseName(clster)}
                              </div>
                            </div>
                          ) : (
                            <div className="flex text-text-disabled">
                              <div className="flex-grow">
                                <div className="flex flex-col">
                                  <div>{clster.displayName}</div>
                                  <div className="bodySm">
                                    {parseName(clster)}
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-grow-0 items-center">
                                <SyncStatusV2 item={clster} type="full" />
                              </div>
                            </div>
                          )}
                        </div>
                      ),
                    })),
                ]}
                onChange={(v) => {
                  // if (status({ item: v.cluster }) === 'ready')
                  handleChange('clusterName')(dummyEvent(v.value));
                }}
              /> */}
              <BottomNavigation
                primaryButton={{
                  variant: 'primary',
                  content: 'Next',
                  type: 'submit',
                }}
              />
            </div>
          </MultiStepProgress.Step>
          <MultiStepProgress.Step step={2} label="Review">
            <ReviewComponent
              title="Project detail"
              onEdit={() => {
                jumpStep(1);
              }}
            >
              <div className="flex flex-row justify-between p-xl  gap-lg rounded border border-border-default flex-1 overflow-hidden">
                <div className="flex flex-col gap-md">
                  <div className="bodySm text-text-soft">Project name</div>
                  <div className="bodyMd-semibold text-text-default">
                    {values.name}
                  </div>
                </div>
                {/* <div className="flex flex-col gap-md">
                  <div className="bodySm text-text-soft">Cluster</div>
                  <div className="bodyMd-semibold text-text-default">
                    {values.clusterName}
                  </div>
                </div> */}
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
        </MultiStepProgress.Root>
      </MultiStepProgressWrapper>
    </form>
  );
};

export default NewProject;
