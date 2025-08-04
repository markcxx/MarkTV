"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { toast } from "@/hooks/use-toast"
import {
  User,
  Globe,
  Github,
  Mail,
  ExternalLink,
  Code,
  Brain,
  Monitor,
  Music,
  Video,
  Star,
  Award,
  Zap,
  Heart,
  Coffee,
  Rocket,
  Target,
  BookOpen,
  Copy,
  Check,
  MessageCircle,
  Phone,
} from "lucide-react"

export default function DeveloperProfile() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("about")
  const [copiedItem, setCopiedItem] = useState<string | null>(null)

  const personalLinks = [
    { name: "个人博客", url: "https://www.galactic-mark.cc", icon: Globe, color: "bg-blue-500" },
    { name: "GitHub", url: "https://github.com/markcxx", icon: Github, color: "bg-gray-800" },
    { name: "B站", url: "https://space.bilibili.com/677577553", icon: Video, color: "bg-pink-500" },
    { name: "CSDN", url: "https://blog.csdn.net/qq_64440709?type=blog", icon: Code, color: "bg-orange-500" },
  ]

  const techStack = {
    frontend: [
      { name: "React", color: "border-blue-400 bg-blue-50 text-blue-700" },
      { name: "Vue.js", color: "border-green-400 bg-green-50 text-green-700" },
      { name: "TypeScript", color: "border-indigo-400 bg-indigo-50 text-indigo-700" },
      { name: "JavaScript", color: "border-yellow-400 bg-yellow-50 text-yellow-700" },
    ],
    backend: [
      { name: "FastAPI", color: "border-teal-400 bg-teal-50 text-teal-700" },
      { name: "Node.js", color: "border-emerald-400 bg-emerald-50 text-emerald-700" },
      { name: "Python", color: "border-cyan-400 bg-cyan-50 text-cyan-700" },
    ],
    desktop: [
      { name: "Qt", color: "border-purple-400 bg-purple-50 text-purple-700" },
      { name: "PyQt", color: "border-violet-400 bg-violet-50 text-violet-700" },
      { name: "Electron", color: "border-rose-400 bg-rose-50 text-rose-700" },
    ],
  }

  const specialties = [
    { name: "MCP协议开发", icon: Zap, description: "Model Context Protocol相关开发", level: "专家" },
    { name: "RAG系统构建", icon: Brain, description: "检索增强生成系统的设计与实现", level: "专家" },
    { name: "大模型开发", icon: Code, description: "AI大模型相关开发", level: "高级" },
    { name: "模型微调", icon: Target, description: "针对特定任务的模型优化", level: "高级" },
    { name: "PyQt开发", icon: Monitor, description: "桌面应用程序开发", level: "专家" },
    { name: "全栈开发", icon: Coffee, description: "前后端全栈开发", level: "高级" },
  ]

  const projects = [
    {
      name: "CoCoMusic",
      type: "音乐平台桌面软件",
      description: "集合多平台（网易云音乐、酷狗音乐等）的免付费音乐平台桌面软件，为用户提供统一的音乐播放体验。",
      features: ["多平台整合", "免费音乐播放", "统一播放体验"],
      icon: Music,
      color: "bg-purple-500",
      status: "已完成",
    },
    {
      name: "VidFlowDesktop",
      type: "视频下载工具",
      description: "专门设计的多平台视频下载工具，支持抖音、B站等平台，提供桌面软件和网页端双重体验。",
      features: ["多平台支持", "桌面+网页双端", "高效下载"],
      url: "https://vidflow.markqq.com",
      icon: Video,
      color: "bg-red-500",
      status: "运行中",
    },
  ]

  const contactMethods = [
    {
      label: "邮箱",
      value: "2811016860@qq.com",
      social: "email",
      color: "#ea4335",
      icon: Mail,
    },
    {
      label: "微信",
      value: "C18583219975",
      social: "wechat",
      color: "#07c160",
      icon: MessageCircle,
    },
    {
      label: "QQ",
      value: "2811016860",
      social: "qq",
      color: "#12b7f5",
      icon: Phone,
    },
  ]

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedItem(label)
      toast({
        title: "复制成功",
        description: `${label}: ${text} 已复制到剪贴板`,
      })
      setTimeout(() => setCopiedItem(null), 2000)
    } catch (err) {
      toast({
        title: "复制失败",
        description: "请手动复制联系方式",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">开发者档案</h1>
          <p className="text-gray-600">探索技术世界的创造者</p>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <User className="mr-2 h-5 w-5" />
              查看开发者信息
              <Rocket className="ml-2 h-4 w-4" />
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden bg-white border-0 shadow-2xl">
            <DialogHeader className="border-b pb-4">
              <div className="flex items-center justify-center gap-4">
                <Avatar className="h-16 w-16 border-4 border-gray-200">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xl font-bold">
                    马
                  </AvatarFallback>
                </Avatar>
                <div>
                  <DialogTitle className="text-3xl font-bold text-gray-900">怪兽马尔克</DialogTitle>
                  <p className="text-gray-600 mt-1">AI大模型开发 · 全栈开发 · 桌面应用开发</p>
                </div>
              </div>
            </DialogHeader>

            {/* 自定义导航栏 */}
            <div className="w-full">
              <div className="radio-inputs">
                <label className="radio">
                  <input
                    type="radio"
                    name="tab"
                    checked={activeTab === "about"}
                    onChange={() => setActiveTab("about")}
                  />
                  <span className="name">
                    <span className="pre-name" />
                    <span className="pos-name" />
                    <span className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      关于我
                    </span>
                  </span>
                </label>
                <label className="radio">
                  <input
                    type="radio"
                    name="tab"
                    checked={activeTab === "skills"}
                    onChange={() => setActiveTab("skills")}
                  />
                  <span className="name">
                    <span className="pre-name" />
                    <span className="pos-name" />
                    <span className="flex items-center gap-2">
                      <Code className="h-4 w-4" />
                      技术栈
                    </span>
                  </span>
                </label>
                <label className="radio">
                  <input
                    type="radio"
                    name="tab"
                    checked={activeTab === "projects"}
                    onChange={() => setActiveTab("projects")}
                  />
                  <span className="name">
                    <span className="pre-name" />
                    <span className="pos-name" />
                    <span className="flex items-center gap-2">
                      <Monitor className="h-4 w-4" />
                      项目作品
                    </span>
                  </span>
                </label>
                <label className="radio">
                  <input
                    type="radio"
                    name="tab"
                    checked={activeTab === "contact"}
                    onChange={() => setActiveTab("contact")}
                  />
                  <span className="name">
                    <span className="pre-name" />
                    <span className="pos-name" />
                    <span className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      联系方式
                    </span>
                  </span>
                </label>
              </div>

              {/* 内容区域 */}
              <div className="content-area">
                {activeTab === "about" && (
                  <div className="space-y-6">
                    {/* 个人简介 */}
                    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
                        <CardTitle className="flex items-center gap-2">
                          <Heart className="h-5 w-5 text-red-500" />
                          个人简介
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                            <Brain className="h-6 w-6 text-blue-600 mt-1" />
                            <div>
                              <h4 className="font-semibold text-blue-900">AI大模型开发与应用</h4>
                              <p className="text-blue-700 text-sm mt-1">
                                致力于构建智能化解决方案，拥有丰富的前端和后端开发经验，擅长AI应用开发和桌面应用程序开发。
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                            <Coffee className="h-6 w-6 text-green-600 mt-1" />
                            <div>
                              <h4 className="font-semibold text-green-900">软件开发与应用</h4>
                              <p className="text-green-700 text-sm mt-1">
                                将技术与科技服务于生活，拥有丰富的软件开发经验，擅长使用Qt和Electron构建桌面应用。
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* 专业特长 */}
                    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                        <CardTitle className="flex items-center gap-2">
                          <Award className="h-5 w-5 text-purple-600" />
                          专业特长
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {specialties.map((specialty, index) => {
                            const IconComponent = specialty.icon
                            return (
                              <div
                                key={index}
                                className="group p-4 border rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all duration-300 cursor-pointer transform hover:scale-105"
                              >
                                <div className="flex items-start gap-3">
                                  <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                                    <IconComponent className="h-5 w-5 text-purple-600" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                      <h4 className="font-semibold text-gray-900">{specialty.name}</h4>
                                      <Badge variant="secondary" className="text-xs">
                                        {specialty.level}
                                      </Badge>
                                    </div>
                                    <p className="text-sm text-gray-600">{specialty.description}</p>
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </CardContent>
                    </Card>

                    {/* 个人链接 */}
                    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50">
                        <CardTitle className="flex items-center gap-2">
                          <Globe className="h-5 w-5 text-blue-600" />
                          在线平台
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {personalLinks.map((link, index) => {
                            const IconComponent = link.icon
                            return (
                              <a
                                key={index}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex flex-col items-center gap-3 p-4 rounded-lg border hover:border-gray-300 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                              >
                                <div
                                  className={`p-3 ${link.color} rounded-full text-white group-hover:scale-110 transition-transform`}
                                >
                                  <IconComponent className="h-6 w-6" />
                                </div>
                                <div className="text-center">
                                  <span className="text-sm font-medium text-gray-900">{link.name}</span>
                                  <ExternalLink className="h-3 w-3 ml-1 inline opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                              </a>
                            )
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {activeTab === "skills" && (
                  <div className="space-y-6">
                    {Object.entries(techStack).map(([category, skills]) => (
                      <Card key={category} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50">
                          <CardTitle className="flex items-center gap-2 capitalize">
                            <Code className="h-5 w-5 text-indigo-600" />
                            {category === "frontend" ? "前端技术" : category === "backend" ? "后端技术" : "桌面应用"}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <div className="flex flex-wrap gap-3">
                            {skills.map((skill, index) => (
                              <div
                                key={index}
                                className={`px-4 py-2 rounded-full border-2 font-medium transition-all duration-300 hover:scale-105 hover:shadow-md cursor-pointer ${skill.color}`}
                              >
                                {skill.name}
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {activeTab === "projects" && (
                  <div className="space-y-6">
                    {projects.map((project, index) => {
                      const IconComponent = project.icon
                      return (
                        <Card
                          key={index}
                          className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                        >
                          <CardHeader
                            className={`bg-gradient-to-r ${project.color.replace("bg-", "from-").replace("-500", "-50")} to-gray-50`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-3">
                                <div className={`p-3 ${project.color} rounded-lg text-white`}>
                                  <IconComponent className="h-6 w-6" />
                                </div>
                                <div>
                                  <CardTitle className="text-xl">{project.name}</CardTitle>
                                  <Badge variant="outline" className="mt-1">
                                    {project.type}
                                  </Badge>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge
                                  variant={project.status === "运行中" ? "default" : "secondary"}
                                  className={project.status === "运行中" ? "bg-green-500" : ""}
                                >
                                  {project.status}
                                </Badge>
                                {project.url && (
                                  <a
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 hover:bg-white rounded-lg transition-colors"
                                  >
                                    <ExternalLink className="h-4 w-4" />
                                  </a>
                                )}
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-6">
                            <p className="text-gray-700 mb-4 leading-relaxed">{project.description}</p>
                            <div className="space-y-3">
                              <div>
                                <h4 className="font-semibold mb-2 flex items-center gap-2">
                                  <Star className="h-4 w-4 text-yellow-500" />
                                  核心特色
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {project.features.map((feature, featureIndex) => (
                                    <Badge
                                      key={featureIndex}
                                      variant="secondary"
                                      className="bg-blue-50 text-blue-700 hover:bg-blue-100"
                                    >
                                      {feature}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              {project.url && (
                                <div className="pt-2 border-t">
                                  <p className="text-sm text-blue-600 flex items-center gap-1">
                                    <Globe className="h-3 w-3" />
                                    在线访问：
                                    <a
                                      href={project.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="hover:underline"
                                    >
                                      {project.url}
                                    </a>
                                  </p>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                )}

                {activeTab === "contact" && (
                  <div className="space-y-6">
                    {/* 联系方式图标 */}
                    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
                        <CardTitle className="flex items-center gap-2">
                          <Mail className="h-5 w-5 text-green-600" />
                          联系方式
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="flex justify-center items-center gap-6">
                          {contactMethods.map((contact, index) => {
                            const IconComponent = contact.icon
                            return (
                              <div key={index} className="icon-content">
                                <button
                                  onClick={() => copyToClipboard(contact.value, contact.label)}
                                  className="contact-icon"
                                  data-social={contact.social}
                                  aria-label={contact.label}
                                >
                                  <div className="filled" style={{ backgroundColor: contact.color }} />
                                  <IconComponent className="h-8 w-8" />
                                </button>
                                <div className="tooltip" style={{ backgroundColor: contact.color }}>
                                  {copiedItem === contact.label ? (
                                    <span className="flex items-center gap-1">
                                      <Check className="h-3 w-3" />
                                      已复制
                                    </span>
                                  ) : (
                                    <span className="flex items-center gap-1">
                                      <Copy className="h-3 w-3" />
                                      {contact.label}
                                    </span>
                                  )}
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </CardContent>
                    </Card>

                    {/* 在线平台 */}
                    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                        <CardTitle className="flex items-center gap-2">
                          <BookOpen className="h-5 w-5 text-purple-600" />
                          在线平台
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6 space-y-4">
                        <div className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                          <div className="flex items-center gap-3">
                            <Globe className="h-5 w-5 text-blue-600" />
                            <div>
                              <div className="font-semibold text-blue-900">个人博客</div>
                              <a
                                href="https://www.galactic-mark.cc"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline text-sm"
                              >
                                https://www.galactic-mark.cc
                              </a>
                              <p className="text-xs text-blue-700 mt-1">技术分享与思考</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="flex items-center gap-3">
                            <Github className="h-5 w-5 text-gray-700" />
                            <div>
                              <div className="font-semibold text-gray-900">GitHub</div>
                              <a
                                href="https://github.com/markcxx"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 hover:underline text-sm"
                              >
                                https://github.com/markcxx
                              </a>
                              <p className="text-xs text-gray-600 mt-1">开源项目展示</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* 合作咨询 */}
                    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardContent className="pt-6">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg">
                          <div className="flex items-start gap-3">
                            <Rocket className="h-6 w-6 mt-1" />
                            <div>
                              <h4 className="font-bold text-lg mb-2">合作咨询</h4>
                              <p className="text-blue-100 leading-relaxed">
                                如果您对AI大模型开发、桌面应用开发或其他技术合作感兴趣，欢迎通过以上方式联系我。我很乐意与您探讨技术方案和合作可能性。
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </div>

            <style jsx>{`
              .radio-inputs {
                position: relative;
                display: flex;
                border-top-left-radius: 0.5rem;
                border-top-right-radius: 0.5rem;
                background-color: #3b82f6;
                font-size: 14px;
                width: 100%;
                padding: 0.5rem 1.5rem 0 1.5rem;
              }

              .radio-inputs .radio input {
                display: none;
              }

              .radio-inputs .radio .name {
                display: flex;
                cursor: pointer;
                align-items: center;
                justify-content: center;
                border: none;
                transition: all 0.15s ease-in-out;
                position: relative;
                border-top-left-radius: 0.5rem;
                border-top-right-radius: 0.5rem;
              }

              .radio-inputs .radio input + .name:hover {
                color: #fff;
              }

              .radio-inputs .radio input + .name .pre-name,
              .radio-inputs .radio input + .name .pos-name {
                content: "";
                position: absolute;
                width: 10px;
                height: 10px;
                background-color: #3b82f6;
                bottom: 0;
                opacity: 0;
              }

              .radio-inputs .radio input + .name .pre-name {
                right: -10px;
                border-bottom-left-radius: 300px;
                box-shadow: -3px 3px 0px 3px #e8e8e8;
              }

              .radio-inputs .radio input + .name .pos-name {
                left: -10px;
                border-bottom-right-radius: 300px;
                box-shadow: 3px 3px 0px 3px #e8e8e8;
              }

              .radio-inputs .radio input:checked + .name {
                animation: name-activated;
                animation-duration: 0.1s;
                animation-fill-mode: forwards;
              }

              @keyframes name-activated {
                from {
                  background-color: #3b82f6;
                  font-weight: 400;
                  cursor: pointer;
                  color: white;
                }
                to {
                  background-color: #e8e8e8;
                  font-weight: 600;
                  cursor: default;
                  color: black;
                }
              }

              .radio-inputs .radio input:checked + .name .pre-name,
              .radio-inputs .radio input:checked + .name .pos-name {
                animation: name-border-activated;
                animation-duration: 0.1s;
                animation-fill-mode: forwards;
                z-index: 0;
              }

              @keyframes name-border-activated {
                from {
                  opacity: 0;
                }
                to {
                  opacity: 1;
                }
              }

              .radio-inputs .radio .name span:last-child {
                z-index: 1;
                padding: 0.5rem 0.8rem;
                border-top-left-radius: 0.5rem;
                border-top-right-radius: 0.5rem;
              }

              .radio-inputs .radio input:checked + .name span:last-child {
                animation: name-text-activated;
                animation-duration: 0.1s;
                animation-fill-mode: forwards;
              }

              @keyframes name-text-activated {
                from {
                  background-color: #3b82f6;
                }
                to {
                  background-color: #e8e8e8;
                }
              }

              .content-area {
                background-color: #e8e8e8;
                border-radius: 0.5rem;
                padding: 1rem;
                padding-bottom: 1.2rem;
                max-height: 60vh;
                overflow-y: auto;
                scrollbar-width: none;
                -ms-overflow-style: none;
              }

              .content-area::-webkit-scrollbar {
                display: none;
              }

              .icon-content {
                margin: 0 10px;
                position: relative;
              }

              .icon-content .tooltip {
                position: absolute;
                top: -30px;
                left: 50%;
                transform: translateX(-50%);
                color: #fff;
                padding: 6px 10px;
                border-radius: 5px;
                opacity: 0;
                visibility: hidden;
                font-size: 14px;
                transition: all 0.3s ease;
                white-space: nowrap;
              }

              .icon-content:hover .tooltip {
                opacity: 1;
                visibility: visible;
                top: -50px;
              }

              .contact-icon {
                position: relative;
                overflow: hidden;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 60px;
                height: 60px;
                border-radius: 50%;
                color: #4d4d4d;
                background-color: #fff;
                transition: all 0.3s ease-in-out;
                border: none;
                cursor: pointer;
              }

              .contact-icon:hover {
                box-shadow: 3px 2px 45px 0px rgb(0 0 0 / 12%);
                color: white;
              }

              .contact-icon .filled {
                position: absolute;
                top: auto;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 0;
                transition: all 0.3s ease-in-out;
              }

              .contact-icon:hover .filled {
                height: 100%;
              }
            `}</style>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
