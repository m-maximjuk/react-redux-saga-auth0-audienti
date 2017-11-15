import React from 'react';
import test from 'ava';
import { noop } from 'lodash';

import { BreadcrumbMenu } from '../index';

const { expect, shallow, createSpy } = testHelper;

const testProps = {
  setBreadcrumbMenu: noop,
  children: 'whatever',
};

const shallowRenderer = (props = testProps) =>
  shallow(<BreadcrumbMenu {...props} />);

test('Renders null', () => {
  const component = shallowRenderer();
  expect(component.node).toEqual(null);
});

test('Calls setBreadcrumbMenu with children', () => {
  const setBreadcrumbMenu = createSpy();
  shallowRenderer({
    ...testProps,
    setBreadcrumbMenu,
  });
  expect(setBreadcrumbMenu).toHaveBeenCalledWith(testProps.children);
});
