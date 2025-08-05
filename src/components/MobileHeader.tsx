'use client';

import { Search } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';

import { BackButton } from './BackButton';
import { useSite } from './SiteProvider';
import { ThemeToggle } from './ThemeToggle';
import { DeveloperCard } from './DeveloperCard';

interface MobileHeaderProps {
  showBackButton?: boolean;
  showSearch?: boolean;
}

const MobileHeader = ({ showBackButton = false, showSearch = true }: MobileHeaderProps) => {
  const { siteName } = useSite();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      searchInputRef.current?.blur();
    }
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleSearchBlur = () => {
    // 延迟处理blur事件，给按钮点击事件时间执行
    setTimeout(() => {
      setIsSearchFocused(false);
    }, 150);
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    handleSearch(e as any);
  };

  return (
    <header className='md:hidden relative w-full bg-white/70 backdrop-blur-xl border-b border-gray-200/50 shadow-sm dark:bg-gray-900/70 dark:border-gray-700/50'>
      <div className='h-12 flex items-center justify-between px-4 relative overflow-hidden'>
        {/* 左侧：返回按钮 */}
        <div className='flex items-center gap-2 flex-shrink-0'>
          {showBackButton && <BackButton />}
        </div>

        {/* 中间区域：搜索框和标题 */}
        <div className='flex-1 flex items-center justify-center relative'>
          {/* 搜索框 */}
          {showSearch && (
            <form 
              onSubmit={handleSearch} 
              className={`absolute inset-0 flex items-center gap-2 transition-all duration-300 ease-in-out ${
                isSearchFocused ? 'translate-x-0 opacity-100 z-10' : '-translate-x-full opacity-0 z-0'
              }`}
            >
              <div className="relative flex-1 mx-2">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="搜索..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                  className="w-full pl-7 pr-3 py-1.5 text-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-white/80 dark:bg-gray-700/80 focus:outline-none focus:ring-1 focus:ring-blue-400 transition-all duration-200"
                />
              </div>
              {/* 搜索提交按钮（获得焦点时显示）*/}
              {isSearchFocused && (
                <button
                  type="button"
                  onClick={handleButtonClick}
                  className="mr-2 px-2 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-1 text-xs"
                >
                  <Search className="w-3 h-3" />
                  搜索
                </button>
              )}
            </form>
          )}
          
          {/* 标题 */}
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out ${
            isSearchFocused ? 'translate-x-full opacity-0 z-0' : 'translate-x-0 opacity-100 z-10'
          }`}>
            <Link
              href='/'
              className='text-lg font-bold text-green-600 tracking-tight hover:opacity-80 transition-opacity'
            >
              {siteName}
            </Link>
          </div>
          
          {/* 搜索触发按钮（未获得焦点时）*/}
          {showSearch && !isSearchFocused && (
            <button
              onClick={() => searchInputRef.current?.focus()}
              className="absolute right-2 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Search className="w-4 h-4 text-gray-500" />
            </button>
          )}

        </div>

        {/* 右侧按钮 */}
        <div className='flex items-center gap-2 flex-shrink-0'>
          <ThemeToggle />
          <DeveloperCard />
        </div>
      </div>
    </header>
  );
};

export default MobileHeader;
