export interface NewClientData {
  name: string;
  email: string;
  image?: File | null;
  description?: string;
}

export interface ModalNewClientProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: NewClientData) => Promise<void>;
}
