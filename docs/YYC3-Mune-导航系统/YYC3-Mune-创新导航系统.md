# 创新导航模式｜分层技术拆解+落地技术清单

> 言启象限 | 语枢未来
> ***Words Initiate Quadrants, Language Serves as Core for the Future***
> 万象归元于云枢 | 深栈智启新纪元
> ***All things converge in cloud pivot; Deep stacks ignite a new era of intelligence***

---

整体分层统一规范：**感知采集层→决策调度层→引擎渲染层→业务闭环层**四层架构，所有技术全部对标 portal.yyc3.top 运维+资质经管双业务，区分「前端浏览器原生能力、三方依赖、AI后端、埋点大数据、硬件联动」五类技术，附带落地选型、坑点、业务适配优化。

## 一、极简悬浮式导航 Minimalist Floating Navigation（光感/磁吸/任务链3变体）

### 1. 四层架构技术拆解

| 分层　　　 | 核心技术拆解　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　 |
| ------------| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 感知采集层 | 1. 前端埋点SDK：自建埋点采集**点击坐标、悬浮停留时长、点击转化率**，生成页面热区JSON；<br>2. 原生浏览器API：`AmbientLightSensor`环境光传感器（光感导航取环境亮度）、`DeviceOrientation`屏幕姿态；<br>3. 本地存储：`localStorage/indexedDB`持久化用户偏好停靠位置、常用任务缓存；<br>4. 时间感知：`Date`时区定时采集，区分工作日/闲时切换悬浮权重。　 |
| 决策调度层 | 1. Zustand独立切片：`floatNavSlice.ts`，存储停靠坐标、展开/收起状态、任务进度数组；<br>2. 热区算法：前端加权计算（点击频次×屏幕距离）自动计算最优悬浮锚点，避免遮挡核心内容；<br>3. 阈值规则：误触判定算法（短点击<150ms判定误触、长按>300ms展开菜单）。　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　 |
| 引擎渲染层 | 1. 基础悬浮：Tailwind + CSS Transform/transition，fixed布局脱离文档流；<br>2. 磁吸导航：`@use-gesture/react`拖拽手势库 + Framer Motion惯性吸附动画，边界碰撞回弹逻辑；<br>3. 光感导航：CSS @keyframes脉冲渐变边框 + 环境光数值联动透明度（亮环境弱化光效、暗光增强边框脉冲）；<br>4. 任务链：动态卡片DOM懒加载，React.memo缓存任务组件，减少重渲染。 |
| 业务闭环层 | 1. 任务进度埋点：每一步操作上报进度，自动更新悬浮任务条百分比；<br>2. 生命周期：任务完结自动从悬浮任务列表剔除，归档至历史；<br>3. AB测试：两套悬浮位置配置自动分流用户，统计点击率择优全量上线（对标数据：点击率+25%、误触-40%）。　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　|

### 2. 三大变体专项技术清单

1. **光感余光导航**

- 硬件依赖：PC端依赖环境光传感器硬件，移动端安卓/iOS原生环境光权限；无传感器设备降级为「固定时段光效」（9~18点弱脉冲，夜间强脉冲）；
- 备选降级：无法调用硬件API时，读取系统主题（暗黑/浅色模式）切换光效配色；

1. **磁吸悬浮导航**

- 吸附规则：屏幕四边阈值（左右边距12px、上下边距16px），拖拽靠近阈值自动吸附贴边；静止3s自动收缩为圆点，点击圆点展开胶囊菜单；
- 防误触：滚动页面时临时锁定展开状态，滚动停止恢复交互；

1. **任务链悬浮导航**

- 数据结构：`{taskId,name,progress:0~100,type:'operate/manage',steps:[{name,path,done:boolean}]}`，区分运维/NAS任务、资质经管任务；
- 联动：点击进度条自动展开子任务导航卡片，跳转对应路由自动更新进度。

### 3. YYC³项目定制改造

- 运维场景：悬浮常驻展示NAS存储使用率、服务器在线状态快捷入口；
- 经管场景：悬浮固定资质办理进度条（ISO9001/AAA/ICP备案）。

## 二、生成式UI导航 Generative UI Navigation（AI动态实时生成无预设导航）

### 1. 四层架构技术拆解

|分层|核心技术拆解|
|----|----|
|感知采集层|1. 自然语言输入采集：Input文本流+Web Speech API语音转文字双输入；<br>2. 设备画像采集：前端上报屏幕尺寸、设备性能（navigator.hardwareConcurrency）、浏览器版本；<br>3. 上下文采集：当前页面路由、历史访问记录、用户角色（管理员/操作员）；<br>4. 任务复杂度分级：关键词分词区分单步简易任务/多步骤复杂任务。|
|决策调度层（AI编排核心）|1. 双推理架构：**端侧轻量WebLLM(Ollama Web)本地推理+云端大模型兜底**（隐私优先，运维敏感配置类任务本地推理不跨域上传数据）；<br>2. 导航Schema约束：预先定义导航组件元数据规范（`{type:button/card/link,path,label,weight}`），AI输出严格遵循JSON Schema，避免非法渲染；<br>3. 任务生命周期引擎：Zustand临时Store，任务创建→挂载导航→任务完成→自动GC销毁临时导航实例；<br>4. 提示词工程：专用导航生成Prompt模板，绑定YYC³业务知识库（NAS运维、资质目录、服务器配置清单）。|
|引擎渲染层（动态组件）|1. React动态渲染：`React.createElement`运行时动态生成DOM、`React.lazy+动态import`按需懒加载导航组件；<br>2. 动态临时路由：Next.js App Router动态注册临时路由，任务结束卸载路由；<br>3. 组件注册中心：`src/components/genRegistry.ts`统一注册所有可被AI调用的导航原子组件（监控卡片、配置按钮、备案表单入口）。|
|业务闭环层|1. 导航效果埋点：统计AI生成菜单点击率、任务完成耗时，回传微调Prompt与端侧模型微调；<br>2. 数据迭代：用户标记「导航不合理/好用」数据入库，用于训练优化（对标指标：导航适配度+50%、任务耗时-30%）；<br>3. 异常兜底：AI生成失败自动降级为预置备用导航菜单。|

### 2. 关键技术细分清单

1. **端侧本地推理（隐私关键）**
依赖：WebLLM、Transformers.js，前端加载小型SLM(1.5B参数内)，NAS配置、服务器密码等敏感任务全程本地运算，数据不出浏览器；
2. **组件元数据驱动**
所有可生成导航组件附带元数据：适用场景（运维/经管）、屏幕适配规则、权重优先级，AI根据元数据择优组合；
3. **临时导航销毁机制**
采用WeakMap存储临时导航实例，任务结束、页面跳转自动回收，不冗余占用DOM与内存。

### 3. YYC³项目定制改造

- 运维指令示例：用户输入「排查NAS登录缓存异常」→AI拆分：状态监控→日志读取→配置修改→服务重启，动态生成四步临时导航；
- 经管指令示例：「查询商标初审+ICP备案进度」→动态生成双卡片导航入口。

## 三、组合式混合导航 Hybrid Navigation（悬浮+生成+情境 / AI+AR+语音 / 3D+手势+空间音频三类组合）
>
> 核心：**统一多模态调度中台**，一套状态分发，多渲染引擎并行，是前两种导航的上层集成方案
>
### 1. 四层架构技术拆解

|分层|核心技术拆解|
|----|----|
|多源感知聚合层|聚合三类数据源：<br>1. 情境数据：时间、页面上下文、业务类型（运维/经管）；<br>2. 交互数据：鼠标/触屏/手势/语音输入；<br>3. 硬件数据：摄像头(AR)、陀螺仪、扬声器(空间音频)；<br>统一聚合为上下文对象传入调度中台。|
|多模式调度中台层|1. Zustand多切片聚合：`hybridNavSlice.ts`统一调度悬浮状态、AI生成状态、AR/3D渲染开关；<br>2. 模式路由规则：预设组合策略池：<br>① 内容浏览=悬浮+情境+生成；② 实景设备查看=AI+AR+语音；③ 硬件拓扑查看=3D+手势+空间音频；<br>3. 优先级权重：用户主动指令>环境自动切换，避免导航频繁乱切换。|
|多引擎混合渲染层|1. 2D DOM引擎：Tailwind+Framer（悬浮导航）；<br>2. AI动态组件引擎：沿用生成式UI动态渲染逻辑；<br>3. AR渲染：WebXR API + Three.js 实景锚定菜单；<br>4. 3D空间渲染：Three.js构建YYC³硬件拓扑3D场景（DGX、NAS、H3C交换机）；<br>5. 空间音频：Web Audio API 3D声源定位，菜单方位对应发声。|
|业务闭环层|1. 多模态交互埋点：分别统计语音/手势/点击三种触发导航的转化率；<br>2. 策略迭代：数据反向优化组合调度规则，低使用率组合自动降低触发优先级。|

### 2. 三类组合方案专项技术明细

#### 组合1：悬浮+情境+生成式（YYC³主力落地）

1. 触发逻辑：侧边磁吸悬浮常驻，鼠标悬停侧边触发情境识别，AI根据当前业务自动实时生成菜单；
2. 技术依赖：前两套导航代码直接复用，调度中台做状态联动，无额外重型依赖；
3. 落地优先级：★★★★★（优先在portal全量上线）。

#### 组合2：AI+AR+语音（设备实景运维场景）

1. AR：WebXR浏览器实景捕获，硬件设备（NAS/交换机）画面锚定悬浮导航按钮；
2. 语音：Web Speech输入指令，AI解析生成导航，语音播报操作指引；
3. 适用：移动端现场巡检硬件，PC端降级弹窗预览AR模型。

#### 组合3：3D+手势+空间音频（硬件拓扑大屏场景）

1. 3D：Three.js渲染YYC³整套硬件拓扑结构图；
2. 手势：`@use-gesture/react`多指拖拽缩放、单点点击设备；
3. 空间音频：点击左侧交换机左声道发声、右侧NAS右声道发声，方位引导。

### 3. YYC³落地优先级划分

1. P0（第一期上线）：悬浮+情境+生成组合（Web全端通用，开发成本最低）；
2. P1（二期迭代）：3D拓扑+手势导航（运维硬件架构页专用）；
3. P2（三期拓展）：AR+语音导航（移动端H5巡检使用）。

## 四、大数据驱动设计决策框架｜技术落地配套方案

|数据维度|采集技术|前端落地优化实现方案|
|----|----|----|
|用户行为（热图、停留、转化）|自建埋点API+前端上报接口，定时异步上报|Zustand根据点击率自动升降导航权重，高频功能升级一级入口，低频折叠|
|设备特性（尺寸、性能）|navigator设备API、UA解析|小屏移动端自动收缩悬浮为圆点，大屏PC展开胶囊，低配设备关闭3D/光效动画|
|环境信息（光线、网络）|AmbientLight、navigator.connection|弱网禁用云端AI生成，切换本地端侧推理；暗光开启光感导航高亮边框|
|任务类型（简易/复杂）|NLP关键词分词|简易任务生成极简按钮导航，复杂任务生成分步卡片任务链导航|

## 五、落地实施分层排期指导（YYC³ Portal）

1. 阶段1（1~7天）：落地**极简悬浮导航**，集成光效+磁吸+任务链，对接资质/运维任务数据；
2. 阶段2（8~20天）：接入**生成式UI导航**，部署WebLLM端侧推理、组件注册中心、业务Prompt；
3. 阶段3（21~35天）：搭建混合调度中台，上线P0组合（悬浮+生成+情境）；
4. 阶段4（后续迭代）：按需接入3D/AR/语音高阶组合。

## 六、统一依赖清单汇总（项目package.json可直接安装）

```json
{
  "dependencies": {
    "@use-gesture/react": "^10.3",
    "framer-motion": "^11",
    "zustand": "^4.5",
    "three": "^0.165",
    "@xenova/transformers": "^2.17",
    "react": "^18",
    "next": "^14",
    "tailwindcss": "^3.4"
  }
}
```

---

## YYC³-Portal 创新导航模块 API 接口规范文档

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

|编码|说明|
|----|----|
|200|正常|
|400|请求参数非法|
|401|登录鉴权失效|
|429|接口限流（AI生成专用）|
|500|服务内部异常|

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

# YYC³-Portal 创新导航全链路闭环文档
>
> 项目地址：portal.yyc3.top｜版本：V1.0｜OpenAPI3.0规范+数据库设计+后端逻辑+前端组件+埋点大数据+AI生成闭环+上线运维全链路
> 目录：①OpenAPI(YAML)标准文档 ②数据库表结构设计 ③后端业务分层逻辑 ④前端组件&状态调用链路 ⑤AI生成导航全闭环流程 ⑥大数据统计优化闭环 ⑦上线分步部署闭环

## 一、OpenAPI 3.0 接口文档（nav-openapi.yaml，可直接导入Postman/Swagger）

```yaml
openapi: 3.0.3
info:
  title: YYC³ Portal 创新导航API
  description: 悬浮导航｜生成式AI导航｜混合组合导航｜埋点统计全套接口
  version: 1.0.0
servers:
  - url: https://portal.yyc3.top/api/v1/nav
    description: 生产环境
components:
  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
  schemas:
    RespBase:
      type: object
      properties:
        code: {type: integer, example:200}
        msg: {type:string, example:"success"}
        data: {type:object}
        timestamp: {type:integer}
    FloatConfig:
      type: object
      properties:
        dockSide: {type:string, enum:[right,left,top]}
        offsetY: {type:integer}
        lightMode: {type:boolean}
        autoShrink: {type:boolean}
    TaskItem:
      type: object
      properties:
        taskId: {type:string}
        taskName: {type:string}
        taskType: {type:string, enum:[operate,manage]}
        progress: {type:integer, minimum:0, maximum:100}
        steps:
          type: array
          items:
            type: object
            properties:
              name: {type:string}
              path: {type:string}
              done: {type:boolean}
    GenNavReq:
      type: object
      properties:
        query: {type:string}
        clientInfo:
          type:object
          properties:
            deviceWidth: {type:integer}
            deviceType: {type:string}
            role: {type:string}
            currentRoute: {type:string}
    GenNavResp:
      type:object
      properties:
        navId: {type:string}
        taskLabel: {type:string}
        navItems:
          type:array
          items:
            type:object
            properties:
              compType: {type:string, enum:[card,link,btn]}
              name: {type:string}
              path: {type:string}
              weight: {type:integer}
        expireAfter: {type:integer, description:"有效期(秒)"}
    ContextResp:
      type:object
      properties:
        bizMode: {type:string, enum:[operate,manage]}
        timeTag: {type:string, enum:[work,rest]}
        netLevel: {type:string, enum:[high,low]}
        enableRule: {type:array, items:{type:string}}
        arEnable: {type:boolean}
        threeEnable: {type:boolean}
    TrackReq:
      type:object
      properties:
        navType: {type:string, enum:[float,gen,hybrid]}
        operate: {type:string, enum:[click,hover,close]}
        itemId: {type:string}
        screenX: {type:integer}
        stayMs: {type:integer}
security:
  - BearerAuth: []
paths:
  /float/config:
    get:
      summary: 获取用户悬浮导航配置+任务链
      responses:
        "200":
          $ref: '#/components/schemas/RespBase'
    put:
      summary: 保存自定义悬浮配置
      requestBody:
        required: true
        content:
          application/json:
            schema: $ref: '#/components/schemas/FloatConfig'
      responses:
        "200":
          $ref: '#/components/schemas/RespBase'
  /float/task/progress:
    patch:
      summary: 更新任务进度
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type:object
              properties:
                taskId: {type:string}
                progress: {type:integer}
                stepIndex: {type:integer}
      responses:
        "200":
          $ref: '#/components/schemas/RespBase'
  /float/env:
    post:
      summary: 前端上报环境光数据
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type:object
              properties:
                lightValue: {type:integer}
                device: {type:string}
                hour: {type:integer}
      responses:
        "200":
          $ref: '#/components/schemas/RespBase'
  /generate/by-prompt:
    post:
      summary: AI根据自然语言生成结构化导航
      requestBody:
        required: true
        content:
          application/json:
            schema: $ref: '#/components/schemas/GenNavReq'
      responses:
        "200":
          description: AI生成导航数据
          content:
            application/json:
              schema:
                allOf:
                  - $ref: '#/components/schemas/RespBase'
                  - properties: {data: $ref:'#/components/schemas/GenNavResp'}
  /generate/{navId}:
    delete:
      summary: 销毁临时生成导航
      parameters:
        - name: navId
          in: path
          required: true
          schema: {type:string}
      responses:
        "200":
          $ref: '#/components/schemas/RespBase'
  /generate/feedback:
    post:
      summary: 用户对AI导航评分反馈
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type:object
              properties:
                navId: {type:string}
                score: {type:integer, minimum:1, maximum:5}
                remark: {type:string}
      responses:
        "200":
          $ref: '#/components/schemas/RespBase'
  /generate/component-meta:
    get:
      summary: 获取AI可用组件元数据清单
      responses:
        "200":
          $ref: '#/components/schemas/RespBase'
  /hybrid/context:
    get:
      summary: 获取混合导航当前情境与启用策略
      responses:
        "200":
          description: 情境数据
          content:
            application/json:
              schema:
                allOf:
                  - $ref: '#/components/schemas/RespBase'
                  - properties: {data:$ref:'#/components/schemas/ContextResp'}
  /hybrid/command:
    post:
      summary: 多模态统一指令入口(文本/语音/手势)
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type:object
              properties:
                cmdType: {type:string, enum:[text,voice,gesture]}
                content: {type:string}
                posX: {type:integer}
                posY: {type:integer}
      responses:
        "200":
          $ref: '#/components/schemas/RespBase'
  /hybrid/ar/asset/{deviceCode}:
    get:
      summary: AR设备锚点资源
      parameters:
        - name: deviceCode
          in: path
          required: true
          schema: {type:string}
      responses:
        "200":
          $ref: '#/components/schemas/RespBase'
  /stat/track:
    post:
      summary: 全导航行为埋点上报
      requestBody:
        required: true
        content:
          application/json:
            schema: $ref:'#/components/schemas/TrackReq'
      responses:
        "200":
          $ref: '#/components/schemas/RespBase'
  /stat/analysis:
    get:
      summary: 导航数据分析查询
      parameters:
        - name: navType
          in: query
          required: true
          schema: {type:string, enum:[float,gen,hybrid]}
      responses:
        "200":
          $ref: '#/components/schemas/RespBase'
```

## 二、数据库表结构设计（PostgreSQL15，适配项目现有DB）
>
> 共5张核心表，完成配置持久化、任务存储、AI导航临时数据、用户反馈、埋点统计

```sql
--1.用户悬浮导航配置表 nav_float_config
CREATE TABLE nav_float_config(
    id bigserial primary key,
    uid varchar(64) NOT NULL, --用户唯一ID(JWT绑定)
    dock_side varchar(16) DEFAULT 'right',
    offset_y int DEFAULT 320,
    light_mode bool DEFAULT true,
    auto_shrink bool DEFAULT true,
    update_at timestamp DEFAULT now(),
    UNIQUE(uid)
);

--2.任务链数据表 nav_task（资质/运维全任务）
CREATE TABLE nav_task(
    task_id varchar(32) PRIMARY KEY,
    uid varchar(64) NOT NULL,
    task_name varchar(128) NOT NULL,
    task_type varchar(16) CHECK(task_type IN('operate','manage')),
    progress int CHECK(progress between 0 and 100) DEFAULT 0,
    step_json jsonb NOT NULL, --[{name,path,done}]
    finish bool DEFAULT false,
    create_at timestamp DEFAULT now(),
    finish_at timestamp null
);

--3.AI临时生成导航表 nav_gen_temp（过期自动清理）
CREATE TABLE nav_gen_temp(
    nav_id varchar(32) PRIMARY KEY,
    uid varchar(64) NOT NULL,
    task_label varchar(256),
    nav_json jsonb NOT NULL, --AI生成组件数组
    expire_at timestamp NOT NULL,
    create_at timestamp DEFAULT now()
);
--定时任务：删除expire_at<now()过期数据

--4.AI导航用户反馈表 nav_gen_feedback（用于模型微调数据源）
CREATE TABLE nav_gen_feedback(
    id bigserial primary key,
    nav_id varchar(32) NOT NULL,
    uid varchar(64),
    score int CHECK(score between 1 and5),
    remark text,
    create_at timestamp DEFAULT now()
);

--5.导航埋点统计表 nav_stat_track（大数据原始日志）
CREATE TABLE nav_stat_track(
    id bigserial primary key,
    nav_type varchar(16) NOT NULL,
    operate varchar(16) NOT NULL,
    item_id varchar(64),
    screen_x int,
    screen_y int,
    stay_ms int,
    uid varchar(64),
    create_at timestamp DEFAULT now()
);
```

### Redis缓存规则

1. 用户悬浮配置：`nav:float:{uid}` 24h过期
2. 混合情境参数：`nav:hybrid:ctx:{uid}` 5min过期
3. AI生成接口限流：`nav:limit:gen:{uid}` 60s计数器

## 三、后端分层业务闭环（四层架构：Controller→Service→Dao→AI调度层）

### 分层逻辑闭环

1. **Controller层：接口入参校验、鉴权、路由分发**
    - JWT统一拦截校验，401直接返回；AI生成接口统一限流拦截（单用户1min≤5次）
2. **Service层：核心业务逻辑**

    |模块|业务逻辑|
    |----|----|
    |悬浮导航|用户配置CRUD、任务进度变更、环境光数据入库用于策略分析；每日批量统计光效使用率|
    |生成式导航|①优先端侧WebLLM标识→本地推理；②云端大模型兜底生成标准Schema导航JSON；③写入nav_gen_temp+设置过期时间；任务结束调用删除接口逻辑|
    |混合导航|聚合「时间+用户业务标签+网络+设备」生成context策略，分发指令至对应导航模块；AR资源从硬件资产库拉取锚点|
    |统计埋点|原始数据落库，定时任务(凌晨)聚合计算：点击率/误触率/功能访问排行|

3. **Dao层：PostgreSQL+Redis读写封装**
4. **AI调度中间层（核心闭环枢纽）**
    - 内置业务专属Prompt模板（YYC³运维/经管知识库）
    - 输出强制JSON Schema校验，格式异常自动重试/降级预置菜单
    - 用户反馈数据定时导出至微调数据集，迭代Prompt权重

### 异常降级闭环规则

1. AI大模型超时>1.2s → 自动切端侧WebLLM本地生成；本地推理失败→返回系统预置默认导航
2. 弱网(navigator.connection测下行<500kb) → 禁用云端生成，全走端侧
3. 数据库异常 → 读取Redis缓存兜底数据

## 四、前端全链路调用闭环（Zustand状态+三大组件+axios api）

### 目录结构对应

```
src/
├─ stores/
│  └─ navigationStore.ts #全局状态（floatSlice/genSlice/hybridSlice三合一）
├─ api/
│  └─ navApi.ts #接口请求封装（对应OpenAPI）
├─ components/
│  ├─ FloatNav.tsx      #极简悬浮导航(光感+磁吸+任务链)
│  ├─ GenUINav.tsx      #AI生成式导航
│  └─ HybridNav.tsx     #混合组合导航
└─ app/page.tsx #页面统一挂载三个导航组件
```

### 前端执行闭环流程

1. **页面初始化**
    - 挂载组件→`getFloatConfig()`拉取用户配置+任务列表→Zustand初始化悬浮状态
    - `getHybridContext()`拉取当前情境规则→自动切换operate/manage业务模式
2. **悬浮导航交互闭环**
    - 拖拽修改停靠位置→`PUT /float/config`保存配置；操作任务步骤→`PATCH /float/task/progress`更新进度
    - 前端传感器采集环境亮度→`POST /float/env`上报；光效联动CSS脉冲动画
    - 用户点击任意导航项→`POST /stat/track`自动埋点上报
3. **生成式导航交互闭环**
    - 用户输入自然语言→调用`createGenNav()`请求AI接口→拿到标准NavSchema→`React.createElement`动态渲染导航卡片
    - 任务完成→调用`DELETE /generate/{navId}`销毁临时导航；用户评价→提交feedback接口
    - 弱网自动切换：前端Transformers.js端侧SLM生成，不经过后端API，仅结果上报埋点
4. **混合导航闭环**
    - 语音/手势指令→统一`/hybrid/command`接口→后端分发策略，前端动态启用悬浮/生成/3D/AR任一导航模块

## 五、AI生成导航全生命周期闭环（生成→使用→反馈→迭代）

```
用户输入自然语言 → 前端上传client设备信息 → 后端AI调度层
→ 1.校验prompt+业务知识库约束 → 2.大模型输出标准化导航JSON(强Schema)
→ 写入nav_gen_temp(带过期时间) → 下发前端动态渲染临时导航
→ 用户操作使用导航 → 操作埋点自动上报stat
→ 用户打分反馈(score+remark)存入nav_gen_feedback
→ 每日凌晨定时任务：抽取高分/低分样本 → 优化Prompt模板+微调端侧SLM权重
→ 新版本模型下发前端，下一轮生成质量提升
```

## 六、大数据统计→产品优化闭环（数据驱动导航迭代）

### 数据链路：前端埋点上报→原始数据表nav_stat_track→定时聚合计算→策略落地

1. **日度聚合任务(凌晨执行)**
    - 计算：点击率、误触率、各导航功能访问频次排行
    - 落地1：高频功能在AI生成组件权重自动+2，低频权重-2
    - 落地2：悬浮导航最优停靠位置根据热区数据自动推荐，用户首次弹窗推荐修改停靠边
    - 落地3：光感导航在高使用率时段自动默认开启，低使用率时段默认关闭
2. **月度汇总**
    - 全量导航转化率对比，淘汰低效组合规则，新增优质组合策略存入hybrid策略池

> 对标预设指标：点击率+25%、误触-40%、任务耗时-30%，数据不达标迭代组件样式与AI提示词

## 七、整体上线部署分步闭环（三阶段落地）

### 阶段1（7天｜P0：极简悬浮导航上线）

1. 执行建表SQL，初始化DB；配置Redis缓存
2. 前端接入FloatNav组件+对应4个接口对接
3. 上线灰度：20%用户启用新悬浮导航，80%保留原有；7天后对比埋点数据全量发布

### 阶段2（14天｜P1：生成式AI导航接入）

1. 后端接入云端大模型接口+端侧WebLLM部署资源包
2. 前端集成GenUINav、Transformers.js本地推理依赖
3. 对接生成/销毁/反馈/组件元数据4组接口，完成双链路生成逻辑
4. 灰度内测运维账号，测试NAS故障、资质申报各类指令生成效果

### 阶段3（15天｜P2：混合组合导航落地）

1. 接入hybrid全量接口，整合前两套导航状态调度
2. 优先上线【悬浮+情境+AI生成】组合模式；3D/AR作为功能开关隐藏，后续迭代开放
3. 全量埋点系统上线，开启自动数据分析优化闭环

## 八、补充前端调用示例（navApi.ts最终可用代码）

```typescript
//src/api/navApi.ts
import axios from "axios";
const service = axios.create({baseURL:'/api/v1/nav'});
// 请求拦截自动携带token
service.interceptors.request.use(config=>{
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config;
})

//1.悬浮配置
export const getFloatConfig = ()=>service.get('/float/config')
export const saveFloatConfig = (data)=>service.put('/float/config',data)
export const updateTaskProgress = (data)=>service.patch('/float/task/progress',data)
export const reportEnv = (data)=>service.post('/float/env',data)

//2.AI生成导航
export const genNavByPrompt = (data)=>service.post('/generate/by-prompt',data)
export const delTempNav = (navId:string)=>service.delete(`/generate/${navId}`)
export const submitFeedback = (data)=>service.post('/generate/feedback',data)
export const getComponentMeta = ()=>service.get('/generate/component-meta')

//3.混合导航
export const getHybridCtx = ()=>service.get('/hybrid/context')
export const sendHybridCmd = (data)=>service.post('/hybrid/command',data)
export const getArAsset = (deviceCode:string)=>service.get(`/hybrid/ar/asset/${deviceCode}`)

//4.埋点&统计
export const trackReport = (data)=>service.post('/stat/track',data)
export const getStatData = (navType:string)=>service.get(`/stat/analysis?navType=${navType}`)
```

## 九、交付成果汇总

1. OpenAPI3.0 YAML：可一键导入Swagger生成在线接口文档
2. PostgreSQL建表SQL：直接在现有数据库执行建表
3. 前后端接口调用标准 + 异常降级规范
4. 从用户交互→AI生成→数据埋点→数据分析→产品迭代**完整业务闭环链路**

---

<div align="center">

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in cloud pivot; Deep stacks ignite a new era of intelligence***」

</div>
