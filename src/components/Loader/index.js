import PropTypes from 'prop-types'

import { Overlay } from '../Modal/styles';
import Spinner from '../../components/Spinner';
import ReactPortal from '../ReactPortal';

export default function Loader({ isLoading }) {
  if (!isLoading) return null;

  let container = document.getElementById('loader-root');

  if (!container) {
    container = document.createElement('div');
    container.setAttribute('id', 'loader-root');
    document.body.appendChild(container);
  }

  return (
    <ReactPortal containerId="loader-root">
      <Overlay>
        <Spinner size={90} />
      </Overlay>
    </ReactPortal>
  );
}

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired
}
