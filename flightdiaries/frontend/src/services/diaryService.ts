import axios from "axios";
import type { Diary, NewDiary, NonSensitiveDiary } from "../types";

const baseUrl = "/api/diaries";

const getAll = () => {
  return axios.get<NonSensitiveDiary[]>(baseUrl).then((response) => response.data);
};

const create = (object: NewDiary) => {
  return axios.post<Diary>(baseUrl, object).then((response) => response.data);
};

export default { getAll, create };
