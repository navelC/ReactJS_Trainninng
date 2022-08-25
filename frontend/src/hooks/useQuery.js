import { useMemo } from "react";
import { useLocation } from "react-router-dom";

export default function useQuery() {
  function get() {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
  }
  const query = get();
  const getParams = () => {
    const brand = query.get("brand");
    const page = query.get("page");
    const name = query.get("name");
    const category = query.get("category");
    const params = {};
    if (brand) params.brand = brand;
    if (page) params.page = page;
    if (name) params.name = name;
    if (category) params.category = category;
    return params;
  };
  function getQuery(params) {
    const qs = Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join('&');
    return qs;
  }
  return [getParams, getQuery];
}
