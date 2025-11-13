// hooks/useQueue.ts
import { useState, useEffect, useCallback } from 'react';
import { openDB } from 'idb';
import { Submission } from '../types';
import { uploadToBackend } from '../services/uploadService';

const DB_NAME = 'QLM-Queue';
const STORE_NAME = 'submissions';

const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore(STORE_NAME, { keyPath: 'id' });
    },
  });
};

export const useQueue = () => {
  const [queue, setQueue] = useState<Submission[]>([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const loadQueue = async () => {
    const db = await initDB();
    const items = await db.getAll(STORE_NAME);
    setQueue(items);
  };

  useEffect(() => {
    loadQueue();
  }, []);

  const enqueue = async (submission: Submission) => {
    const db = await initDB();
    await db.put(STORE_NAME, submission);
    await loadQueue();
  };

  const dequeue = async (id: string) => {
    const db = await initDB();
    await db.delete(STORE_NAME, id);
    await loadQueue();
  };

  const processQueue = useCallback(async () => {
    if (!isOnline || queue.length === 0) return;

    for (const submission of queue) {
      try {
        await uploadToBackend(submission);
        await dequeue(submission.id);
      } catch (error) {
        console.error('Upload failed, will retry later:', error);
        break; // Stop on first failure
      }
    }
  }, [queue, isOnline]);

  return { enqueue, queue, isOnline, processQueue, dequeue };
};