import React, { useEffect } from 'react';

import { Box } from '@mui/material';

import { CATEGORY_SET_INIT_VALUE, PlanResponse } from '../../../models/category';
import { convertData } from '../../../utils/convertTreeData';
import { useCategoryDispatch, useCategoryState } from './CategoryProvider';
import PlanTree from './PlanTree';

const Category = () => {
  const categoryState = useCategoryState();
  const categoryDispatch = useCategoryDispatch();

  const getCategory = React.useCallback(async () => {
    try {
      const response = await fetch(`${process.env.ROOT_API}/category`, {
        method: 'GET',
      });
      const jsonData: PlanResponse = await response.json();
      if (jsonData.success) {
        if (categoryDispatch) {
          categoryDispatch({ type: CATEGORY_SET_INIT_VALUE, initData: convertData(jsonData.category) });
        }
      }
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }, [categoryDispatch]);

  useEffect(() => {
    getCategory();
  }, [getCategory]);

  // const handleSaveCategory = async () => {
  //   const body = prepareBodyData(category);
  //   if (body.length) {
  //     try {
  //       const response = await fetch(`${process.env.ROOT_API}/category`, {
  //         headers: {
  //           'Content-type': 'application/json; charset=UTF-8', // Indicates the content
  //         },
  //         method: 'PUT',
  //         body: JSON.stringify(body),
  //       });

  //       const dataJson: ICategoryCreateResponse = await response.json();

  //       if (dataJson.success) {
  //         getCategory();
  //       }
  //     } catch (error) {
  //       throw new Error('Network error');
  //     }
  //   }
  // };

  return <Box>{categoryState && categoryState.map((item) => <PlanTree key={item.id} category={item} />)}</Box>;
};

export default Category;
