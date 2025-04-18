export interface CodeObjType {
  code: string;
  category: string;
}

export interface CompatComponentType {
  id: number;
  source_pod_id: number;
  pod_id: number;
  source_pod_name: string;
  pod_name: string;
  pod_kind: string;
  code: string;
  category: string;
  status: string;
  link: string;
  note: string;
  warning: string;
}

export interface CompDataResponse {
  code: string;
  compData: CompatComponentType[];
}

export type GroupedCompatDataType = Record<string, CompatComponentType[]>;
