import React, { ReactNode, ErrorInfo } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

/**
 * 全局错误边界组件
 * 用于捕获和处理React组件树中的JavaScript错误
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // 更新状态，使下一次渲染显示降级UI
    return {
      hasError: true,
      error,
      errorInfo: null,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // 记录错误信息
    console.error('Error caught by ErrorBoundary:', error, errorInfo)
    // 在实际应用中，可以将错误发送到错误跟踪服务
    // 例如：reportErrorToSentry(error, errorInfo)
    this.setState({ errorInfo })
  }

  // 重置错误状态的方法
  resetError = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
  }

  render() {
    const { hasError } = this.state
    const { fallback } = this.props

    if (hasError) {
      // 提供自定义的错误UI
      if (fallback) {
        return fallback
      }

      return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-red-600 mb-4">发生错误</h2>
            <p className="text-gray-700 mb-4">抱歉，页面加载时出现了问题。</p>
            
            {/* 仅在开发环境显示错误详情 */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mb-4 p-4 bg-gray-100 rounded-md text-sm text-gray-800">
                <p className="font-medium mb-2">错误详情:</p>
                <pre className="whitespace-pre-wrap">{this.state.error.message}</pre>
                {this.state.errorInfo && (
                  <pre className="whitespace-pre-wrap mt-2">{this.state.errorInfo.componentStack}</pre>
                )}
              </div>
            )}
            
            <div className="flex justify-end">
              <button 
                onClick={this.resetError}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                重试
              </button>
            </div>
          </div>
        </div>
      )
    }

    // 正常渲染子组件
    return this.props.children
  }
}