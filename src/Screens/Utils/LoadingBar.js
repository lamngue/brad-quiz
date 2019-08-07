import * as React from 'react';
import { Modal, Loader } from 'rsuite';

export default class LoadingProgressBar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      hideDialog: true
    }
  }

  show = () => {
    this.setState({ hideDialog: false });
  }

  hide = () => {
    this.setState({ hideDialog: true });
  }

  render() {
    const { hideDialog } = this.state;

    return (
      <React.Fragment>
        <Modal show={!hideDialog} style={{ width: 400 }}>
          <Modal.Body className="loadingbar">
            <Loader backdrop content="Game is loading..." />
          </Modal.Body>
        </Modal>
      </React.Fragment>
    )
  }
}