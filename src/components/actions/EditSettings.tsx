'use client';

import { updateSettings } from '@/lib/api';
import { Settings } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { SettingsForm, SettingsFormData } from '../forms/SettingsForm';
import { Modal } from '../ui/Modal';
import { useEditDeleteContext } from './EditDeleteModal';

type EditSettingsProps = {
  settings: Pick<Settings, 'language' | 'maxTokens' | 'temperature' | 'theme' | 'id'>;
};

export const EditSettings = ({ settings }: EditSettingsProps) => {
  const router = useRouter();
  const { isOpen, action, closeModal } = useEditDeleteContext();

  const defaultValues: SettingsFormData = {
    language: settings.language,
    maxTokens: settings.maxTokens.toString(),
    temperature: settings.temperature.toString(),
    theme: settings.theme,
  };

  const onUserUpdate = async (formData: SettingsFormData) => {
    await updateSettings({
      language: formData.language,
      maxTokens: Number(formData.maxTokens),
      temperature: Number(formData.temperature),
      theme: formData.theme,
      id: settings.id,
    });
  };

  const onSuccess = () => {
    closeModal();
    router.refresh();
  };

  return (
    <Modal isOpen={isOpen} handleClose={closeModal}>
      {action === 'edit' && (
        <SettingsForm onSubmit={onUserUpdate} defaultValues={defaultValues} onSuccess={onSuccess} />
      )}
    </Modal>
  );
};
