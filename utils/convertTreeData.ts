import { Plan } from '../models/category';

const checkHasChild = (data: Plan[], id: string): boolean => {
  const index = data.findIndex((item) => item.pid === id);
  return index >= 0;
};

const rootParent = (arrayCategory: Plan[], item: Plan | undefined, keyPlan: string): string => {
  if (!item) return '';
  if (item.pid === null) {
    return keyPlan;
  } else {
    const category = arrayCategory.find((c) => c.id === item.pid);
    return rootParent(arrayCategory, category, category?.id + '-' + keyPlan);
  }
};

export const sortData = (data: Plan[]): Plan[] => {
  return data.sort((a, b) => {
    if (!a.keyPlan || !b.keyPlan) return 0;
    if (a.keyPlan > b.keyPlan) {
      return 1;
    }
    if (a.keyPlan < b.keyPlan) {
      return -1;
    }
    return 0;
  });
};

export const convertData = (data: Plan[]): Plan[] => {
  const cloneData = [...data];

  cloneData.forEach(async (item) => {
    item.keyPlan = rootParent(data, item, item.id);
    item.level = item.keyPlan.split('-').length - 1;
    item.hasChild = checkHasChild(data, item.id);
    item.expand = 'Y';
  });
  sortData(cloneData);

  return cloneData;
};
