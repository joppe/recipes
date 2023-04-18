import { ReactNode } from 'react';
import { CgAirplane, CgArrowRight } from 'react-icons/cg';

import { Story } from '@storybook/react';

import { Button, ButtonProps } from '../elements';

export default {
  title: 'Component/Form/Button',
  component: Button,
};

type TemplateProps = {
  variant: ButtonProps['variant'];
  icon: boolean;
  children: ReactNode;
};

function Template({ variant, icon, children }: TemplateProps): JSX.Element {
  return (
    <Button variant={variant} icon={icon}>
      {children}
    </Button>
  );
}

export const Default: Story<TemplateProps> = Template.bind({});
Default.args = {
  variant: 'primary',
  children: 'Button',
  icon: false,
};

export const Secondary: Story<TemplateProps> = Template.bind({});
Secondary.args = {
  variant: 'secondary',
  children: 'Button',
  icon: false,
};

export const Link: Story<TemplateProps> = Template.bind({});
Link.args = {
  variant: 'link',
  children: (
    <>
      Link <CgArrowRight />
    </>
  ),
  icon: false,
};

export const Icon: Story<TemplateProps> = Template.bind({});
Icon.args = {
  variant: 'primary',
  children: <CgAirplane />,
  icon: true,
};
