#!/bin/bash

# React Native 调试模式启动脚本
# 用于启动 Metro 服务器，支持热重载和调试
# 脚本会自动切换到 react-native-module 目录执行

echo "🔥 启动 React Native 调试模式..."
echo "📱 这将启动 Metro 服务器，支持："
echo "   - 热重载 (Hot Reload)"
echo "   - 实时调试"
echo "   - 性能监控"
echo "   - 错误边界"
echo ""

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

# 检查端口是否被占用
PORT=8081
if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  端口 $PORT 已被占用，正在尝试关闭..."
    lsof -ti:$PORT | xargs kill -9
    sleep 2
fi

echo "🚀 启动 Metro 服务器..."
echo "📡 服务器地址: http://localhost:$PORT"
echo "💡 在Android设备上摇动设备或按 command+m 打开开发者菜单"
echo "🔧 选择 'Dev Settings' -> 'Debug server host & port for device'"
# 获取本机IP地址（兼容 macOS 和 Linux）
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    LOCAL_IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | head -1)
else
    # Linux
    LOCAL_IP=$(hostname -I | awk '{print $1}')
fi

echo "🌐 输入: $LOCAL_IP:$PORT"
echo ""
echo "按 Ctrl+C 停止服务器"
echo ""

# 启动 Metro 服务器
npx react-native start --port $PORT
