import { ModelInit, MutableModel } from "@aws-amplify/datastore";

type RoadmapMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ResourceMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Roadmap {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly flow: string;
  readonly resources?: (string | null)[] | null;
  readonly verified: boolean;
  readonly user?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Roadmap, RoadmapMetaData>);
  static copyOf(source: Roadmap, mutator: (draft: MutableModel<Roadmap, RoadmapMetaData>) => MutableModel<Roadmap, RoadmapMetaData> | void): Roadmap;
}

export declare class Resource {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly link: string;
  readonly tags?: (string | null)[] | null;
  readonly user?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Resource, ResourceMetaData>);
  static copyOf(source: Resource, mutator: (draft: MutableModel<Resource, ResourceMetaData>) => MutableModel<Resource, ResourceMetaData> | void): Resource;
}