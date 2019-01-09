const fs = require('fs');
const path = require('path');

const widgetModuleName = "widgets";


class WidgetOutputPlugin {
	apply(compiler) {
		let outputPath = compiler.options.output.path;

		if (outputPath === '/' &&
			compiler.options.devServer &&
			compiler.options.devServer.outputPath
		) {
			outputPath = compiler.options.devServer.outputPath;
		}

		compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
			for (const chunk of compilation.chunks) {
				if (chunk.name === widgetModuleName) {
					const asset = compilation.assets[chunk.files[0]];

					if (asset._value) {
						fs.writeFileSync(
							path.join(
								path.dirname(path.join(outputPath, chunk.files[0])),
								"widgets.bundle.js"
							),
							asset._value,
							{
								encoding: "utf-8"
							}
						);
					}
				}
			}
		});
	}
}

module.exports = {
	entry: {
		[widgetModuleName]: path.join(__dirname, 'src/widgets.browser.ts')
	},

	plugins: [
		new WidgetOutputPlugin()
	]
};


/*
interface ChunkData {
	"noChunkHash": boolean,
	"contentHashType": string,
	"chunk": CompilationChunk[],
	"hash": string
};

interface CompilationChunk {
	"id": number,
	"ids": number[],
	"debugId": number,
	"name": string,
	"preventIntegration": boolean,
	"_modules": { [id: string]: string | null },
	"_groups": { [id: string]: string | null },
	"files": string[],
	"rendered": boolean,
	"hash": string,
	"contentHash": { [id: string]: string },
	"renderedHash": string,
	"extraAsync": false
}

interface Compilation {
outputOptions: {"path":"/Users/yona/devel/badgr/opensource-badgr-ui/dist","filename":"[name].[chunkhash:20].js","crossOriginLoading":false,"chunkFilename":"[name].[chunkhash:20].js","webassemblyModuleFilename":"[modulehash].module.wasm","library":"","hotUpdateFunction":"webpackHotUpdate","jsonpFunction":"webpackJsonp","chunkCallbackName":"webpackChunk","globalObject":"window","devtoolNamespace":"","libraryTarget":"var","pathinfo":false,"sourceMapFilename":"[file].map[query]","hotUpdateChunkFilename":"[id].[has...
semaphore: {"available":100,"waiters":[]}
entrypoints: {}
namedChunkGroups: {}
namedChunks: {}
_modules: {}
cache: null
records: {}
additionalChunkAssets: []
assets: {}
errors: []
warnings: [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]
dependencyFactories: {}
dependencyTemplates: {}
childrenCounters: {"src/breakdown/static/scss/theme-default.scss":1,"mini-css-extract-plugin /Users/yona/devel/badgr/opensource-badgr-ui/node_modules/@angular-devkit/build-angular/src/angular-cli-files/plugins/raw-css-loader.js!/Users/yona/devel/badgr/opensource-badgr-ui/node_modules/postcss-loader/src/index.js??extracted!/Users/yona/devel/badgr/opensource-badgr-ui/node_modules/sass-loader/lib/loader.js??ref--14-3!/Users/yona/devel/badgr/opensource-badgr-ui/src/styles.scss":1}
usedChunkIds: null
usedModuleIds: null
fileTimestamps: {}
contextTimestamps: {}
compilationDependencies: {}
_buildingModules: {}
_rebuildingModules: {}
_ngToolsWebpackPluginInstance: null
fullHash: "a07737121de78ce2c4d01ff1470f94ef"
hash: "a07737121de78ce2c4d0"
fileDependencies: {"_lastActiveSortFn":null}
contextDependencies: {"_lastActiveSortFn":null}
missingDependencies: {"_lastActiveSortFn":null}
}
*/


x = {
	"buildModule": {
		"_args": ["module"],
		"taps": [{"type": "sync", "name": "ProgressPlugin"}],
		"interceptors": [],
		"_x": [null]
	},
	"rebuildModule": {
		"_args": ["module"],
		"taps": [{"type": "sync", "name": "FlagDependencyExportsPlugin"}],
		"interceptors": []
	},
	"failedModule": {
		"_args": ["module", "error"],
		"taps": [{"type": "sync", "name": "ProgressPlugin"}],
		"interceptors": []
	},
	"succeedModule": {
		"_args": ["module"],
		"taps": [{"type": "sync", "name": "ProgressPlugin"}],
		"interceptors": [],
		"_x": [null]
	},
	"dependencyReference": {
		"_args": ["dependencyReference", "dependency", "module"],
		"taps": [],
		"interceptors": [],
		"_x": []
	},
	"finishModules": {
		"_args": ["modules"],
		"taps": [{"type": "sync", "name": "angular-compiler"}, {
			"type": "sync",
			"name": "FlagDependencyExportsPlugin"
		}, {"type": "sync", "name": "WasmFinalizeExportsPlugin"}],
		"interceptors": [{"name": "ProgressPlugin", "context": true}],
		"_x": [null, null, null]
	},
	"finishRebuildingModule": {
		"_args": ["module"],
		"taps": [{"type": "sync", "name": "FlagDependencyExportsPlugin"}],
		"interceptors": []
	},
	"unseal": {"_args": [], "taps": [{"type": "sync", "name": "SplitChunksPlugin"}], "interceptors": []},
	"seal": {
		"_args": [],
		"taps": [{"type": "sync", "name": "WarnCaseSensitiveModulesPlugin"}],
		"interceptors": [{"name": "ProgressPlugin", "context": true}],
		"_x": [null]
	},
	"beforeChunks": {"_args": [], "taps": [], "interceptors": [], "_x": []},
	"afterChunks": {
		"_args": ["chunks"],
		"taps": [{"type": "sync", "name": "WebAssemblyModulesPlugin"}],
		"interceptors": [],
		"_x": [null]
	},
	"optimizeDependenciesBasic": {
		"_args": ["modules"],
		"taps": [],
		"interceptors": [{"name": "ProgressPlugin", "context": true}],
		"_x": []
	},
	"optimizeDependencies": {
		"_args": ["modules"],
		"taps": [{"type": "sync", "name": "SideEffectsFlagPlugin"}, {"type": "sync", "name": "FlagDependencyUsagePlugin"}],
		"interceptors": [{"name": "ProgressPlugin", "context": true}],
		"_x": [null, null]
	},
	"optimizeDependenciesAdvanced": {
		"_args": ["modules"],
		"taps": [],
		"interceptors": [{"name": "ProgressPlugin", "context": true}],
		"_x": []
	},
	"afterOptimizeDependencies": {
		"_args": ["modules"],
		"taps": [],
		"interceptors": [{"name": "ProgressPlugin", "context": true}],
		"_x": []
	},
	"optimize": {"_args": [], "taps": [], "interceptors": [{"name": "ProgressPlugin", "context": true}], "_x": []},
	"optimizeModulesBasic": {
		"_args": ["modules"],
		"taps": [],
		"interceptors": [{"name": "ProgressPlugin", "context": true}],
		"_x": []
	},
	"optimizeModules": {
		"_args": ["modules"],
		"taps": [{"type": "sync", "name": "CircularDependencyPlugin"}],
		"interceptors": [{"name": "ProgressPlugin", "context": true}],
		"_x": [null]
	},
	"optimizeModulesAdvanced": {
		"_args": ["modules"],
		"taps": [],
		"interceptors": [{"name": "ProgressPlugin", "context": true}],
		"_x": []
	},
	"afterOptimizeModules": {
		"_args": ["modules"],
		"taps": [],
		"interceptors": [{"name": "ProgressPlugin", "context": true}],
		"_x": []
	},
	"optimizeChunksBasic": {
		"_args": ["chunks", "chunkGroups"],
		"taps": [{"type": "sync", "name": "EnsureChunkConditionsPlugin"}, {
			"type": "sync",
			"name": "RemoveParentModulesPlugin"
		}, {"type": "sync", "name": "RemoveEmptyChunksPlugin"}, {"type": "sync", "name": "MergeDuplicateChunksPlugin"}],
		"interceptors": [{"name": "ProgressPlugin", "context": true}],
		"_x": [null, null, null, null]
	},
	"optimizeChunks": {
		"_args": ["chunks", "chunkGroups"],
		"taps": [],
		"interceptors": [{"name": "ProgressPlugin", "context": true}],
		"_x": []
	},
	"optimizeChunksAdvanced": {
		"_args": ["chunks", "chunkGroups"],
		"taps": [{"type": "sync", "name": "SplitChunksPlugin"}, {
			"type": "sync",
			"name": "RuntimeChunkPlugin"
		}, {"type": "sync", "name": "RemoveEmptyChunksPlugin"}],
		"interceptors": [{"name": "ProgressPlugin", "context": true}],
		"_x": [null, null, null]
	},
	"afterOptimizeChunks": {
		"_args": ["chunks", "chunkGroups"],
		"taps": [],
		"interceptors": [{"name": "ProgressPlugin", "context": true}],
		"_x": []
	},
	"optimizeTree": {
		"_args": ["chunks", "modules"],
		"taps": [],
		"interceptors": [{"name": "ProgressPlugin", "context": true}],
		"_x": []
	},
	"afterOptimizeTree": {
		"_args": ["chunks", "modules"],
		"taps": [],
		"interceptors": [{"name": "ProgressPlugin", "context": true}],
		"_x": []
	},
	"optimizeChunkModulesBasic": {
		"_args": ["chunks", "modules"],
		"taps": [],
		"interceptors": [{"name": "ProgressPlugin", "context": true}],
		"_x": []
	},
	"optimizeChunkModules": {
		"_args": ["chunks", "modules"],
		"taps": [{"type": "sync", "name": "ModuleConcatenationPlugin"}],
		"interceptors": [{"name": "ProgressPlugin", "context": true}],
		"_x": [null]
	},
	"optimizeChunkModulesAdvanced": {
		"_args": ["chunks", "modules"],
		"taps": [],
		"interceptors": [{"name": "ProgressPlugin", "context": true}],
		"_x": []
	},
	"afterOptimizeChunkModules": {
		"_args": ["chunks", "modules"],
		"taps": [],
		"interceptors": [{"name": "ProgressPlugin", "context": true}],
		"_x": []
	},
	"shouldRecord": {
		"_args": [],
		"taps": [{"type": "sync", "name": "NoEmitOnErrorsPlugin"}],
		"interceptors": [],
		"_x": [null]
	},
	"reviveModules": {
		"_args": ["modules", "records"],
		"taps": [{"type": "sync", "name": "RecordIdsPlugin"}],
		"interceptors": [{"name": "ProgressPlugin", "context": true}],
		"_x": [null]
	},
	"optimizeModuleOrder": {
		"_args": ["modules"],
		"taps": [{"type": "sync", "name": "OccurrenceOrderModuleIdsPlugin"}],
		"interceptors": [{"name": "ProgressPlugin", "context": true}],
		"_x": [null]
	},
	"advancedOptimizeModuleOrder": {
		"_args": ["modules"],
		"taps": [],
		"interceptors": [{"name": "ProgressPlugin", "context": true}],
		"_x": []
	},
	"beforeModuleIds": {
		"_args": ["modules"],
		"taps": [{"type": "sync", "name": "HashedModuleIdsPlugin"}],
		"interceptors": [{"name": "ProgressPlugin", "context": true}],
		"_x": [null]
	},
	"moduleIds": {
		"_args": ["modules"],
		"taps": [],
		"interceptors": [{"name": "ProgressPlugin", "context": true}],
		"_x": []
	},
	"optimizeModuleIds": {
		"_args": ["modules"],
		"taps": [],
		"interceptors": [{"name": "ProgressPlugin", "context": true}],
		"_x": []
	},
	"afterOptimizeModuleIds": {
		"_args": ["modules"],
		"taps": [],
		"interceptors": [{"name": "ProgressPlugin", "context": true}],
		"_x": []
	},
	"reviveChunks": {
		"_args": ["chunks", "records"],
		"taps": [{"type": "sync", "name": "RecordIdsPlugin"}],
		"interceptors": [{"name": "ProgressPlugin", "context": true}],
		"_x": [null]
	},
	"optimizeChunkOrder": {
		"_args": ["chunks"],
		"taps": [{"type": "sync", "name": "OccurrenceOrderChunkIdsPlugin"}],
		"interceptors": [{"name": "ProgressPlugin", "context": true}],
		"_x": [null]
	},
	"beforeChunkIds": {
		"_args": ["chunks"],
		"taps": [],
		"interceptors": [{"name": "ProgressPlugin", "context": true}],
		"_x": []
	},
	"optimizeChunkIds": {
		"_args": ["chunks"],
		"taps": [{"type": "sync", "name": "FlagIncludedChunksPlugin"}],
		"interceptors": [{"name": "ProgressPlugin", "context": true}],
		"_x": [null]
	},
	"afterOptimizeChunkIds": {
		"_args": ["chunks"],
		"taps": [],
		"interceptors": [{"name": "ProgressPlugin", "context": true}],
		"_x": []
	},
	"recordModules": {
		"_args": ["modules", "records"],
		"taps": [{"type": "sync", "name": "RecordIdsPlugin"}],
		"interceptors": [{"name": "ProgressPlugin", "context": true}],
		"_x": [null]
	},
	"recordChunks": {
		"_args": ["chunks", "records"],
		"taps": [{"type": "sync", "name": "RecordIdsPlugin"}],
		"interceptors": [{"name": "ProgressPlugin", "context": true}],
		"_x": [null]
	},
	"beforeHash": {"_args": [], "taps": [], "interceptors": [{"name": "ProgressPlugin", "context": true}], "_x": []},
	"contentHash": {
		"_args": ["chunk"],
		"taps": [{"type": "sync", "name": "mini-css-extract-plugin"}, {"type": "sync", "name": "JavascriptModulesPlugin"}],
		"interceptors": [],
		"_x": [null, null]
	},
	"afterHash": {"_args": [], "taps": [], "interceptors": [{"name": "ProgressPlugin", "context": true}], "_x": []},
	"recordHash": {
		"_args": ["records"],
		"taps": [],
		"interceptors": [{"name": "ProgressPlugin", "context": true}],
		"_x": []
	},
	"record": {
		"_args": ["compilation", "records"],
		"taps": [],
		"interceptors": [{"name": "ProgressPlugin", "context": true}],
		"_x": []
	},
	"beforeModuleAssets": {
		"_args": [],
		"taps": [],
		"interceptors": [{"name": "ProgressPlugin", "context": true}],
		"_x": []
	},
	"shouldGenerateChunkAssets": {"_args": [], "taps": [], "interceptors": [], "_x": []},
	"beforeChunkAssets": {
		"_args": [],
		"taps": [],
		"interceptors": [{"name": "ProgressPlugin", "context": true}],
		"_x": []
	},
	"additionalChunkAssets": {
		"_args": ["chunks"],
		"taps": [],
		"interceptors": [{"name": "ProgressPlugin", "context": true}],
		"_x": []
	},
	"additionalAssets": {
		"_args": [],
		"taps": [],
		"interceptors": [{"name": "ProgressPlugin", "context": true}],
		"_x": []
	},
	"optimizeChunkAssets": {
		"_args": ["chunks"],
		"taps": [{"type": "sync", "name": "LicenseWebpackPlugin"}, {
			"type": "promise",
			"name": "cleancss-webpack-plugin"
		}, {"type": "async", "name": "TerserPlugin"}],
		"interceptors": [{"name": "ProgressPlugin", "context": true}],
		"_x": [null, null, null]
	},
	"afterOptimizeChunkAssets": {
		"_args": ["chunks"],
		"taps": [],
		"interceptors": [{"name": "ProgressPlugin", "context": true}],
		"_x": []
	},
	"optimizeAssets": {
		"_args": ["assets"],
		"taps": [],
		"interceptors": [{"name": "ProgressPlugin", "context": true}],
		"_x": []
	},
	"afterOptimizeAssets": {
		"_args": ["assets"],
		"taps": [],
		"interceptors": [{"name": "ProgressPlugin", "context": true}],
		"_x": []
	},
	"needAdditionalSeal": {"_args": [], "taps": [], "interceptors": [], "_x": []},
	"afterSeal": {
		"_args": [],
		"taps": [{"type": "sync", "name": "SuppressExtractedTextChunks"}],
		"interceptors": [{"name": "ProgressPlugin", "context": true}],
		"_x": [null]
	},
	"chunkHash": {"_args": ["chunk", "chunkHash"], "taps": [], "interceptors": [], "_x": []},
	"moduleAsset": {"_args": ["module", "filename"], "taps": [], "interceptors": [], "_x": []},
	"chunkAsset": {"_args": ["chunk", "filename"], "taps": [], "interceptors": [], "_x": []},
	"assetPath": {"_args": ["filename", "data"], "taps": [], "interceptors": []},
	"needAdditionalPass": {"_args": [], "taps": [], "interceptors": []},
	"childCompiler": {
		"_args": ["childCompiler", "compilerName", "compilerIndex"],
		"taps": [],
		"interceptors": [],
		"_x": []
	},
	"normalModuleLoader": {
		"_args": ["loaderContext", "module"],
		"taps": [{"type": "sync", "name": "mini-css-extract-plugin"}, {
			"type": "sync",
			"name": "LoaderTargetPlugin"
		}, {"type": "sync", "name": "LoaderPlugin"}],
		"interceptors": [],
		"_x": [null, null, null]
	},
	"optimizeExtractedChunksBasic": {
		"_args": ["chunks"],
		"taps": [{"type": "sync", "name": "EnsureChunkConditionsPlugin"}, {
			"type": "sync",
			"name": "RemoveParentModulesPlugin"
		}, {"type": "sync", "name": "RemoveEmptyChunksPlugin"}],
		"interceptors": []
	},
	"optimizeExtractedChunks": {"_args": ["chunks"], "taps": [], "interceptors": []},
	"optimizeExtractedChunksAdvanced": {
		"_args": ["chunks"],
		"taps": [{"type": "sync", "name": "RemoveEmptyChunksPlugin"}],
		"interceptors": []
	},
	"afterOptimizeExtractedChunks": {"_args": ["chunks"], "taps": [], "interceptors": []}
};
