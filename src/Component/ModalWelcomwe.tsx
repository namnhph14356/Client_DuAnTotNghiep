import React from 'react'

type Props = {}
interface IModalProps {
    closeModal: React.Dispatch<React.SetStateAction<boolean>>;
  }
const ModalWelcomwe = ({ closeModal }: IModalProps) => {
  return (
<div className="modal">
      <div className="modal-header">
        <h2
          onClick={() => {
            closeModal(false);
          }}
        >
          X
        </h2>
      </div>
      <div className="modal-body">
        <div>
            
            <input type="text" />
            <input type="text" />
        </div>
      </div>
    </div>  )
}

export default ModalWelcomwe