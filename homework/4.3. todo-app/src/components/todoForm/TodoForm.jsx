import Input from '../input/Input';
import TextArea from '../input/TextArea';
import Button from '../button/Button';

const TodoForm = ({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
  onSubmit,
  isEditing,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <Input
        onChange={(e) => {
          onTitleChange(e.target.value);
        }}
        placeholder='Title'
        type='text'
        value={title}
      />
      <TextArea
        onChange={(e) => {
          onDescriptionChange(e.target.value);
        }}
        placeholder='Description'
        value={description}
      />
      <Button type='submit'>{isEditing ? 'Edit' : 'Create'}</Button>
    </form>
  );
};

export default TodoForm;
