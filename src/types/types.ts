export interface CompatComponentType {
  id: number;
  source_pod_id: number;
  pod_id: number;
  source_pod_name: string;
  pod_name: string;
  code: string;
  category: string;
  status: string;
  link: string;
  note: string;
  warning: string;
}

export type GroupedCompatDataType = Record<string, CompatComponentType[]>;
