import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Animated,
  Dimensions,
} from 'react-native';

interface AppProps {
  userID?: string;
  token?: string;
}

const {width} = Dimensions.get('window');

const App: React.FC<AppProps> = ({userID = '12345678', token = 'secretToken'}) => {
  const [counter, setCounter] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  // 动画值
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);
  const scaleAnim = new Animated.Value(0.8);

  useEffect(() => {
    // 启动动画
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleButtonPress = () => {
    setCounter(prev => prev + 1);
    Alert.alert('🎉 点击成功', `计数器: ${counter + 1}`);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('🔄 刷新完成', '页面已更新！');
    }, 1500);
  };

  const formatToken = (token: string) => {
    if (token.length > 20) {
      return token.substring(0, 10) + '...' + token.substring(token.length - 10);
    }
    return token;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
      
      {/* 渐变背景效果 */}
      <View style={styles.gradientBackground}>
        <View style={styles.gradientOverlay} />
      </View>
      
      <Animated.View 
        style={[
          styles.header,
          {
            opacity: fadeAnim,
            transform: [{translateY: slideAnim}]
          }
        ]}
      >
        <View style={styles.headerLeft}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>BM</Text>
          </View>
          <Text style={styles.headerTitle}>BM-ReactNative</Text>
        </View>
        <TouchableOpacity style={styles.headerButton} onPress={handleRefresh}>
          <Text style={styles.headerButtonText}>
            {isLoading ? '🔄' : '⚙️'}
          </Text>
        </TouchableOpacity>
      </Animated.View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Animated.View 
          style={[
            styles.welcomeCard,
            {
              opacity: fadeAnim,
              transform: [{scale: scaleAnim}]
            }
          ]}
        >
          <Text style={styles.welcomeTitle}>🚀 欢迎使用 BM-ReactNative</Text>
          <Text style={styles.welcomeSubtitle}>
            这是一个集成在 Android 应用中的 React Native 页面
          </Text>
          <View style={styles.welcomeDecoration}>
            <Text style={styles.decorationText}>✨</Text>
          </View>
        </Animated.View>
        
        <Animated.View 
          style={[
            styles.card,
            {
              opacity: fadeAnim,
              transform: [{translateY: slideAnim}]
            }
          ]}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardIcon}>👤</Text>
            <Text style={styles.cardTitle}>用户信息</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>用户ID:</Text>
            <Text style={styles.infoValue}>{userID}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Token:</Text>
            <Text style={styles.infoValue}>{formatToken(token)}</Text>
          </View>
        </Animated.View>

        <Animated.View 
          style={[
            styles.card,
            {
              opacity: fadeAnim,
              transform: [{translateY: slideAnim}]
            }
          ]}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardIcon}>🎯</Text>
            <Text style={styles.cardTitle}>交互测试</Text>
          </View>
          <View style={styles.counterContainer}>
            <Text style={styles.counterLabel}>点击次数:</Text>
            <Text style={styles.counterValue}>{counter}</Text>
          </View>
          <TouchableOpacity 
            style={[styles.primaryButton, counter > 0 && styles.primaryButtonActive]} 
            onPress={handleButtonPress}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>
              {counter === 0 ? '🎯 开始点击' : `🎯 继续点击 (${counter})`}
            </Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View 
          style={[
            styles.card,
            {
              opacity: fadeAnim,
              transform: [{translateY: slideAnim}]
            }
          ]}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardIcon}>⭐</Text>
            <Text style={styles.cardTitle}>功能特性</Text>
          </View>
          <View style={styles.featuresGrid}>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>✅</Text>
              <Text style={styles.featureText}>原生集成</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>✅</Text>
              <Text style={styles.featureText}>组件化</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>✅</Text>
              <Text style={styles.featureText}>离线加载</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>✅</Text>
              <Text style={styles.featureText}>数据传递</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>✅</Text>
              <Text style={styles.featureText}>响应式UI</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>✅</Text>
              <Text style={styles.featureText}>动画效果</Text>
            </View>
          </View>
        </Animated.View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Made with ❤️ by React Native</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  gradientBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#16213e',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: '#0f3460',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e94560',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    shadowColor: '#e94560',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  headerButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  headerButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  welcomeCard: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 20,
    padding: 25,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 8,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    lineHeight: 22,
  },
  welcomeDecoration: {
    marginTop: 15,
  },
  decorationText: {
    fontSize: 32,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a2e',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    fontSize: 16,
    color: '#6c757d',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 16,
    color: '#1a1a2e',
    fontWeight: '600',
    fontFamily: 'monospace',
  },
  counterContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  counterLabel: {
    fontSize: 16,
    color: '#6c757d',
    marginBottom: 8,
  },
  counterValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#e94560',
  },
  primaryButton: {
    backgroundColor: '#e94560',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    alignSelf: 'center',
    shadowColor: '#e94560',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  primaryButtonActive: {
    backgroundColor: '#d63384',
    transform: [{scale: 1.05}],
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureItem: {
    width: (width - 80) / 2,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 8,
  },
  featureIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#6c757d',
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    fontStyle: 'italic',
  },
});

export default App;
