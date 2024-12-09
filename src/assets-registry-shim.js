'use strict';

const assets = {};

const registerAsset = (asset) => {
  assets[asset.name || asset.uri] = asset;
  return asset;
};

const getAssetByID = (assetId) => {
  return assets[assetId] || null;
};

export { registerAsset, getAssetByID };
