export type TMuscleGroup = {
  _id: string;
  name: string;
};

export type TMuscle = {
  _id: string;
  name: string;
  image: string;
};

export type TMuscleGroupsResponse = {
  message: string;
  musclesGroup: TMuscleGroup[];
};

export type TMusclesByGroupResponse = {
  message: string;
  muscleGroup: TMuscleGroup;
  muscles: TMuscle[];
};
