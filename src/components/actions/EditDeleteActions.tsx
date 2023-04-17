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
    <div className="flex w-full mt-4 justify-end relative gap-4">
      {actions.includes('edit') && (
        <div className="flex flex-col gap-1 items-center">
          <Button variant="primary" square onClick={onEdit}>
            <Edit />
          </Button>
          <span className="text-slate-400 text-sm">Edit</span>
        </div>
      )}
      {actions.includes('delete') && (
        <div className="flex flex-col gap-1 items-center">
          <Button variant="secondary" square onClick={onDelete}>
            <X />
          </Button>
          <span className="text-slate-400 text-sm">Delete</span>
        </div>
      )}
    </div>
  );
};
