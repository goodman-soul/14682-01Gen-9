import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import type { SubStationType } from "@/types";
import { subStations } from "@/data/subStations";
import { getActivitiesByStation } from "@/data/activities";
import { useAppStore } from "@/store/useAppStore";

const ROUTE_TO_TYPE: Record<string, SubStationType> = {
  scenic: "scenic",
  museum: "museum",
  performance: "performance",
  nighttour: "nighttour",
};

export const useSubStation = () => {
  const params = useParams<{ station?: string }>();
  const { currentStation, setCurrentStation, isPreviewMode } = useAppStore();

  const routeStation = (params.station as SubStationType) || currentStation;

  useEffect(() => {
    const type = ROUTE_TO_TYPE[params.station || ""];
    if (type && !isPreviewMode) {
      setCurrentStation(type);
    }
  }, [params.station, isPreviewMode, setCurrentStation]);

  const effectiveStation = isPreviewMode ? currentStation : routeStation;

  const config = useMemo(
    () => subStations[effectiveStation] || subStations.scenic,
    [effectiveStation]
  );

  const activities = useMemo(
    () => getActivitiesByStation(effectiveStation),
    [effectiveStation]
  );

  return {
    config,
    activities,
    effectiveStation,
    isPreviewMode,
  };
};
