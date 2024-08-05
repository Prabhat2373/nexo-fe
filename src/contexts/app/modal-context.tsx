// import ConfirmationModal, { ConfirmationModalProps } from '@/components/modals/ConfirmationModal';
import ConfirmationModal, {
  ConfirmationModalProps
} from '@/components/modals/app/ConfirmationModal';
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';

interface ConfirmModalContextData {
  open: boolean;
  setOpen: (open: boolean) => void;
  modalProps: ConfirmationModalProps | {};
  openConfirmModal: (props: ConfirmationModalProps) => void;
  isLoading?: boolean;
  setIsLoading?: any;
}

const ConfirmModalContext = createContext<ConfirmModalContextData>({
  open: false,
  setOpen: () => {},
  modalProps: {},
  openConfirmModal: (props: any) => {},
  isLoading: false,
  setIsLoading: () => {}
});

export const ConfirmModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalProps, setModalProps] = useState<ConfirmationModalProps>({});

  const openConfirmModal = (props: ConfirmationModalProps) => {
    setModalProps({ ...props, isLoading: isLoading });
    setOpen(true);
  };

  console.log('ismodalopen', open);

  return (
    <ConfirmModalContext.Provider
      value={{
        open,
        setOpen,
        modalProps,
        openConfirmModal,
        setIsLoading,
        isLoading
      }}
    >
      {children}
      {/* {open && ( */}
      <ConfirmationModal {...modalProps} isLoading={isLoading} open={open} setOpen={setOpen} />
      {/* )} */}
    </ConfirmModalContext.Provider>
  );
};

export const useConfirmModal = () => {
  const { setOpen, modalProps, openConfirmModal } = useContext(ConfirmModalContext);

  return {
    setOpen,
    modalProps,
    openConfirmModal
  };
};
