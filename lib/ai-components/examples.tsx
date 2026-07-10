/**
 * @fileoverview AI组件系统快速开始示例
 * @description 展示如何在5分钟内集成AI组件系统
 * @author YYC³
 * @created 2025-12-28
 */

// ============================================
// 示例 1: 最简单的集成 (3行代码)
// ============================================

import { AIComponentsIntegration, ComponentEventBus, useAIComponents, useAIComponentEvent, useAIComponentPublish } from './index';

// 创建并自动启动
async function simpleIntegrationExample() {
  const aiComponents = new AIComponentsIntegration({
    autoStart: true
  });

  await aiComponents.initialize();
  // ✅ 完成！所有8大组件已就绪
  return aiComponents;
}


// ============================================
// 示例 2: 按需启用组件
// 创建并自动启动
async function selectiveComponentsExample() {
  const aiComponents = new AIComponentsIntegration({
    enabledComponents: {
      chatInterface: true,      // ✅ 启用
      toolboxPanel: true,       // ✅ 启用
      contextManager: true,     // ✅ 启用
      insightsDashboard: false, // ❌ 不启用
      workflowDesigner: false,  // ❌ 不启用
      knowledgeBase: false,     // ❌ 不启用
      aiActionsManager: false,  // ❌ 不启用
      streamProcessor: false    // ❌ 不启用
    },
    autoStart: true
  });

  await aiComponents.initialize();
  // ✅ 仅启用的组件会被初始化
  return aiComponents;
}


// ============================================  
// 示例 3: React组件集成  
// ============================================

'use client';

import React, { useState, useEffect } from 'react';
// useAIComponents已经在第12行导入过，这里不再重复导入

export function MyChatComponent() {
  const { 
    initialized, 
    chatInterface, 
    error 
  } = useAIComponents({
    enabledComponents: {
      chatInterface: true,
      contextManager: true
    }
  });

  // 加载状态
  if (!initialized) {
    return <div>初始化AI系统...</div>;
  }

  // 错误处理
  if (error) {
    return <div>错误: {error.message}</div>;
  }

  // 使用组件
  const sendMessage = async () => {
    if (chatInterface) {
      await chatInterface.sendMessage({
        id: `msg_${Date.now()}`,
        sessionId: 'default',
        content: '你好，AI助手！',
        type: 'text',
        senderId: 'user_123',
        senderRole: 'user',
        status: 'sending',
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
  };

  return (
    <div>
      <button onClick={sendMessage}>
        发送消息
      </button>
    </div>
  );
}


// ============================================  
// 示例 4: 事件监听  
// ============================================

export function EventListenerExample() {
  const { chatInterface } = useAIComponents({
    enabledComponents: { chatInterface: true }
  });

  // 监听消息发送事件
  useAIComponentEvent('chat', 'message_sent', (event) => {
    console.log('✅ 消息已发送:', event.data);
  });

  // 监听消息接收事件
  useAIComponentEvent('chat', 'message_received', (event) => {
    console.log('📨 收到回复:', event.data);
  });

  return <div>事件监听示例</div>;
}


// ============================================  
// 示例 5: 发布自定义事件  
// ============================================

export function CustomEventExample() {
  const publishEvent = useAIComponentPublish('custom');

  const handleUserAction = () => {
    // 发布自定义事件
    publishEvent('user_clicked', {
      buttonId: 'submit',
      timestamp: Date.now()
    });
  };

  return (
    <button onClick={handleUserAction}>
      触发事件
    </button>
  );
}


// ============================================  
// 示例 6: 健康检查  
// ============================================

export function HealthCheckExample() {
  const { healthCheck } = useAIComponents();
  const [health, setHealth] = useState<{ 
    healthy: boolean; 
    components: Array<{ 
      id: string; 
      name: string; 
      status: 'idle' | 'initializing' | 'ready' | 'running' | 'paused' | 'stopped' | 'error' | 'destroyed'; 
      healthy: boolean; 
    }> 
  } | null>(null);

  useEffect(() => {
    const checkHealth = async () => {
      const result = await healthCheck();
      setHealth(result);
    };

    // 每30秒检查一次
    const interval = setInterval(checkHealth, 30000);
    checkHealth();

    return () => clearInterval(interval);
  }, [healthCheck]);

  return (
    <div>
      <h3>系统健康状态</h3>
      {health?.healthy ? '✅ 健康' : '⚠️ 异常'}
      <ul>
        {health?.components.map(comp => (
          <li key={comp.id}>
            {comp.name}: {comp.status}
          </li>
        ))}
      </ul>
    </div>
  );
}


// ============================================  
// 示例 7: 手动控制启动/停止  
// ============================================

export function ManualControlExample() {
  const { 
    started,
    start, 
    stop 
  } = useAIComponents({
    autoStart: false  // 不自动启动
  });

  return (
    <div>
      <p>状态: {started ? '运行中' : '已停止'}</p>
      <button onClick={start}>启动</button>
      <button onClick={stop}>停止</button>
    </div>
  );
}


// ============================================  
// 示例 8: 访问所有组件  
// ============================================

export function AllComponentsExample() {
  const {
    chatInterface,
    toolboxPanel,
    insightsDashboard,
    workflowDesigner,
    knowledgeBase,
    aiActionsManager,
    streamProcessor,
    contextManager
  } = useAIComponents({
    enabledComponents: {
      chatInterface: true,
      toolboxPanel: true,
      insightsDashboard: true,
      workflowDesigner: true,
      knowledgeBase: true,
      aiActionsManager: true,
      streamProcessor: true,
      contextManager: true
    }
  });

  return (
    <div>
      <h3>所有组件状态</h3>
      <ul>
        <li>ChatInterface: {chatInterface ? '✅' : '❌'}</li>
        <li>ToolboxPanel: {toolboxPanel ? '✅' : '❌'}</li>
        <li>InsightsDashboard: {insightsDashboard ? '✅' : '❌'}</li>
        <li>WorkflowDesigner: {workflowDesigner ? '✅' : '❌'}</li>
        <li>KnowledgeBase: {knowledgeBase ? '✅' : '❌'}</li>
        <li>AIActionsManager: {aiActionsManager ? '✅' : '❌'}</li>
        <li>StreamProcessor: {streamProcessor ? '✅' : '❌'}</li>
        <li>ContextManager: {contextManager ? '✅' : '❌'}</li>
      </ul>
    </div>
  );
}


// ============================================  
// 示例 9: 请求-响应通信  
// ============================================

// 组件A: 发起请求
async function requestData() {
  const eventBus = ComponentEventBus.getInstance();
  
  try {
    const result = await eventBus.request('toolbox', {
      type: 'execute_tool',
      source: 'MyComponent',
      data: {
        toolId: 'data-analyzer',
        params: { dataset: 'users' }
      }
    }, 5000); // 5秒超时

    console.log('✅ 收到响应:', result);
    return result;

  } catch (error) {
    console.error('❌ 请求失败:', error);
    throw error;
  }
}

// 组件B: 处理请求
function setupRequestHandler() {
  const eventBus = ComponentEventBus.getInstance();

  eventBus.subscribe('toolbox', async (event) => {
    if (event.type === 'execute_tool') {
      try {
        // 定义executeTool函数（箭头函数避免 no-inner-declarations）
        const executeTool = async (data: any): Promise<any> => {
          // 这里应该是实际的工具执行逻辑
          return {
            success: true,
            data: {
              toolId: data.toolId,
              result: `执行了工具 ${data.toolId}，参数: ${JSON.stringify(data.params)}`
            }
          };
        };

        // 执行工具
        const result = await executeTool(event.data);

        // 返回响应
        eventBus.respond(event, result);

      } catch (error) {
        // 返回错误
        eventBus.respondError(event, error instanceof Error ? error : String(error));
      }
    }
  });
}


// ============================================
// 示例 10: 完整应用示例  
// ============================================

export function CompleteExample() {
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [input, setInput] = useState('');

  const { 
    initialized,
    chatInterface,
    contextManager 
  } = useAIComponents({
    enabledComponents: {
      chatInterface: true,
      contextManager: true
    },
    autoStart: true
  });

  // 监听AI回复
  useAIComponentEvent('chat', 'message_received', (event) => {
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: event.data.content
    }]);
  });

  // 发送消息
  const sendMessage = async () => {
    if (!input.trim() || !chatInterface) return;

    // 添加用户消息到UI
    setMessages(prev => [...prev, {
      role: 'user',
      content: input
    }]);

    // 发送到AI
    await chatInterface.sendMessage({
      id: `msg_${Date.now()}`,
      sessionId: 'default',
      content: input,
      type: 'text',
      senderId: 'user_123',
      senderRole: 'user',
      status: 'sending',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    setInput('');
  };

  // 加载状态
  if (!initialized) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>初始化AI系统...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">AI助手</h1>
      
      {/* 消息列表 */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-2">
        {messages.map((msg, idx) => (
          <div 
            key={idx}
            className={`p-3 rounded-lg ${
              msg.role === 'user' 
                ? 'bg-blue-100 ml-auto max-w-[80%]' 
                : 'bg-gray-100 mr-auto max-w-[80%]'
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      {/* 输入框 */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="输入消息..."
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim()}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          发送
        </button>
      </div>
    </div>
  );
}


// ============================================
// 快速开始总结
// ============================================

/*

🎯 5分钟快速开始步骤:

1️⃣ 导入组件系统
   import { useAIComponents } from '@/lib/ai-components';

2️⃣ 在组件中使用Hook
   const { chatInterface } = useAIComponents({
     enabledComponents: { chatInterface: true }
   });

3️⃣ 调用AI功能
   await chatInterface.sendMessage({ content: 'Hello' });

✅ 完成！

📚 更多示例请参考:
- README.md - 完整使用文档
- 实施报告 - 技术架构说明
- 设计文档 - 组件详细设计

🚀 开始构建你的AI应用吧！

*/
