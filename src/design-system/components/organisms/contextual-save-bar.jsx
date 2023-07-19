import classNames from 'classnames';
import { Button } from '../atoms/button';
import { BrandLogo } from '../branding/brand-logo';

export const ContextualSaveBar = ({
  logo,
  logoWidth,
  message,
  saveAction,
  discardAction,
  fixed,
}) => {
  return (
    <div
      className={classNames(
        'transition-all bg-surface-secondary-pressed py-xl px-3xl md:px-6xl lg:px-9xl xl:px-11xl',
        {
          'sticky top-0 left-0 right-0 z-40': fixed,
        }
      )}
    >
      <div className="flex flex-row items-center justify-between m-auto gap-lg md:gap-0">
        {logo && (
          <div
            className="hidden md:block lg:block xl:block"
            width={logoWidth || 124}
          >
            {logo}
          </div>
        )}
        {message && (
          <div className="headingMd text-text-on-primary font-sans-serif truncate">
            {message}
          </div>
        )}
        {logo && (
          <>
            <div className="hidden md:block" />
            <div className="hidden md:block" />
            <div className="hidden md:block" />
          </>
        )}
        <div className="gap-x-lg flex flex-row items-center">
          {discardAction && (
            <Button
              content="Discard"
              onClick={discardAction}
              variant="secondary-outline"
            />
          )}
          {saveAction && (
            <Button content="Publish" onClick={saveAction} variant="basic" />
          )}
        </div>
      </div>
    </div>
  );
};

ContextualSaveBar.defaultProps = {
  imageWidth: 124,
  logo: <BrandLogo detailed darkBg size={20} />,
  message: 'Unsaved changes',
  saveAction: (e) => {
    console.log(e);
  },
  discardAction: () => {},
};
