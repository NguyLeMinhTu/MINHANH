package com.minhanh.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayDeque;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class AuthRateLimitService {

    private final Map<String, ArrayDeque<Long>> attempts = new ConcurrentHashMap<>();

    @Value("${auth.rate-limit.max-attempts:5}")
    private int maxAttempts;

    @Value("${auth.rate-limit.window-seconds:60}")
    private int windowSeconds;

    public boolean allowLoginAttempt(String key) {
        long now = System.currentTimeMillis();
        long threshold = now - (windowSeconds * 1000L);

        ArrayDeque<Long> queue = attempts.computeIfAbsent(key, k -> new ArrayDeque<>());

        synchronized (queue) {
            while (!queue.isEmpty() && queue.peekFirst() < threshold) {
                queue.pollFirst();
            }

            if (queue.size() >= maxAttempts) {
                return false;
            }

            queue.addLast(now);
            return true;
        }
    }

    public void clearAttempts(String key) {
        attempts.remove(key);
    }
}
