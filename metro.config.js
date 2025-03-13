// const { getDefaultConfig } = require("expo/metro-config");

// module.exports = (async () => {
//   const config = await getDefaultConfig(__dirname);
//   config.transformer.babelTransformerPath = require.resolve(
//     "react-native-svg-transformer"
//   );

//   // Remove "svg" from assetExts and add it to sourceExts
//   config.resolver.assetExts = config.resolver.assetExts.filter(
//     (ext) => ext !== "svg"
//   );
//   config.resolver.sourceExts.push("svg");

//   return config;
// })();

const { getDefaultConfig } = require("expo/metro-config");

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  const { transformer, resolver } = config;

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer/expo"),
  };
  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...resolver.sourceExts, "svg"],
  };

  return config;
})();
