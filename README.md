# React Native 模块接入文档

## 📱 项目概述

这是一个集成在 BM Android 应用中的 React Native 模块，提供了跨平台的用户界面和交互功能。

### 技术栈
- **React Native**: 0.72.6
- **React**: 18.2.0
- **TypeScript**: 4.8.4
- **Metro**: 0.72.11
- **Hermes**: 0.75.5

## 🏗️ 项目结构

```
android-react-native/
├── App.tsx                 # 主应用组件
├── index.js                # React Native 入口点
├── package.json            # 项目依赖配置
├── metro.config.js         # Metro 打包器配置
├── babel.config.js         # Babel 转译配置
├── .watchmanconfig         # Watchman 配置
├── scripts/                 # 开发和调试脚本
│   ├── build-bundle.sh     # Bundle 构建脚本
│   ├── start-debug.sh      # 调试模式启动脚本
├── node_modules/           # Node.js 依赖
└── README.md               # 本文档
```

## 🚀 快速开始

### 1. 环境要求

- **Node.js**: 18.x 或更高版本
- **npm**: 9.x 或更高版本
- **Android Studio**: 最新版本
- **Android SDK**: API 33 或更高版本
- **Java**: JDK 11 或更高版本

### 2. 安装依赖

```bash
cd android-react-native
npm install
```

### 3. 启动开发服务器

```bash
# 启动 Metro bundler
npm start

# 或者使用 yarn
yarn start

# 或者使用提供的脚本
./scripts/start-debug.sh
```

### 4. 使用开发脚本

项目提供了多个便捷的开发脚本，位于 `scripts/` 目录：

```bash
# 构建 Bundle（支持多种模式）
./scripts/build-bundle.sh

# 开始metro服务 debug调试
./scripts/start-debug.sh
```

详细说明请参考 [scripts/README.md](scripts/README.md)

## 🔧 开发配置

### Metro 配置

Metro 是 React Native 的 JavaScript 打包器，配置文件位于 `metro.config.js`：

```javascript
const {getDefaultConfig} = require('@react-native/metro-config');
module.exports = getDefaultConfig(__dirname);
```

### Babel 配置

Babel 配置用于转译 JavaScript/TypeScript 代码，配置文件位于 `babel.config.js`：

```javascript
module.exports = {
  presets: ["module:@react-native/babel-preset"],
};
```

### TypeScript 配置

项目使用 TypeScript 进行类型检查，配置继承自 `@tsconfig/react-native`。

## 📱 Android 集成

### 1. 主应用配置

在 `app/build.gradle` 中已配置 React Native 依赖：

```gradle
// React Native 核心与 Hermes
implementation("com.facebook.react:react-android:0.75.5")
implementation("com.facebook.react:hermes-android:0.75.5")
```

### 2. 应用初始化

在 `MyApplication.java` 中配置了 React Native 宿主：

```java
public class MyApplication extends CommonApplication implements ReactApplication {
    private final ReactNativeHost reactNativeHost = new ReactNativeHost(this) {
        @Override
        public String getJSMainModuleName() {
            return "index";
        }

        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected String getBundleAssetName() {
            return "index.android.bundle";
        }

        @Override
        public List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                new MainReactPackage()
            );
        }
    };
}
```

### 3. Activity 配置

在 `RNActivity.kt` 中配置了 React Native 容器：

```kotlin
class RNActivity : ReactActivity() {
    override fun getMainComponentName(): String = "HelloWorld"

    override fun createReactActivityDelegate(): ReactActivityDelegate {
        return object : ReactActivityDelegate(this, mainComponentName) {
            override fun getLaunchOptions(): Bundle = Bundle().apply {
                putString("userID", "12345678")
                putString("token", "secretToken")
            }
        }
    }
}
```

### 4. 网络安全配置

在 `app/src/main/res/xml/network_security_config.xml` 中配置了调试网络访问：

```xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <debug-overrides>
        <trust-anchors>
            <certificates src="system" />
            <certificates src="user" />
        </trust-anchors>
    </debug-overrides>
    
    <!-- React Native 调试网络配置 -->
    <domain-config cleartextTrafficPermitted="true">
        <domain includeSubdomains="true">localhost</domain>
        <domain includeSubdomains="true">10.0.2.2</domain>
        <domain includeSubdomains="true">192.168.31.53</domain>
        <!-- 添加你的开发机器 IP 地址 -->
        <domain includeSubdomains="true">YOUR_DEV_MACHINE_IP</domain>
    </domain-config>
</network-security-config>
```

## 🐛 调试配置

### 1. 启用开发者支持

确保在 `MyApplication.java` 中 `getUseDeveloperSupport()` 返回 `true`：

```java
@Override
public boolean getUseDeveloperSupport() {
    return BuildConfig.DEBUG; // 开发时启用开发者支持
}
```

### 2. 网络配置

为了启用在线调试，需要在 `network_security_config.xml` 中添加你的开发机器 IP 地址：

1. 找到你的开发机器 IP 地址：
   ```bash
   # macOS/Linux
   ifconfig | grep "inet " | grep -v 127.0.0.1
   
   # Windows
   ipconfig
   ```

2. 在 `network_security_config.xml` 中添加你的 IP：
   ```xml
   <domain includeSubdomains="true">YOUR_DEV_MACHINE_IP</domain>
   ```

### 3. 启动调试

1. 启动 Metro bundler：
   ```bash
   npm start
   ```

2. 在 Android 设备上摇动设备或按command+m，选择 "Debug JS Remotely"

3. 在浏览器中打开 `http://localhost:8081/debugger-ui/`

## 📦 构建配置

### 1. 构建 Bundle

使用提供的构建脚本生成离线 Bundle：

```bash
# 构建生产环境 Bundle
npm run bundle

# 或者手动执行
npx react-native bundle \
  --platform android \
  --dev false \
  --entry-file index.js \
  --bundle-output ../android/app/src/main/assets/index.android.bundle \
  --assets-dest ../android/app/src/main/res/
```

### 2. 构建脚本

项目包含以下构建脚本：

- `build-bundle.sh`: 构建生产环境 Bundle
- `build-debug-bundle.sh`: 构建调试环境 Bundle

## 🔄 开发工作流

### 1. 开发模式

```bash
# 1. 启动 Metro bundler
npm start

# 2. 在另一个终端构建调试 Bundle
npm run bundle:debug

# 3. 在 Android Studio 中运行应用
```

### 2. 生产模式

```bash
# 1. 构建生产 Bundle
npm run bundle

# 2. 在 Android Studio 中构建 Release APK
```

### 3. 热重载

在开发模式下，修改 JavaScript 代码后会自动热重载，无需重新构建应用。

## 📱 组件使用

### 主组件

`App.tsx` 是主要的 React Native 组件，包含：

- 用户信息显示
- 交互测试功能
- 功能特性展示
- 动画效果

### 组件注册

在 `index.js` 中注册组件：

```javascript
import {AppRegistry} from "react-native";
import App from "./App";

AppRegistry.registerComponent("HelloWorld", () => App);
```

## 🚨 常见问题

### 1. 无法连接调试服务器

**问题**: 应用无法连接到 Metro bundler 进行调试

**解决方案**:
1. 检查 `network_security_config.xml` 中的 IP 配置
2. 确保开发机器和设备在同一网络
3. 检查防火墙设置

### 2. Bundle 加载失败

**问题**: 应用无法加载 JavaScript Bundle

**解决方案**:
1. 检查 `index.android.bundle` 文件是否存在
2. 验证 Bundle 构建是否成功
3. 检查 Bundle 文件路径配置

### 3. 版本兼容性问题

**问题**: React Native 版本与 Android 依赖不兼容

**解决方案**:
1. 确保 `package.json` 中的版本与 `build.gradle` 一致
2. 检查 React Native 版本兼容性矩阵
3. 更新相关依赖版本

## 📚 参考资源

- [React Native 官方文档](https://reactnative.dev/)
- [Metro 打包器文档](https://facebook.github.io/metro/)
- [React Native 调试指南](https://reactnative.dev/docs/debugging)
- [Android 网络安全配置](https://developer.android.com/training/articles/security-config)

