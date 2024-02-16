import { Modal, TextField, Button } from "@mui/material";
import { CSSProperties, FC } from "react";

interface ContactDetailsModalProps {
  contactDetailsOpen: boolean;
  handleContactDetailsClose: () => void;
  focusContact: any;
}

const ContactDetailsModal: FC<ContactDetailsModalProps> = ({
  contactDetailsOpen,
  handleContactDetailsClose,
  focusContact
}: ContactDetailsModalProps) => {
  const contactModalStle: CSSProperties = {
    background: 'white',
    width: '300px',
    margin: 'auto',
    padding: '10px',
    top: '25%',
    position: 'relative',
    borderRadius: '10px',
    border: 'solid black 2px'
  }

  const contactMethodRowStyle: CSSProperties = {
    marginTop: '10px',
    color: 'black',
  }

  return (
    <Modal
      open={contactDetailsOpen}
      onClose={handleContactDetailsClose}
    >
      <div style={contactModalStle}>
        <h3>{focusContact?.countryName} ({focusContact?.username})</h3>
        <div>
          <b>
            {
              `Preferred Method: ${
                focusContact?.contactPreferences.preferredMethod
                ? focusContact?.contactPreferences.preferredMethod[0].toUpperCase()
                  + focusContact?.contactPreferences.preferredMethod.slice(1)
                : 'No Contact Preference Set!'
              }`
            }
          </b>
        </div>
        <TextField
          label="In Game Chat"
          variant="outlined"
          size="small"
          value="Coming Soon!"
          // value={focusContact?.contactPreferences.inGame ? 'Yes' : 'No'}
          style={contactMethodRowStyle}
          autoComplete="off"
          disabled
          fullWidth
        />
        {
          focusContact?.contactPreferences.email &&
          <TextField
            label="Email"
            variant="outlined"
            size="small"
            value={focusContact?.contactPreferences.email}
            style={contactMethodRowStyle}
            autoComplete="off"
            fullWidth
          />
        }
        {
          focusContact?.contactPreferences.discord &&
          <TextField
            label="Discord"
            variant="outlined"
            size="small"
            value={focusContact?.contactPreferences.discord}
            style={contactMethodRowStyle}
            autoComplete="off"
            fullWidth
          />
        }
        {
          focusContact?.contactPreferences.slack &&
          <TextField
            label="Slack"
            variant="outlined"
            size="small"
            value={focusContact?.contactPreferences.slack}
            style={contactMethodRowStyle}
            autoComplete="off"
            fullWidth
          />
        }
        {
          (focusContact?.contactPreferences.otherMethod && focusContact?.contactPreferences.otherHandle) &&
          <TextField
            label={`Other (${focusContact?.contactPreferences.otherMethod})`}
            variant="outlined"
            size="small"
            value={focusContact?.contactPreferences.otherHandle}
            style={contactMethodRowStyle}
            autoComplete="off"
            fullWidth
          />
        }
        <Button onClick={handleContactDetailsClose} fullWidth>Close</Button>
      </div>
    </Modal>
  )
}

export default ContactDetailsModal;