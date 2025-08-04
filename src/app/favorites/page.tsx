/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, no-console */

'use client';

import { useCallback, useEffect, useState } from 'react';

import { Button } from '@/components/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/Dialog';
import { useToast } from '@/hooks/use-toast';

// 客户端收藏 API
import {
  clearAllFavorites,
  getAllFavorites,
  getAllPlayRecords,
  subscribeToDataUpdates,
} from '@/lib/db.client';

import PageLayout from '@/components/PageLayout';
import VideoCard from '@/components/VideoCard';
import LoadingSpinner from '@/components/LoadingSpinner';

type FavoriteItem = {
  id: string;
  source: string;
  title: string;
  poster: string;
  episodes: number;
  source_name: string;
  currentEpisode?: number;
  search_title?: string;
  year?: string;
};

function FavoritesClient() {
  const [favoriteItems, setFavoriteItems] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showClearDialog, setShowClearDialog] = useState(false);
  const { toast } = useToast();

  // 清空收藏确认处理函数
  const confirmClearFavorites = useCallback(async () => {
    try {
      await clearAllFavorites();
      setFavoriteItems([]);
      setShowClearDialog(false);
      toast({
        title: '清空成功',
        description: '已清空所有收藏',
        variant: 'success',
      });
    } catch (err) {
      toast({
        title: '清空失败',
        description: '清空收藏失败，请稍后重试',
        variant: 'destructive',
      });
      console.error('清空收藏失败:', err);
    }
  }, [toast]);

  // 处理收藏数据更新的函数
  const updateFavoriteItems = async (allFavorites: Record<string, any>) => {
    const allPlayRecords = await getAllPlayRecords();

    // 根据保存时间排序（从近到远）
    const sorted = Object.entries(allFavorites)
      .sort(([, a], [, b]) => b.save_time - a.save_time)
      .map(([key, fav]) => {
        const plusIndex = key.indexOf('+');
        const source = key.slice(0, plusIndex);
        const id = key.slice(plusIndex + 1);

        // 查找对应的播放记录，获取当前集数
        const playRecord = allPlayRecords[key];
        const currentEpisode = playRecord?.index;

        return {
          id,
          source,
          title: fav.title,
          year: fav.year,
          poster: fav.cover,
          episodes: fav.total_episodes,
          source_name: fav.source_name,
          currentEpisode,
          search_title: fav?.search_title,
        } as FavoriteItem;
      });
    setFavoriteItems(sorted);
    setLoading(false);
  };

  // 加载收藏数据
  useEffect(() => {
    const loadFavorites = async () => {
      const allFavorites = await getAllFavorites();
      await updateFavoriteItems(allFavorites);
    };

    loadFavorites();

    // 监听收藏更新事件
    const unsubscribe = subscribeToDataUpdates(
      'favoritesUpdated',
      (newFavorites: Record<string, any>) => {
        updateFavoriteItems(newFavorites);
      }
    );

    return unsubscribe;
  }, []);

  return (
    <>
    <PageLayout>
      <div className='px-2 sm:px-10 py-4 sm:py-8 overflow-visible'>
        <div className='max-w-[95%] mx-auto'>
          {/* 收藏夹视图 */}
          <section className='mb-8'>
            <div className='mb-4 flex items-center justify-between'>
              <h2 className='text-xl font-bold text-gray-800 dark:text-gray-200'>
                我的收藏
              </h2>
              {favoriteItems.length > 0 && (
                <button
                  className='text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                  onClick={() => setShowClearDialog(true)}
                >
                  清空
                </button>
              )}
            </div>
            
            {loading ? (
              <div className='flex flex-col items-center justify-center py-8'>
                <LoadingSpinner size="medium" />
                <div className='text-center text-gray-500 mt-4 dark:text-gray-400'>
                  加载中...
                </div>
              </div>
            ) : (
              <div className='justify-start grid grid-cols-3 gap-x-2 gap-y-14 sm:gap-y-20 px-0 sm:px-2 sm:grid-cols-[repeat(auto-fill,_minmax(11rem,_1fr))] sm:gap-x-8'>
                {favoriteItems.map((item) => (
                  <div key={item.id + item.source} className='w-full'>
                    <VideoCard
                      query={item.search_title}
                      {...item}
                      from='favorite'
                      type={item.episodes > 1 ? 'tv' : ''}
                    />
                  </div>
                ))}
                {favoriteItems.length === 0 && (
                  <div className='col-span-full text-center text-gray-500 py-8 dark:text-gray-400'>
                    暂无收藏内容
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </div>
    </PageLayout>

    {/* 清空收藏确认对话框 */}
    <Dialog open={showClearDialog} onOpenChange={setShowClearDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>确认清空收藏</DialogTitle>
          <DialogDescription>
            确定要清空所有收藏吗？此操作不可恢复！
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowClearDialog(false)}>
            取消
          </Button>
          <Button variant="destructive" onClick={confirmClearFavorites}>
            确定清空
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>
  );
}

export default function FavoritesPage() {
  return <FavoritesClient />;
}