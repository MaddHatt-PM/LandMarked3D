export enum ToolModes {
  PointPolygonAppend = "PointAppend",
  PointPolygonInsert = "PointInsert",
  PointPolygonTransform = "PointsTransform",
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
}