import { useState } from 'react';
import styles from './ShowPlacePicker.module.scss';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
const ShowPlacePicker = ({ showPlacePicker }) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <Button onClick={toggleOpen} aria-controls='example-collapse-text' aria-expanded={open}>
        click
      </Button>
      {/* showPlacePicker prop을 기반으로 Collapse 표시 */}
      <Collapse in={showPlacePicker}>
        <div id='example-collapse-text'>
          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim
          keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
        </div>
      </Collapse>
    </>
  );
};
export default ShowPlacePicker;
