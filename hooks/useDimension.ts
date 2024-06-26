import { Breakpoint, Grid } from "antd";
import { useMemo } from "react";
const { useBreakpoint } = Grid;

type DimensionKey = Breakpoint | "defaultValue";
export type DimensionProps = Partial<Record<DimensionKey, Object | number>>;

const useDimension = (params: DimensionProps) => {
  const screens = useBreakpoint();

  const value = useMemo(() => {
    for (const size of ["xxl", "xl", "lg", "md", "sm", "xs"]) {
      if (params.hasOwnProperty(size) && screens[size as Breakpoint])
        return params[size as DimensionKey];
    }
    if (params.hasOwnProperty("defaultValue")) return params.defaultValue;
    return undefined;
  }, [params, screens]);

  return value;
};

export default useDimension;
