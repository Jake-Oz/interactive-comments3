"use client";

import { useDataStore } from "../hooks/useDataStore";

export const getData = () => {
  const data = useDataStore();
  return data;
};
