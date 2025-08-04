'use client';

import { Search } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';

import { ThemeToggle } from './ThemeToggle';
import { BackButton } from './BackButton';
import { useSidebar } from './Sidebar';
import { DeveloperCard } from './DeveloperCard';

interface HeaderProps {
  showSearch?: boolean;
}

const Header = ({ showSearch = true }: HeaderProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  const { isCollapsed } = useSidebar();
  
  // 判断是否在播放页面
  const isPlayPage = pathname === '/play';

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className={`sticky top-0 z-40 h-16 bg-gray-50/80 dark:bg-slate-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-slate-700 flex items-center justify-between px-4 md:px-6 hidden md:flex transition-all duration-300`}>
      <div className="flex items-center gap-6 flex-1">
        {/* 播放页面的回退按钮 */}
        {isPlayPage && (
          <div className="flex-shrink-0">
            <BackButton />
          </div>
        )}
        
        {showSearch && (
          <div className="relative max-w-md flex-1">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜索电影、剧集、综艺..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border-gray-200 dark:border-slate-600 bg-white/80 dark:bg-slate-700/80 border focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors duration-200 flex items-center gap-2"
              >
                <Search className="w-4 h-4" />
                搜索
              </button>
            </form>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <DeveloperCard />
      </div>
    </header>
  );
};

export default Header;