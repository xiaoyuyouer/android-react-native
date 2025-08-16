#!/bin/bash

# React Native Bundle 构建脚本
# 用于构建离线 bundle 并放置到 Android 项目的正确位置
# 脚本会自动切换到 react-native-module 目录执行

echo "🚀 React Native Bundle 构建脚本"
echo "请选择构建模式："
echo "1) 生产模式 (--dev false) - 优化后的bundle，适合发布版本"
echo "2) 调试模式 (--dev true) - 包含调试信息的bundle，适合开发调试"

read -p "请输入选择 (1/2): " choice

case $choice in
  1)
    DEV_MODE="false"
    BUNDLE_NAME="index.android.bundle"
    echo "📦 选择: 生产模式"
    ;;
  2)
    DEV_MODE="true"
    BUNDLE_NAME="index.android.bundle"
    echo "🐛 选择: 调试模式"
    ;;
  *)
    echo "❌ 无效选择，默认使用生产模式"
    DEV_MODE="false"
    BUNDLE_NAME="index.android.bundle"
    ;;
esac

# 自动切换到 react-native-module 目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REACT_NATIVE_DIR="$(dirname "$SCRIPT_DIR")"

echo "📁 脚本目录: $SCRIPT_DIR"
echo "📁 React Native 模块目录: $REACT_NATIVE_DIR"

# 检查 react-native-module 目录是否存在
if [ ! -f "$REACT_NATIVE_DIR/package.json" ]; then
    echo "❌ 错误：找不到 react-native-module 目录或 package.json 文件"
    exit 1
fi

# 切换到 react-native-module 目录
cd "$REACT_NATIVE_DIR"
echo "✅ 已切换到: $(pwd)"

# 创建 assets 目录（如果不存在）
mkdir -p ../app/src/main/assets

# 构建 bundle
echo "🔨 构建 Android bundle..."
echo "📱 平台: Android"
echo "🐛 调试模式: $DEV_MODE"
echo "📁 输出文件: $BUNDLE_NAME"

npx react-native bundle \
    --platform android \
    --dev $DEV_MODE \
    --entry-file index.js \
    --bundle-output ../app/src/main/assets/$BUNDLE_NAME \
    --assets-dest ../app/src/main/res/

if [ $? -eq 0 ]; then
    echo "✅ Bundle 构建成功！"
    echo "📁 输出位置: ../app/src/main/assets/$BUNDLE_NAME"
    
    if [ "$DEV_MODE" = "true" ]; then
        echo "🐛 调试模式已启用！"
        echo "💡 提示: 在Android设备上摇动设备或按菜单键可以打开开发者菜单"
        echo "🔧 可以启用热重载、调试器、性能监控等功能"
    else
        echo "📦 生产模式已启用！"
        echo "💡 提示: 这是优化后的bundle，适合发布版本"
    fi
    
    echo "🎯 现在可以重新构建 Android 应用了"
else
    echo "❌ Bundle 构建失败"
    exit 1
fi
