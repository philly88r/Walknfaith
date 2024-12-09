'use strict';

let assets = {};
let nextId = 1;

function registerAsset(asset) {
  if (asset.id) {
    assets[asset.id] = asset;
    return asset.id;
  }

  const id = nextId++;
  assets[id] = { ...asset, id };
  return id;
}

function getAssetByID(assetId) {
  return assets[assetId] || null;
}

function setCustomAssetLoader(customLoader) {
  // No-op for web
}

module.exports = {
  registerAsset,
  getAssetByID,
  setCustomAssetLoader,
};
