import {Monitor, Reading} from "@element-plus/icons-vue";
import {useRouter} from "vue-router";
import {ref} from "vue";

export const router = useRouter()
export const showDetails = ref(false)
export const showBackToTop = ref(false)


// ==================== 学习手册数据 ====================
export const handbookTopics = [
  {
    title: 'RAG 技术全景解析',
    level: '架构',
    desc: '从原理出发，深度解析检索增强生成的离线/在线双环架构设计',
    tags: ['架构设计', '技术选型', '流程拆解'],
    progress: '100%'
  },
  {
    title: 'Milvus 向量数据库',
    level: '数据库',
    desc: '从零搭建 RAG 系统核心组件，掌握 Milvus 2.6 高性能配置',
    tags: ['向量检索', '环境搭建', 'HNSW 索引'],
    progress: '100%'
  },
  {
    title: 'Embedding 模型选型指南',
    level: '核心',
    desc: '深入对比 BGE、OpenAI 等主流模型，掌握 MTEB 评测与应用实战',
    tags: ['模型对比', 'MTEB 排名', '语义嵌入'],
    progress: '100%'
  },
  {
    title: 'Ollama 模型管理与调优',
    level: '进阶',
    desc: '让 AI 模型在低配服务器上流畅运行，针对 2核4G 的极致性能调优',
    tags: ['模型量化', '线程配额', '本地部署'],
    progress: '100%'
  },
  {
    title: 'Spring AI 后端开发实战',
    level: '后端',
    desc: '基于 Spring AI 封装 LLM 调用，仅需 30 行代码打通 RAG 核心逻辑',
    tags: ['Spring AI', '业务流转', '代码实战'],
    progress: '100%'
  },
  {
    title: 'Vue3 前端开发实战',
    level: '前端',
    desc: '构建企业级对话界面，实现 SSE 流式 Markdown 渲染与打字机效果',
    tags: ['Vue3', 'SSE 流', 'Markdown'],
    progress: '100%'
  },
  {
    title: 'RAG 系统性能调优实战',
    level: '高级',
    desc: '全链路性能瓶颈拆解，实现首字响应从 3 秒到 300ms 的飞跃',
    tags: ['性能瓶颈', '多级缓存', '并发控制'],
    progress: '100%'
  },
  {
    title: 'RAG 安全与权限管理',
    level: '生产',
    desc: '实现文档级权限控制与敏感数据脱敏，构建企业级安全堡垒',
    tags: ['数据保护', 'RBAC', '安全审计'],
    progress: '100%'
  },
  {
    title: 'RAG 系统运维与故障排查',
    level: '专家',
    desc: '从 Docker 部署到监控体系构建，实战 OOM 与网络抖动排查指南',
    tags: ['运维监控', '故障分析', '容器编排'],
    progress: '100%'
  }
]

export const handbookFeatures = [
  {
    title: '完整源码',
    desc: '所有示例代码均可直接运行，包含详细注释',
    icon: Monitor,
    color: 'linear-gradient(135deg, #409EFF 0%, #337ecc 100%)'
  },
  {
    title: '生产部署',
    desc: 'Docker Compose 一键部署，包含完整运维脚本',
    icon: Monitor,
    color: 'linear-gradient(135deg, #67C23A 0%, #529b2e 100%)'
  },
  {
    title: '持续更新',
    desc: '跟随技术迭代持续更新，保持内容前沿性',
    icon: Reading,
    color: 'linear-gradient(135deg, #E6A23C 0%, #b88230 100%)'
  }
]

// ==================== 学习手册相关函数 ====================
export const handleTopicClick = (topic: any) => {
  // 或者跳转到具体博文页面
  window.open(`/chat/topic/${topic + 1}`, '_blank')
}

export const openGithubHandbook = () => {
  window.open('https://github.com/SuniaW/study-notes', '_blank')
}

export const getTopicLevelType = (level: string) => {
  const map: Record<string, any> = {
    '架构': 'danger',    // 红色（最重要）
    '数据库': 'warning',  // 橙色
    '核心': 'warning',   // 橙色
    '进阶': 'primary',   // 蓝色
    '后端': 'success',   // 绿色
    '前端': 'primary',   // 蓝色
    '高级': 'danger',    // 红色
    '生产': 'success',   // 绿色
    '专家': 'danger'     // 红色
  }
  return map[level] || 'info'
}

// 徽章数据
export const badges = [
  {text: 'Spring Boot 3.4.3', type: 'primary'},
  {text: 'Spring AI M6', type: 'warning'},
  {text: 'Milvus 2.6.0', type: 'success'},
  {text: '2C4G 优化', type: 'info'}
]

// 核心指标
export const coreMetrics = [
  {icon: '🤖', title: '推理模型', value: 'Qwen 1.5B', desc: '性能与智能的最佳平衡'},
  {icon: '⚡', title: '平均响应', value: '3.5s', desc: '首字生成平均耗时'},
  {icon: '🎯', title: '检索引擎', value: 'HNSW', desc: '毫秒级高精度语义召回'},
  {icon: '💾', title: '可用内存', value: '2.2GB+', desc: '系统级优化提升 5.5 倍'}
]

// 性能对比数据
export const performanceData = [
  {metric: '可用内存', before: '100MB (OOM)', after: '1.8GB+', improvement: '18 倍'},
  {metric: '首字响应', before: '60s+', after: '3-5s', improvement: '12 倍'},
  {metric: '完整响应', before: '120s+', after: '15-25s', improvement: '5 倍'},
  {metric: '系统稳定', before: '日均崩溃 3-5 次', after: '7×24 小时', improvement: '生产级'}
]

// 技术栈
export const allTechs = [
  'Spring Boot 3.4', 'Spring AI M6', 'Milvus 2.6', 'Ollama',
  'Qwen2.5-1.5B', 'BGE-M3', 'Apache Tika', 'Docker', 'NGINX'
]


export const getTechType = (tech: string) => {
  if (tech.includes('Spring')) return ''
  if (tech.includes('Milvus') || tech.includes('Ollama') || tech.includes('Qwen') || tech.includes('BGE')) return 'warning'
  return 'success'
}


// 优化要点
export const optimizationTips = [
  'HNSW 向量索引算法优化',
  'Ollama 线程配额精细化控制',
  'SSE 字符断包流式拼接修复',
  'Linux 内核 Swap 积极度调优',
  'JVM 内存红线严格限制',
  'Milvus 容器资源配额化',
  'NGINX Gzip 压缩与静态缓存优化',
  'NGINX 反向代理超时与连接池配置'
]

// 服务器规格
export const serverSpecs = [
  {name: 'CPU', value: '2 核心', note: 'Intel/AMD 均可'},
  {name: '内存', value: '4GB', note: '最低配置'},
  {name: '存储', value: '50GB SSD', note: '推荐 NVMe'},
  {name: '网络', value: '100Mbps', note: '内网更佳'},
  {name: '系统', value: 'Ubuntu 22.04', note: '或 CentOS 7+'},
  {name: '云厂商', value: '阿里云/腾讯云', note: '已验证'}
]

// 服务规格
export const serviceSpecs = [
  {name: '并发用户', value: '50+', note: '同时在线'},
  {name: 'QPS', value: '10-15', note: '查询/秒'},
  {name: '知识库容量', value: '10 万 + 文档', note: '支持 PDF/Word'},
  {name: '向量维度', value: '1024', note: 'BGE-M3'},
  {name: '响应时间', value: '3-5s', note: '首字生成'},
  {name: '可用性', value: '99.9%', note: '7×24 运行'}
]

// 软件规格
export const softwareSpecs = [
  {
    category: '后端框架',
    name: 'Spring Boot',
    version: '3.4.3',
    purpose: '应用核心框架',
    status: '生产级'
  },
  {
    category: 'AI 框架',
    name: 'Spring AI',
    version: '1.0.0-M6',
    purpose: 'LLM 集成抽象层',
    status: '生产级'
  },
  {
    category: '向量数据库',
    name: 'Milvus',
    version: '2.6.0',
    purpose: '向量存储与检索',
    status: '生产级'
  },
  {
    category: 'LLM 服务',
    name: 'Ollama',
    version: 'Latest',
    purpose: '本地模型推理',
    status: '生产级'
  },
  {category: '推理模型', name: 'Qwen2.5', version: '1.5B', purpose: '文本生成', status: '生产级'},
  {
    category: 'Embedding',
    name: 'BGE-M3',
    version: '1024 维',
    purpose: '中文向量嵌入',
    status: '生产级'
  },
  {
    category: '文档解析',
    name: 'Apache Tika',
    version: 'Latest',
    purpose: '多格式文档解析',
    status: '生产级'
  },
  {category: '容器化', name: 'Docker', version: '24.0+', purpose: '服务隔离部署', status: '生产级'},
  {
    category: '编排工具',
    name: 'Docker Compose',
    version: '2.0+',
    purpose: '多容器管理',
    status: '生产级'
  },
  {
    category: 'Web 服务器',
    name: 'Nginx',
    version: '1.25+',
    purpose: '反向代理 / Gzip 压缩 / SSE 流式响应支持',
    status: '生产级'
  },
  {category: '前端框架', name: 'Vue 3', version: '3.4+', purpose: '用户界面', status: '生产级'},
]

// 内存分配
export const memoryAllocation = [
  {component: 'Ollama (LLM 引擎)', memory: '2.2 GB', percentage: '55%', color: '#409EFF'},
  {component: 'Milvus (向量库)', memory: '1.0 GB', percentage: '25%', color: '#67C23A'},
  {component: 'Spring Boot (应用)', memory: '0.77 GB', percentage: '19%', color: '#E6A23C'},
  {component: 'OS 系统预留', memory: '0.2 GB', percentage: '5%', color: '#909399'}
]

// 核心技术
export const coreTechnologies = [
  {
    name: 'RAG 检索增强生成',
    icon: '🔍',
    level: '核心',
    tagType: 'danger',
    description: '结合向量检索与大语言模型，实现知识库精准问答',
    features: ['语义检索', '上下文增强', '引用溯源', '防幻觉机制']
  },
  {
    name: 'HNSW 向量索引',
    icon: '📊',
    level: '优化',
    tagType: 'warning',
    description: '高效可导航小世界算法，实现毫秒级向量相似度搜索',
    features: ['O(log N) 复杂度', '高召回率', '内存友好', '增量更新']
  },
  {
    name: 'SSE 流式响应',
    icon: '⚡',
    level: '体验',
    tagType: 'primary',
    description: 'Server-Sent Events 实时推送，降低用户等待焦虑',
    features: ['首字即显', '断点续传', 'Buffer 拼接', '错误恢复']
  },
  {
    name: 'NGINX 反向代理',
    icon: '🌐',
    level: '生产',
    tagType: 'success', // 绿色代表稳定、通行
    description: '七层负载均衡与静态资源加速，保障高并发下的系统稳定性',
    features: ['Gzip 压缩', 'SSE 透传配置', 'Keepalive 长连接', '静态缓存策略']
  },
  {
    name: 'Docker Compose 编排',
    icon: '🐳',
    level: '部署',
    tagType: 'info', // 蓝色代表技术、基础设施
    description: '多容器一键编排与环境隔离，实现微服务架构的快速交付',
    features: ['一键启动', '网络隔离', '资源配额', '依赖管理']
  },
  {
    name: '内存分级管理',
    icon: '💾',
    level: '关键',
    tagType: 'success',
    description: 'JVM+Docker+Swap 三层内存管控，防止 OOM 崩溃',
    features: ['硬限制', '软限制', '溢出保护', '自动回收']
  }
]

// 开源仓库
export const repositories = [
  {
    name: 'lite-rag',
    description: 'Lite-RAG 核心后端代码，Spring Boot + Spring AI 实现',
    stars: '1.2k',
    language: 'Java',
    url: 'https://github.com/SuniaW/lite-rag'
  },
  {
    name: 'lite-rag-web',
    description: 'Vue 3 前端界面，Element Plus 组件库',
    stars: '450',
    language: 'TypeScript',
    url: 'https://github.com/SuniaW/lite-rag-web'
  },
  {
    name: 'rag-deploy-scripts',
    description: '一键部署脚本与 Docker 配置',
    stars: '320',
    language: 'Shell',
    url: 'https://github.com/SuniaW/rag-deploy-scripts'
  }
]


// 作者信息
export const author = {
  name: '汪旭',
  title: '资深全栈开发工程师 | AI 工程化专家 | 企业级系统架构师',
  description: '12年大型系统架构与全栈开发经验，精通 Java核心生态、Python与Vue3。' +
    '具备“一人成军”的端到端交付能力：从需求把控、架构设计到前后端开发与K8s自动化运维，支撑百万级日请求。' +
    '现深耕 AI 工程化（AI Engineering），擅长通过 Java/Python 结合 LLM，为企业构建高可用、低延迟的 RAG 智能问答与 Agent 业务系统。',

  tags: ['Spring 生态专家', 'AI 工程化', '性能调优', '全栈开发', '微服务架构', '金融风控'],
  stats: [
    {value: '12+', label: '年经验'},
    {value: '10+', label: '大型项目'},
    {value: '100 万+', label: '日均请求'},
    {value: '99.9%', label: '系统可用'}
  ],
  links: [
    {name: '邮箱', type: 'primary', icon: 'Message', url: 'mailto:m13186109757@163.com'},
    {name: '电话', type: 'success', icon: 'Phone', url: 'tel:13186109757'},
    {name: '所在地', type: 'info', icon: 'Location', url: '#'}
  ]
}

// 个人优势 - 根据简历更新
export const advantages = [
  '12 年大型系统设计与开发经验，主导多个高并发、高可用微服务系统（日均百万级请求），覆盖金融风控、政务公开、无线运维等领域',
  '全栈技术能力突出：后端精通 Java（Spring Boot/Cloud）、Python；前端熟练 Vue3/Svelte；熟悉 Docker/K8s/Nginx 运维体系',
  '深度掌握数据架构：MySQL/PostgreSQL/Oracle + Redis/HBase + Neo4j，具备海量数据处理与性能调优实战经验',
  '积极探索 AI 工程落地：熟悉大模型（LLM）应用开发，掌握 RAG、Embedding、Function Calling 等技术，能基于 Spring AI 构建智能问答、工单分类、知识库等 AI 增强型系统',
  'AI 辅助开发提效： 深度掌握 AI 辅助开发工具（如 Copilot、Code Llama 等），通过 AI 工具链将代码生成效率提升 30%+，实现从需求分析、代码编写到单元测试的全流程智能化提效',
  '端到端全链路交付：具备从0到1独立交付完整产品的全生命周期能力。精通产品设计、架构分析、前端（Vue）与后端（Java）开发、数据库设计与优化、自动化部署及系统运维维护，真正实现一人覆盖从“想法”到“上线”的所有环节'
]

// 项目经历 - 根据简历更新
export const projects = [
  {
    name: '智能政务知识助手（个人项目）',
    time: '2025.12 - 至今',
    company: '个人开源项目',
    technologies: ['Spring Boot', 'Spring AI', 'Milvus', 'Vue3', 'Ollama', 'RAG'],
    achievements: [
      '基于 Spring Boot + Spring AI + Milvus + Vue3 构建政务政策问答系统',
      '实现 PDF/Word 文档自动解析 → 向量化存储 → RAG 问答 → 流式响应',
      '使用 Qwen-7B 本地模型（Ollama）+ bge-small-zh Embedding',
      '支持多轮对话、引用溯源，响应延迟 2s',
      'GitHub 开源，提供 Docker 一键部署脚本'
    ]
  },
  {
    name: 'WMG 无线网络维护卫士平台',
    time: '2018.10 - 至今',
    company: '中软国际科技服务有限公司 · 研发经理',
    technologies: ['Spring Boot', 'Spring Cloud', 'Vue3', 'Docker', 'K8s', 'Nginx'],
    achievements: [
      '设计并实施统一故障树、事故树、变更评审与网络巡检四大模块',
      '推动前端框架由 JSP+iframe 向 Vue+ 乾坤微前端架构转型，页面加载速度提升 40%',
      '引入 Docker+Kubernetes 实现服务自动化部署，发布效率提升 60%',
      '重构反向频谱工具算法，频谱分析处理性能提升 50%',
      '支持并发用户量提升 50%，系统响应时间缩短 30%'
    ]
  },
  {
    name: '慧健风控系统',
    time: '2016.09 - 2018.03',
    company: '深圳前海联金所金融信息服务有限公司 · 全栈工程师',
    technologies: ['Spring', 'MyBatis', 'Redis', 'HBase', 'Drools'],
    achievements: [
      '构建自动化审批流程与多维度风险控制机制',
      '设计风控规则引擎与评分模型，自动审批通过率提升至 20%',
      '引入 HBase 实现海量历史数据高效存储，审批处理效率提升 50%',
      '系统支持每秒处理 10 万 + 次请求，坏账率下降 30%',
      '人工审核平均耗时由 3 天缩短至 1 小时'
    ]
  },
  {
    name: '渭南市华州区政务公开平台',
    time: '2018.03 - 2018.08',
    company: '西安鼎蓝通信科技有限公司 · 全栈工程师',
    technologies: ['Spring Boot', 'JPA', 'Shiro', 'Vue', 'Bootstrap'],
    achievements: [
      '设计并实施基于 SpringBoot、JPA 与 Shiro 的高可用系统架构',
      '支持日均访问量超过 10 万次，系统响应速度提升 30%',
      '独立开发文件上传、审批、发布及管理等核心功能模块',
      '统筹跨部门需求沟通与协作，确保系统按时交付上线'
    ]
  },
  {
    name: '赫美钱包消费信贷系统',
    time: '2017.04 - 2017.06',
    company: '深圳前海联金所金融信息服务有限公司 · 全栈工程师',
    technologies: ['Spring', 'SpringMVC', 'MyBatis', 'Dubbo', 'Redis'],
    achievements: [
      '主导系统架构设计与核心模块开发，实现用户提前消费与分期支付功能',
      '设计并实施基于 Dubbo 的微服务架构，接口平均响应时间降低 30%',
      '引入 Redis 作为分布式缓存，数据读取性能提升 50%',
      '搭建 Jenkins 持续集成与自动化部署流水线，发布频率从每周一次提升至每日多次'
    ]
  },
  {
    name: '固网解决方案系统',
    time: '2014.06 - 2016.03',
    company: '华为 · 全栈工程师',
    technologies: ['Spring', 'Hibernate', 'Extjs', 'Echart', 'MySQL'],
    achievements: [
      '主导系统整体架构设计，打造集资源共享、问题答疑与知识共享于一体的协同平台',
      '基于 Extjs 与 Echart 构建前端交互界面，实现数据可视化与高效资源检索',
      '通过索引优化与查询性能调优，将关键接口响应时间缩短 30%',
      '系统成功上线后稳定支持超过 500 名员工日常使用，资源分享量同比增长 50%'
    ]
  }
]

// 专业技能 - 根据简历更新
export const skills = [
  {
    name: 'Java 生态',
    icon: '☕',
    level: '精通',
    items: ['Spring Boot', 'Spring Cloud', 'Spring AI', 'MyBatis', 'Dubbo', 'Maven']
  },
  {
    name: '前端技术',
    icon: '🎨',
    level: '精通',
    items: ['Vue3', 'Svelte', 'React', 'TypeScript', 'Element Plus', '微前端']
  },
  {
    name: '数据库/中间件',
    icon: '🗄️',
    level: '精通',
    items: ['MySQL', 'PostgreSQL', 'Oracle', 'Redis', 'HBase', 'Neo4j', 'Milvus']
  },
  {
    name: 'AI 智能系统',
    icon: '🤖',
    level: '熟练',
    items: ['RAG', 'Embedding', 'Function Calling', 'LangChain', 'Ollama', 'LLM 应用']
  },
  {
    name: '运维体系',
    icon: '⚙️',
    level: '熟练',
    items: ['Docker', 'Kubernetes', 'Nginx', 'Jenkins', 'Apollo', 'Linux']
  },
  {
    name: '其他语言',
    icon: '📝',
    level: '熟练',
    items: ['Python', 'JavaScript', 'Shell', 'SQL', 'HTML5', 'CSS3']
  }
]

// 联系方式 - 根据简历更新
export const contacts = [
  {name: '邮箱', value: '644175013@qq.com', icon: 'Message'},
  {name: '所在地', value: '陕西 · 西安', icon: 'Location'},
  {name: '工作年限', value: '12 年', icon: 'Briefcase'}
]
