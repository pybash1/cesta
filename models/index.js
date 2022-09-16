// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Roadmap, Resource, RoadmapResource } = initSchema(schema);

export {
  Roadmap,
  Resource,
  RoadmapResource
};