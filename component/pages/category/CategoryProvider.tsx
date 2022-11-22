import React, { Dispatch } from 'react';

import { cloneDeep } from 'lodash';

import {
  CategoryAction,
  CategoryContextProviderProps,
  CATEGORY_ADD_ITEM,
  CATEGORY_CHANGE_NAME,
  CATEGORY_DELETE_ITEM,
  CATEGORY_SET_INIT_VALUE,
  CATEGORY_SHOW_HIDE,
  Plan,
} from '../../../models/category';
import { sortData } from '../../../utils/convertTreeData';

// Context
const CategoryContext = React.createContext<Plan[] | undefined>(undefined);
const CategoryDispatch = React.createContext<Dispatch<CategoryAction> | undefined>(undefined);

// Hook
export const useCategoryState = () => {
  const useCategoryContext = React.useContext(CategoryContext);
  if (!useCategoryContext) {
    throw new Error('Please use useCategoryState inside the CategoryProvider');
  }
  return useCategoryContext;
};

export const useCategoryDispatch = () => {
  const useCategoryDispatch = React.useContext(CategoryDispatch);
  if (!CategoryDispatch) {
    throw new Error('Please use useCategory inside the CategoryDispatch');
  }
  return useCategoryDispatch;
};

// Reducer function
const categoryReducer = (state: Plan[], action: CategoryAction) => {
  switch (action.type) {
    case CATEGORY_SET_INIT_VALUE: {
      if (!action.initData) {
        throw new Error(`Action type ${CATEGORY_SET_INIT_VALUE} must go with initData array`);
      }
      return action.initData;
    }

    case CATEGORY_ADD_ITEM: {
      if (!action.category) {
        throw new Error(`Action type ${CATEGORY_ADD_ITEM} must go with category`);
      }
      const uuid = 'az' + Math.random().toFixed(4).toString();
      const new_category: Plan = {
        id: uuid,
        uuid: uuid,
        pid: action.category.id,
        name: '',
        useYn: 'N',
        expand: action.category.expand === 'Y' ? 'Y' : 'N',
        level: (action.category.level || 0) + 1,
        keyPlan: action.category.keyPlan + '-' + uuid,
        hasChild: false,
      };

      let cloneData: Plan[] = cloneDeep(state);

      // Change data parent hasChild
      const category = cloneData.find((item) => item.id === action.category?.id);
      if (category) {
        category.hasChild = true;
      }

      cloneData = sortData([...cloneData, new_category]);

      return cloneData;
    }

    case CATEGORY_DELETE_ITEM: {
      if (!action.id || action.newCategory === undefined) {
        throw new Error(`Action type ${CATEGORY_DELETE_ITEM} must go with category id, pid and newCategory`);
      }

      const cloneData: Plan[] = cloneDeep(state);
      if (action.newCategory) {
        const listCategory = cloneData?.filter((item) => item.keyPlan && item.keyPlan.indexOf(action.id || '') === -1);
        if (action.pid) {
          const category = listCategory?.find((item) => item.id === action.pid);
          const hasChild = listCategory?.find((item) => item.pid === action.pid);
          if (category && hasChild === undefined) {
            category.hasChild = false;
          }
        }
        return listCategory;
      } else {
        cloneData
          ?.filter((item) => item.keyPlan && item.keyPlan.indexOf(action.id || ' ') >= 0)
          .map((item) => {
            item.deleted = 'Y';
          });
        if (action.pid) {
          let hasChild = 0;
          const category = cloneData?.find((item) => item.id === action.pid);
          const listChild = cloneData?.filter((item) => item.pid === action.pid);
          listChild?.forEach((item) => {
            if (item.deleted === 'Y') hasChild += 1;
          });
          if (category && hasChild === listChild.length) {
            category.hasChild = false;
          }
        }
        return cloneData;
      }
    }

    case CATEGORY_CHANGE_NAME: {
      if (!action.id) {
        throw new Error(`Action type ${CATEGORY_CHANGE_NAME} must go with category id`);
      }

      const cloneData: Plan[] = cloneDeep(state);
      const category = cloneData?.find((item) => item.id === action.id);
      if (category) {
        category.name = action.name || '';
      }
      return cloneData;
    }

    case CATEGORY_SHOW_HIDE: {
      if (!action.id) {
        throw new Error(`Action type ${CATEGORY_SHOW_HIDE} must go with category id`);
      }

      const cloneData: Plan[] = cloneDeep(state);
      cloneData
        ?.filter((item) => item.keyPlan && item.keyPlan.indexOf(action.id || '') >= 0)
        .map((item) => {
          if (item.id === action.id) {
            item.expand = item.expand === 'Y' ? 'ROOT' : 'Y';
          } else {
            item.expand = item.expand === 'Y' ? 'N' : 'Y';
          }
        });
      return cloneData;
    }

    default:
      return state;
  }
};

// Provider
export const CategoryContextProvider = ({ children }: CategoryContextProviderProps) => {
  const [state, dispatch] = React.useReducer(categoryReducer, []);

  return (
    <CategoryContext.Provider value={state}>
      <CategoryDispatch.Provider value={dispatch}>{children}</CategoryDispatch.Provider>
    </CategoryContext.Provider>
  );
};
