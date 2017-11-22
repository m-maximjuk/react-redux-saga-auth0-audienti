import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap';
import Serializer from 'helpers/form-serialize';

import { injectIntl } from 'components/Intl';
import Tabs from 'components/Tabs';
import Tags from 'components/Tags';

export const AddKeywordsModal = ({
  isOpen, toggle, onAddKeywords, onAddNegativeKeywords, className, formatMessage,
}) => (
  <Modal
    isOpen={isOpen}
    toggle={toggle}
    className={` ${className}`.split(' ').join(' modal-')}
  >
    <Form onSubmit={(e) => {
      e.preventDefault();
      const { activeTab, keywords, negativeKeywords, tags }
        = Serializer.serialize(e.target, { hash: true });
      toggle();
      if (activeTab === '0' && keywords) {
        onAddKeywords({ name: keywords, tags });
        return;
      }
      if (negativeKeywords) {
        onAddNegativeKeywords({ name: negativeKeywords });
      }
    }}>
      <ModalHeader toggle={toggle}>{formatMessage('Add Keyword(s) & Negative Keyword(s)')}</ModalHeader>
      <ModalBody>
        <Tabs tabs={[
          {
            title: formatMessage('Keywords'),
            content: [
              <blockquote key="description" className="text-white bg-info card-body">
                {formatMessage('Enter new keywords, separating with a new line. Add tags, and click Add Keywords(s).')}
              </blockquote>,
              <FormGroup key="keywords">
                <Label htmlFor="keywords">{formatMessage('Keywords')}</Label>
                <Input type="textarea" name="keywords" rows="8" placeholder={formatMessage('Enter keywords, one per line')} style={{ resize: 'none' }} />
              </FormGroup>,
              <FormGroup key="tags">
                <Label htmlFor="tags">{formatMessage('Tags')}</Label>
                <Tags
                  name="tags"
                  options={[
                    { value: 'Tag1', label: 'Tag1' },
                    { value: 'Tag2', label: 'Tag2' },
                  ]}
                  creatable
                />
              </FormGroup>,
              <ModalFooter key="actions">
                <Button color="secondary" onClick={toggle}>{formatMessage('Cancel')}</Button>{' '}
                <Button type="submit" color="primary">{formatMessage('Add Keyword(s)')}</Button>
              </ModalFooter>,
            ],
          },
          {
            title: formatMessage('Negative Keywords'),
            content: [
              <blockquote key="description" className="text-white bg-info card-body">
                {formatMessage('Add any negative keywords by entering them here, separating with a new line.')}
              </blockquote>,
              <FormGroup key="negativeKeywords">
                <Input type="textarea" name="negativeKeywords" rows="8" placeholder={formatMessage('Enter negative keywords, one per line')} style={{ resize: 'none' }} />
              </FormGroup>,
              <ModalFooter key="actions">
                <Button color="secondary" onClick={toggle}>{formatMessage('Cancel')}</Button>{' '}
                <Button type="submit" color="primary">{formatMessage('Add Negative Keyword(s)')}</Button>
              </ModalFooter>,
            ],
          },
        ]} />
      </ModalBody>
    </Form>
  </Modal>
);

AddKeywordsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  className: PropTypes.string,
  formatMessage: PropTypes.func.isRequired,
  onAddKeywords: PropTypes.func.isRequired,
  onAddNegativeKeywords: PropTypes.func.isRequired,
};

AddKeywordsModal.defaultProps = {
  className: '',
};

export default injectIntl(AddKeywordsModal);
