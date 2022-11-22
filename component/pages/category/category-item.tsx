import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Button, FormHelperText, IconButton, Stack, TextField } from '@mui/material';

import { ITreeview } from '../../../models/commons';
import Category from './category';

interface IProps {
  onAddCategory: (id: string) => void;
  onDeleteCategory: (id: string) => void;
  onExpandCategory: (id: string) => void;
  onChangeName: (id: string, name: string) => void;
  data: ITreeview;
  maxLevelChild: number;
}

function CategoryItem(props: IProps) {
  const { data, onAddCategory, onDeleteCategory, onExpandCategory, onChangeName, maxLevelChild } = props;
  const marginLeft = data.level * 4;

  return (
    <>
      <Stack direction="row" mt={3} ml={marginLeft}>
        <IconButton onClick={() => onExpandCategory(data.id)}>{data.expand ? <RemoveIcon /> : <AddIcon />}</IconButton>

        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          size="small"
          placeholder={''}
          autoFocus
          value={data.name}
          onChange={(e) => onChangeName(data.id, e.target.value)}
        />
        <Button size="small" variant="outlined" onClick={() => onDeleteCategory(data.id)}>
          Delete
        </Button>
        {data.level < maxLevelChild && (
          <Button size="small" variant="outlined" onClick={() => onAddCategory(data.id)}>
            Add
          </Button>
        )}
      </Stack>
      {data.invalidText && (
        <FormHelperText
          error={true}
          sx={{
            // marginLeft:  + 'px',
            ml: marginLeft + 5,
          }}
        >
          {data.invalidText}
        </FormHelperText>
      )}

      <Category
        treeviewData={data.children ? data.children : []}
        onAddCategory={onAddCategory}
        onDeleteCategory={onDeleteCategory}
        onExpandCategory={onExpandCategory}
        changeName={onChangeName}
        maxLevelChild={maxLevelChild}
      />
    </>
  );
}

export default CategoryItem;
