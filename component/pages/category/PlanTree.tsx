import React from 'react';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, Button, IconButton, Stack, TextField } from '@mui/material';

import {
  CATEGORY_ADD_ITEM,
  CATEGORY_CHANGE_NAME,
  CATEGORY_DELETE_ITEM,
  CATEGORY_SHOW_HIDE,
  PlaceTreeProps,
} from '../../../models/category';
import { useCategoryDispatch } from './CategoryProvider';

const PlaceTree = (props: PlaceTreeProps) => {
  const { category } = props;
  const categoryDispatch = useCategoryDispatch();

  const handleAdd = () => {
    if (categoryDispatch) {
      categoryDispatch({ type: CATEGORY_ADD_ITEM, category });
    }
  };

  const handleShowHide = () => {
    if (categoryDispatch) {
      categoryDispatch({ type: CATEGORY_SHOW_HIDE, id: category.id });
    }
  };

  const handleChangeName = (value: string) => {
    if (categoryDispatch) {
      categoryDispatch({ type: CATEGORY_CHANGE_NAME, id: category.id, name: value });
    }
  };

  const handleDelete = () => {
    if (categoryDispatch) {
      categoryDispatch({
        type: CATEGORY_DELETE_ITEM,
        id: category.id,
        pid: category.pid,
        newCategory: !!category.uuid,
      });
    }
  };

  return (
    <Box
      sx={{
        display: category.expand === 'N' || category?.deleted === 'Y' ? 'none' : 'block',
        ml: (category.level || 0) * 4 + 4,
      }}
    >
      <Stack direction="row" mt={2}>
        {category.hasChild && (
          <IconButton sx={{ ml: '-40px' }} onClick={() => handleShowHide()}>
            {category.expand === 'Y' ? <RemoveIcon /> : <AddIcon />}
          </IconButton>
        )}

        <TextField
          variant="outlined"
          size="small"
          placeholder={''}
          value={category.name}
          onChange={(e) => handleChangeName(e.target.value)}
        />
        <Button size="small" variant="outlined" sx={{ ml: 1 }} onClick={() => handleDelete()}>
          Delete
        </Button>
        {category.level !== undefined && category.level < 3 && (
          <Button size="small" variant="outlined" sx={{ ml: 1 }} onClick={() => handleAdd()}>
            Add
          </Button>
        )}
      </Stack>
      {/* {data.invalidText && (
        <FormHelperText
          error={true}
          sx={{
            // marginLeft:  + 'px',
            ml: marginLeft + 5,
          }}
        >
          {data.invalidText}
        </FormHelperText>
      )} */}
    </Box>
  );
};

const PlaceTreePropsAreEqual = (preProps: PlaceTreeProps, newProps: PlaceTreeProps) => {
  return (
    preProps.category.name === newProps.category.name &&
    preProps.category.expand === newProps.category.expand &&
    preProps.category.hasChild === newProps.category.hasChild &&
    preProps.category.deleted === newProps.category.deleted
  );
};

export default React.memo(PlaceTree, PlaceTreePropsAreEqual);
