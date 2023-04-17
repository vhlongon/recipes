type SettingProps = {
  label: string;
  value: string | number;
  description: React.ReactNode;
  icon: React.ReactNode;
};

export const Setting = ({ label, value, description, icon }: SettingProps) => (
  <div className="flex flex-col">
    <div className="flex items-center gap-2">
      {icon}
      <span>{label}:</span>
      <span className="text-sm opacity-75">{value}</span>
    </div>
    <span className="ml-6 text-sm opacity-50">{description}</span>
  </div>
);
