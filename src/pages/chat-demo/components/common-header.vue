<template>
    <div class="mentor-header">
        <div class="header-content">
            <div class="mentor-info">
                <div class="mentor-avatar">
                    <img v-if="robotAvatar" :src="robotAvatar" alt="创业导师" />
                    <div v-else class="default-avatar">🧑‍💼</div>
                </div>
                <div class="mentor-details">
                    <h2 class="mentor-name">{{ robotName || '创业导师 AI' }}</h2>
                    <p class="mentor-status">
                        <span class="status-indicator"></span>
                        在线中，随时为您提供专业指导
                    </p>
                </div>
            </div>
            <div class="header-stats">
                <div class="stat-item">
                    <div class="stat-number">1,247</div>
                    <div class="stat-label">成功案例</div>
                </div>
                <div class="stat-divider"></div>
                <div class="stat-item">
                    <div class="stat-number">4.9</div>
                    <div class="stat-label">专业评分</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CommonHeader',
    components: {
    },
    props: {
    },
    data () {
        return {
            robotName: '',
            robotAvatar: ''
        };
    },
    created () {
        // 监听配置信息，获取机器人名称
        this.$eventHub.$on('client_configChange', (res) => {
            this.robotName = res.name;
            this.robotAvatar = res.avatar;
        });
    },
    methods: {
    }
};
</script>

<style lang="less">
.mentor-header {
  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .mentor-info {
      display: flex;
      align-items: center;
      gap: 16px;
      
      .mentor-avatar {
        width: 48px;
        height: 48px;
        border-radius: 12px;
        overflow: hidden;
        background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .default-avatar {
          font-size: 24px;
          color: white;
        }
      }
      
      .mentor-details {
        .mentor-name {
          margin: 0;
          font-size: 20px;
          font-weight: 700;
          color: #1e293b;
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .mentor-status {
          margin: 4px 0 0 0;
          font-size: 13px;
          color: #64748b;
          display: flex;
          align-items: center;
          gap: 6px;
          
          .status-indicator {
            width: 8px;
            height: 8px;
            background: #22c55e;
            border-radius: 50%;
            animation: pulse 2s ease-in-out infinite;
            box-shadow: 0 0 6px rgba(34, 197, 94, 0.6);
          }
        }
      }
    }
    
    .header-stats {
      display: flex;
      align-items: center;
      gap: 20px;
      
      .stat-item {
        text-align: center;
        
        .stat-number {
          font-size: 20px;
          font-weight: 700;
          color: #1e40af;
          line-height: 1;
        }
        
        .stat-label {
          font-size: 11px;
          color: #64748b;
          margin-top: 2px;
          font-weight: 500;
        }
      }
      
      .stat-divider {
        width: 1px;
        height: 32px;
        background: linear-gradient(180deg, transparent 0%, #cbd5e1 50%, transparent 100%);
      }
    }
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.1);
  }
}
</style>
