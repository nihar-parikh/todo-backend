export const formatData = (data) => {
  if (data) {
    return { data };
  } else {
    throw new Error("Data Not found!");
  }
};

export const BASE_URL = `/api/v1/todo`;
