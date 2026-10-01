import type { ReactNode } from 'react';

export type TModalProps = {
  title: string;
  onClose: () => void;
  titleClasses: string;
  children?: ReactNode;
};
