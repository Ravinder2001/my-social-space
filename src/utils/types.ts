import { ChangeEvent } from "react";

export type modalDefaultOptions = {
  isOpen: boolean;
  handleModal: () => void;
};

export type buttonDefaultOptions = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

export type selectBoxDefaultOptions = {
  options: {
    label: string;
    value: string;
  }[];
  onChange: (e: string | number) => void;
  value: { label: string; value: string } | undefined;
};
