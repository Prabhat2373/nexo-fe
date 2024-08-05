import { useCallback, useState } from 'react';

function useModalHandler(
  initialState: boolean = false
): readonly [boolean, () => void, () => void, () => void] {
  const [isVisible, setVisible] = useState<boolean>(initialState);

  const showModal = useCallback(() => setVisible(true), []);
  const hideModal = useCallback(() => setVisible(false), []);
  const toggleModal = useCallback(() => setVisible((visible) => !visible), []);

  return [isVisible, toggleModal, showModal, hideModal] as const;
}

export default useModalHandler;
