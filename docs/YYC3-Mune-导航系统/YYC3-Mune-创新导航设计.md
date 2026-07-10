# YYC³-Portal 创新导航模块 API 接口规范文档

> 言启象限 | 语枢未来
> ***Words Initiate Quadrants, Language Serves as Core for the Future***
> 万象归元于云枢 | 深栈智启新纪元
> ***All things converge in cloud pivot; Deep stacks ignite a new era of intelligence***

---

文档适用：`portal.yyc3.top`｜导航三模块：**极简悬浮导航 / AI生成式UI导航 / 混合组合导航**
统一约束：RESTful JSON、请求前缀 `/api/v1/nav/`、统一鉴权Header `Authorization: Bearer {token}`、时间戳UTC+8、返回码统一规范。

## 一、全局公共规范

### 1. 通用返回结构体

```json
{
  "code": number, // 200成功 / 4xx参数错误 / 5xx服务异常
  "msg": string,
  "data": any,
  "timestamp": number
}
```

### 2. 全局错误码

| 编码 | 说明　　　　　　　　　 |
| ------| ------------------------|
| 200　| 正常　　　　　　　　　 |
| 400　| 请求参数非法　　　　　 |
| 401　| 登录鉴权失效　　　　　 |
| 429　| 接口限流（AI生成专用） |
| 500　| 服务内部异常　　　　　 |

### 3. 接口分类

1. nav-float：悬浮导航业务接口
2. nav-gen：AI生成式导航接口
3. nav-hybrid：混合导航中台调度接口
4. nav-stat：导航埋点&大数据统计接口

---

## 第一部分：极简悬浮导航接口（/api/v1/nav/float）

### 接口1：获取用户悬浮配置（GET /api/v1/nav/float/config）

**用途：读取用户历史吸附位置、光效开关、常驻任务链配置（持久化后端存储，替代前端localStorage）**
请求入参：无（token携带用户ID）
返回示例：

```json
{
    "code":200,
    "msg":"success",
    "data":{
        "dockSide":"right", // right/left/top 停靠边
        "offsetY":320, // 垂直偏移像素
        "lightMode":true, // 光感余光导航开关
        "autoShrink":true, // 静止自动收缩圆点
        "taskList":[
            {
                "taskId":"T2026060401",
                "taskName":"ISO9001资质申报",
                "taskType":"manage",
                "progress":62,
                "steps":[
                    {"name":"资料提交","path":"/cert/iso/submit","done":true},
                    {"name":"机构审核","path":"/cert/iso/check","done":false}
                ]
            },
            {
                "taskId":"T2026060402",
                "taskName":"NAS缓存故障排查",
                "taskType":"operate",
                "progress":35,
                "steps":[{"name":"日志采集","path":"/nas/log","done":false}]
            }
        ]
    }
}
```

### 接口2：保存用户自定义悬浮配置（PUT /api/v1/nav/float/config）

入参Body

```json
{
    "dockSide":"right",
    "offsetY":290,
    "lightMode":false,
    "autoShrink":true
}
```

返回：`{"code":200,"msg":"配置保存成功","data":{}}`

### 接口3：任务进度更新（PATCH /api/v1/nav/float/task/progress）

用途：业务操作后回调更新悬浮任务条进度
入参

```json
{"taskId":"T2026060401","progress":75,"stepIndex":1}
```

### 接口4：环境光参数上报（POST /api/v1/nav/float/env）

前端采集环境亮度上报，后端用于大数据最优光效策略

```json
{"lightValue":180,"device":"pc","hour":14}
```

## 第二部分：生成式UI导航接口（/api/v1/nav/generate）
>
> 双链路：①云端大模型生成接口；②端侧WebLLM仅本地调用，不走后端接口，仅结果上报
>
### 接口1：自然语言生成导航（POST /api/v1/nav/generate/by-prompt）

**核心接口｜用户输入自然语言，AI生成结构化导航组件**
入参Body

```json
{
    "query":"排查NAS登录缓存异常",
    "clientInfo":{
        "deviceWidth":1920,
        "deviceType":"desktop",
        "role":"admin",
        "currentRoute":"/dashboard"
    }
}
```

返回data字段为AI标准化导航Schema（前端动态渲染）

```json
{
    "code":200,
    "msg":"AI导航生成完成",
    "data":{
        "navId":"GN20260604001", // 临时导航唯一ID（任务结束销毁）
        "taskLabel":"NAS缓存故障全流程排查",
        "navItems":[
            {"compType":"card","name":"设备在线状态","path":"/nas/status","weight":9},
            {"compType":"link","name":"缓存日志解析","path":"/nas/log/cache","weight":8},
            {"compType":"btn","name":"配置重载","path":"/nas/config/reload","weight":7},
            {"compType":"btn","name":"NAS服务重启","path":"/nas/service/restart","weight":6}
        ],
        "expireAfter":3600 // 临时导航生命周期：秒
    }
}
```

### 接口2：销毁临时生成导航（DELETE /api/v1/nav/generate/{navId}）

用途：任务完成/页面关闭，回收临时导航资源
路径参数：navId

### 接口3：导航使用效果反馈（POST /api/v1/nav/generate/feedback）

用户手动标记导航好用/失效，用于模型迭代

```json
{"navId":"GN20260604001","score":1,"remark":"缺少NFS挂载排查入口"}
```

score：1差评｜5好评

### 接口4：组件元数据拉取（GET /api/v1/nav/generate/component-meta）

前端组件注册表依赖，AI生成时约束可用组件范围
返回系统全部可动态生成的导航组件列表、适用业务域(operate/manage)

## 第三部分：混合组合导航中台接口（/api/v1/nav/hybrid）

### 接口1：获取当前综合情境参数（GET /api/v1/nav/hybrid/context）

中台自动聚合：时间、当前业务模式、设备、网络状态，返回组合导航启用策略

```json
{
    "code":200,
    "data":{
        "bizMode":"operate", // operate运维/manage经管
        "timeTag":"worktime", // work/rest
        "netLevel":"high", // high/low弱网
        "enableRule":["float+gen"], // 当前启用组合策略
        "arEnable":false,
        "threeEnable":true
    }
}
```

### 接口2：多模态交互指令统一入口（POST /api/v1/nav/hybrid/command）

统一接收：语音/手势/文本三类指令，中台分发至悬浮/生成/3D导航引擎
入参

```json
{
    "cmdType":"voice", // voice/text/gesture
    "content":"打开3D硬件拓扑查看H3C交换机",
    "posX":420,"posY":560 // 手势屏幕坐标
}
```

返回：调度目标模块+跳转路由

### 接口3：AR实景锚点资源接口（GET /api/v1/nav/hybrid/ar/asset/{deviceCode}）

硬件设备AR导航资源：NAS/DGX/交换机锚定点、关联菜单
deviceCode：硬件唯一编码

## 第四部分：大数据埋点统计接口（/api/v1/nav/stat）

### 接口1：导航行为埋点上报（POST /api/v1/nav/stat/track）

前端全导航统一埋点，用于热图、点击率、优化算法数据源

```json
{
    "navType":"float", // float/gen/hybrid
    "operate":"click", // click/hover/close
    "itemId":"T2026060401",
    "screenX":768,
    "stayMs":1240
}
```

### 接口2：后台统计数据查询（GET /api/v1/nav/stat/analysis?navType=float）

返回：点击率、误触率、各功能访问频次，用于自动调整导航权重

```json
{
    "clickRate":1.25,
    "errorTouchRate":0.06,
    "rankList":[{"name":"NAS管理","clickCnt":326},{"name":"资质查询","clickCnt":211}]
}
```

## 第五部分：前端对接调用示例（Axios伪代码）

```typescript
// src/api/navApi.ts
import axios from 'axios'
const base = '/api/v1/nav'

// 1.获取悬浮配置
export const getFloatConfig = ()=>axios.get(`${base}/float/config`)

// 2.AI生成导航
export const createGenNav = (query:string,clientInfo:any)=>{
  return axios.post(`${base}/generate/by-prompt`,{query,clientInfo})
}

//3.获取混合情境策略
export const getHybridContext = ()=>axios.get(`${base}/hybrid/context`)
```

## 第六部分：部署&对接补充说明

1. **弱网降级规则**：接口响应>1200ms，生成式导航自动切端侧WebLLM，不再请求云端`/generate`接口；
2. **缓存规则**：悬浮用户配置缓存Redis 24h，混合情境参数缓存5min；
3. **限流规则**：AI生成接口单用户60s最多5次请求，防止大模型资源滥用；
4. **扩展预留**：AR、3D空间音频相关接口后续迭代在hybrid模块下扩展`/ar`/`/three`子路由。

---

<div align="center">

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in cloud pivot; Deep stacks ignite a new era of intelligence***」

</div>
