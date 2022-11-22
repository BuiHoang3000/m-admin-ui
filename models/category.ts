import React from 'react';

export type Plan = {
  id: string;
  uuid?: string;
  pid: string | null;
  name: string;
  useYn: string;
  expand?: string;
  deleted?: string;
  level?: number;
  keyPlan?: string;
  hasChild?: boolean;
};

export type TravelPlan = {
  [k: string]: Plan;
};

export type PlanResponse = {
  success: boolean;
  message: string;
  category: Plan[];
};

export type PlaceTreeProps = {
  category: Plan;
};

export type CategoryAction = {
  type: string;
  value?: Plan[];
  initData?: Plan[];
  id?: string;
  pid?: string | null;
  name?: string;
  category?: Plan;
  newCategory?: boolean;
};

export type CategoryContextProviderProps = {
  children: React.ReactNode;
};

export type CategoryTreeProps = {
  data: TravelPlan;
};

export const CATEGORY_SET_INIT_VALUE = 'SET_INIT_VALUE';
export const CATEGORY_ADD_ITEM = 'ADD_ITEM';
export const CATEGORY_DELETE_ITEM = 'DELETE_ITEM';
export const CATEGORY_CHANGE_NAME = 'CHANGE_NAME';
export const CATEGORY_SHOW_HIDE = 'SHOW_HIDE';
