import { Spinner } from '@jengaicons/react';
import { SerializeFrom } from '@remix-run/node';
import { useNavigate } from '@remix-run/react';
import { ReactNode, useEffect, useState } from 'react';
import Pulsable from 'react-pulsable';
import { getCookie } from '~/root/lib/app-setup/cookies';
import useDebounce from '~/root/lib/client/hooks/use-debounce';
import { FlatMapType, NN } from '~/root/lib/types/common';
import { parseError, sleep } from '~/root/lib/utils/common';

interface SetCookieProps {
  _cookie: FlatMapType<string>[] | undefined;
}

const SetCookie = ({ _cookie }: SetCookieProps) => {
  useEffect(() => {
    if (_cookie) {
      const cookie = getCookie();
      _cookie.forEach(({ name, value }) => {
        cookie.set(name, value);
      });
    }
  }, []);
  return null;
};

interface RedirectToProps {
  redirect: string;
}

const RedirectTo = ({ redirect }: RedirectToProps) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (redirect) {
      navigate(redirect);
    }
  }, [redirect]);
  return null;
};

const DefaultErrorComp = (err: Error) => (
  <div>
    <pre>{JSON.stringify(err, null, 2)}</pre>
  </div>
);

const GetSkeleton = ({
  skeleton = null,
  setLoaded = (_: boolean) => _,
}: any) => {
  useEffect(() => {
    setLoaded(true);
  }, []);
  return (
    <div>
      {skeleton || (
        <div className="pt-14xl flex items-center justify-center gap-2xl h-full">
          <span className="animate-spin">
            <Spinner color="currentColor" weight={2} size={28} />
          </span>
          <span className="text-[2rem]">Loading...</span>
        </div>
      )}
    </div>
  );
};

interface AwaitRespProps {
  readonly error?: string;
  readonly redirect?: string;
  readonly cookie?: FlatMapType<string>[];
}

export type BaseData<T = any> = Promise<Awaited<AwaitRespProps & T>>;

interface LoadingCompProps<T = any> {
  data:
    | Promise<SerializeFrom<AwaitRespProps & T>>
    | SerializeFrom<AwaitRespProps & T>;
  children?: (value: NN<T>) => ReactNode;
  skeleton?: ReactNode;
  skeletonData?: NN<T>;
  errorComp?: (err: Error) => ReactNode;
}

export function LoadingComp<T>({
  data,
  children = (_) => null,
  skeleton = null,
  skeletonData = null,
  errorComp = DefaultErrorComp,
}: LoadingCompProps<T>) {
  const [ch, setCh] = useState<ReactNode>(null);

  useDebounce(
    () => {
      // console.log('data._tracked', data);

      if (typeof children !== 'function') {
        console.error('children must be a function');
        setCh(children);
        return;
      }

      // setCh(<GetSkeleton skeleton={skeleton} />);

      (async () => {
        try {
          const _d = await data;

          setCh(
            ((d) => {
              if (d.redirect) {
                return (
                  <>
                    {/* <SetTrue setLoaded={setSkLoaded} /> */}
                    <SetCookie _cookie={d.cookie} />
                    <RedirectTo redirect={d.redirect} />
                  </>
                );
              }
              if (d.error) {
                return (
                  <>
                    {/* <SetTrue setLoaded={setSkLoaded} /> */}
                    <SetCookie _cookie={d.cookie} />
                    <div className="flex flex-col bg-surface-basic-input border border-surface-basic-pressed on my-4xl rounded-md p-4xl gap-xl">
                      <div className="font-bold text-xl text-[#A71B1B]">
                        Server Side Error:
                      </div>
                      <div className="flex">
                        <div className="bg-[#A71B1B] w-2xl" />
                        <pre className="overflow-auto max-h-full p-2xl flex-1 flex bg-[#EBEBEB] text-[#640C0C]">
                          <code>
                            {typeof d.error === 'string'
                              ? d.error
                              : JSON.stringify(d.error, null, 2)}
                          </code>
                        </pre>
                      </div>
                    </div>
                  </>
                );
              }
              return (
                <>
                  {/* <SetTrue setLoaded={setSkLoaded} /> */}
                  <SetCookie _cookie={d.cookie} />
                  <div className="">{children(d as any)}</div>
                </>
              );
            })(_d)
          );
        } catch (err) {
          const e = err as Error;
          if (e.message === 'Deferred data aborted') {
            return;
          }
          console.error(e);
          setCh(errorComp(e));
        }
      })();
    },
    1,
    [data]
  );

  return (
    ch ||
    (skeletonData ? (
      <Pulsable isLoading>{children(skeletonData)}</Pulsable>
    ) : (
      <GetSkeleton skeleton={skeleton} />
    ))
  );
}

type pwTypes = <T>(fn: () => Promise<T>) => Promise<T & AwaitRespProps>;

// @ts-ignore
export const pWrapper: pwTypes = async (fn) => {
  try {
    await sleep(2000);
    return await fn();
  } catch (err) {
    return { error: parseError(err).message };
  }
};
