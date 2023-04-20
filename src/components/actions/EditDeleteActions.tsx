import { Edit, X } from 'react-feather';
import { Button } from '../ui/Button';
import { Action, useEditDeleteContext } from './EditDeleteModal';

type EditDeleteActionsProps = {
  actions: Action[];
};
export const EditDeleteActions = ({ actions }: EditDeleteActionsProps) => {
  const { setAction, openModal } = useEditDeleteContext();

  const onDelete = () => {
    setAction('delete');
    openModal();
  };

  const onEdit = () => {
    setAction('edit');
    openModal();
  };

  return (
    <div className="relative mt-4 flex w-full justify-end gap-4">
      {actions.includes('edit') && (
        <div className="flex flex-col items-center gap-1">
          <Button variant="primary" square onClick={onEdit}>
            <Edit />
          </Button>
          <span className="text-sm text-slate-400">Edit</span>
        </div>
      )}
      {actions.includes('delete') && (
        <div className="flex flex-col items-center gap-1">
          <Button variant="secondary" square onClick={onDelete}>
            <X />
          </Button>
          <span className="text-sm text-slate-400">Delete</span>
        </div>
      )}
    </div>
  );
};
