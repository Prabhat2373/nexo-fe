import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Loader from '@/components/ui/Loader';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';

// import { Button } from '../../ui/Button';
// import InputFieldLTS from '../inputs/InputFieldLTS';
// import P from '../html/paragraph/P';
// import Spinner from '../ui/Spinner';

export interface ConfirmationModalProps {
  open?: boolean;
  setOpen: (open?: boolean) => void;
  description?: string;
  confirmPrompt: string;
  onConfirm: (props: any) => Promise<void>;
  onCancel?: () => void;
  title?: string;
  success?: boolean;
  label?: string;
  textAreaInput?: boolean;
  error?: string;
  actionButtonLabel?: string;
  cancelButtonLabel?: string;
  isLoading?: boolean;
  functionArgs?: any;
  confirmBtnLabel?: any;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  setOpen,
  description,
  confirmPrompt,
  onConfirm,
  onCancel,
  title,
  label,
  actionButtonLabel,
  cancelButtonLabel,
  textAreaInput,
  functionArgs,
  error,
  isLoading,
  confirmBtnLabel
}) => {
  console.log('setOpen', setOpen);
  const [confirmInput, setConfirmInput] = useState('');
  const [confirmError, setConfirmError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) {
      setLoading(false);
    }
  }, [open]);

  const handleConfirmChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setConfirmInput(e.target.value);
    setConfirmError(e.target.value.length === 0);
  }, []);

  const handleConfirmClick = useCallback(async () => {
    setLoading(true);
    if (!textAreaInput) {
      if (confirmInput.toLowerCase() !== confirmPrompt?.toLowerCase()) {
        setConfirmError(true);
        setLoading(false);
        return;
      }
    }
    try {
      await onConfirm(functionArgs || (typeof functionArgs === 'number' ? functionArgs : ''));
      setOpen(false);
    } catch (err) {
      // Handle error
    } finally {
      setLoading(false);
    }
  }, [confirmInput, confirmPrompt, textAreaInput, functionArgs, onConfirm, setOpen]);

  const handleCancelClick = () => {
    if (onCancel) onCancel();
    setConfirmInput('');
    setOpen(false);
  };

  useEffect(() => {
    if (!open) {
      setConfirmInput('');
      document.body.style.pointerEvents = 'auto';
    }
  }, [open]);
  console.log('isopen', open);

  return (
    <>
      {open ? (
        <AlertDialog open={open} onOpenChange={(val) => setOpen(val)}>
          <AlertDialogTrigger></AlertDialogTrigger>
          <AlertDialogContent size="lg:w-1/3">
            <AlertDialogHeader>
              <AlertDialogTitle>{title ?? 'Confirmation Required'}</AlertDialogTitle>
              <AlertDialogDescription>
                <p size="sm" color="primary-foreground">
                  {description}
                </p>
                <p className="py-2">
                  Type <span className="font-bold">{confirmPrompt}</span> to {label ?? 'Delete'}
                </p>
                {textAreaInput ? (
                  <textarea
                    rows={5}
                    cols={50}
                    value={confirmInput}
                    onChange={handleConfirmChange}
                  />
                ) : (
                  <Input
                    placeholder="Enter Confirmation Text"
                    value={confirmInput}
                    onChange={handleConfirmChange}
                    //   error={confirmError ? 'Confirmation text does not match' : ''}
                  />
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button variant="outline" type="button" onClick={handleCancelClick}>
                {cancelButtonLabel ?? 'Cancel'}
              </Button>

              <Button
                variant="destructive"
                type="button"
                onClick={handleConfirmClick}
                disabled={
                  loading ||
                  confirmError ||
                  (!textAreaInput && confirmInput.toLowerCase() !== confirmPrompt?.toLowerCase())
                }
              >
                {loading ? <Loader /> : actionButtonLabel ?? confirmBtnLabel ?? 'Delete'}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : null}
    </>
  );
};

export default ConfirmationModal;
