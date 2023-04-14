import { Card } from '@/components/Card';
import { getUserSettings } from '@/lib/data';
import { pick } from '@/lib/utils';
import { Settings } from 'react-feather';

const SettingsPage = async () => {
  const settings = await getUserSettings();

  if (!settings)
    return (
      <div className="flex flex-1 justify-center w-full h-full items-center text-2xl text-slate-100">
        No settings found
      </div>
    );

  const editableSettings = pick(settings, [
    'temperature',
    'theme',
    'maxTokens',
    'language',
  ]);

  return (
    <div className="flex flex-1 justify-center w-full h-full items-center text-2xl text-slate-100">
      <Card
        title={
          <div className="flex items-center gap-2">
            <Settings />
            Settings
          </div>
        }
        className="w-full max-w-md m-auto"
        // actions={
        //   <EditOrDeleteModal>
        //     <EditDeleteUser user={user} />
        //   </EditOrDeleteModal>
        // }
      >
        <div>
          {Object.entries(editableSettings).map(([key, value]) => (
            <div className="flex-1" key={key}>
              {key}: {value}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default SettingsPage;
