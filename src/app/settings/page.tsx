import { getUserSettings } from '@/lib/data';

const SettingsPage = async () => {
  const settings = await getUserSettings();

  if (!settings)
    return (
      <div className="flex flex-1 justify-center w-full h-full items-center text-2xl text-slate-100">
        No settings found
      </div>
    );

  return (
    <div className="flex flex-1 justify-center w-full h-full items-center text-2xl text-slate-100">
      <div>
        {Object.entries(settings).map(([key, value]) => (
          <div className="flex-1" key={key}>
            {key}: {value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingsPage;
