import Link from 'next/link';
import { BrandLogo } from 'kl-design-system/branding/brand-logo';
import {
  DiscordLogoFill,
  GithubLogoFill,
  LinkedinLogoFill,
  TwitterLogoFill,
} from '@jengaicons/react';
import { Button } from 'kl-design-system/atoms/button';
import { cn } from './commons';
import { IConfig } from './use-config';

const BrandMenu = ({ className }: { className?: string }) => {
  const socialIconSize = 24;
  const brandIconSize = 28;

  return (
    <div
      className={cn(
        'flex flex-col gap-3xl pr-4xl w-[296px] md:w-[200px] lg:w-[296px] order-last md:order-first',
        className
      )}
    >
      <div className="flex flex-col gap-3xl flex-1">
        <div className="flex flex-col items-start gap-lg">
          <BrandLogo size={brandIconSize} detailed />
          <span className="bodySm text-text-soft">
            Lorem ipsum dolor sit amet. Et sunt itaque et repudiandae blanditiis
            ut
          </span>
        </div>
        <div className="flex flex-row items-center gap-3xl text-text-soft">
          <GithubLogoFill size={socialIconSize} />
          <DiscordLogoFill size={socialIconSize} />
          <TwitterLogoFill size={socialIconSize} />
          <LinkedinLogoFill size={socialIconSize} />
        </div>
      </div>
      <div className="bodyMd text-text-soft">
        © 2023 Kloudlite Labs Pvt Ltd.
      </div>
    </div>
  );
};

export default {
  logo: (
    <Link href="/">
      <div className="hidden md:block md:w-[284px]">
        <BrandLogo detailed size={28} />
      </div>
      <div className="md:hidden">
        <BrandLogo detailed={false} size={28} />
      </div>
    </Link>
  ),
  footer: {
    brand: <BrandMenu className="md:order-[-9999]" />,
    menu: [
      {
        title: 'Products',
        className: 'w-[47%] md:w-auto',
        items: [
          {
            title: 'DevOps',
            to: 'devops',
          },
          {
            title: 'InfraOps',
            to: 'infraops',
          },
          {
            title: 'Distribution',
            to: 'distribution',
          },
        ],
      },
      {
        title: 'Developers',
        className: 'w-[47%] md:w-auto',
        items: [
          {
            title: 'Documents',
            to: 'documents',
          },
          {
            title: 'Tutorials',
            to: 'tutorials',
          },
          {
            title: 'Guides',
            to: 'guides',
          },
          {
            title: 'Changelog',
            to: 'changelog',
          },
          {
            title: 'Release notes',
            to: 'releasenotes',
          },
        ],
      },
      {
        title: 'Resources',
        className: 'w-[47%] md:w-auto',
        items: [
          {
            title: 'Pricing',
            to: 'pricing',
          },
          {
            title: 'Customers',
            to: 'customers',
          },
          {
            title: 'Help & support',
            to: 'help-and-support',
          },
          {
            title: 'Terms of services',
            to: 'terms-of-services',
          },
          {
            title: 'Privacy policy',
            to: 'privacy-policy',
          },
        ],
      },
      {
        title: 'Company',
        className: 'w-[47%] md:w-auto',
        items: [
          {
            title: 'About us',
            to: 'about-us',
          },
          {
            title: 'Career',
            to: 'career',
          },
          {
            title: 'Blog',
            to: 'blog',
          },
          {
            title: 'Contact us',
            to: 'contact-us',
          },
        ],
      },
    ],
  },
  scrollToTop: true,
  gitRepoUrl: 'https://github.com/kloudlite/web',
  feedback: {
    feedbackLabels: 'bug',
    linkTitle: 'Question? Give us feedback →',
  },
  headerSecondary: {
    items: [
      {
        title: 'Product',
        to: '/',
      },
      {
        title: 'Docs',
        to: 'devops',
      },
      {
        title: 'Pricing',
        to: 'pricing',
      },
      {
        title: 'Help',
        to: 'help',
      },
      {
        title: 'Contact us',
        to: 'contact-us',
      },
    ],
    extra: (
      <div className="flex flex-row gap-xl items-center">
        <Button
          content="Login"
          variant="basic"
          to="https://auth.dev.kloudlite.io/login"
          LinkComponent={Link}
          toLabel="href"
        />
        <Button
          content="Signup"
          variant="primary"
          to="https://auth.dev.kloudlite.io/signup"
          LinkComponent={Link}
          toLabel="href"
        />
      </div>
    ),
  },
} as IConfig;