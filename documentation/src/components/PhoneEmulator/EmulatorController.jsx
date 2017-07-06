import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-md/lib/Buttons/Button';
import Dialog from 'react-md/lib/Dialogs';

import Markdown from 'components/Markdown';
import PhoneEmulator from './PhoneEmulator';

const demoDescription = `
The current example will need to be opened in a dialog to be viewed because
it requires the full screen on mobile devices to be viewed correctly.
`;

export default class EmulatorController extends PureComponent {
  static propTypes = {
    mobile: PropTypes.bool,
    demoId: PropTypes.string,
    demoLabel: PropTypes.string,
    demoDescription: PropTypes.string,
    demoIconClose: PropTypes.node,
    toggleLabel: PropTypes.node,
  };

  static defaultProps = {
    demoId: 'phone-emulator-demo',
    demoLabel: 'A full page phone example',
    toggleLabel: 'View Example',
    demoDescription,
  };

  static childContextTypes = {
    hideDemo: PropTypes.func.isRequired,
  };

  state = { visible: false };

  getChildContext() {
    return { hideDemo: this.hideDemo };
  }

  showDemo = () => {
    this.setState({ visible: true });
  };

  hideDemo = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible } = this.state;
    const {
      demoId,
      demoLabel,
      demoDescription,
      demoIconClose,
      toggleLabel,
      ...props
    } = this.props;

    if (!props.mobile) {
      return <PhoneEmulator {...props} />;
    }

    let description;
    if (demoDescription) {
      description = <Markdown markdown={demoDescription} />;
    }

    return (
      <section>
        {description}
        <Button raised onClick={this.showDemo}>{toggleLabel}</Button>
        <Dialog
          id={demoId}
          visible={visible}
          aria-label={demoLabel}
          fullPage
        >
          <PhoneEmulator {...props} toolbarNavIcon={props.toolbarNavIcon || 'keyboard_arrow_left'} />
        </Dialog>
      </section>
    );
  }
}