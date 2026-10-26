import { foundationPages } from './atlas-foundation.mjs';
import { networkPages } from './atlas-network.mjs';
import { deliveryPage } from './atlas-delivery.mjs';

export const atlasPages = [...foundationPages, deliveryPage, ...networkPages].sort((a,b)=>Number(a.number)-Number(b.number));
export const atlasDate = '2026-10-11';
export const atlasPath = id => `/estate-blueprint${id === 'estate' ? '' : `-${id}`}.html`;
export const chapterNames = {
  estate:'The connected company', compounding:'How the work compounds',
  delivery:'The delivery system', spine:'The operating spine',
  evidence:'How a claim becomes evidence', people:'People, practice & authority',
  network:'The proposed network', principles:'Principles & open decisions',
};
