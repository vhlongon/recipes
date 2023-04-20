import { EditOrDeleteModal } from '@/components/actions/EditDeleteModal';
import { EditSettings } from '@/components/actions/EditSettings';
import { Setting } from '@/components/layout/Setting';
import { Card } from '@/components/ui/Card';
import { getUserSettings } from '@/lib/data';
import { pick } from '@/lib/utils';
import { BookOpen, Globe, Layout, Settings, Thermometer } from 'react-feather';

const SettingsPage = async () => {
  const settings = await getUserSettings();

  if (!settings)
    return (
      <div className="flex h-full w-full flex-1 items-center justify-center text-2xl text-base-content">
        No settings found
      </div>
    );

  const editableSettings = pick(settings, ['temperature', 'theme', 'maxTokens', 'language']);

  return (
    <div className="flex h-full w-full flex-1 items-center justify-center text-2xl text-base-content">
      <Card
        title={
          <div className="flex items-center gap-2">
            <Settings />
            Settings
          </div>
        }
        className="m-auto w-full max-w-md"
        actions={
          <EditOrDeleteModal actions={['edit']}>
            <EditSettings settings={settings} />
          </EditOrDeleteModal>
        }>
        <div className="flex flex-col gap-2">
          <Setting
            label="Temperature"
            description="What sampling temperature to use, between 0 and 2. Higher values
              like 0.8 will make the output more random, while lower values like
              0.2 will make it more focused and deterministic."
            icon={<Thermometer size="1rem" />}
            value={editableSettings.temperature}
          />

          <Setting
            label="Max Tokens"
            description="The maximum number of tokens to generate in the completion. The
              token count of your prompt plus max_tokens cannot exceed the model
              context length. Most models have a context length of 2048 tokens
              (except for the newest models, which support 4096)."
            icon={<BookOpen size="1rem" />}
            value={editableSettings.maxTokens}
          />

          <Setting
            label="Language"
            description="Language used for the interface of the app"
            icon={<Globe size="1rem" />}
            value={editableSettings.language}
          />

          <Setting
            label="Theme"
            description={
              <span>
                Set the theme of the app uses{' '}
                <a className="link" href="https://daisyui.com/docs/themes/" target="_blank">
                  Daisy UI themes
                </a>
              </span>
            }
            icon={<Layout size="1rem" />}
            value={editableSettings.theme.toLowerCase()}
          />
        </div>
      </Card>
    </div>
  );
};

export default SettingsPage;
