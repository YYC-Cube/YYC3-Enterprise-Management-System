import { motion, Variants } from "framer-motion";

// 统一的动画配置
export const animationConfig = {
  duration: 0.3,
  ease: "easeInOut" as const
};

// 页面过渡动画
export const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export const pageTransition = {
  ...animationConfig,
  staggerChildren: 0.1
};

// 组件淡入动画
export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { ...animationConfig } 
  }
};

// 组件滑入动画
export const slideInVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { ...animationConfig }
  }
};

// 组件从下方滑入动画
export const slideUpVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { ...animationConfig }
  }
};

// Alert Dialog 动画配置
export const alertDialogVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.2,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      damping: 25,
      stiffness: 300,
      restDelta: 0.001,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2,
    },
  },
};

export const alertOverlayVariants: Variants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

// Select 组件动画配置
export const selectVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: -5,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300,
      restDelta: 0.001,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -5,
    transition: {
      duration: 0.2,
    },
  },
};

export const itemVariants = {
  hidden: {
    opacity: 0,
    y: 5,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
  hover: {
    backgroundColor: "rgba(96, 165, 250, 0.1)",
    x: 2,
    transition: {
      duration: 0.15,
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1,
    },
  },
};

// Accordion 组件动画配置
export const accordionVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
};

// Sheet 组件动画配置
export const overlayVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

export const contentVariants = {
  left: {
    hidden: {
      x: "-100%",
    },
    visible: {
      x: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        restDelta: 0.001,
      },
    },
    exit: {
      x: "-100%",
      transition: {
        duration: 0.2,
      },
    },
  },
  right: {
    hidden: {
      x: "100%",
    },
    visible: {
      x: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        restDelta: 0.001,
      },
    },
    exit: {
      x: "100%",
      transition: {
        duration: 0.2,
      },
    },
  },
  top: {
    hidden: {
      y: "-100%",
    },
    visible: {
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        restDelta: 0.001,
      },
    },
    exit: {
      y: "-100%",
      transition: {
        duration: 0.2,
      },
    },
  },
  bottom: {
    hidden: {
      y: "100%",
    },
    visible: {
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        restDelta: 0.001,
      },
    },
    exit: {
      y: "100%",
      transition: {
        duration: 0.2,
      },
    },
  },
};

// Tabs 组件动画配置
export const tabsContentVariants = {
  hidden: {
    opacity: 0,
    y: 10,
    transition: {
      duration: 0.25,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      staggerChildren: 0.1,
    },
  },
};

// Tooltip 组件动画配置
export const tooltipVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.2,
    },
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300,
      restDelta: 0.001,
    },
  },
};

// Avatar 组件动画配置
export const avatarHoverVariants = {
  rest: {
    scale: 1,
    boxShadow: "none",
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300,
    },
  },
  hover: {
    scale: 1.05,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300,
    },
  },
  tap: {
    scale: 0.95,
    transition: {
      type: "spring",
      damping: 40,
      stiffness: 400,
    },
  },
};

// 按钮悬停动画
export const buttonHoverVariants = {
  rest: { 
    scale: 1, 
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.2 } 
  },
  hover: { 
    scale: 1.03, 
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
    transition: { 
      duration: 0.2, 
      type: "spring", 
      stiffness: 400, 
      damping: 10 
    } 
  },
  tap: { 
    scale: 0.98, 
    transition: { duration: 0.1 } 
  }
};

// 卡片悬停动画
export const cardHoverVariants: Variants = {
  rest: {
    y: 0,
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    borderColor: "transparent",
    transition: { duration: 0.2 }
  },
  hover: {
    y: -5,
    boxShadow: "0 12px 20px -8px rgba(0, 0, 0, 0.15), 0 6px 10px -6px rgba(0, 0, 0, 0.05)",
    borderColor: "rgba(96, 165, 250, 0.5)",
    transition: {
      duration: 0.2,
      type: "spring" as const,
      stiffness: 300,
      damping: 15
    }
  }
};

// 侧边栏动画
export const sidebarVariants: any = {
  closed: {
    width: "4rem",
    transition: {
      staggerChildren: 0.05,
      staggerDirection: "reverse"
    }
  },
  open: {
    width: "16rem",
    transition: {
      staggerChildren: 0.05,
      staggerDirection: "forward"
    }
  }
};

export const sidebarTransition = {
  type: "tween" as const,
  duration: 0.3
};

// 子菜单展开/折叠动画
export const subMenuVariants = {
  closed: { height: 0, opacity: 0 },
  open: { 
    height: "auto", 
    opacity: 1,
    transition: { duration: 0.2 } 
  }
};

// 骨架屏脉冲动画
export const skeletonVariants = {
  hidden: { opacity: 0.4 },
  visible: {
    opacity: 0.8,
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: "reverse" as const
    }
  }
};

// 数据更新动画
export const dataUpdateVariants = {
  initial: { scale: 1 },
  update: {
    scale: 1.1,
    transition: {
      duration: 0.1,
      repeat: 1,
      repeatType: "reverse" as const
    }
  }
};

// 滚动触发动画配置
export const scrollTriggerConfig = {
  initial: "hidden",
  whileInView: "visible",
  viewport: {
    once: true,
    margin: "-100px"
  }
};

// 动画组件封装
export const AnimatedButton = motion.button;
export const AnimatedCard = motion.div;
export const AnimatedContainer = motion.div;

export default {
  animationConfig,
  pageVariants,
  pageTransition,
  fadeInVariants,
  slideInVariants,
  slideUpVariants,
  buttonHoverVariants,
  cardHoverVariants,
  sidebarVariants,
  sidebarTransition,
  subMenuVariants,
  skeletonVariants,
  dataUpdateVariants,
  scrollTriggerConfig,
  AnimatedButton,
  AnimatedCard,
  AnimatedContainer
};