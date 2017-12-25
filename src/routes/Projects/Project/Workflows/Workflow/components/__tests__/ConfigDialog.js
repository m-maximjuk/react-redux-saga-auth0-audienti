import React from 'react';
import test from 'ava';
import { noop } from 'lodash';

import { ConfigDialog } from '../ConfigDialog';

const { expect, shallow, createSpy } = testHelper;

const testProps = {
  isOpen: true,
  formatMessage: noop,
};

const shallowRenderer = (props = testProps) =>
  shallow(<ConfigDialog {...props} />);

test('Renders a Modal', () => {
  const component = shallowRenderer();
  expect(component).toBeA('Modal');
});

test('Renders proper input controls', () => {
  const fields = [
    {
      help: 'Write the title/subject line of the message you want to send.',
      name: 'title',
      placeholder: '[Notification] Alert for you',
      required: false,
      type: 'text',
    },
    {
      help: 'Write the message you want sent. If the previous event sends a message to be sent, then this can be skipped.',
      name: 'message',
      placeholder: 'A new lead was added to the system...',
      required: false,
      type: 'textarea',
    },
    {
      help: 'Select the message template you want to send.',
      multiple: false,
      name: 'message_template_id',
      options: [{ value: 1, name: 'name' }],
      required: false,
      type: 'select',
    },
    {
      default: false,
      description: 'Check if you expect an incoming event with a message attribute.',
      name: 'expects_event_message',
      required: false,
      type: 'boolean',
    },
    {
      default: false,
      type: 'whatever',
    },
  ];

  const component = shallowRenderer({
    ...testProps,
    agentType: { config: { fields } },
  });
  expect(component).toContain('Input[type="text"]');
  expect(component).toContain('Input[type="textarea"]');
  expect(component).toContain('Input[type="checkbox"]');
  expect(component).toContain('Select');
});

test('toggle and onUpdate are called when form is submitted.', () => {
  const toggle = createSpy();
  const onUpdate = createSpy();
  const component = shallowRenderer({
    ...testProps,
    toggle,
    onUpdate,
  });
  const form = component.find('Form');
  form.simulate('submit', { preventDefault: noop });
  expect(toggle).toHaveBeenCalled();
  expect(onUpdate).toHaveBeenCalled();
});
