<template>
    <div class="entrepreneur-mentor-app">
        <!-- 左侧导航栏 -->
        <aside class="sidebar">
            <div class="sidebar-header">
                <div class="brand">
                    <div class="brand-icon">🚀</div>
                    <h1 class="brand-title">创业导师</h1>
                </div>
            </div>
            <nav class="sidebar-nav">
                <div class="nav-item active">
                    <span class="nav-icon">💬</span>
                    <span class="nav-text">智能咨询</span>
                </div>
                <div class="nav-item">
                    <span class="nav-icon">📊</span>
                    <span class="nav-text">市场分析</span>
                </div>
                <div class="nav-item">
                    <span class="nav-icon">💰</span>
                    <span class="nav-text">融资指导</span>
                </div>
                <div class="nav-item">
                    <span class="nav-icon">📈</span>
                    <span class="nav-text">商业计划</span>
                </div>
            </nav>
        </aside>
        
        <!-- 主内容区域 -->
        <main class="main-content">
            <!-- 顶部栏 -->
            <header class="top-bar">
                <div class="welcome-section">
                    <CommonHeader/>
                </div>
                <div class="quick-actions">
                    <button class="action-btn">📝 新建对话</button>
                    <button class="action-btn">📋 历史记录</button>
                </div>
            </header>
            
            <!-- 聊天区域 -->
            <section class="chat-container">
                <div class="chat-messages">
                    <ClientChat @send="onSendQuestion" />
                </div>
            </section>
            
            <!-- 输入区域 -->
            <footer class="input-section">
                <QuestionInput @send="onSendQuestion" />
            </footer>
        </main>
        
        <!-- 右侧信息面板 -->
        <aside class="info-panel">
            <div class="panel-header">
                <h3>💡 创业提示</h3>
            </div>
            <div class="panel-content">
                <div class="tip-card">
                    <h4>📋 今日建议</h4>
                    <p>制定详细的商业计划是创业成功的第一步</p>
                </div>
                <div class="tip-card">
                    <h4>🎯 热门话题</h4>
                    <p>• 市场调研方法<br>• 团队组建策略<br>• 资金筹集技巧</p>
                </div>
                <div class="tip-card">
                    <h4>📈 趋势分析</h4>
                    <p>AI和数字化转型是当前创业热点领域</p>
                </div>
            </div>
        </aside>
    </div>
</template>

<script>
import './utils/sse';
import './utils/ClientData';
import CommonHeader from './components/common-header';
import ClientChat from './components/client-chat';
import QuestionInput from './components/question-input';
import { MESSAGE_TYPE, ACCESS_TYPE } from '@/constants';

export default {
    name: 'ChatDemo',
    components: {
        CommonHeader,
        ClientChat,
        QuestionInput
    },
    data () {
        return {
            chatMainMrgBottom: 140
        };
    },
    mounted () {
        console.log('【init message connect type------>】', ACCESS_TYPE);
        // 初始化数据
        if (ACCESS_TYPE === 'ws') {
            this.$clientData.init();
        } else {
            this.$SseCls.init();
        }
    },
    created () {
        // 监听用户端ws事件
        this.listenClientEvent();
    },
    methods: {
        // 监听用户端ws事件
        listenClientEvent () {
            // 监听配置信息，获取机器人和问答库可用状态
            this.$eventHub.$on('client_configChange', (res) => {
                this.isAvailable = res.is_available; // 机器人与问答库是否可用，不可用则页面展示”维护中“状态
            });
            // 监听历史记录拉取成功事件
            this.$eventHub.$on('client_msgContentChange', (res) => {
                const { chatsContent, type } = res;
                if (type === MESSAGE_TYPE.ANSWER && chatsContent.length > 0) {
                    // 主动推送记录数目录数 > 0，则隐藏欢迎页，进入绘会话页，并展示拉取的历史记录
                    this.isWeclome = false;
                }
                if (type === MESSAGE_TYPE.HISTORY && chatsContent.length > 0) {
                    // 历史记录数 > 0，则隐藏欢迎页，进入绘会话页，并展示拉取的历史记录
                    this.isWeclome = false;
                }
            });
        },
        // 发送问题上行消息
        onSendQuestion (question) {
            console.log('onSendQuestion', question);
            if (ACCESS_TYPE === 'ws') {
                this.$clientData.triggerSendMsg(question);
            } else {
                this.$SseCls.sseSendMsg(question);
            }
        }
    }
};
</script>

<style lang="less">
.entrepreneur-mentor-app {
  display: grid;
  grid-template-columns: 280px 1fr 320px;
  height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
  color: #f1f5f9;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  overflow: hidden;
}

// 左侧边栏样式
.sidebar {
  background: linear-gradient(180deg, #1e3a8a 0%, #1e40af 100%);
  border-right: 1px solid rgba(59, 130, 246, 0.1);
  display: flex;
  flex-direction: column;
  
  .sidebar-header {
    padding: 24px 20px;
    border-bottom: 1px solid rgba(59, 130, 246, 0.1);
    
    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
      
      .brand-icon {
        font-size: 32px;
        filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
        animation: pulse 3s ease-in-out infinite;
      }
      
      .brand-title {
        font-size: 20px;
        font-weight: 700;
        margin: 0;
        background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
    }
  }
  
  .sidebar-nav {
    padding: 20px 0;
    
    .nav-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px 20px;
      cursor: pointer;
      transition: all 0.3s ease;
      margin: 2px 12px;
      border-radius: 12px;
      
      .nav-icon {
        font-size: 18px;
        width: 24px;
        text-align: center;
      }
      
      .nav-text {
        font-size: 14px;
        font-weight: 500;
      }
      
      &:hover {
        background: rgba(59, 130, 246, 0.2);
        transform: translateX(4px);
      }
      
      &.active {
        background: rgba(59, 130, 246, 0.3);
        border: 1px solid rgba(59, 130, 246, 0.4);
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
      }
    }
  }
}

// 主内容区样式
.main-content {
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(147, 197, 253, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(191, 219, 254, 0.05) 0%, transparent 50%);
    pointer-events: none;
  }
  
  .top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 30px;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(148, 163, 184, 0.2);
    z-index: 10;
    
    .welcome-section {
      flex: 1;
    }
    
    .quick-actions {
      display: flex;
      gap: 12px;
      
      .action-btn {
        padding: 8px 16px;
        background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 12px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
        
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }
      }
    }
  }
  
  .chat-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    
    .chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 20px;
    }
  }
  
  .input-section {
    padding: 20px 30px 30px;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border-top: 1px solid rgba(148, 163, 184, 0.2);
  }
}

// 右侧信息面板
.info-panel {
  background: linear-gradient(180deg, #1e40af 0%, #1e3a8a 100%);
  border-left: 1px solid rgba(59, 130, 246, 0.1);
  display: flex;
  flex-direction: column;
  
  .panel-header {
    padding: 24px 20px;
    border-bottom: 1px solid rgba(59, 130, 246, 0.1);
    
    h3 {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
      color: #f1f5f9;
    }
  }
  
  .panel-content {
    padding: 20px;
    flex: 1;
    overflow-y: auto;
    
    .tip-card {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(59, 130, 246, 0.2);
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 16px;
      backdrop-filter: blur(10px);
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(59, 130, 246, 0.15);
        border-color: rgba(59, 130, 246, 0.3);
      }
      
      h4 {
        margin: 0 0 8px 0;
        font-size: 14px;
        font-weight: 600;
        color: #e2e8f0;
      }
      
      p {
        margin: 0;
        font-size: 12px;
        line-height: 1.5;
        color: #cbd5e1;
      }
    }
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// 响应式设计
@media (max-width: 1200px) {
  .entrepreneur-mentor-app {
    grid-template-columns: 260px 1fr 280px;
  }
}

@media (max-width: 968px) {
  .entrepreneur-mentor-app {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
  }
  
  .sidebar, .info-panel {
    display: none;
  }
  
  .main-content {
    .top-bar {
      padding: 15px 20px;
    }
  }
}
</style>
