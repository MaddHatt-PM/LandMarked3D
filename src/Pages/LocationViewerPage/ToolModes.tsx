export enum ToolModes {
  PointPolygonAppend = "PointPolygonAppend",
  PointPolygonInsert = "PointPolygonInsert",
  PointPolygonTransform = "PointsPolygonTransform",

  PointPathAppend = "PointPathAppend",
  PointPathInsert = "PointPathInsert",
  PointPathTransform = "PointsPathTransform",
}

interface ToolModeDetailProps {
  displayName: string,
  tooltip: string,
  displayNode: React.ReactNode,
}

export const ToolModeDetails: Record<ToolModes, ToolModeDetailProps> = {
  [ToolModes.PointPolygonAppend]: {
    displayName: "Append point",
    tooltip: "TODO",
    displayNode: <>Append</>,
  },

  [ToolModes.PointPolygonInsert]: {
    displayName: "Insert point",
    tooltip: "TODO",
    displayNode: <>Insert</>,
  },

  [ToolModes.PointPolygonTransform]: {
    displayName: "Transform points",
    tooltip: "TODO",
    displayNode: <>Transform</>,
  },

  [ToolModes.PointPathAppend]: {
    displayName: "Append point",
    tooltip: "TODO",
    displayNode: <>Append</>,
  },

  [ToolModes.PointPathInsert]: {
    displayName: "Insert point",
    tooltip: "TODO",
    displayNode: <>Insert</>,
  },

  [ToolModes.PointPathTransform]: {
    displayName: "Transform points",
    tooltip: "TODO",
    displayNode: <>Transform</>,
  },
}

export const isPolygonTool = (toolMode: ToolModes) => {
  const polygonTools: ToolModes[] = [
    ToolModes.PointPolygonAppend,
    ToolModes.PointPolygonInsert,
    ToolModes.PointPolygonTransform,
  ];
  
  return polygonTools.includes(toolMode);
}

export const isPathTool = (toolMode: ToolModes) => {
  const pathTools: ToolModes[] = [
    ToolModes.PointPathAppend,
    ToolModes.PointPathInsert,
    ToolModes.PointPathTransform,
  ];
  
  return pathTools.includes(toolMode);
}