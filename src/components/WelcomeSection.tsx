'use client';

import { Cloud, Sun, CloudRain } from 'lucide-react';
import { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';

interface WelcomeSectionProps {
  userName?: string;
}

const WelcomeSection = ({ userName = '用户' }: WelcomeSectionProps) => {
  // 模拟用户数据
  const userData = {
    name: userName,
    todayWatchTime: 125, // 分钟
    weeklyWatchTime: 680, // 分钟
    totalMovies: 45,
    totalSeries: 12,
    streak: 7, // 连续观看天数
  };

  // 模拟天气数据
  const weatherData = {
    temperature: 22,
    condition: '晴朗',
    humidity: 65,
    windSpeed: 12,
  };

  // 模拟播放比例数据
  const genreData = [
    { name: '电影', value: 45, color: '#3B82F6' },
    { name: '剧集', value: 35, color: '#8B5CF6' },
    { name: '综艺', value: 20, color: '#10B981' },
  ];

  // 模拟全年活跃度数据（简化版日历图）
  const yearlyActivity = Array.from({ length: 365 }, (_, i) => ({
    date: i,
    value: Math.floor(Math.random() * 4), // 0-3 活跃度等级
  }));

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}小时${mins}分钟` : `${mins}分钟`;
  };



  const getWeatherIcon = () => {
    switch (weatherData.condition) {
      case '晴朗':
        return <Sun className="w-6 h-6 text-yellow-500" />;
      case '多云':
        return <Cloud className="w-6 h-6 text-gray-500" />;
      case '雨天':
        return <CloudRain className="w-6 h-6 text-blue-500" />;
      default:
        return <Sun className="w-6 h-6 text-yellow-500" />;
    }
  };

  // 饼图配置
  const getPieChartOption = () => {
    return {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        textStyle: {
          color: '#6B7280'
        }
      },
      series: [
        {
          name: '观看类型',
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['60%', '50%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '18',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: genreData.map(item => ({
            value: item.value,
            name: item.name,
            itemStyle: {
              color: item.color
            }
          }))
        }
      ]
    };
  };



  // 柱状图配置
  const getBarChartOption = () => ({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: function (params: any) {
        return params[0].name + '<br/>' + params[0].marker + '观看时长: ' + params[0].value + ' 小时';
      }
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '10%',
      top: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      axisTick: {
        alignWithLabel: true
      },
      axisLine: {
        lineStyle: {
          color: '#e5e7eb'
        }
      },
      axisLabel: {
        color: '#6b7280'
      }
    },
    yAxis: {
      type: 'value',
      name: '观看时长(小时)',
      nameTextStyle: {
        color: '#6b7280'
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#6b7280'
      },
      splitLine: {
        lineStyle: {
          color: '#f3f4f6',
          type: 'dashed'
        }
      }
    },
    series: [
      {
        name: '观看时长',
        type: 'bar',
        data: [65, 80, 45, 90, 75, 60, 85].map(value => ({
          value: value * 2,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: '#60a5fa'
                },
                {
                  offset: 1,
                  color: '#3b82f6'
                }
              ]
            },
            borderRadius: [4, 4, 0, 0]
          }
        })),
        emphasis: {
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: '#93c5fd'
                },
                {
                  offset: 1,
                  color: '#2563eb'
                }
              ]
            }
          }
        },
        barWidth: '60%'
      }
    ]
  });

  return (
    <section className="mb-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          欢迎回来，{userData.name} 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400">继续您的精彩观影之旅，发现更多好内容</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* 今日天气 */}
        <div className="rounded-2xl border border-gray-200 dark:border-slate-700 shadow-lg bg-white dark:bg-slate-800 p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
            {getWeatherIcon()}
            今日天气
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">温度</span>
              <span className="font-medium text-gray-800 dark:text-gray-200">
                {weatherData.temperature}°C
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">湿度</span>
              <span className="font-medium text-gray-800 dark:text-gray-200">
                {weatherData.humidity}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">风速</span>
              <span className="font-medium text-gray-800 dark:text-gray-200">
                {weatherData.windSpeed}km/h
              </span>
            </div>
            {/* 简单的温度趋势线 */}
            <div className="mt-4">
              <div className="h-8 bg-gradient-to-r from-blue-200 via-yellow-200 to-red-200 rounded-lg relative">
                <div
                  className="absolute w-2 h-2 bg-red-500 rounded-full top-1/2 transform -translate-y-1/2"
                  style={{ left: `${(weatherData.temperature / 40) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>0°</span>
                <span>40°</span>
              </div>
            </div>
          </div>
        </div>

        {/* 观看类型分布 */}
        <div className="rounded-2xl border border-gray-200 dark:border-slate-700 shadow-lg bg-white dark:bg-slate-800 p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">观看类型分布</h3>
          <div className="h-64">
            <ReactECharts option={getPieChartOption()} style={{ height: '100%', width: '100%' }} />
          </div>
        </div>

        {/* 本周活跃度 */}
        <div className="rounded-2xl border border-gray-200 dark:border-slate-700 shadow-lg md:col-span-2 lg:col-span-1 bg-white dark:bg-slate-800 p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">本周活跃度</h3>
          <div className="h-64">
            <ReactECharts option={getBarChartOption()} style={{ height: '100%', width: '100%' }} />
          </div>
        </div>


      </div>
    </section>
  );
};

export default WelcomeSection;